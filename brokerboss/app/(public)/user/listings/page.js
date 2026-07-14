'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import api from '@/lib/axios';
import {
  FaMapMarkerAlt,
  FaEye,
  FaEdit,
  FaTrash,
  FaHome,
  FaBuilding,
  FaChartArea,
  FaArrowLeft,
} from 'react-icons/fa';

// ─── Skeleton card ────────────────────────────────────────────────────────────
function SkeletonCard() {
  return (
    <div className="bg-card border border-border/60 rounded-2xl overflow-hidden animate-pulse">
      <div className="h-48 bg-muted w-full" />
      <div className="p-4 flex flex-col gap-3">
        <div className="h-4 bg-muted rounded w-4/5" />
        <div className="h-3 bg-muted rounded w-2/5" />
        <div className="h-5 bg-muted rounded w-1/3" />
        <div className="flex gap-2 mt-1">
          <div className="h-8 bg-muted rounded-lg flex-1" />
          <div className="h-8 bg-muted rounded-lg flex-1" />
          <div className="h-8 bg-muted rounded-lg w-8" />
        </div>
      </div>
    </div>
  );
}

// ─── Single listing card ──────────────────────────────────────────────────────
function ListingCard({ property, onDelete, onView, onEdit }) {
  const isRent = property.purpose === 'Rent';
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this listing? This cannot be undone.')) return;
    setDeleting(true);
    try {
      await api.delete(`/properties/${property._id || property.id}`);
      onDelete(property._id || property.id);
    } catch {
      alert('Failed to delete property. Please try again.');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="bg-card border border-border/70 rounded-2xl overflow-hidden hover:shadow-lg hover:border-primary/30 transition-all duration-200 group flex flex-col">
      <Link href={`/properties/${property._id || property.id}`} className="flex flex-col flex-1">
        {/* Image */}
        <div className="relative h-44 sm:h-52 bg-muted overflow-hidden">
        {property.images?.[0] || property.image ? (
          <img
            src={property.images?.[0] || property.image}
            alt={property.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-2">
            <FaBuilding className="h-10 w-10 text-muted-foreground/30" />
            <span className="text-xs text-muted-foreground/50">No photo</span>
          </div>
        )}
        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          <span
            className={`text-[10px] font-bold px-2.5 py-1 rounded-full shadow ${
              isRent ? 'bg-violet-500 text-white' : 'bg-blue-500 text-white'
            }`}
          >
            {isRent ? 'FOR RENT' : 'FOR SALE'}
          </span>
          {property.type && (
            <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-black/60 text-white backdrop-blur-sm">
              {property.type}
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col gap-2 flex-1">
        <h3 className="font-bold text-foreground text-sm leading-snug line-clamp-2">
          {property.title}
        </h3>

        {/* Location */}
        {(property.locality || property.city) && (
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <FaMapMarkerAlt className="h-3 w-3 shrink-0" />
            <span className="text-xs truncate">
              {[property.locality, property.city].filter(Boolean).join(', ')}
            </span>
          </div>
        )}

        {/* Specs row */}
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          {property.area && (
            <span className="flex items-center gap-1">
              <FaChartArea className="h-2.5 w-2.5" />
              {property.area}
            </span>
          )}
        </div>

        {/* Price */}
        <p className="text-base font-extrabold text-primary mt-auto">
          {property.price || '—'}
        </p>
        </div>
      </Link>

      {/* Action buttons */}
      <div className="px-4 pb-4">
        <div className="flex gap-2">
          <button
            onClick={() => onView(property)}
            title="View public listing"
            className="flex-1 flex items-center justify-center gap-1.5 text-xs font-semibold border border-primary/30 text-primary hover:bg-primary/5 py-2 rounded-xl transition-all"
          >
            <FaEye className="h-3 w-3" />
            View
          </button>
          <button
            onClick={() => onEdit(property)}
            title="Edit this property"
            className="flex-1 flex items-center justify-center gap-1.5 text-xs font-semibold border border-border text-foreground hover:bg-accent py-2 rounded-xl transition-all"
          >
            <FaEdit className="h-3 w-3" />
            Edit
          </button>
          <button
            onClick={handleDelete}
            disabled={deleting}
            title="Delete this listing"
            className="flex items-center justify-center h-9 w-9 border border-red-200 dark:border-red-900 text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 hover:text-red-600 rounded-xl transition-all disabled:opacity-50"
          >
            <FaTrash className="h-3 w-3" />
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function MyListingsPage() {
  const { isLoggedIn, authLoading } = useAuth();
  const router = useRouter();
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Redirect if not logged in (wait for auth check to finish first)
  useEffect(() => {
    if (!authLoading && !isLoggedIn) router.push('/login');
  }, [authLoading, isLoggedIn, router]);

  const fetchListings = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get('/properties/mine');
      setListings(res.data);
    } catch (err) {
      setError(err?.response?.data?.error || 'Failed to load your listings.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!authLoading && isLoggedIn) fetchListings();
  }, [authLoading, isLoggedIn, fetchListings]);

  if (authLoading) return null; // wait for auth check

  const handleView = (property) => {
    router.push(`/properties/${property._id || property.id}`);
  };

  const handleEdit = (property) => {
    router.push(`/user/listings/${property._id || property.id}/edit`);
  };

  const handleDelete = (deletedId) => {
    setListings((prev) => prev.filter((p) => (p._id || p.id) !== deletedId));
  };

  if (!isLoggedIn) return null;

  return (
    <div className="min-h-screen bg-background">
      {/* ── Page Header ───────────────────────────────── */}
      <div className="border-b border-border/60 bg-background/95 backdrop-blur-sm sticky top-16 z-30">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl py-4 flex items-center gap-3">
          <button
            onClick={() => router.back()}
            className="h-9 w-9 rounded-xl border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-accent transition-all"
          >
            <FaArrowLeft className="h-3.5 w-3.5" />
          </button>
          <div>
            <h1 className="text-lg font-extrabold text-foreground">My Listings</h1>
            <p className="text-xs text-muted-foreground">
              {loading ? 'Loading…' : `${listings.length} propert${listings.length === 1 ? 'y' : 'ies'} listed`}
            </p>
          </div>
        </div>
      </div>

      {/* ── Content ───────────────────────────────────── */}
      <div className="container mx-auto px-4 md:px-6 max-w-6xl py-6 md:py-8">

        {/* Error */}
        {error && (
          <div className="mb-6 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-sm px-4 py-3 rounded-xl">
            {error}
          </div>
        )}

        {/* Skeleton */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[1, 2, 3, 4, 5, 6].map((n) => <SkeletonCard key={n} />)}
          </div>
        )}

        {/* Empty state */}
        {!loading && !error && listings.length === 0 && (
          <div className="flex flex-col items-center gap-4 py-20 text-center">
            <div className="h-20 w-20 rounded-3xl bg-muted flex items-center justify-center">
              <FaHome className="h-9 w-9 text-muted-foreground/40" />
            </div>
            <div>
              <p className="text-xl font-bold text-foreground">No listings yet</p>
              <p className="text-sm text-muted-foreground mt-2 max-w-xs">
                Start sharing your properties with thousands of buyers and renters
              </p>
            </div>
            <a href="/post-ad" className="text-sm text-primary hover:underline font-semibold">
              Post your first property →
            </a>
          </div>
        )}

        {/* Grid of listing cards */}
        {!loading && !error && listings.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {listings.map((property) => (
              <ListingCard
                key={property._id || property.id}
                property={property}
                onView={handleView}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
