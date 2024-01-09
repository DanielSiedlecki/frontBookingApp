import DashboardNavBar from "./dashboardNavBar";
import DashboardEvents from "./dashboardEvents";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DashboardSettings from "./dashboardSettings";

function DashboardSection() {
  return (
    <div className="w-screen h-screen">
      <DashboardNavBar />
      <Routes>
        <Route path="/events/*" element={<DashboardEvents />} />
        <Route path="/settings/*" element={<DashboardSettings />} />
      </Routes>
    </div>
  );
}
export default DashboardSection;
