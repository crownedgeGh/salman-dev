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
} from 'react-icons/fa';

const navLinks = [
  { href: '/', label: 'Home', icon: FaHome },
  { href: '/properties', label: 'Properties', icon: FaBuilding },
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
  const { isLoggedIn, userRole, userProfile, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);

  const isActive = (href) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  const canPostAd = isLoggedIn && (userRole === 'owner' || userRole === 'broker');

  const displayName = userProfile?.name
    ? userProfile.name.split(' ')[0]
    : roleLabels[userRole] ?? 'User';

  return (
    <>
      <RegisterModal open={registerOpen} onClose={() => setRegisterOpen(false)} />

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
                <div className="flex items-center gap-1.5 bg-accent rounded-full pl-3 pr-1 py-1">
                  <div className="h-5 w-5 rounded-full bg-primary flex items-center justify-center shrink-0">
                    <FaUser className="h-2.5 w-2.5 text-primary-foreground" />
                  </div>
                  <span className="text-xs font-semibold text-accent-foreground capitalize">
                    {displayName}
                  </span>
                  <span className="text-[10px] text-muted-foreground bg-background rounded-full px-1.5 py-0.5 capitalize border border-border">
                    {roleLabels[userRole]}
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={logout}
                  className="gap-2 text-muted-foreground hover:text-foreground"
                  id="navbar-logout"
                >
                  <FaSignOutAlt className="h-3.5 w-3.5" />
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setRegisterOpen(true)}
                  className="gap-2"
                  id="navbar-register"
                >
                  <FaUserPlus className="h-3.5 w-3.5" />
                  Register
                </Button>
                <Button variant="default" size="sm" className="gap-2 shadow-sm" id="navbar-login">
                  <FaUser className="h-3.5 w-3.5" />
                  Login
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
                {/* Sheet Header */}
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

                {/* Nav Links */}
                <div className="flex-1 overflow-y-auto px-3 py-4 flex flex-col gap-1">
                  {navLinks.map(({ href, label, icon: Icon }) => (
                    <Link
                      key={href}
                      href={href}
                      onClick={() => setMobileOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all hover:bg-accent hover:text-accent-foreground ${
                        isActive(href)
                          ? 'bg-accent text-accent-foreground font-semibold'
                          : 'text-muted-foreground'
                      }`}
                    >
                      <span className={`h-8 w-8 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                        isActive(href) ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                      }`}>
                        <Icon className="h-3.5 w-3.5" />
                      </span>
                      <span className="flex-1">{label}</span>
                      {isActive(href) && <FaChevronRight className="h-3 w-3 text-primary opacity-60" />}
                    </Link>
                  ))}
                </div>

                {/* Bottom Section */}
                <div className="px-3 pb-6 pt-3 border-t border-border/60 flex flex-col gap-2.5">

                  {/* POST PROPERTIES — Owner/Broker only (mobile) */}
                  {canPostAd && (
                    <Link
                      href="/post-ad"
                      onClick={() => setMobileOpen(false)}
                      id="mobile-post-ad"
                      className="relative flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-sm px-4 py-3 rounded-xl transition-all shadow-sm"
                    >
                      <FaPlusCircle className="h-4 w-4" />
                      Post Properties
                      <span className="absolute -top-2 -right-2 bg-green-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full shadow">
                        FREE
                      </span>
                    </Link>
                  )}

                  {isLoggedIn ? (
                    <>
                      {/* User info pill */}
                      <div className="flex items-center gap-3 bg-accent rounded-xl px-4 py-3">
                        <div className="h-9 w-9 rounded-full bg-primary flex items-center justify-center shrink-0">
                          <FaUser className="h-4 w-4 text-primary-foreground" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-foreground capitalize truncate">{displayName}</p>
                          <p className="text-xs text-muted-foreground capitalize">{roleLabels[userRole]}</p>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => { logout(); setMobileOpen(false); }}
                        className="w-full gap-2 rounded-xl py-3 h-auto"
                        id="mobile-logout"
                      >
                        <FaSignOutAlt className="h-3.5 w-3.5" />
                        Logout
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => { setMobileOpen(false); setRegisterOpen(true); }}
                        className="w-full gap-2 rounded-xl py-3 h-auto"
                        id="mobile-register"
                      >
                        <FaUserPlus className="h-3.5 w-3.5" />
                        Register
                      </Button>
                      <Button
                        variant="default"
                        size="sm"
                        className="w-full gap-2 rounded-xl py-3 h-auto shadow-sm"
                        id="mobile-login"
                      >
                        <FaUser className="h-3.5 w-3.5" />
                        Login
                      </Button>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>

        </nav>
      </header>
    </>
  );
}
