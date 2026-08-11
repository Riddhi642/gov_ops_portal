import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// प्रत्येक Request चा Data Type
type RequestData = {
  // प्रत्येक Request साठी unique ID
  id: number;

  // Request ID automatically generate होईल
  requestId: string;

  citizenName: string;
  requestType: string;
  department: string;
  status: string;
  description: string;
};

const Requests = () => {
    const navigate = useNavigate();
  // Form States
  const [citizenName, setCitizenName] = useState("");
  const [requestType, setRequestType] = useState("");
  const [department, setDepartment] = useState("");
  const [status, setStatus] = useState("");
  const [description, setDescription] = useState("");

  // Search State
  const [search, setSearch] = useState("");

  // 🆕 Department Filter
const [departmentFilter, setDepartmentFilter] = useState("");

// 🆕 Status Filter
const [statusFilter, setStatusFilter] = useState("");

  // Requests List
  const [requests, setRequests] = useState<RequestData[]>([]);
  
  // 🆕 Page refresh झाल्यावर sessionStorage मधून Requests load करतो
  useEffect(() => {
    const savedRequests = sessionStorage.getItem(
      "government_requests"
    );

    if (savedRequests) {
      setRequests(JSON.parse(savedRequests));
    }
  }, []);

  // Requests browser मध्ये save करण्यासाठी
    const saveRequests = (data: RequestData[]) => {
      sessionStorage.setItem(
        "government_requests",
        JSON.stringify(data)
      );
    };

  // कोणता Request Edit करत आहोत
  const [editId, setEditId] = useState<number | null>(null);


  // Form Submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (
      !citizenName ||
      !requestType ||
      !department ||
      !status ||
      !description
    ) {
      alert("Please fill all fields");
      return;
    }


    // Add किंवा Update check
    const isEditing = editId !== null;


    // जर Edit असेल तर जुनी Request ID ठेवतो
    let generatedRequestId = "";

    if (isEditing) {

      const existingRequest = requests.find(
        (request) => request.id === editId
      );

      generatedRequestId =
        existingRequest?.requestId || "";

    } else {

      // NEW: Automatic Request ID
      generatedRequestId =
        `REQ-${String(requests.length + 1).padStart(3, "0")}`;
    }


    // New / Updated Request
    const newRequest: RequestData = {
      id: editId ?? Date.now(),

      requestId: generatedRequestId,

      citizenName,
      requestType,
      department,
      status,
      description,
    };


    // Edit Mode
    if (isEditing) {

      const updatedRequests = requests.map(
        (request) =>
          request.id === editId
            ? newRequest
            : request
      );

      setRequests(updatedRequests);

       // 🆕 Updated data browser session मध्ये save करतो
       saveRequests(updatedRequests);

      // Edit Mode बंद
      setEditId(null);

        } else {

        // New Request Add
        const updatedRequests = [
          ...requests,
          newRequest,
        ];

        setRequests(updatedRequests);

        // Request browser session मध्ये save करतो
        saveRequests(updatedRequests);
      }


    // Form Reset
    setCitizenName("");
    setRequestType("");
    setDepartment("");
    setStatus("");
    setDescription("");


    // Success Message
    alert(
      isEditing
        ? "Request Updated Successfully!"
        : `Request Added Successfully! ID: ${generatedRequestId}`
    );
  };

