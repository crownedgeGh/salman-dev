"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Building2,
  Megaphone,
  X,
  ShieldCheck,
  LogOut,
} from "lucide-react";

const NAV_LINKS = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/users", label: "Users", icon: Users },
  { href: "/admin/properties", label: "Properties", icon: Building2 },
  { href: "/admin/ads", label: "Ads", icon: Megaphone },
];

export default function AdminSidebar({ open, onClose }) {
  const pathname = usePathname();

  const isActive = (link) =>
    link.exact ? pathname === link.href : pathname.startsWith(link.href);

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-5 py-5 border-b border-border/60">
        <div className="w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center shadow-sm">
          <ShieldCheck className="w-4.5 h-4.5 text-white" />
        </div>
        <div>
          <p className="text-sm font-bold text-foreground leading-tight">BrokerBoss</p>
          <p className="text-[10px] text-muted-foreground leading-tight">Admin Panel</p>
        </div>
        {/* Close button (mobile only) */}
        {onClose && (
          <button
            onClick={onClose}
            className="ml-auto p-1.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors lg:hidden"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Nav Links */}
      <nav className="flex-1 px-3 py-4 space-y-0.5">
        <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest px-2 pb-2">
          Navigation
        </p>
        {NAV_LINKS.map((link) => {
          const active = isActive(link);
          return (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${
                active
                  ? "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <link.icon
                className={`w-4.5 h-4.5 shrink-0 ${
                  active ? "text-amber-600 dark:text-amber-400" : ""
                }`}
              />
              {link.label}
              {active && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-amber-500" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-3 py-4 border-t border-border/60">
        <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-muted transition-colors cursor-pointer group">
          <div className="w-7 h-7 rounded-full bg-amber-500 flex items-center justify-center text-white text-xs font-bold shrink-0">
            A
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-foreground truncate">Admin User</p>
            <p className="text-[10px] text-muted-foreground truncate">admin@brokerboss.in</p>
          </div>
          <LogOut className="w-4 h-4 text-muted-foreground group-hover:text-red-500 transition-colors shrink-0" />
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-60 shrink-0 h-screen sticky top-0 bg-card border-r border-border overflow-y-auto">
        <SidebarContent />
      </aside>

      {/* Mobile Drawer Overlay */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={onClose}
          />
          {/* Drawer */}
          <aside className="absolute left-0 top-0 h-full w-64 bg-card border-r border-border overflow-y-auto animate-in slide-in-from-left duration-200">
            <SidebarContent />
          </aside>
        </div>
      )}
    </>
  );
}
