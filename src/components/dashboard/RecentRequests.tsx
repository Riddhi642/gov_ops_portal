// Search मधून आलेला value घेण्यासाठी Props
type Props = {
  search: string;
};


// Dashboard वर दाखवण्यासाठी dummy recent requests
const requests = [
  {
    id: "REQ-101",
    citizen: "Rahul Sharma",
    department: "Revenue",
    status: "Pending",
  },
  {
    id: "REQ-102",
    citizen: "Priya Patil",
    department: "Health",
    status: "Approved",
  },
  {
    id: "REQ-103",
    citizen: "Amit Singh",
    department: "Transport",
    status: "In Progress",
  },
  {
    id: "REQ-104",
    citizen: "Sneha Kulkarni",
    department: "Education",
    status: "Pending",
  },
];


const RecentRequests = ({ search }: Props) => {

  // Search केलेल्या text नुसार requests filter करतो
  const filteredRequests = requests.filter((request) => {

    const searchText = search.toLowerCase();

    return (
      request.id.toLowerCase().includes(searchText) ||
      request.citizen.toLowerCase().includes(searchText) ||
      request.department.toLowerCase().includes(searchText) ||
      request.status.toLowerCase().includes(searchText)
    );
  });


  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6 mt-8">

      {/* Section Heading */}
      <h2 className="text-xl font-semibold text-slate-800 mb-4">
        Recent Requests
      </h2>


      {/* Responsive Table */}
      <div className="overflow-x-auto">

        <table className="w-full">

          {/* Table Header */}
          <thead>

            <tr className="border-b bg-slate-50">

              <th className="text-left py-3 px-3">
                Request ID
              </th>

              <th className="text-left py-3 px-3">
                Citizen
              </th>

              <th className="text-left py-3 px-3">
                Department
              </th>

              <th className="text-left py-3 px-3">
                Status
              </th>

            </tr>

          </thead>


          {/* Table Body */}
          <tbody>

            {filteredRequests.length === 0 ? (

              // Search result नसेल तर message
              <tr>

                <td
                  colSpan={4}
                  className="text-center py-6 text-gray-500"
                >
                  No requests found
                </td>

              </tr>

            ) : (

              filteredRequests.map((request) => (

                <tr
                  key={request.id}
                  className="border-b hover:bg-slate-50 transition"
                >

                  {/* Request ID */}
                  <td className="py-3 px-3 font-medium text-blue-600">
                    {request.id}
                  </td>


                  {/* Citizen Name */}
                  <td className="py-3 px-3">
                    {request.citizen}
                  </td>


                  {/* Department */}
                  <td className="py-3 px-3">
                    {request.department}
                  </td>


                  {/* Status */}
                  <td className="py-3 px-3">

                    <span
                      className={
                        request.status === "Approved"
                          ? "bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium"
                          : request.status === "Pending"
                          ? "bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-medium"
                          : "bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium"
                      }
                    >
                      {request.status}
                    </span>

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
};


export default RecentRequests;