import { Calendar, Wrench, Users, Package } from "lucide-react";

export default function AdminDashboard() {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {[
          { label: "Lịch hôm nay", value: "15", icon: Calendar, color: "bg-blue-600" },
          { label: "Đang sửa chữa", value: "8", icon: Wrench, color: "bg-orange-600" },
          { label: "Khách mới", value: "6", icon: Users, color: "bg-green-600" },
          { label: "Phụ tùng sắp hết", value: "4", icon: Package, color: "bg-red-600" },
        ].map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">{stat.label}</p>
                  <p className="text-4xl font-bold mt-2">{stat.value}</p>
                </div>
                <div className={`${stat.color} p-4 rounded-full text-white`}>
                  <Icon className="w-10 h-10" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-white rounded-2xl shadow-xl p-10 text-center">
        <h3 className="text-3xl font-bold text-indigo-700 mb-4">
          Chào mừng đến Hệ thống Quản trị Garage
        </h3>
        <p className="text-gray-600 text-lg">
          Quản lý toàn diện: lịch hẹn, sửa chữa, kho phụ tùng, nhân viên, khách hàng và báo cáo doanh thu.
        </p>
      </div>
    </div>
  );
}