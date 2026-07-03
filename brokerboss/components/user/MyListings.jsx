'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/axios';
import EditPropertyModal from '@/components/user/EditPropertyModal';
import {
  FaMapMarkerAlt, FaEye, FaEdit, FaHome, FaPlusCircle, FaSpinner,
} from 'react-icons/fa';

// ─── Mini listing card ────────────────────────────────────────────────────────
function ListingCard({ property, onEdit, onView }) {
  const isRent = property.purpose === 'Rent';

  return (
    <div className="group flex gap-3 bg-card border border-border/70 rounded-2xl p-3 hover:border-primary/40 hover:shadow-md transition-all duration-200">
      {/* Thumbnail */}
      <div className="relative shrink-0 w-24 h-20 rounded-xl overflow-hidden bg-muted">
        {property.images?.[0] || property.image ? (
          <img
            src={property.images?.[0] || property.image}
            alt={property.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full bg-muted">
            <FaHome className="h-6 w-6 text-muted-foreground/50" />
          </div>
        )}
        {/* Purpose badge */}
        <span
          className={`absolute top-1.5 left-1.5 text-[9px] font-bold px-1.5 py-0.5 rounded-full ${
            isRent
              ? 'bg-violet-500 text-white'
              : 'bg-blue-500 text-white'
          }`}
        >
          {isRent ? 'RENT' : 'SALE'}
        </span>
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0 flex flex-col gap-1">
        <p className="text-sm font-semibold text-foreground leading-tight line-clamp-2">{property.title}</p>
        <div className="flex items-center gap-1 text-muted-foreground">
          <FaMapMarkerAlt className="h-2.5 w-2.5 shrink-0" />
          <span className="text-xs truncate">{[property.locality, property.city].filter(Boolean).join(', ')}</span>
        </div>
        <p className="text-sm font-bold text-primary">{property.price}</p>

        {/* Spec chips */}
        <div className="flex flex-wrap gap-1 mt-0.5">
          {property.type && (
            <span className="text-[10px] bg-muted text-muted-foreground px-2 py-0.5 rounded-full">{property.type}</span>
          )}
          {property.area && (
            <span className="text-[10px] bg-muted text-muted-foreground px-2 py-0.5 rounded-full">{property.area}</span>
          )}
        </div>

        {/* Action buttons */}
        <div className="flex gap-2 mt-1.5">
          <button
            onClick={() => onView(property)}
            className="flex items-center gap-1.5 text-xs font-semibold text-primary border border-primary/30 hover:bg-primary/5 px-2.5 py-1.5 rounded-lg transition-all"
          >
            <FaEye className="h-3 w-3" />
            View
          </button>
          <button
            onClick={() => onEdit(property)}
            className="flex items-center gap-1.5 text-xs font-semibold text-foreground border border-border hover:bg-accent px-2.5 py-1.5 rounded-lg transition-all"
          >
            <FaEdit className="h-3 w-3" />
            Edit
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Skeleton loader ──────────────────────────────────────────────────────────
function ListingSkeleton() {
  return (
    <div className="flex gap-3 bg-card border border-border/50 rounded-2xl p-3 animate-pulse">
      <div className="w-24 h-20 rounded-xl bg-muted shrink-0" />
      <div className="flex-1 flex flex-col gap-2 py-1">
        <div className="h-3.5 bg-muted rounded w-4/5" />
        <div className="h-2.5 bg-muted rounded w-2/5" />
        <div className="h-3.5 bg-muted rounded w-1/3" />
      </div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function MyListings({ onClosePanel }) {
  const router = useRouter();
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingProperty, setEditingProperty] = useState(null);

  const fetchListings = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get('/properties/mine');
      setListings(res.data);
    } catch (err) {
      setError(err?.response?.data?.error || 'Failed to load listings.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchListings(); }, [fetchListings]);

  const handleView = (property) => {
    onClosePanel?.();
    router.push(`/properties/${property._id || property.id}`);
  };

  const handleEdit = (property) => {
    setEditingProperty(property);
  };

  const handleSaved = () => {
    setEditingProperty(null);
    fetchListings(); // refresh after edit
  };

  return (
    <>
      <div className="flex flex-col gap-3">
        {loading && (
          <>
            <ListingSkeleton />
            <ListingSkeleton />
            <ListingSkeleton />
          </>
        )}

        {!loading && error && (
          <div className="text-sm text-red-500 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 px-4 py-3 rounded-xl">
            {error}
          </div>
        )}

        {!loading && !error && listings.length === 0 && (
          <div className="flex flex-col items-center gap-4 py-10 text-center">
            <div className="h-16 w-16 rounded-2xl bg-muted flex items-center justify-center">
              <FaHome className="h-7 w-7 text-muted-foreground/50" />
            </div>
            <div>
              <p className="font-semibold text-foreground">No listings yet</p>
              <p className="text-sm text-muted-foreground mt-1">Start by posting your first property</p>
            </div>
            <a
              href="/post-ad"
              onClick={() => onClosePanel?.()}
              className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-sm px-5 py-2.5 rounded-xl transition-all shadow-sm"
            >
              <FaPlusCircle className="h-4 w-4" />
              Post a Property
            </a>
          </div>
        )}

        {!loading && !error && listings.length > 0 && (
          <div className="flex flex-col gap-3">
            <p className="text-xs text-muted-foreground font-medium">
              {listings.length} propert{listings.length === 1 ? 'y' : 'ies'} listed
            </p>
            {listings.map((property) => (
              <ListingCard
                key={property._id || property.id}
                property={property}
                onView={handleView}
                onEdit={handleEdit}
              />
            ))}
          </div>
        )}
      </div>

      {/* Edit modal — rendered outside card to avoid stacking context issues */}
      <EditPropertyModal
        property={editingProperty}
        onClose={() => setEditingProperty(null)}
        onSaved={handleSaved}
      />
    </>
  );
}
