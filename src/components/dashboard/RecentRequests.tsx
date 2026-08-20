import { useMemo } from "react";
import type { RequestData } from "../../services/api";

type Props = {
  search: string;
  requests: RequestData[];
};

const RecentRequests = ({ search, requests }: Props) => {
  // ================================
  // SEARCH FILTER
  // ================================

  const filteredRequests = useMemo(() => {
    const searchText = search.toLowerCase().trim();

    if (!searchText) {
      return requests;
    }

    return requests.filter((request) => {
      return (
        request.id.toLowerCase().includes(searchText) ||
        request.citizenName.toLowerCase().includes(searchText) ||
        request.department.toLowerCase().includes(searchText) ||
        request.status.toLowerCase().includes(searchText) ||
        request.requestType.toLowerCase().includes(searchText)
      );
    });
  }, [search, requests]);

  // ================================
  // MAIN UI
  // ================================

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6 mt-8">

      {/* HEADER */}

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-5">

        <div>
          <h2 className="text-xl font-semibold text-slate-800">
            Recent Requests
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Latest citizen service requests
          </p>
        </div>

        <div className="text-sm text-gray-500">
          {filteredRequests.length} request(s)
        </div>

      </div>

      {/* EMPTY STATE */}

      {filteredRequests.length === 0 ? (

        <div className="text-center py-10 border border-dashed border-gray-300 rounded-xl">

          <div className="text-4xl mb-3">
            📋
          </div>

          <p className="font-medium text-gray-700">
            No requests found
          </p>

          <p className="text-sm text-gray-500 mt-1">
            There are no requests matching your search.
          </p>

        </div>

      ) : (

        /* TABLE */

        <div className="overflow-x-auto">

          <table className="w-full">

            {/* TABLE HEADER */}

            <thead>

              <tr className="border-b bg-slate-50">

                <th className="text-left py-3 px-3 text-sm font-semibold text-slate-700">
                  Request ID
                </th>

                <th className="text-left py-3 px-3 text-sm font-semibold text-slate-700">
                  Citizen
                </th>

                <th className="text-left py-3 px-3 text-sm font-semibold text-slate-700">
                  Request Type
                </th>

                <th className="text-left py-3 px-3 text-sm font-semibold text-slate-700">
                  Department
                </th>

                <th className="text-left py-3 px-3 text-sm font-semibold text-slate-700">
                  Status
                </th>

              </tr>

            </thead>

            {/* TABLE BODY */}

            <tbody>

              {filteredRequests.map((request) => (

                <tr
                  key={request.id}
                  className="border-b last:border-b-0 hover:bg-slate-50 transition"
                >

                  {/* REQUEST ID */}

                  <td className="py-3 px-3">

                    <span className="font-semibold text-blue-600">
                      {request.id}
                    </span>

                  </td>

                  {/* CITIZEN */}

                  <td className="py-3 px-3 text-gray-700">
                    {request.citizenName}
                  </td>

                  {/* REQUEST TYPE */}

                  <td className="py-3 px-3 text-gray-700">
                    {request.requestType}
                  </td>

                  {/* DEPARTMENT */}

                  <td className="py-3 px-3 text-gray-700">
                    {request.department}
                  </td>

                  {/* STATUS */}

                  <td className="py-3 px-3">

                    <span
                      className={
                        request.status === "Approved"
                          ? "bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold"
                          : request.status === "Rejected"
                          ? "bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-semibold"
                          : request.status === "In Progress"
                          ? "bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold"
                          : "bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-semibold"
                      }
                    >
                      {request.status}
                    </span>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      )}

    </div>
  );
};

export default RecentRequests;