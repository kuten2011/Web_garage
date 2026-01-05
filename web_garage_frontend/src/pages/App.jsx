// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

import GarageWebsite from "./GarageWebsite";
import AdminLayout from "./admin/AdminLayout";
import AdminLogin from "./security/Login";

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

import Services from "./customer/Services";
import Parts from "./customer/Parts";

// Component bảo vệ route admin
function ProtectedAdminRoute({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  if (isAuthenticated === null) {
    return <div className="min-h-screen flex items-center justify-center text-2xl">Đang kiểm tra đăng nhập...</div>;
  }

  return isAuthenticated ? children : <Navigate to="/admin/login" replace />;
}

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Trang khách hàng */}
        <Route path="/*" element={<GarageWebsite />} />

        {/* Payment Routes */}
        <Route path="/payment/success" element={<PaymentSuccess />} />
        <Route path="/payment/failed" element={<PaymentFailed />} />

        {/* Customer services */}
        <Route path="/services" element={<Services />} />
        <Route path="/parts" element={<Parts />} />

        {/* ĐĂNG NHẬP ADMIN – TRUY CẬP TRỰC TIẾP ĐƯỢC */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* TOÀN BỘ ADMIN – BẢO VỆ BẰNG TOKEN */}
        <Route
          path="/admin"
          element={
            <ProtectedAdminRoute>
              <AdminLayout />
            </ProtectedAdminRoute>
          }
        >
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

        {/* Redirect nếu vào /admin mà chưa login */}
        <Route path="/admin" element={<Navigate to="/admin/login" replace />} />
      </Routes>
    </Router>
  );
}