import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GarageWebsite from "./GarageWebsite";
import AdminLayout from "./admin/AdminLayout";
import AdminDashboard from "./admin/AdminDashboard";
import BookingManager from "./admin/BookingManager";

import RepairManager from "./admin/RepairManager";
import PartManager from "./admin/PartManager";
import EmployeeManager from "./admin/EmployeeManager";
import CustomerManager from "./admin/CustomerManager";
import VehicleManager from "./admin/VehicleManager";
import ReportManager from "./admin/ReportManager";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<GarageWebsite />} />

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="bookings" element={<BookingManager />} />
          <Route path="repairs" element={<RepairManager />} />
          <Route path="parts" element={<PartManager />} />
          <Route path="employees" element={<EmployeeManager />} />
          <Route path="customers" element={<CustomerManager />} />
          <Route path="vehicles" element={<VehicleManager />} />
          <Route path="reports" element={<ReportManager />} />
        </Route>
      </Routes>
    </Router>
  );
}