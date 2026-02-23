import React from "react";
import DashboardPage from "../../features/Dashboard";
import DashboardLayout from "../../components/DashboardLayout";

export default function Dashboard() {
  return (
    <DashboardLayout>
      <DashboardPage />
    </DashboardLayout>
  );
}
