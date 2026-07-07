'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import RegisterModal from '@/components/auth/RegisterModal';
import UserPanelSheet from '@/components/user/UserPanelSheet';
import {
  FaHome,
  FaBuilding,
  FaConciergeBell,
  FaEnvelope,
  FaBars,
  FaMoon,
  FaSun,
  FaUser,
  FaSignOutAlt,
  FaUserPlus,
  FaPlusCircle,
  FaChevronRight,
  FaIdCard,
  FaList,
  FaBookmark,
} from 'react-icons/fa';

const navLinks = [
  { href: '/', label: 'Home', icon: FaHome },
  { href: '/properties', label: 'Properties', icon: FaBuilding },
  { href: '/brokers', label: 'Brokers', icon: FaIdCard },
  { href: '/services', label: 'Services', icon: FaConciergeBell },
  { href: '/contact', label: 'Contact Us', icon: FaEnvelope },
];

const roleLabels = {
  buyer: 'Buyer',
  owner: 'Owner',
  broker: 'Broker',
};

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      aria-label="Toggle dark mode"
      className="h-9 w-9 rounded-full"
    >
      {/* Render a fixed-size placeholder until mounted to avoid hydration mismatch */}
      {mounted ? (
        theme === 'dark' ? <FaSun className="h-4 w-4" /> : <FaMoon className="h-4 w-4" />
      ) : (
        <span className="h-4 w-4 block" />
      )}
    </Button>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const { isLoggedIn, userRole, userProfile, logout, authModalOpen, setAuthModalOpen } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [panelOpen, setPanelOpen] = useState(false);

  const isActive = (href) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  const canPostAd = isLoggedIn && (userRole === 'owner' || userRole === 'broker');

  const displayName = userProfile?.name
    ? userProfile.name.split(' ')[0]
    : roleLabels[userRole] ?? 'User';

  return (
    <>
      <RegisterModal open={authModalOpen} onClose={() => setAuthModalOpen(false)} />
      <UserPanelSheet open={panelOpen} onClose={() => setPanelOpen(false)} />

      <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/95 backdrop-blur-md">
        <nav className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">

          {/* ── Logo ── */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center shadow-sm">
              <FaBuilding className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="text-xl font-extrabold tracking-tight">
              Broker<span className="text-primary">Boss</span>
            </span>
          </Link>

          {/* ── Desktop Nav Links ── */}
          <div className="hidden md:flex items-center gap-0.5">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-150 hover:bg-accent hover:text-accent-foreground ${
                  isActive(href)
                    ? 'bg-accent text-accent-foreground font-semibold'
                    : 'text-muted-foreground'
                }`}
              >
                {label}
                {isActive(href) && (
                  <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full bg-primary" />
                )}
              </Link>
            ))}
          </div>

          {/* ── Desktop Right Controls ── */}
          <div className="hidden md:flex items-center gap-2">
            <ThemeToggle />
            <div className="h-5 w-px bg-border mx-1" />

            {/* POST PROPERTIES — Owner/Broker only */}
            {canPostAd && (
              <Link
                href="/post-ad"
                id="navbar-post-ad"
                className="relative inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-sm px-4 py-2 rounded-lg transition-all shadow-sm hover:shadow-md"
              >
                <FaPlusCircle className="h-3.5 w-3.5" />
                Post Properties
                <span className="absolute -top-2 -right-2 bg-green-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full leading-none shadow">
                  FREE
                </span>
              </Link>
            )}

            {isLoggedIn ? (
              <>
                {/* Clickable profile pill — opens user panel */}
                <button
                  id="navbar-profile-pill"
                  onClick={() => setPanelOpen(true)}
                  className="flex items-center gap-1.5 bg-accent hover:bg-accent/80 rounded-full pl-3 pr-1 py-1 transition-all cursor-pointer"
                  aria-label="Open My Account panel"
                >
                  <div className="h-5 w-5 rounded-full bg-primary flex items-center justify-center shrink-0">
                    <FaUser className="h-2.5 w-2.5 text-primary-foreground" />
                  </div>
                  <span className="text-xs font-semibold text-accent-foreground capitalize">
                    {displayName}
                  </span>
                  <span className="text-[10px] text-muted-foreground bg-background rounded-full px-1.5 py-0.5 capitalize border border-border">
                    {roleLabels[userRole]}
                  </span>
                </button>

              </>
            ) : (
              <>
                <Button
                  variant="ghost"
                  size="default"
                  onClick={() => setAuthModalOpen(true)}
                  className="gap-2 text-sm font-semibold px-4"
                  id="navbar-register"
                >
                  <FaUserPlus className="h-4 w-4" />
                  Register
                </Button>
                <Button variant="default" size="default" className="gap-2 shadow-sm text-sm font-semibold px-5" id="navbar-login" asChild>
                  <Link href="/login">
                    <FaUser className="h-4 w-4" />
                    Login
                  </Link>
                </Button>
              </>
            )}
          </div>

          {/* ── Mobile Controls ── */}
          <div className="flex md:hidden items-center gap-1.5">
            <ThemeToggle />
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 rounded-full"
                  aria-label="Open menu"
                >
                  <FaBars className="h-4 w-4" />
                </Button>
              </SheetTrigger>

              <SheetContent side="right" className="w-[300px] p-0 flex flex-col">
                {isLoggedIn ? (
                  <>
                    <SheetHeader className="px-5 pt-5 pb-4 border-b border-border/60">
                      <SheetTitle className="flex items-center gap-3">
                        <div className="h-12 w-12 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-xl shrink-0 shadow-sm">
                          {displayName.charAt(0).toUpperCase()}
                        </div>
                        <div className="flex-1 min-w-0 text-left">
                          <p className="font-bold text-foreground text-base capitalize truncate leading-tight">
                            {displayName}
                          </p>
                          <span className="inline-flex items-center mt-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-primary/10 text-primary border border-primary/20 capitalize">
                            {roleLabels[userRole] || 'User'}
                          </span>
                        </div>
                      </SheetTitle>
                    </SheetHeader>
                    
                    <div className="flex-1 overflow-y-auto flex flex-col">
                      {canPostAd && (
                        <div className="px-5 pt-[-4] pb-1">
                          <Button asChild className="w-full rounded-xl py-6 gap-2 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold shadow-sm text-base">
                            <Link href="/post-ad" onClick={() => setMobileOpen(false)}>
                              <FaPlusCircle className="h-4 w-4" />
                              Post Properties
                              <span className="bg-green-500 text-white text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ml-1">Free</span>
                            </Link>
                          </Button>
                        </div>
                      )}

                      <div className="px-5 py-4 flex flex-col gap-5">
                        <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest mb-1">
                          My Account
                        </p>
                        
                        <Link href="/saved" onClick={() => setMobileOpen(false)} className="flex items-center gap-4 group">
                          <div className="h-10 w-10 rounded-full bg-orange-50 dark:bg-orange-950/30 flex items-center justify-center shrink-0 group-hover:bg-orange-100 transition-colors">
                            <FaBookmark className="h-4 w-4 text-orange-500" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-[15px] font-semibold text-foreground group-hover:text-orange-600 transition-colors">Saved Properties</p>
                            <p className="text-[13px] text-muted-foreground mt-0.5 truncate">View your bookmarked properties</p>
                          </div>
                        </Link>
                        
                        <Link href="/user/listings" onClick={() => setMobileOpen(false)} className="flex items-center gap-4 group">
                          <div className="h-10 w-10 rounded-full bg-blue-50 dark:bg-blue-950/30 flex items-center justify-center shrink-0 group-hover:bg-blue-100 transition-colors">
                            <FaList className="h-4 w-4 text-blue-500" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-[15px] font-semibold text-foreground group-hover:text-blue-600 transition-colors">My Listings</p>
                            <p className="text-[13px] text-muted-foreground mt-0.5 truncate">View & manage your properties</p>
                          </div>
                        </Link>

                        <Link href="/user/profile" onClick={() => setMobileOpen(false)} className="flex items-center gap-4 group">
                          <div className="h-10 w-10 rounded-full bg-violet-50 dark:bg-violet-950/30 flex items-center justify-center shrink-0 group-hover:bg-violet-100 transition-colors">
                            <FaUser className="h-4 w-4 text-violet-500" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-[15px] font-semibold text-foreground group-hover:text-violet-600 transition-colors">My Profile</p>
                            <p className="text-[13px] text-muted-foreground mt-0.5 truncate">Edit your account details</p>
                          </div>
                        </Link>
                      </div>

                      <div className="px-5 pb-8 pt-5 border-t border-border/60 flex flex-col gap-5 bg-muted/10 mt-2">
                        <Link href="/brokers" onClick={() => setMobileOpen(false)} className="flex items-center gap-4 group">
                          <div className="h-10 w-10 rounded-full bg-muted/60 flex items-center justify-center shrink-0 group-hover:bg-muted transition-colors">
                            <FaIdCard className="h-4 w-4 text-foreground/70 group-hover:text-foreground" />
                          </div>
                          <span className="text-[15px] font-semibold text-foreground group-hover:text-primary transition-colors">Brokers</span>
                        </Link>
                        <Link href="/services" onClick={() => setMobileOpen(false)} className="flex items-center gap-4 group">
                          <div className="h-10 w-10 rounded-full bg-muted/60 flex items-center justify-center shrink-0 group-hover:bg-muted transition-colors">
                            <FaConciergeBell className="h-4 w-4 text-foreground/70 group-hover:text-foreground" />
                          </div>
                          <span className="text-[15px] font-semibold text-foreground group-hover:text-primary transition-colors">Services</span>
                        </Link>
                        <Link href="/contact" onClick={() => setMobileOpen(false)} className="flex items-center gap-4 group">
                          <div className="h-10 w-10 rounded-full bg-muted/60 flex items-center justify-center shrink-0 group-hover:bg-muted transition-colors">
                            <FaEnvelope className="h-4 w-4 text-foreground/70 group-hover:text-foreground" />
                          </div>
                          <span className="text-[15px] font-semibold text-foreground group-hover:text-primary transition-colors">Contact Us</span>
                        </Link>

                        <button
                          onClick={() => { logout(); setMobileOpen(false); }}
                          className="flex items-center gap-4 group mt-1"
                        >
                          <div className="h-10 w-10 rounded-full bg-muted/60 group-hover:bg-red-100 dark:group-hover:bg-red-900/30 flex items-center justify-center shrink-0 transition-colors">
                            <FaSignOutAlt className="h-4 w-4 text-foreground/70 group-hover:text-red-500" />
                          </div>
                          <span className="text-[15px] font-semibold text-foreground group-hover:text-red-600 transition-colors">Sign Out</span>
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <SheetHeader className="px-5 pt-5 pb-4 border-b border-border/60">
                      <SheetTitle className="flex items-center gap-2.5">
                        <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                          <FaBuilding className="h-4 w-4 text-primary-foreground" />
                        </div>
                        <span className="font-extrabold text-lg tracking-tight">
                          Broker<span className="text-primary">Boss</span>
                        </span>
                      </SheetTitle>
                    </SheetHeader>
                    
                    <div className="flex-1 overflow-y-auto flex flex-col">
                      <div className="px-5 py-6 flex flex-col gap-4">
                        <Button variant="default" size="default" className="w-full gap-2 rounded-xl py-6 shadow-sm text-base" asChild>
                          <Link href="/login" onClick={() => setMobileOpen(false)}>
                            <FaUser className="h-4 w-4" />
                            Login to Account
                          </Link>
                        </Button>
                        <Button variant="outline" size="default" onClick={() => { setMobileOpen(false); setAuthModalOpen(true); }} className="w-full gap-2 rounded-xl py-6 text-base">
                          <FaUserPlus className="h-4 w-4" />
                          Register New Account
                        </Button>
                      </div>

                      <div className="px-5 pb-8 pt-5 border-t border-border/60 flex flex-col gap-5 bg-muted/10 mt-auto">
                        <Link href="/brokers" onClick={() => setMobileOpen(false)} className="flex items-center gap-4 group">
                          <div className="h-10 w-10 rounded-full bg-muted/60 flex items-center justify-center shrink-0 group-hover:bg-muted transition-colors">
                            <FaIdCard className="h-4 w-4 text-foreground/70 group-hover:text-foreground" />
                          </div>
                          <span className="text-[15px] font-semibold text-foreground group-hover:text-primary transition-colors">Brokers</span>
                        </Link>
                        <Link href="/services" onClick={() => setMobileOpen(false)} className="flex items-center gap-4 group">
                          <div className="h-10 w-10 rounded-full bg-muted/60 flex items-center justify-center shrink-0 group-hover:bg-muted transition-colors">
                            <FaConciergeBell className="h-4 w-4 text-foreground/70 group-hover:text-foreground" />
                          </div>
                          <span className="text-[15px] font-semibold text-foreground group-hover:text-primary transition-colors">Services</span>
                        </Link>
                        <Link href="/contact" onClick={() => setMobileOpen(false)} className="flex items-center gap-4 group">
                          <div className="h-10 w-10 rounded-full bg-muted/60 flex items-center justify-center shrink-0 group-hover:bg-muted transition-colors">
                            <FaEnvelope className="h-4 w-4 text-foreground/70 group-hover:text-foreground" />
                          </div>
                          <span className="text-[15px] font-semibold text-foreground group-hover:text-primary transition-colors">Contact Us</span>
                        </Link>
                      </div>
                    </div>
                  </>
                )}
              </SheetContent>
            </Sheet>
          </div>

        </nav>
      </header>
    </>
  );
}
