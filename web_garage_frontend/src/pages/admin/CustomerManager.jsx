import React, { useState, useEffect } from "react";
import axios from "axios";

export default function CustomerManager() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/web_garage/customers")
      .then(res => setCustomers(res.data.content || res.data));
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Quản Lý Khách Hàng</h1>
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-purple-600 text-white">
            <tr>
              <th className="px-6 py-4 text-left">Mã KH</th>
              <th className="px-6 py-4 text-left">Họ tên</th>
              <th className="px-6 py-4 text-left">SĐT</th>
              <th className="px-6 py-4 text-left">Email</th>
              <th className="px-6 py-4 text-left">Số xe</th>
            </tr>
          </thead>
          <tbody>
            {customers.map(c => (
              <tr key={c.maKH} className="hover:bg-gray-50 border-b">
                <td className="px-6 py-4 font-bold text-purple-700">{c.maKH}</td>
                <td className="px-6 py-4">{c.hoTen}</td>
                <td className="px-6 py-4">{c.sdt}</td>
                <td className="px-6 py-4">{c.email}</td>
                <td className="px-6 py-4 text-center">{c.xeList?.length || 0}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}