import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GarageWebsite from "./GarageWebsite";
import AdminLayout from "./admin/AdminLayout";
import AdminDashboard from "./admin/AdminDashboard";
import BookingManager from "./admin/BookingManager";

import RepairManager from "./admin/RepairManager";
import RepairDetail from "./admin/RepairDetail";  

import PartManager from "./admin/PartManager";
import ServiceManager from "./admin/ServiceManager";
import EmployeeManager from "./admin/EmployeeManager";
import CustomerManager from "./admin/CustomerManager";
import VehicleManager from "./admin/VehicleManager";
import ReportManager from "./admin/ReportManager";
import BranchManager from "./admin/BranchManager";
import FeedbackManager from "./admin/FeedbackManager";

import PaymentSuccess from "./payment/PaymentSuccess";
import PaymentFailed from "./payment/PaymentFailed";


import Services from "./customer/Services.jsx"
import ChatbotComponent from "../components/chatbot/ChatbotComponent";


export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<GarageWebsite />} />

        {/* Payment Routes */}
        <Route path="/payment/success" element={<PaymentSuccess />} />
        <Route path="/payment/failed" element={<PaymentFailed />} />

        <Route path="/services" element={<Services />} />

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />

          <Route path="bookings" element={<BookingManager />} />

          <Route path="repairs" element={<RepairManager />} />

          <Route path="repairParts/:maPhieu" element={<RepairDetail />} />

          <Route path="parts" element={<PartManager />} />
          <Route path="services" element={<ServiceManager />} />
          <Route path="employees" element={<EmployeeManager />} />
          <Route path="staff" element={<CustomerManager />} />
          <Route path="vehicles" element={<VehicleManager />} />
          <Route path="branches" element={<BranchManager />} />
          <Route path="feedbacks" element={<FeedbackManager />} />
          <Route path="reports" element={<ReportManager />} />
        </Route>
      </Routes>
    </Router>
  );
}