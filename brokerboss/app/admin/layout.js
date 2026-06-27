"use client";

import { useState } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminTopbar from "@/components/admin/AdminTopbar";

export default function AdminLayout({ children }) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="admin-theme min-h-screen bg-background flex">
      {/* Sidebar (desktop sticky / mobile drawer) */}
      <AdminSidebar open={drawerOpen} onClose={() => setDrawerOpen(false)} />

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile topbar */}
        <AdminTopbar onMenuClick={() => setDrawerOpen(true)} />

        {/* Page content */}
        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
