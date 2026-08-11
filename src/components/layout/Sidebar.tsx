import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-64 bg-slate-900 text-white min-h-screen p-5">

      <h1 className="text-2xl font-bold mb-8">
        GOV Portal
      </h1>

      <nav className="flex flex-col gap-4">

        <Link to="/dashboard">Dashboard</Link>

        <Link to="/citizens">Citizens</Link>

        <Link to="/projects">Projects</Link>

        <Link to="/requests">Requests</Link>

        <Link to="/officers">Officers</Link>

        <Link to="/profile">Profile</Link>

        <Link to="/settings">Settings</Link>

      </nav>

    </div>
  );
};

export default Sidebar;