// 🔍 Search + Department + Status Filter
const filteredRequests = requests.filter(
  (request) => {

    // Search match
    const matchesSearch =
      request.citizenName
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      request.requestType
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      request.department
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      request.requestId
        .toLowerCase()
        .includes(search.toLowerCase());

    // Department filter match
    const matchesDepartment =
      departmentFilter === "" ||
      request.department === departmentFilter;

    // Status filter match
    const matchesStatus =
      statusFilter === "" ||
      request.status === statusFilter;

    // तिन्ही conditions true असतील तरच request दाखवायची
    return (
      matchesSearch &&
      matchesDepartment &&
      matchesStatus
    );
  }
);
  // Edit Request
  const editRequest = (id: number) => {

    const request = requests.find(
      (item) => item.id === id
    );

    if (!request) return;


    // Form मध्ये existing data भरतो
    setCitizenName(request.citizenName);
    setRequestType(request.requestType);
    setDepartment(request.department);
    setStatus(request.status);
    setDescription(request.description);

    // Edit Mode सुरू
    setEditId(id);
  };


  // Delete Request
  const deleteRequest = (id: number) => {

    const updatedRequests = requests.filter(
      (request) => request.id !== id
    );

    setRequests(updatedRequests);
    saveRequests(updatedRequests);
  };


  return (

    <div className="p-6">

      {/* Request Form Card */}
      <div className="bg-white rounded-xl shadow-lg p-6">

        <h1 className="text-3xl font-bold mb-6">
          Request Management
        </h1>
                {/* Request Form */}
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
            className="w-full border rounded-lg p-3"
          />


          {/* Request Type */}
          <select
            value={requestType}
            onChange={(e) =>
              setRequestType(e.target.value)
            }
            className="w-full border rounded-lg p-3"
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
            className="w-full border rounded-lg p-3"
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
            className="w-full border rounded-lg p-3"
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
            className="w-full border rounded-lg p-3"
          />


          {/* Save / Update Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
          >
            {editId !== null
              ? "Update Request"
              : "Save Request"}
          </button>

        </form>

      </div>

            {/* Requests Table */}
      <div className="bg-white rounded-xl shadow-lg p-6 mt-8">

        <h2 className="text-2xl font-bold mb-4">
          Requests List
        </h2>


        
        {/* 🔍 Search Box */}
        <input
          type="text"
          placeholder="Search Request..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="w-full border rounded-lg p-3 mb-4"
        />


        {/* 🆕 Filters Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">

          {/* Department Filter */}
          <select
            value={departmentFilter}
            onChange={(e) =>
              setDepartmentFilter(e.target.value)
            }
            className="w-full border rounded-lg p-3"
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


          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value)
            }
            className="w-full border rounded-lg p-3"
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

        {/* Table Responsive */}
        <div className="overflow-x-auto">

          <table className="w-full border-collapse">

            <thead>

              <tr className="bg-slate-100">

                <th className="border p-3">
                  Request ID
                </th>

                <th className="border p-3">
                  Citizen Name
                </th>

                <th className="border p-3">
                  Request Type
                </th>

                <th className="border p-3">
                  Department
                </th>

                <th className="border p-3">
                  Status
                </th>

                <th className="border p-3">
                  Description
                </th>

                <th className="border p-3">
                  Action
                </th>

              </tr>

            </thead>


            <tbody>

              {/* जर Request नसेल */}
              {filteredRequests.length === 0 ? (

                <tr>

                  <td
                    colSpan={7}
                    className="text-center p-5 text-gray-500"
                  >
                    No Requests Added
                  </td>

                </tr>

              ) : (

                filteredRequests.map(
                  (request) => (

                    <tr key={request.id}>

                      {/* Request ID */}
                      <td className="border p-3 font-medium">
                        {request.requestId}
                      </td>


                      {/* Citizen Name */}
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
                        {request.status}
                      </td>


                      {/* Description */}
                      <td className="border p-3 max-w-xs">
                        {request.description}
                      </td>


                      {/* Action */}
                      <td className="border p-3 whitespace-nowrap">
                          {/* View Details Button */}
                          <button
                            onClick={() =>
                              navigate(`/requests/${request.requestId}`)
                            }
                            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 mr-2"
                          >
                            View
                          </button>


                          {/* Edit */}
                          <button
                            onClick={() =>
                              editRequest(request.id)
                            }
                            className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 mr-2"
                          >
                            Edit
                          </button>


                          {/* Delete */}
                          <button
                            onClick={() =>
                              deleteRequest(request.id)
                            }
                            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                          >
                            Delete
</button>
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