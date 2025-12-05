import React, { useState, useEffect } from "react";
import axios from "axios";

export default function EmployeeManager() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/web_garage/employees")
      .then(res => setEmployees(res.data.content || res.data));
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Quản Lý Nhân Viên</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {employees.map(emp => (
          <div key={emp.maNV} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center text-2xl font-bold text-indigo-700">
                {emp.hoTen.charAt(0)}
              </div>
              <div>
                <h3 className="text-xl font-bold">{emp.hoTen}</h3>
                <p className="text-gray-600">{emp.vaiTro}</p>
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <p><strong>SDT:</strong> {emp.sdt}</p>
              <p><strong>Email:</strong> {emp.email}</p>
              <p><strong>Chi nhánh:</strong> {emp.chiNhanh?.tenChiNhanh || "-"}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}