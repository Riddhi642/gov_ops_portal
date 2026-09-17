/**
 * Drop-in replacement for `src/services/api.ts` in gov_ops_portal.
 *
 * WHAT CHANGED AND WHAT DID NOT
 * -----------------------------
 * The TYPES are unchanged — CitizenData, OfficerData, RequestData, ProjectData and RequestStatus keep exactly
 * the shapes you already have, including `RequestData.id` being a string while the others are numbers. The
 * backend was built from these types, so no component that imports them needs to change.
 *
 * What changed is where the data lives: localStorage becomes HTTP.
 *
 * THREE THINGS THAT WILL BREAK IF YOU SKIP THEM
 * ---------------------------------------------
 * 1. `saveCitizens` / `saveOfficers` / `saveRequests` / `saveProjects` ARE GONE. They were localStorage bulk
 *    writes. Against a shared server a bulk "save whatever my screen has" silently overwrites whatever anyone
 *    else changed since your page loaded. Writes now go through add/update/delete, one record at a time.
 *
 * 2. `addX` / `updateX` / `deleteX` were `void` and are now `Promise`. Every call site must `await` them and
 *    then re-fetch (or update local state from the returned row). If you do not await, the list you render
 *    immediately afterwards is the list from BEFORE the change, and the UI looks broken at random.
 *
 * 3. These can FAIL. The network drops, the backend restarts, a duplicate id returns 409. Every screen needs a
 *    loading state and an error state. This is the actual acceptance criterion for the task: the app must
 *    survive refresh, failed calls and empty datasets "without pretending everything is fine".
 *
 * AND ONE THING TO DELETE
 * -----------------------
 * The old file re-seeded `developmentRequests` into storage whenever it found nothing. Do not keep that.
 * Against a real API an empty list is a FACT about the database. Showing invented rows instead is exactly the
 * "hardcoded values presented as live data" the task forbids, and it makes a broken integration look healthy.
 */

// ---------------------------------------------------------------------------------------------------------
// Types — unchanged from your original file.
// ---------------------------------------------------------------------------------------------------------

export type RequestStatus = "Pending" | "In Progress" | "Approved" | "Rejected";

export type RequestData = {
  id: string;
  requestId: string;
  citizenName: string;
  requestType: string;
  department: string;
  status: RequestStatus;
  description: string;
};

export type CitizenData = {
  id: number;
  citizenId: string;
  name: string;
  email: string;
  phone: string;
  department: string;
};

export type OfficerData = {
  id: number;
  officerId: string;
  name: string;
  email: string;
  phone: string;
  department: string;
  designation: string;
};

export type ProjectData = {
  id: number;
  projectName: string;
  department: string;
  budget: string;
  status: string;
};

export type DashboardData = {
  totalCitizens: number;
  totalOfficers: number;
  totalRequests: number;
  totalProjects: number;
  pendingRequests: number;
  inProgressRequests: number;
  approvedRequests: number;
  rejectedRequests: number;
  requestsByStatus: Record<string, number>;
  requestsByDepartment: Record<string, number>;
};

// ---------------------------------------------------------------------------------------------------------
// Transport
// ---------------------------------------------------------------------------------------------------------

const BASE = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8090";

/**
 * `ngrok-skip-browser-warning` is REQUIRED, not optional, whenever BASE is an ngrok URL.
 *
 * Verified against the live tunnel with a real browser User-Agent: without this header ngrok returns its
 * own interstitial page as `text/plain` ("You are about to visit ..."), `res.json()` throws, and the error
 * names nothing useful. With it, the real JSON comes through. It is harmless when talking to localhost, so
 * it is sent unconditionally rather than being something to remember to add later.
 */
const HEADERS = {
  "Content-Type": "application/json",
  "ngrok-skip-browser-warning": "true",
};

