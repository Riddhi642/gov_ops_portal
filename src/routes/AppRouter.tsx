import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Citizen from "../pages/Citizen";
import Projects from '../pages/Projects' ;
import Requests from "../pages/Requests";
import Officers  from '../pages/Officers';
import DashboardLayout from "../layouts/DashboardLayout";
import Profile from "../pages/Profile";
import Settings from "../pages/Settings";
import RequestDetails from "../pages/RequestDetails";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>

        {/* Login Page */}
        <Route path="/" element={<Login />} />

        {/* Dashboard Layout */}
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/citizens" element={<Citizen />} />
          <Route path="/projects" element={<Projects/>}/>
          <Route path="/requests" element={<Requests/>} />
          <Route path="/requests/:id" element={<RequestDetails />} />
          <Route path="/officers" element={<Officers/>} />
          <Route path="/profile" element={ <Profile/>}  />
          <Route path="/settings" element={<Settings/>} />

        </Route>

      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;