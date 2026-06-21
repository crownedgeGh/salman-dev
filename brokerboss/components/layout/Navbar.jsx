'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
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
import { FaHome, FaBuilding, FaConciergeBell, FaEnvelope, FaBars, FaMoon, FaSun, FaUser, FaSignOutAlt } from 'react-icons/fa';

const navLinks = [
  { href: '/', label: 'Home', icon: FaHome },
  { href: '/properties', label: 'Properties', icon: FaBuilding },
  { href: '/services', label: 'Services', icon: FaConciergeBell },
  { href: '/contact', label: 'Contact Us', icon: FaEnvelope },
];

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      aria-label="Toggle dark mode"
      className="h-9 w-9"
    >
      {theme === 'dark' ? <FaSun className="h-4 w-4" /> : <FaMoon className="h-4 w-4" />}
    </Button>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const { isLoggedIn, toggleLogin } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (href) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-sm">
      <nav className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <FaBuilding className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold tracking-tight">
            Broker<span className="text-primary">Boss</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground ${
                isActive(href)
                  ? 'bg-accent text-accent-foreground'
                  : 'text-muted-foreground'
              }`}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Desktop Right Controls */}
        <div className="hidden md:flex items-center gap-2">
          <ThemeToggle />
          <div className="h-6 w-px bg-border mx-1" />
          <Button
            variant={isLoggedIn ? 'outline' : 'default'}
            size="sm"
            onClick={toggleLogin}
            className="gap-2"
          >
            {isLoggedIn ? (
              <>
                <FaSignOutAlt className="h-3.5 w-3.5" />
                Logout
              </>
            ) : (
              <>
                <FaUser className="h-3.5 w-3.5" />
                Login
              </>
            )}
          </Button>
          {isLoggedIn && (
            <span className="text-xs text-muted-foreground border border-border rounded-full px-2 py-0.5">
              Demo Mode
            </span>
          )}
        </div>

        {/* Mobile Controls */}
        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle />
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="h-9 w-9" aria-label="Open menu">
                <FaBars className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2">
                  <FaBuilding className="h-5 w-5 text-primary" />
                  BrokerBoss
                </SheetTitle>
              </SheetHeader>
              <div className="mt-6 flex flex-col gap-1">
                {navLinks.map(({ href, label, icon: Icon }) => (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground ${
                      isActive(href)
                        ? 'bg-accent text-accent-foreground'
                        : 'text-muted-foreground'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {label}
                  </Link>
                ))}
                <div className="mt-4 pt-4 border-t">
                  <Button
                    variant={isLoggedIn ? 'outline' : 'default'}
                    size="sm"
                    onClick={() => { toggleLogin(); setMobileOpen(false); }}
                    className="w-full gap-2"
                  >
                    {isLoggedIn ? (
                      <><FaSignOutAlt className="h-3.5 w-3.5" /> Logout</>
                    ) : (
                      <><FaUser className="h-3.5 w-3.5" /> Login (Demo)</>
                    )}
                  </Button>
                  {isLoggedIn && (
                    <p className="text-xs text-center text-muted-foreground mt-2">
                      Demo Mode Active
                    </p>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
