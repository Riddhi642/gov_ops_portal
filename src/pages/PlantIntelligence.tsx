import { useEffect, useState } from "react";
import { AlertTriangle, CheckCircle2, ImagePlus, LoaderCircle, RefreshCw } from "lucide-react";
import {
  aqiaicPlant,
  type PlantAnalysisResponse,
  type PlantObservation,
  type PlantStatus,
} from "../services/aqiaicPlant";

const fieldLabel: Record<string, string> = {
  disease: "Disease",
  nutrient_deficiency: "Nutrient deficiency",
  pest: "Pest",
  water_stress: "Water stress",
  growth_stage: "Growth stage",
  species: "Species",
  plant_part: "Plant part",
  mechanical_damage: "Mechanical damage",
  anomaly: "Anomaly",
};

function formatLabel(value: string) {
  return fieldLabel[value] || value.replaceAll("_", " ");
}

function ErrorPanel({ message, onRetry }: { message: string; onRetry?: () => void }) {
  return (
    <div className="rounded-xl border border-red-200 bg-red-50 p-5 text-red-800">
      <div className="flex items-start gap-3">
        <AlertTriangle className="mt-0.5 shrink-0" size={20} />
        <div className="flex-1">
          <h2 className="font-semibold">Plant Intelligence service is currently unavailable.</h2>
          <p className="mt-1 text-sm">{message || "Please try again later."}</p>
          {onRetry && (
            <button type="button" onClick={onRetry} className="mt-4 inline-flex items-center gap-2 rounded-lg bg-red-700 px-4 py-2 text-sm font-medium text-white hover:bg-red-800">
              <RefreshCw size={16} /> Retry
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function ObservationCard({ observation, explanation }: { observation: PlantObservation; explanation?: string | Record<string, string> }) {
  const confidence = typeof observation.confidence === "number" ? `${Math.round(observation.confidence * 100)}%` : null;
  const explanationText = typeof explanation === "string" ? explanation : observation.explanation;
  return (
    <article className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{formatLabel(observation.finding_type)}</p>
          <h3 className="mt-1 text-lg font-semibold capitalize text-slate-900">{observation.finding}</h3>
        </div>
        {confidence && <span className="rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-700">{confidence}</span>}
      </div>
      {observation.confidence_band && <p className="mt-2 text-xs text-slate-500">Confidence band: {observation.confidence_band}</p>}
      {explanationText && <p className="mt-3 text-sm leading-6 text-slate-600">{explanationText}</p>}
      {observation.evidence && observation.evidence.length > 0 && (
        <div className="mt-3 border-t border-slate-100 pt-3 text-xs text-slate-500">
          Evidence: {observation.evidence.map((item) => item.detail || item.ref || item.kind).filter(Boolean).join(", ")}
        </div>
      )}
    </article>
  );
}

function StatusBanner({ status, loading, error, onRetry }: { status: PlantStatus | null; loading: boolean; error: string; onRetry: () => void }) {
  if (loading) return <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-600"><LoaderCircle className="animate-spin" size={18} /> Checking Plant Intelligence availability...</div>;
  if (error) return <ErrorPanel message={error} onRetry={onRetry} />;
  if (!status?.configured) return <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900"><strong>Plant Intelligence is not available.</strong> {status?.note || "The AQIAIC backend has not configured the capability."}</div>;
  return <div className="flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-900"><CheckCircle2 size={18} /> Plant Intelligence is configured{status.mode ? ` (${status.mode})` : ""}. Findings remain uncalibrated corroborating context.</div>;
}

export default function PlantIntelligence() {
  const [status, setStatus] = useState<PlantStatus | null>(null);
  const [statusLoading, setStatusLoading] = useState(true);
  const [statusError, setStatusError] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [crop, setCrop] = useState("");
  const [region, setRegion] = useState("");
  const [analysis, setAnalysis] = useState<PlantAnalysisResponse | null>(null);
  const [analysisLoading, setAnalysisLoading] = useState(false);
  const [analysisError, setAnalysisError] = useState("");

  const loadStatus = async () => {
    setStatusLoading(true);
    setStatusError("");
    try {
      setStatus(await aqiaicPlant.getStatus());
    } catch (error) {
      setStatusError(error instanceof Error ? error.message : "Unable to check service availability.");
    } finally {
      setStatusLoading(false);
    }
  };

  useEffect(() => {
    const timer = globalThis.setTimeout(() => { void loadStatus(); }, 0);
    return () => globalThis.clearTimeout(timer);
  }, []);

  const selectFile = (nextFile: File | undefined) => {
    if (!nextFile) return;
    if (!nextFile.type.startsWith("image/")) {
      setAnalysisError("Please select an image file.");
      return;
    }
    setFile(nextFile);
    setPreviewUrl(URL.createObjectURL(nextFile));
    setAnalysis(null);
    setAnalysisError("");
  };

  const analyze = async () => {
    if (!file) return;
    setAnalysisLoading(true);
    setAnalysisError("");
    try {
      setAnalysis(await aqiaicPlant.analyze(file, crop, region));
    } catch (error) {
      setAnalysisError(error instanceof Error ? error.message : "Unable to analyze this image.");
    } finally {
      setAnalysisLoading(false);
    }
  };

  const observations = analysis?.observations || [];
  const explanations = analysis?.explanations || {};

  return (
    <div className="space-y-6">
      <header>
        <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">Agricultural operations</p>
        <h1 className="mt-1 text-3xl font-bold text-slate-900">Plant Intelligence</h1>
        <p className="mt-2 max-w-3xl text-slate-600">Upload a plant image for AQIAIC analysis. Results are advisory, uncalibrated context and are never a diagnosis.</p>
      </header>

      <StatusBanner status={status} loading={statusLoading} error={statusError} onRetry={() => void loadStatus()} />

      <div className="grid gap-6 xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between gap-3">
            <div><h2 className="text-lg font-semibold text-slate-900">Analyze an image</h2><p className="mt-1 text-sm text-slate-500">POST /aqiaic/plant/analyze</p></div>
            <ImagePlus className="text-blue-700" size={22} />
          </div>
          <label className="mt-5 flex min-h-64 cursor-pointer items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 p-4 text-center hover:border-blue-500">
            <input type="file" accept="image/*" className="sr-only" onChange={(event) => selectFile(event.target.files?.[0])} />
            {previewUrl ? <img src={previewUrl} alt="Selected plant image preview" className="max-h-60 rounded-lg object-contain" /> : <span className="text-sm text-slate-600">Choose a real plant image</span>}
          </label>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <label className="text-sm font-medium text-slate-700">Crop (optional)<input value={crop} onChange={(event) => setCrop(event.target.value)} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 font-normal outline-none focus:border-blue-600" placeholder="e.g. tomato" /></label>
            <label className="text-sm font-medium text-slate-700">Region (optional)<input value={region} onChange={(event) => setRegion(event.target.value)} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 font-normal outline-none focus:border-blue-600" placeholder="e.g. Maharashtra" /></label>
          </div>
          <button type="button" disabled={!file || analysisLoading} onClick={() => void analyze()} className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-blue-700 px-4 py-3 font-semibold text-white hover:bg-blue-800 disabled:cursor-not-allowed disabled:bg-slate-400">
            {analysisLoading && <LoaderCircle className="animate-spin" size={18} />}{analysisLoading ? "Analyzing..." : "Analyze image"}
          </button>
          {analysisError && <div className="mt-4"><ErrorPanel message={analysisError} onRetry={file ? () => void analyze() : undefined} /></div>}
        </section>

        <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">Findings</h2>
          <p className="mt-1 text-sm text-slate-500">Only fields returned by AQIAIC are shown.</p>
          {!analysis && !analysisLoading && <p className="mt-8 text-center text-sm text-slate-500">Upload an image and select Analyze to view returned findings.</p>}
          {analysisLoading && <div className="mt-8 flex items-center justify-center gap-2 text-sm text-slate-600"><LoaderCircle className="animate-spin" size={18} /> Calling AQIAIC...</div>}
          {analysis?.verdict && <div className="mt-5 rounded-lg border border-blue-200 bg-blue-50 p-4"><h3 className="font-semibold text-blue-950">{analysis.verdict.headline || "Analysis result"}</h3>{analysis.verdict.detail && <p className="mt-1 text-sm text-blue-900">{analysis.verdict.detail}</p>}{analysis.verdict.what_to_do && <p className="mt-2 text-sm font-medium text-blue-950">{analysis.verdict.what_to_do}</p>}{typeof analysis.verdict.confidence === "number" && <p className="mt-2 text-xs text-blue-800">Returned match score: {analysis.verdict.confidence}</p>}</div>}
          {analysis?.not_a_plant_photo && <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">{analysis.not_a_plant_note || "This image was not recognised as a plant photo."}</div>}
          {analysis?.no_usable_findings && <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">{analysis.no_usable_findings_note || "No usable plant findings were returned."}</div>}
          {analysis?.screening_available === false && analysis.screening_note && <p className="mt-4 text-sm text-amber-800">{analysis.screening_note}</p>}
          {analysis?.withheld_unreliable_heads && <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900"><strong>Withheld or unreliable checks</strong>{Object.entries(analysis.withheld_unreliable_heads).map(([key, value]) => <p key={key} className="mt-2"><span className="font-semibold">{formatLabel(key)}:</span> {value}</p>)}</div>}
          {observations.length > 0 && <div className="mt-5 grid gap-3">{observations.map((observation, index) => <ObservationCard key={observation.observation_id || `${observation.finding_type}-${index}`} observation={observation} explanation={explanations[observation.finding_type]} />)}</div>}
          {analysis?.bioclip_species?.available && <div className="mt-4 border-l-4 border-blue-600 pl-3 text-sm text-slate-700"><strong>Open-vocabulary species:</strong> {analysis.bioclip_species.identified || "Not detected"}{typeof analysis.bioclip_species.confidence === "number" ? ` (${Math.round(analysis.bioclip_species.confidence * 100)}%)` : ""}</div>}
        </section>
      </div>
    </div>
  );
}