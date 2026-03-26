import React from "react";
import TransactionsHistory from "../../features/Transactions";
import DashboardLayout from "../../components/DashboardLayout";

export default function History() {
  return (
    <DashboardLayout>
      <TransactionsHistory />
    </DashboardLayout>
  );
}
