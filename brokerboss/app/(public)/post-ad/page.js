'use client';

import Link from 'next/link';
import { FaArrowLeft, FaPlusCircle } from 'react-icons/fa';
import PostPropertyForm from '@/components/auth/PostPropertyForm';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function PostAdPage() {
  const { isLoggedIn, authLoading, userRole } = useAuth();
  const router = useRouter();

  // Guard: only owners and brokers can access this page
  // Wait for authLoading to resolve before checking
  useEffect(() => {
    if (!authLoading && (!isLoggedIn || (userRole !== 'owner' && userRole !== 'broker'))) {
      router.replace('/');
    }
  }, [authLoading, isLoggedIn, userRole, router]);

  if (authLoading) return null;  // wait — don't flash redirect
  if (!isLoggedIn) return null;

  return (
    <div className="min-h-screen bg-background">
      {/* ── Page Header ── */}
      <div className="border-b border-border bg-card">
        <div className="container mx-auto px-4 md:px-6 py-5 flex flex-col sm:flex-row sm:items-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <FaArrowLeft className="h-3.5 w-3.5" />
            Back to Home
          </Link>

          <div className="sm:ml-auto flex items-center gap-3">
            <span className="bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20 text-xs font-bold px-3 py-1 rounded-full">
              FREE Listing
            </span>
          </div>
        </div>
      </div>

      {/* ── Main Content ── */}
      <div className="container mx-auto px-4 md:px-6 py-8 md:py-12">
        <div className="max-w-3xl mx-auto">

          {/* Title block */}
          <div className="flex items-center gap-4 mb-8">
            <span className="h-12 w-12 rounded-xl bg-primary flex items-center justify-center shrink-0 shadow-sm">
              <FaPlusCircle className="h-5 w-5 text-primary-foreground" />
            </span>
            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-foreground">
                Post Your Property
              </h1>
              <p className="text-muted-foreground text-sm mt-0.5">
                Fill in the details below — no image or full address required
              </p>
            </div>
          </div>

          <PostPropertyForm />
        </div>
      </div>
    </div>
  );
}
