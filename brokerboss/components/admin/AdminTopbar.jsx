"use client";

import { Menu, Bell, ShieldCheck } from "lucide-react";

export default function AdminTopbar({ onMenuClick }) {
  return (
    <header className="lg:hidden sticky top-0 z-40 bg-card border-b border-border flex items-center gap-3 px-4 py-3">
      <button
        onClick={onMenuClick}
        className="p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
        aria-label="Open menu"
      >
        <Menu className="w-5 h-5" />
      </button>

      <div className="flex items-center gap-2">
        <div className="w-6 h-6 bg-amber-500 rounded-md flex items-center justify-center">
          <ShieldCheck className="w-3.5 h-3.5 text-white" />
        </div>
        <span className="text-sm font-bold text-foreground">BrokerBoss Admin</span>
      </div>

      <div className="ml-auto">
        <button className="p-2 rounded-lg hover:bg-muted text-muted-foreground transition-colors relative">
          <Bell className="w-4.5 h-4.5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-amber-500 rounded-full" />
        </button>
      </div>
    </header>
  );
}