async function http<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE}${path}`, { headers: HEADERS, ...init });
  if (!res.ok) {
    // Surface the server's own reason — 409 "already exists" and 422 "not a valid email address" are both
    // things the user can act on. Swallowing them here is how a form silently does nothing.
    const detail = await res.text().catch(() => "");
    throw new Error(`${res.status} ${res.statusText}${detail ? ` — ${detail}` : ""}`);
  }
  if (res.status === 204) return undefined as T;
  return (await res.json()) as T;
}

// ---------------------------------------------------------------------------------------------------------
// Citizens
// ---------------------------------------------------------------------------------------------------------

export const getCitizens = () => http<CitizenData[]>("/api/citizens");

export const addCitizen = (citizen: Omit<CitizenData, "id">) =>
  http<CitizenData>("/api/citizens", { method: "POST", body: JSON.stringify(citizen) });

export const updateCitizen = (citizen: CitizenData) =>
  http<CitizenData>(`/api/citizens/${citizen.id}`, { method: "PUT", body: JSON.stringify(citizen) });

export const deleteCitizen = (id: number) =>
  http<{ deleted: number }>(`/api/citizens/${id}`, { method: "DELETE" });

// ---------------------------------------------------------------------------------------------------------
// Officers
// ---------------------------------------------------------------------------------------------------------

export const getOfficers = () => http<OfficerData[]>("/api/officers");

export const addOfficer = (officer: Omit<OfficerData, "id">) =>
  http<OfficerData>("/api/officers", { method: "POST", body: JSON.stringify(officer) });

export const updateOfficer = (officer: OfficerData) =>
  http<OfficerData>(`/api/officers/${officer.id}`, { method: "PUT", body: JSON.stringify(officer) });

export const deleteOfficer = (id: number) =>
  http<{ deleted: number }>(`/api/officers/${id}`, { method: "DELETE" });

// ---------------------------------------------------------------------------------------------------------
// Requests — note the id is a STRING here, matching your RequestData type.
// ---------------------------------------------------------------------------------------------------------

export const getRequests = () => http<RequestData[]>("/api/requests");

export const addRequest = (request: Omit<RequestData, "id">) =>
  http<RequestData>("/api/requests", { method: "POST", body: JSON.stringify(request) });

export const updateRequest = (request: RequestData) =>
  http<RequestData>(`/api/requests/${request.id}`, { method: "PUT", body: JSON.stringify(request) });

/** Changing only the status — this is the one the live test exercises. */
export const setRequestStatus = (id: string, status: RequestStatus) =>
  http<RequestData>(`/api/requests/${id}/status?status=${encodeURIComponent(status)}`, { method: "PATCH" });

export const deleteRequest = (id: string) =>
  http<{ deleted: string }>(`/api/requests/${id}`, { method: "DELETE" });

// ---------------------------------------------------------------------------------------------------------
// Projects
// ---------------------------------------------------------------------------------------------------------

export const getProjects = () => http<ProjectData[]>("/api/projects");

export const addProject = (project: Omit<ProjectData, "id">) =>
  http<ProjectData>("/api/projects", { method: "POST", body: JSON.stringify(project) });

export const updateProject = (project: ProjectData) =>
  http<ProjectData>(`/api/projects/${project.id}`, { method: "PUT", body: JSON.stringify(project) });

export const deleteProject = (id: number) =>
  http<{ deleted: number }>(`/api/projects/${id}`, { method: "DELETE" });

// ---------------------------------------------------------------------------------------------------------
// Dashboard
// ---------------------------------------------------------------------------------------------------------

/**
 * Every figure here is COUNTED from the stored rows on each call, never a constant. Change a request's status
 * and the tiles move on the next fetch — which is both the requirement ("dashboard reflects actual data") and
 * the easiest way to prove the wiring is real: if a tile never moves, something is not connected.
 */
export const getDashboardData = () => http<DashboardData>("/api/dashboard");

// ---------------------------------------------------------------------------------------------------------
// Example call site — the shape every screen needs now that calls are async and can fail.
// ---------------------------------------------------------------------------------------------------------
//
// const [rows, setRows]       = useState<CitizenData[] | null>(null);
// const [error, setError]     = useState<string | null>(null);
// const [busy, setBusy]       = useState(false);
//
// const load = async () => {
//   setBusy(true); setError(null);
//   try { setRows(await getCitizens()); }
//   catch (e) { setError(e instanceof Error ? e.message : String(e)); }
//   finally { setBusy(false); }
// };
//
// useEffect(() => { void load(); }, []);
//
// const onCreate = async (form: Omit<CitizenData, "id">) => {
//   setBusy(true); setError(null);
//   try { await addCitizen(form); await load(); }          // await BOTH, or the table shows stale rows
//   catch (e) { setError(e instanceof Error ? e.message : String(e)); }
//   finally { setBusy(false); }
// };
//
// if (busy && rows === null) return <Spinner />;
// if (error)                return <ErrorBanner message={error} onRetry={load} />;
// if (rows?.length === 0)   return <EmptyState>No citizens yet.</EmptyState>;   // an empty list is a FACT
