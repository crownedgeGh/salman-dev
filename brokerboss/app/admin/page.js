import DashboardClient from "@/components/admin/DashboardClient";

export const metadata = {
  title: "Dashboard — BrokerBoss Admin",
  description: "Overview of users, properties, ads and revenue on BrokerBoss.",
};

export default function AdminDashboardPage() {
  return <DashboardClient />;
}
