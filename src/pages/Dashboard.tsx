import { useState } from "react";
import KpiCards from "../components/dashboard/KPICard";
import RecentRequests from "../components/dashboard/RecentRequests";
import { Link } from "react-router-dom";

const Dashboard = () => {

  // Search State
  const [search, setSearch] = useState("");

  return (

    <div className="space-y-8">

      {/* Dashboard Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-800">
          Government Operations Dashboard
        </h1>

        <p className="text-gray-500 mt-1">
          Monitor citizens, projects, requests and officers
          from one central dashboard.
        </p>
      </div>


      {/* KPI Cards */}
      <KpiCards />


      {/* Quick Overview */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

          <div>
            <h2 className="text-xl font-semibold text-slate-800">
              Recent Requests
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Search and monitor recent citizen requests.
            </p>
          </div>


          {/* Search */}
          <div className="w-full md:w-80">

            <input
              type="text"
              placeholder="Search requests..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />

          </div>

        </div>

      </div>


      {/* Recent Requests */}
      <RecentRequests search={search} />


      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">

        <h2 className="text-xl font-semibold text-slate-800 mb-4">
          Quick Actions
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

          <Link
            to="/citizens"
            className="border rounded-lg p-4 text-left hover:bg-slate-50 transition"
          >
            <p className="font-semibold text-slate-800">
              Add Citizen
            </p>

            <p className="text-sm text-gray-500 mt-1">
              Register a new citizen
            </p>
          </Link>
          <Link
            to="/projects"
            className="border rounded-lg p-4 text-left hover:bg-slate-50 transition"
          >
            <p className="font-semibold text-slate-800">
              Add Project
            </p>

            <p className="text-sm text-gray-500 mt-1">
              Create a new government project
            </p>
          </Link>

          <Link
            to="/requests"
            className="border rounded-lg p-4 text-left hover:bg-slate-50 transition"
          >
            <p className="font-semibold text-slate-800">
              Add Request
            </p>

            <p className="text-sm text-gray-500 mt-1">
              Create a citizen request
            </p>
          </Link>

          <Link
            to="/officers"
            className="border rounded-lg p-4 text-left hover:bg-slate-50 transition"
          >
            <p className="font-semibold text-slate-800">
              Add Officer
            </p>

            <p className="text-sm text-gray-500 mt-1">
              Register a new officer
            </p>
          </Link>
        </div>

      </div>

    </div>
  );
};

export default Dashboard;