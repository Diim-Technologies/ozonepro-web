import React from "react";
import DashboardLayout from "../../components/DashboardLayout";
import ProfilePage from "../../features/Profile";

export default function Profile() {
  return (
    <DashboardLayout>
      <ProfilePage />
    </DashboardLayout>
  );
}
