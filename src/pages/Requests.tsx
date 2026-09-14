import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Eye,
  Pencil,
  Trash2,
  Search,
  Filter,
  X,
  RefreshCw,
} from "lucide-react";

import {
  getRequests,
  addRequest,
  updateRequest,
  deleteRequest as deleteRequestFromService,
  type RequestData,
  type RequestStatus,
} from "../services/api";

// =========================
// REQUESTS COMPONENT
// =========================

const Requests = () => {
  const navigate = useNavigate();

  // =========================
  // FORM STATES
  // =========================

  const [citizenName, setCitizenName] = useState("");
  const [requestType, setRequestType] = useState("");
  const [department, setDepartment] = useState("");
  const [status, setStatus] = useState<RequestStatus | "">("");
  const [description, setDescription] = useState("");

  // =========================
  // SEARCH
  // =========================

  const [search, setSearch] = useState("");

  // =========================
  // FILTERS
  // =========================

  const [departmentFilter, setDepartmentFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  // =========================
  // REQUEST DATA
  // =========================

  const [requests, setRequests] = useState<RequestData[]>([]);

  // =========================
  // LOADING
  // =========================

  const [loading, setLoading] = useState(true);

  // =========================
  // ERROR
  // =========================

  const [error, setError] = useState("");

  // =========================
  // EDIT STATE
  // =========================

  const [editId, setEditId] = useState<string | null>(null);

  // =========================
  // LOAD REQUESTS
  // =========================

  const loadRequests = async () => {
    try {
      setLoading(true);
      setError("");

      const apiRequests = await getRequests();

      setRequests(apiRequests);
    } catch (err) {
      console.error("Failed to load requests:", err);

      setError(
        "Unable to load requests. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // INITIAL LOAD
  // =========================

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void loadRequests();
    }, 0);

    return () => {
      window.clearTimeout(timer);
    };
  }, []);

  // =========================
  // GENERATE REQUEST ID
  // =========================

  const generateRequestId = () => {
    const numbers = requests
      .map((request) => {
        const match =
          request.requestId.match(/^REQ-(\d+)$/);

        return match
          ? Number(match[1])
          : 0;
      })
      .filter((number) => !Number.isNaN(number));

    const nextNumber =
      numbers.length > 0
        ? Math.max(...numbers) + 1
        : 1;

    return `REQ-${String(nextNumber).padStart(
      3,
      "0"
    )}`;
  };

  // =========================
  // GENERATE UNIQUE ID
  // =========================

  const generateNumericId = () => {
    return String(Date.now());
  };

  // =========================
  // FORM SUBMIT
  // =========================

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    // =========================
    // REQUIRED FIELD VALIDATION
    // =========================

    if (
      !citizenName.trim() ||
      !requestType ||
      !department ||
      !status ||
      !description.trim()
    ) {
      alert("Please fill all fields");
      return;
    }

    // =========================
    // CITIZEN NAME VALIDATION
    // =========================

    if (citizenName.trim().length < 2) {
      alert(
        "Citizen name must contain at least 2 characters."
      );
      return;
    }

    // =========================
    // DESCRIPTION VALIDATION
    // =========================

    if (description.trim().length < 5) {
      alert(
        "Description must contain at least 5 characters."
      );
      return;
    }

    const isEditing = editId !== null;

    // =========================
    // EXISTING REQUEST
    // =========================

    const existingRequest = isEditing
      ? requests.find(
          (request) =>
            request.id === editId
        )
      : undefined;

    if (isEditing && !existingRequest) {
      alert("Request not found.");
      return;
    }

    // =========================
    // DUPLICATE VALIDATION
    // =========================

    const duplicateRequest = requests.find(
      (request) =>
        request.id !== editId &&
        request.citizenName
          .trim()
          .toLowerCase() ===
          citizenName
            .trim()
            .toLowerCase() &&
        request.requestType === requestType &&
        request.department === department
    );

    if (duplicateRequest) {
      alert(
        "A similar request already exists for this citizen."
      );
      return;
    }

    // =========================
    // REQUEST ID
    // =========================

    const generatedRequestId = isEditing
      ? existingRequest?.requestId || ""
      : generateRequestId();

    // =========================
    // REQUEST OBJECT
    // =========================

    const newRequest: RequestData = {
      id:
        editId ??
        generateNumericId(),

      requestId:
        generatedRequestId,

      citizenName:
        citizenName.trim(),

      requestType,

      department,

      status,

      description:
        description.trim(),
    };

    try {
      // =========================
      // UPDATE REQUEST
      // =========================

      if (isEditing) {
        await updateRequest(newRequest);

        setRequests((currentRequests) =>
          currentRequests.map((request) =>
            request.id === editId
              ? newRequest
              : request
          )
        );

        alert(
          "Request Updated Successfully!"
        );
      }

      // =========================
      // ADD REQUEST
      // =========================

      else {
        await addRequest(newRequest);

        setRequests((currentRequests) => [
          ...currentRequests,
          newRequest,
        ]);

        alert(
          `Request Added Successfully! ID: ${generatedRequestId}`
        );
      }

      resetForm();
    } catch (err) {
      console.error(
        "Failed to save request:",
        err
      );

      alert(
        "Failed to save request. Please try again."
      );
    }
  };

  // =========================
  // RESET FORM
  // =========================

  const resetForm = () => {
    setCitizenName("");
    setRequestType("");
    setDepartment("");
    setStatus("");
    setDescription("");
    setEditId(null);
  };

  // =========================
  // SEARCH + FILTER
  // =========================

  const filteredRequests =
    requests.filter((request) => {
      const searchText =
        search.toLowerCase().trim();

      const matchesSearch =
        request.requestId
          .toLowerCase()
          .includes(searchText) ||
        request.citizenName
          .toLowerCase()
          .includes(searchText) ||
        request.requestType
          .toLowerCase()
          .includes(searchText) ||
        request.department
          .toLowerCase()
          .includes(searchText) ||
        request.status
          .toLowerCase()
          .includes(searchText);

      const matchesDepartment =
        departmentFilter === "" ||
        request.department ===
          departmentFilter;

      const matchesStatus =
        statusFilter === "" ||
        request.status ===
          statusFilter;

      return (
        matchesSearch &&
        matchesDepartment &&
        matchesStatus
      );
    });

  // =========================
  // EDIT REQUEST
  // =========================

  const editRequest = (id: string) => {
    const request = requests.find(
      (item) => item.id === id
    );

    if (!request) return;

    setCitizenName(
      request.citizenName
    );

    setRequestType(
      request.requestType
    );

    setDepartment(
      request.department
    );

    setStatus(
      request.status
    );

    setDescription(
      request.description
    );

    setEditId(id);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // =========================
  // DELETE REQUEST
  // =========================

  const deleteRequest = async (
    id: string
  ) => {
    const request = requests.find(
      (item) => item.id === id
    );

    if (!request) return;

    const confirmed =
      window.confirm(
        `Are you sure you want to delete ${request.requestId}?`
      );

    if (!confirmed) return;

    try {
      await deleteRequestFromService(id);

      setRequests((currentRequests) =>
        currentRequests.filter(
          (item) => item.id !== id
        )
      );

      if (editId === id) {
        resetForm();
      }

      alert(
        "Request deleted successfully."
      );
    } catch (err) {
      console.error(
        "Failed to delete request:",
        err
      );

      alert(
        "Failed to delete request. Please try again."
      );
    }
  };

  // =========================
  // CLEAR FILTERS
  // =========================

  const clearFilters = () => {
    setSearch("");
    setDepartmentFilter("");
    setStatusFilter("");
  };

  // =========================
  // LOADING UI
  // =========================

  if (loading) {
    return (
      <div className="p-6">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">

          <div className="flex items-center gap-3 mb-6">

            <RefreshCw
              size={22}
              className="animate-spin text-blue-600"
            />

            <div>
              <h1 className="text-2xl font-bold text-slate-800">
                Loading Requests
              </h1>

              <p className="text-gray-500 text-sm mt-1">
                Fetching request data...
              </p>
            </div>

          </div>

          <div className="space-y-3 animate-pulse">
            <div className="h-12 bg-gray-200 rounded-lg" />
            <div className="h-12 bg-gray-200 rounded-lg" />
            <div className="h-12 bg-gray-200 rounded-lg" />
            <div className="h-12 bg-gray-200 rounded-lg" />
          </div>

        </div>
      </div>
    );
  }

  // =========================
  // ERROR UI
  // =========================

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center">

          <div className="text-red-600 text-4xl mb-3">
            !
          </div>

          <h1 className="text-xl font-bold text-red-800">
            Unable to Load Requests
          </h1>

          <p className="text-red-600 mt-2">
            {error}
          </p>

          <button
            type="button"
            onClick={() => {
              void loadRequests();
            }}
            className="mt-5 inline-flex items-center gap-2 bg-red-600 text-white px-5 py-2.5 rounded-lg hover:bg-red-700 transition"
          >
            <RefreshCw size={17} />
            Retry
          </button>

        </div>
      </div>
    );
  }

  // =========================
  // MAIN UI
  // =========================

  return (
    <div className="p-6 space-y-8">

      {/* =========================================
          REQUEST FORM
      ========================================= */}

      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">

        <div className="flex items-center justify-between mb-6">

          <div>
            <h1 className="text-3xl font-bold text-slate-800">
              Request Management
            </h1>

            <p className="text-gray-500 mt-1">
              Create and manage citizen service requests.
            </p>
          </div>

          {editId !== null && (
            <button
              type="button"
              onClick={resetForm}
              className="flex items-center gap-2 text-sm text-gray-500 hover:text-red-600"
            >
              <X size={18} />
              Cancel Edit
            </button>
          )}

        </div>

        {/* FORM */}

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          <input
            type="text"
            placeholder="Citizen Name"
            value={citizenName}
            onChange={(e) =>
              setCitizenName(
                e.target.value
              )
            }
            className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
          />

          <select
            value={requestType}
            onChange={(e) =>
              setRequestType(
                e.target.value
              )
            }
            className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
          >

            <option value="">
              Select Request Type
            </option>

            <option value="Birth Certificate">
              Birth Certificate
            </option>

            <option value="Death Certificate">
              Death Certificate
            </option>

            <option value="Income Certificate">
              Income Certificate
            </option>

            <option value="Residence Certificate">
              Residence Certificate
            </option>

            <option value="Caste Certificate">
              Caste Certificate
            </option>

            <option value="Property Tax">
              Property Tax
            </option>

            <option value="Water Connection">
              Water Connection
            </option>

            <option value="Other">
              Other
            </option>

          </select>

          <select
            value={department}
            onChange={(e) =>
              setDepartment(
                e.target.value
              )
            }
            className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
          >

            <option value="">
              Select Department
            </option>

            <option value="Revenue">
              Revenue
            </option>

            <option value="Health">
              Health
            </option>

            <option value="Education">
              Education
            </option>

            <option value="Transport">
              Transport
            </option>

            <option value="Police">
              Police
            </option>

            <option value="Municipal">
              Municipal
            </option>

            <option value="Water Supply">
              Water Supply
            </option>

          </select>

          <select
            value={status}
            onChange={(e) =>
              setStatus(
                e.target.value as
                  | RequestStatus
                  | ""
              )
            }
            className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
          >

            <option value="">
              Select Status
            </option>

            <option value="Pending">
              Pending
            </option>

            <option value="In Progress">
              In Progress
            </option>

            <option value="Approved">
              Approved
            </option>

            <option value="Rejected">
              Rejected
            </option>

          </select>

          <textarea
            placeholder="Request Description"
            value={description}
            onChange={(e) =>
              setDescription(
                e.target.value
              )
            }
            rows={4}
            className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-medium"
          >
            {editId !== null
              ? "Update Request"
              : "Save Request"}
          </button>

        </form>
      </div>

      {/* =========================================
          REQUESTS TABLE
      ========================================= */}

      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">

        {/* HEADER */}

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-5">

          <div>
            <h2 className="text-2xl font-bold text-slate-800">
              Requests List
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              {filteredRequests.length} request(s) found
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              void loadRequests();
            }}
            className="inline-flex items-center justify-center gap-2 border border-gray-300 px-4 py-2 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition"
          >
            <RefreshCw size={16} />
            Refresh
          </button>

        </div>

        {/* SEARCH */}

        <div className="relative mb-4">

          <Search
            size={20}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search by ID, citizen, department..."
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            className="w-full border border-gray-300 rounded-lg py-3 pl-10 pr-4 outline-none focus:ring-2 focus:ring-blue-500"
          />

        </div>

        {/* FILTERS */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">

          <div className="relative">

            <Filter
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <select
              value={departmentFilter}
              onChange={(e) =>
                setDepartmentFilter(
                  e.target.value
                )
              }
              className="w-full border border-gray-300 rounded-lg p-3 pl-10 outline-none focus:ring-2 focus:ring-blue-500"
            >

              <option value="">
                All Departments
              </option>

              <option value="Revenue">
                Revenue
              </option>

              <option value="Health">
                Health
              </option>

              <option value="Education">
                Education
              </option>

              <option value="Transport">
                Transport
              </option>

              <option value="Police">
                Police
              </option>

              <option value="Municipal">
                Municipal
              </option>

              <option value="Water Supply">
                Water Supply
              </option>

            </select>

          </div>

          <div className="relative">

            <Filter
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(
                  e.target.value
                )
              }
              className="w-full border border-gray-300 rounded-lg p-3 pl-10 outline-none focus:ring-2 focus:ring-blue-500"
            >

              <option value="">
                All Status
              </option>

              <option value="Pending">
                Pending
              </option>

              <option value="In Progress">
                In Progress
              </option>

              <option value="Approved">
                Approved
              </option>

              <option value="Rejected">
                Rejected
              </option>

            </select>

          </div>

        </div>

        {/* CLEAR FILTERS */}

        {(search ||
          departmentFilter ||
          statusFilter) && (
          <button
            type="button"
            onClick={clearFilters}
            className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 mb-4"
          >
            <X size={16} />
            Clear Filters
          </button>
        )}

        {/* EMPTY STATE */}

        {filteredRequests.length === 0 ? (

          <div className="text-center py-12 border border-dashed border-gray-300 rounded-xl">

            <Search
              size={36}
              className="mx-auto text-gray-300 mb-3"
            />

            <h3 className="font-semibold text-gray-700">
              No Requests Found
            </h3>

            <p className="text-sm text-gray-500 mt-1">
              Try changing your search or filters.
            </p>

          </div>

        ) : (

          /* TABLE */

          <div className="overflow-x-auto">

            <table className="w-full border-collapse">

              <thead>

                <tr className="bg-slate-100">

                  <th className="border p-3 text-left">
                    Request ID
                  </th>

                  <th className="border p-3 text-left">
                    Citizen Name
                  </th>

                  <th className="border p-3 text-left">
                    Request Type
                  </th>

                  <th className="border p-3 text-left">
                    Department
                  </th>

                  <th className="border p-3 text-left">
                    Status
                  </th>

                  <th className="border p-3 text-left">
                    Description
                  </th>

                  <th className="border p-3 text-center">
                    Actions
                  </th>

                </tr>

              </thead>

              <tbody>

                {filteredRequests.map(
                  (request) => (

                    <tr
                      key={request.id}
                      className="hover:bg-slate-50 transition"
                    >

                      <td className="border p-3 font-semibold text-blue-600">
                        {request.requestId}
                      </td>

                      <td className="border p-3">
                        {request.citizenName}
                      </td>

                      <td className="border p-3">
                        {request.requestType}
                      </td>

                      <td className="border p-3">
                        {request.department}
                      </td>

                      <td className="border p-3">

                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            request.status ===
                            "Approved"
                              ? "bg-green-100 text-green-700"
                              : request.status ===
                                "Rejected"
                              ? "bg-red-100 text-red-700"
                              : request.status ===
                                "In Progress"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {request.status}
                        </span>

                      </td>

                      <td className="border p-3 max-w-xs">

                        <p className="truncate">
                          {request.description}
                        </p>

                      </td>

                      <td className="border p-3">

                        <div className="flex items-center justify-center gap-2">

                          {/* VIEW */}

                          <button
                            type="button"
                            title="View Request"
                            aria-label="View Request"
                            onClick={() =>
                              navigate(
                                `/requests/${request.requestId}`
                              )
                            }
                            className="w-9 h-9 flex items-center justify-center rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-600 hover:text-white transition"
                          >
                            <Eye size={18} />
                          </button>

                          {/* EDIT */}

                          <button
                            type="button"
                            title="Edit Request"
                            aria-label="Edit Request"
                            onClick={() =>
                              editRequest(
                                request.id
                              )
                            }
                            className="w-9 h-9 flex items-center justify-center rounded-lg bg-yellow-100 text-yellow-600 hover:bg-yellow-500 hover:text-white transition"
                          >
                            <Pencil size={18} />
                          </button>

                          {/* DELETE */}

                          <button
                            type="button"
                            title="Delete Request"
                            aria-label="Delete Request"
                            onClick={() => {
                              void deleteRequest(
                                request.id
                              );
                            }}
                            className="w-9 h-9 flex items-center justify-center rounded-lg bg-red-100 text-red-600 hover:bg-red-500 hover:text-white transition"
                          >
                            <Trash2 size={18} />
                          </button>

                        </div>

                      </td>

                    </tr>
                  )
                )}

              </tbody>

            </table>

          </div>
        )}

      </div>
    </div>
  );
};

export default Requests;