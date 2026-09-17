export type PlantStatus = {
  configured: boolean;
  mode?: string;
  uncalibrated?: boolean;
  note?: string;
  transport?: string;
  health?: { status?: string; detail?: unknown };
  bioclip_species?: { enabled?: boolean; error?: string; note?: string };
};

export type PlantObservation = {
  observation_id?: string;
  finding_type: string;
  finding: string;
  confidence?: number | null;
  confidence_band?: string | null;
  explanation?: string;
  evidence?: Array<{ kind?: string; ref?: string; detail?: string }>;
  calibrated?: boolean;
  provider_version?: string | null;
};

export type PlantVerdict = {
  status?: string;
  headline?: string;
  detail?: string;
  what_to_do?: string;
  confidence?: number | null;
  not_checked?: string[] | null;
  basis?: string;
};

export type PlantAnalysisResponse = {
  configured: boolean;
  uncalibrated?: boolean;
  calibrated?: boolean;
  subject?: Record<string, string>;
  verdict?: PlantVerdict;
  observations?: PlantObservation[];
  observation_count?: number;
  explanations?: Record<string, string | Record<string, string>> | null;
  withheld_unreliable_heads?: Record<string, string> | null;
  degraded_capabilities?: Record<string, string> | null;
  screened_out_findings?: PlantObservation[] | null;
  screening_available?: boolean;
  screening_note?: string | null;
  not_a_plant_photo?: boolean | null;
  not_a_plant_note?: string | null;
  no_usable_findings?: boolean;
  no_usable_findings_note?: string | null;
  note?: string;
  crop_typed?: string | null;
  crop_understood_as?: string | null;
  crop_match?: string | null;
  bioclip_species?: {
    available?: boolean;
    identified?: string;
    confidence?: number | null;
    scientific_name?: string;
    reason?: string;
  };
};

const BASE_URL = (import.meta.env.VITE_AQIAIC_BASE_URL || "http://127.0.0.1:8000").replace(/\/$/, "");
const REQUEST_TIMEOUT_MS = 15_000;
const ANALYZE_TIMEOUT_MS = 90_000;

export class AIAICRequestError extends Error {
  status?: number;

  constructor(message: string, status?: number) {
    super(message);
    this.name = "AIAICRequestError";
    this.status = status;
  }
}

function timeoutSignal(timeoutMs: number) {
  const controller = new AbortController();
  const timer = globalThis.setTimeout(() => controller.abort(), timeoutMs);
  return { signal: controller.signal, clear: () => globalThis.clearTimeout(timer) };
}

async function parseResponse(response: Response): Promise<unknown> {
  const text = await response.text();
  try {
    return text ? JSON.parse(text) : null;
  } catch {
    return text;
  }
}

function detailOf(body: unknown, fallback: string) {
  if (typeof body === "object" && body !== null && "detail" in body) {
    const detail = (body as { detail?: unknown }).detail;
    return typeof detail === "string" ? detail : JSON.stringify(detail);
  }
  return typeof body === "string" && body ? body : fallback;
}

async function request(path: string, init: RequestInit, timeoutMs: number) {
  const timeout = timeoutSignal(timeoutMs);
  try {
    const response = await fetch(`${BASE_URL}${path}`, {
      ...init,
      headers: { "ngrok-skip-browser-warning": "true", ...init.headers },
      signal: timeout.signal,
    });
    const body = await parseResponse(response);
    if (!response.ok) {
      throw new AIAICRequestError(
        detailOf(body, `AIAIC request failed with HTTP ${response.status}.`),
        response.status,
      );
    }
    return body;
  } catch (error) {
    if (error instanceof AIAICRequestError) throw error;
    if (error instanceof DOMException && error.name === "AbortError") {
      throw new AIAICRequestError("Plant Intelligence service did not respond in time.");
    }
    throw new AIAICRequestError(
      `Plant Intelligence service is currently unavailable. ${error instanceof Error ? error.message : "Please try again later."}`,
    );
  } finally {
    timeout.clear();
  }
}

export const aqiaicPlant = {
  baseUrl: BASE_URL,
  getStatus: () => request("/aqiaic/plant/status", {}, REQUEST_TIMEOUT_MS) as Promise<PlantStatus>,
  analyze: (file: File, crop?: string, region?: string) => {
    const formData = new FormData();
    formData.append("image", file);
    if (crop) formData.append("crop", crop);
    if (region) formData.append("region", region);
    return request("/aqiaic/plant/analyze", { method: "POST", body: formData }, ANALYZE_TIMEOUT_MS) as Promise<PlantAnalysisResponse>;
  },
};