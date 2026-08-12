import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Eye,
  Pencil,
  Trash2,
  Search,
  Filter,
  X,
} from "lucide-react";

// =========================
// REQUEST DATA TYPE
// =========================

type RequestData = {
  id: number;
  requestId: string;
  citizenName: string;
  requestType: string;
  department: string;
  status: string;
  description: string;
};

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
  const [status, setStatus] = useState("");
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
  // REQUESTS LIST
  // =========================

  const [requests, setRequests] = useState<RequestData[]>([]);

  // =========================
  // EDIT STATE
  // =========================

  const [editId, setEditId] = useState<number | null>(null);

  // =========================
  // LOAD SESSION DATA
  // =========================

  useEffect(() => {
    const savedRequests = sessionStorage.getItem(
      "government_requests"
    );

    if (savedRequests) {
      try {
        setRequests(JSON.parse(savedRequests));
      } catch {
        sessionStorage.removeItem("government_requests");
      }
    }
  }, []);

  // =========================
  // SAVE REQUESTS
  // =========================

  const saveRequests = (data: RequestData[]) => {
    sessionStorage.setItem(
      "government_requests",
      JSON.stringify(data)
    );
  };

  // =========================
  // FORM SUBMIT
  // =========================

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
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

    const isEditing = editId !== null;

    // =========================
    // GENERATE REQUEST ID
    // =========================

    let generatedRequestId = "";

    if (isEditing) {
      const existingRequest = requests.find(
        (request) => request.id === editId
      );

      generatedRequestId =
        existingRequest?.requestId || "";
    } else {
      generatedRequestId = `REQ-${String(
        requests.length + 1
      ).padStart(3, "0")}`;
    }

    // =========================
    // NEW REQUEST OBJECT
    // =========================

    const newRequest: RequestData = {
      id: editId ?? Date.now(),
      requestId: generatedRequestId,
      citizenName: citizenName.trim(),
      requestType,
      department,
      status,
      description: description.trim(),
    };

    // =========================
    // UPDATE REQUEST
    // =========================

    if (isEditing) {
      const updatedRequests = requests.map(
        (request) =>
          request.id === editId
            ? newRequest
            : request
      );

      setRequests(updatedRequests);
      saveRequests(updatedRequests);

      alert("Request Updated Successfully!");
    }

    // =========================
    // ADD REQUEST
    // =========================

    else {
      const updatedRequests = [
        ...requests,
        newRequest,
      ];

      setRequests(updatedRequests);
      saveRequests(updatedRequests);

      alert(
        `Request Added Successfully! ID: ${generatedRequestId}`
      );
    }

    // =========================
    // RESET FORM
    // =========================

    resetForm();
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

  const filteredRequests = requests.filter(
    (request) => {
      const searchText = search.toLowerCase();

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
        request.department === departmentFilter;

      const matchesStatus =
        statusFilter === "" ||
        request.status === statusFilter;

      return (
        matchesSearch &&
        matchesDepartment &&
        matchesStatus
      );
    }
  );

  // =========================
  // EDIT REQUEST
  // =========================

  const editRequest = (id: number) => {
    const request = requests.find(
      (item) => item.id === id
    );

    if (!request) return;

    setCitizenName(request.citizenName);
    setRequestType(request.requestType);
    setDepartment(request.department);
    setStatus(request.status);
    setDescription(request.description);
    setEditId(id);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // =========================
  // DELETE REQUEST
  // =========================

  const deleteRequest = (id: number) => {
    const request = requests.find(
      (item) => item.id === id
    );

    if (!request) return;

    const confirmed = window.confirm(
      `Are you sure you want to delete ${request.requestId}?`
    );

    if (!confirmed) return;

    const updatedRequests = requests.filter(
      (request) => request.id !== id
    );

    setRequests(updatedRequests);
    saveRequests(updatedRequests);

    if (editId === id) {
      resetForm();
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
  // UI
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

          {/* Citizen Name */}

          <input
            type="text"
            placeholder="Citizen Name"
            value={citizenName}
            onChange={(e) =>
              setCitizenName(e.target.value)
            }
            className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Request Type */}

          <select
            value={requestType}
            onChange={(e) =>
              setRequestType(e.target.value)
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

          {/* Department */}

          <select
            value={department}
            onChange={(e) =>
              setDepartment(e.target.value)
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

          {/* Status */}

          <select
            value={status}
            onChange={(e) =>
              setStatus(e.target.value)
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

          {/* Description */}

          <textarea
            placeholder="Request Description"
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
            rows={4}
            className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Submit Button */}

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

        {/* Header */}

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-5">

          <div>
            <h2 className="text-2xl font-bold text-slate-800">
              Requests List
            </h2>

            <p className="text-sm text-gray-500">
              {filteredRequests.length} request(s) found
            </p>
          </div>

        </div>

        {/* =========================================
            SEARCH
        ========================================= */}

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
              setSearch(e.target.value)
            }
            className="w-full border border-gray-300 rounded-lg py-3 pl-10 pr-4 outline-none focus:ring-2 focus:ring-blue-500"
          />

        </div>

        {/* =========================================
            FILTERS
        ========================================= */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">

          {/* Department Filter */}

          <div className="relative">

            <Filter
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <select
              value={departmentFilter}
              onChange={(e) =>
                setDepartmentFilter(e.target.value)
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

          {/* Status Filter */}

          <div className="relative">

            <Filter
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value)
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

        {/* Clear Filters */}

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

        {/* =========================================
            TABLE
        ========================================= */}

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

              {filteredRequests.length === 0 ? (

                <tr>

                  <td
                    colSpan={7}
                    className="text-center p-10 text-gray-500"
                  >
                    No Requests Found
                  </td>

                </tr>

              ) : (

                filteredRequests.map(
                  (request) => (

                    <tr
                      key={request.id}
                      className="hover:bg-slate-50 transition"
                    >

                      {/* Request ID */}

                      <td className="border p-3 font-semibold text-blue-600">
                        {request.requestId}
                      </td>

                      {/* Citizen */}

                      <td className="border p-3">
                        {request.citizenName}
                      </td>

                      {/* Request Type */}

                      <td className="border p-3">
                        {request.requestType}
                      </td>

                      {/* Department */}

                      <td className="border p-3">
                        {request.department}
                      </td>

                      {/* Status */}

                      <td className="border p-3">

                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            request.status === "Approved"
                              ? "bg-green-100 text-green-700"
                              : request.status === "Rejected"
                              ? "bg-red-100 text-red-700"
                              : request.status === "In Progress"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {request.status}
                        </span>

                      </td>

                      {/* Description */}

                      <td className="border p-3 max-w-xs">
                        <p className="truncate">
                          {request.description}
                        </p>
                      </td>

                      {/* ACTION ICONS */}

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
                              editRequest(request.id)
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
                            onClick={() =>
                              deleteRequest(request.id)
                            }
                            className="w-9 h-9 flex items-center justify-center rounded-lg bg-red-100 text-red-600 hover:bg-red-500 hover:text-white transition"
                          >
                            <Trash2 size={18} />
                          </button>

                        </div>

                      </td>

                    </tr>

                  )
                )

              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
};

export default Requests;