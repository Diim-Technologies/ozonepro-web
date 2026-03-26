import React from "react";
import AdminOverview from "../../features/Admin/AdminOverview";
import DashboardLayout from "../../components/DashboardLayout";
import AdminGuard from "../../components/AdminGuard";

export default function AdminDashboard() {
  return (
    <AdminGuard>
      <DashboardLayout>
        <AdminOverview />
      </DashboardLayout>
    </AdminGuard>
  );
}
