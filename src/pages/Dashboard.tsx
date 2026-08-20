import { useCallback, useEffect, useState } from "react";
import KpiCards from "../components/dashboard/KPICard";
import RecentRequests from "../components/dashboard/RecentRequests";
import { Link } from "react-router-dom";

import {
  getDashboardData,
  getRequests,
  type DashboardData,
  type RequestData,
} from "../services/api";

const Dashboard = () => {
  // =========================
  // SEARCH STATE
  // =========================

  const [search, setSearch] = useState("");

  // =========================
  // API DATA STATES
  // =========================

  const [dashboardData, setDashboardData] =
    useState<DashboardData | null>(null);

  const [requests, setRequests] =
    useState<RequestData[]>([]);

  // =========================
  // UI STATES
  // =========================

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  // =========================
  // LOAD DASHBOARD DATA
  // =========================

  const loadDashboardData = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const [dashboardResult, requestsResult] =
        await Promise.all([
          getDashboardData(),
          getRequests(),
        ]);

      setDashboardData(dashboardResult);
      setRequests(requestsResult);
    } catch (err) {
      console.error(
        "Dashboard data loading failed:",
        err
      );

      setError(
        "Unable to load dashboard data. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  // =========================
  // LOAD DATA ON PAGE OPEN
  // =========================

  useEffect(() => {
    const load = async () => {
      await loadDashboardData();
    };

    load();
  }, [loadDashboardData]);

  // =========================
  // LOADING STATE
  // =========================

  if (loading) {
    return (
      <div className="space-y-8">

        {/* Dashboard Header */}

        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            Government Operations Dashboard
          </h1>

          <p className="text-gray-500 mt-1">
            Loading dashboard data...
          </p>
        </div>

        {/* Loading Card */}

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-10 text-center">
          <p className="text-gray-500">
            Loading data, please wait...
          </p>
        </div>

      </div>
    );
  }

  // =========================
  // ERROR STATE
  // =========================

  if (error) {
    return (
      <div className="space-y-8">

        {/* Dashboard Header */}

        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            Government Operations Dashboard
          </h1>

          <p className="text-gray-500 mt-1">
            Monitor citizens, projects, requests and
            officers from one central dashboard.
          </p>
        </div>

        {/* Error Card */}

        <div className="bg-white rounded-xl shadow-sm border border-red-200 p-10 text-center">

          <h2 className="text-xl font-semibold text-red-600">
            Unable to Load Dashboard
          </h2>

          <p className="text-gray-500 mt-2">
            {error}
          </p>

          <button
            type="button"
            onClick={loadDashboardData}
            className="mt-5 bg-blue-600 text-white px-5 py-2.5 rounded-lg hover:bg-blue-700 transition"
          >
            Retry
          </button>

        </div>

      </div>
    );
  }

  // =========================
  // EMPTY STATE
  // =========================

  if (!dashboardData) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-10 text-center">

        <h2 className="text-xl font-semibold text-slate-800">
          No Dashboard Data
        </h2>

        <p className="text-gray-500 mt-2">
          Dashboard data is currently unavailable.
        </p>

        <button
          type="button"
          onClick={loadDashboardData}
          className="mt-5 bg-blue-600 text-white px-5 py-2.5 rounded-lg hover:bg-blue-700 transition"
        >
          Retry
        </button>

      </div>
    );
  }

  // =========================
  // MAIN DASHBOARD
  // =========================

  return (
    <div className="space-y-8">

      {/* =========================
          DASHBOARD HEADER
      ========================= */}

      <div>
        <h1 className="text-3xl font-bold text-slate-800">
          Government Operations Dashboard
        </h1>

        <p className="text-gray-500 mt-1">
          Monitor citizens, projects, requests and
          officers from one central dashboard.
        </p>
      </div>

      {/* =========================
          KPI CARDS
      ========================= */}

      <KpiCards data={dashboardData} />

      {/* =========================
          QUICK OVERVIEW
      ========================= */}

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

          {/* Section Title */}

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

      {/* =========================
          RECENT REQUESTS
      ========================= */}

      <RecentRequests
        search={search}
        requests={requests}
      />

      {/* =========================
          QUICK ACTIONS
      ========================= */}

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">

        <h2 className="text-xl font-semibold text-slate-800 mb-4">
          Quick Actions
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

          {/* Add Citizen */}

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

          {/* Add Project */}

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

          {/* Add Request */}

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

          {/* Add Officer */}

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