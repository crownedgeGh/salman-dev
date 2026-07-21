'use client';

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import {
  FaList,
  FaUser,
  FaChevronRight,
  FaSignOutAlt,
  FaPlusCircle,
  FaBookmark,
} from 'react-icons/fa';

const roleLabels = { buyer: 'Buyer', owner: 'Owner', broker: 'Broker' };

const menuItems = [
  {
    id: 'my-listings',
    label: 'My Listings',
    description: 'View & manage your properties',
    icon: FaList,
    href: '/user/listings',
    color: 'text-blue-500',
    bg: 'bg-blue-50 dark:bg-blue-950/30',
  },
  {
    id: 'my-profile',
    label: 'My Profile',
    description: 'Edit your account details',
    icon: FaUser,
    href: '/user/profile',
    color: 'text-violet-500',
    bg: 'bg-violet-50 dark:bg-violet-950/30',
  },
  {
    id: 'saved-properties',
    label: 'Saved Properties',
    description: 'View your bookmarked properties',
    icon: FaBookmark,
    href: '/saved',
    color: 'text-orange-500',
    bg: 'bg-orange-50 dark:bg-orange-950/30',
  },
];

/**
 * UserPanelSheet — compact right-side menu with navigation links.
 * Props: open (boolean), onClose (() => void)
 */
export default function UserPanelSheet({ open, onClose }) {
  const { userProfile, userRole, logout } = useAuth();

  const displayName = userProfile?.name || roleLabels[userRole] || 'User';
  const canPostAd = userRole === 'owner' || userRole === 'broker';

  const rawUserImage = userProfile?.passportPhoto || userProfile?.image;
  const userImage = (rawUserImage && typeof rawUserImage === 'string' && rawUserImage !== '[object File]' && rawUserImage.trim() !== '')
    ? rawUserImage
    : `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=6366f1&color=ffffff&size=128`;

  return (
    <Sheet open={open} onOpenChange={(o) => { if (!o) onClose?.(); }}>
      <SheetContent
        side="right"
        className="w-[300px] sm:w-[320px] p-0 flex flex-col"
      >
        {/* ── User Header ─────────────────────────────── */}
        <SheetHeader className="px-5 pt-5 pb-4 border-b border-border/60">
          <SheetTitle asChild>
            <div className="flex items-center gap-3">
              {/* Avatar circle */}
              <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-xl shrink-0 shadow overflow-hidden">
                <img 
                  src={userImage} 
                  alt={displayName} 
                  onError={(e) => { e.target.onerror = null; e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=6366f1&color=ffffff&size=128`; }}
                  className="h-full w-full object-cover object-top" 
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-foreground text-base capitalize truncate leading-tight">
                  {displayName}
                </p>
                <span className="inline-flex items-center mt-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-primary/10 text-primary border border-primary/20 capitalize">
                  {roleLabels[userRole] || 'User'}
                </span>
              </div>
            </div>
          </SheetTitle>
        </SheetHeader>

        {/* ── Navigation Menu ──────────────────────────── */}
        <div className="flex-1 px-3 py-3 flex flex-col gap-2 overflow-y-auto">
          <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest px-2 mb-1">
            My Account
          </p>

          {menuItems.map(({ id, label, description, icon: Icon, href, color, bg }) => (
            <Link
              key={id}
              id={`user-panel-nav-${id}`}
              href={href}
              onClick={onClose}
              className="group flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-accent transition-all duration-150"
            >
              {/* Icon box */}
              <div className={`h-10 w-10 rounded-xl ${bg} flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform`}>
                <Icon className={`h-4.5 w-4.5 ${color}`} />
              </div>
              {/* Text */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground">{label}</p>
                <p className="text-xs text-muted-foreground mt-0.5 truncate">{description}</p>
              </div>
              <FaChevronRight className="h-3 w-3 text-muted-foreground/50 group-hover:text-primary group-hover:translate-x-0.5 transition-all shrink-0" />
            </Link>
          ))}

          {/* Post Property shortcut — owner/broker only */}
          {canPostAd && (
            <>
              <div className="my-1 h-px bg-border/60" />
              <Link
                href="/post-ad"
                onClick={onClose}
                id="user-panel-nav-post-ad"
                className="group relative flex items-center gap-3 px-3 py-3 rounded-xl bg-primary/5 hover:bg-primary/10 border border-primary/20 transition-all duration-150"
              >
                <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <FaPlusCircle className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-primary">Post a Property</p>
                  <p className="text-xs text-muted-foreground mt-0.5">List a new property for free</p>
                </div>
                <span className="text-[9px] font-bold bg-green-500 text-white px-1.5 py-0.5 rounded-full shrink-0">
                  FREE
                </span>
              </Link>
            </>
          )}
        </div>

        {/* ── Logout Footer ─────────────────────────────── */}
        <div className="px-3 pb-5 pt-3 border-t border-border/60">
          <button
            id="user-panel-logout"
            onClick={() => { logout(); onClose?.(); }}
            className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-semibold text-muted-foreground hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-all duration-150"
          >
            <div className="h-10 w-10 rounded-xl bg-muted flex items-center justify-center shrink-0">
              <FaSignOutAlt className="h-4 w-4" />
            </div>
            <span className="flex-1 text-left">Sign Out</span>
          </button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
