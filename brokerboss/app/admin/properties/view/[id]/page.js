"use client";

import { use, useState, useEffect } from "react";
import Link from "next/link";
import api from "@/lib/axios";
import {
  ArrowLeft,
  User,
  MapPin,
  Building,
  Calendar,
  FileText,
  Coins,
  Pencil,
  Phone,
  Home,
  Store,
  Layers,
  Warehouse,
  Briefcase,
  Hash,
  Clock,
  Car,
  Star
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const STATUS_COLORS = {
  Active: "border-green-300 text-green-700 bg-green-50 dark:bg-green-900/20 dark:text-green-400",
  Sold: "border-blue-300 text-blue-700 bg-blue-50 dark:bg-blue-900/20 dark:text-blue-400",
  "Sold Out": "border-blue-300 text-blue-700 bg-blue-50 dark:bg-blue-900/20 dark:text-blue-400",
  Pending: "border-yellow-300 text-yellow-700 bg-yellow-50 dark:bg-yellow-900/20 dark:text-yellow-500",
  Disable: "border-red-300 text-red-700 bg-red-50 dark:bg-red-900/20 dark:text-red-500",
};

export default function ViewPropertyPage({ params }) {
  const { id } = use(params);

  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  const handleUpdateStatus = async (newStatus) => {
    try {
      setActionLoading(true);
      await api.put(`/properties/${id}`, { status: newStatus });
      setProperty({ ...property, status: newStatus });
    } catch (err) {
      console.error("Failed to update status", err);
      alert("Failed to update property status");
    } finally {
      setActionLoading(false);
    }
  };

  const handleToggleFeatured = async () => {
    try {
      setActionLoading(true);
      const newFeaturedStatus = !property.isFeatured;
      await api.put(`/properties/${id}`, { isFeatured: newFeaturedStatus });
      setProperty({ ...property, isFeatured: newFeaturedStatus });
    } catch (err) {
      console.error("Failed to update featured status", err);
      alert("Failed to update featured status");
    } finally {
      setActionLoading(false);
    }
  };

  useEffect(() => {
    api.get(`/properties/${id}`)
      .then(res => {
        setProperty(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch property details", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div className="p-8 text-center text-muted-foreground">Loading property details...</div>;
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Back Button */}
      <div>
        <Button asChild variant="ghost" className="gap-2 -ml-2 text-muted-foreground hover:text-foreground">
          <Link href="/admin/properties">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Properties</span>
          </Link>
        </Button>
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">View Property Details</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Detailed information for the selected property listing.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
          {property?.status !== "Disable" && (
            <Button onClick={() => handleUpdateStatus("Disable")} disabled={actionLoading} variant="outline" className="text-red-600 border-red-200 hover:bg-red-50 dark:hover:bg-red-900/20">
              Disable
            </Button>
          )}
          {property?.status !== "Sold Out" && (
            <Button onClick={() => handleUpdateStatus("Sold Out")} disabled={actionLoading} variant="outline" className="text-blue-600 border-blue-200 hover:bg-blue-50 dark:hover:bg-blue-900/20">
              Sold Out
            </Button>
          )}
          {(property?.status === "Disable" || property?.status === "Sold Out") && (
            <Button onClick={() => handleUpdateStatus("Active")} disabled={actionLoading} variant="outline" className="text-green-600 border-green-200 hover:bg-green-50 dark:hover:bg-green-900/20">
              Mark Active
            </Button>
          )}
          <Button onClick={handleToggleFeatured} disabled={actionLoading} variant={property?.isFeatured ? "default" : "outline"} className={`gap-2 ${property?.isFeatured ? "bg-amber-500 hover:bg-amber-600 text-white border-transparent" : "text-amber-600 border-amber-200 hover:bg-amber-50 dark:hover:bg-amber-900/20"}`}>
            <Star className={`w-4 h-4 ${property?.isFeatured ? "fill-current" : ""}`} />
            {property?.isFeatured ? "Featured" : "Mark Featured"}
          </Button>
          <Button asChild className="flex items-center gap-2">
            <Link href={`/admin/properties/${id}`}>
              <Pencil className="w-4 h-4" />
              <span>Edit Property</span>
            </Link>
          </Button>
        </div>
      </div>

      {/* Details Container */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Thumbnail Column */}
        <div className="md:col-span-1 space-y-6">
          <div className="p-6 rounded-xl border border-border bg-card shadow-sm flex flex-col items-center justify-center gap-4">
            <img
              src={property?.thumbnail || "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=300&h=200&fit=crop"}
              alt={property?.title || "Property Thumbnail"}
              className="w-full aspect-[4/3] object-cover rounded-lg border border-border"
            />
            <Badge variant="outline" className={`w-full py-1 text-center justify-center font-semibold text-sm ${STATUS_COLORS[property?.status || "Active"]}`}>
              {property?.status || "Active"}
            </Badge>
          </div>

          <div className="p-6 rounded-xl border border-border bg-card shadow-sm space-y-4">
            <h3 className="text-sm font-semibold text-foreground flex items-center gap-2 border-b pb-2">
              <User className="w-4 h-4 text-primary" /> Contact Information
            </h3>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-muted shrink-0 border border-border/40">
                <img
                  src={property?.broker?.image || property?.user?.passportPhoto || `https://ui-avatars.com/api/?name=${encodeURIComponent(property?.broker?.name || property?.user?.name || 'User')}&background=e2e8f0&color=475569`}
                  alt="Contact"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="space-y-1">
                <div>
                  <span className="text-xs text-muted-foreground block">Broker Name</span>
                  <span className="text-sm font-medium">{property?.broker?.name || property?.user?.name || 'N/A'}</span>
                </div>
                <div>
                  <span className="text-xs text-muted-foreground block">Broker Phone</span>
                  <span className="text-sm font-medium">{property?.broker?.phone || property?.user?.phone || 'N/A'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Details Column */}
        <div className="md:col-span-2 p-6 rounded-xl border border-border bg-card shadow-sm space-y-6">
          <div>
            <h2 className="text-xl font-bold text-foreground leading-tight">
              {property?.title || "Untitled Property"}
            </h2>
            <p className="text-sm text-muted-foreground mt-1 flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-primary shrink-0" />
              {property?.locality ? `${property.locality}, ` : ''}{property?.city || 'Unknown City'}
              {property?.landmark && ` (Near ${property.landmark})`}
            </p>
          </div>

          <hr className="border-border" />

          <h3 className="font-semibold text-foreground">Basic Information & Pricing</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-4 gap-x-6">
            <div className="flex items-start gap-3">
              <Coins className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <span className="text-xs text-muted-foreground block font-medium">Price</span>
                <span className="text-base font-semibold text-amber-600 dark:text-amber-400">
                  {property?.price || "N/A"}
                </span>
                {property?.negotiable === "Yes" && <span className="text-[10px] block text-green-600">Negotiable</span>}
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Building className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <span className="text-xs text-muted-foreground block font-medium">Property Type</span>
                <span className="text-sm font-medium text-foreground">{property?.type || "N/A"}</span>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Briefcase className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <span className="text-xs text-muted-foreground block font-medium">Purpose</span>
                <span className="text-sm font-medium text-foreground">{property?.purpose || "N/A"}</span>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Layers className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <span className="text-xs text-muted-foreground block font-medium">Area</span>
                <span className="text-sm font-medium text-foreground">{property?.areaSize || "N/A"} {property?.areaUnit}</span>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Coins className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <span className="text-xs text-muted-foreground block font-medium">Maintenance</span>
                <span className="text-sm font-medium text-foreground">{property?.maintenanceCharge || "N/A"}</span>
              </div>
            </div>
          </div>

          <hr className="border-border" />

          <h3 className="font-semibold text-foreground">Property Specifications</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-4 gap-x-6">
            <div className="flex items-start gap-3">
              <Home className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <span className="text-xs text-muted-foreground block font-medium">Bedrooms</span>
                <span className="text-sm font-medium text-foreground">{property?.bedrooms || "N/A"}</span>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Home className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <span className="text-xs text-muted-foreground block font-medium">Bathrooms</span>
                <span className="text-sm font-medium text-foreground">{property?.bathrooms || "N/A"}</span>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Building className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <span className="text-xs text-muted-foreground block font-medium">Floor</span>
                <span className="text-sm font-medium text-foreground">{property?.floorNo || "N/A"} / {property?.totalFloors || "N/A"}</span>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Home className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <span className="text-xs text-muted-foreground block font-medium">Furnishing</span>
                <span className="text-sm font-medium text-foreground">{property?.furnishing || "N/A"}</span>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Car className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <span className="text-xs text-muted-foreground block font-medium">Parking</span>
                <span className="text-sm font-medium text-foreground">{property?.parking || "N/A"}</span>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Hash className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <span className="text-xs text-muted-foreground block font-medium">Facing</span>
                <span className="text-sm font-medium text-foreground">{property?.facing || "N/A"}</span>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <span className="text-xs text-muted-foreground block font-medium">Available From</span>
                <span className="text-sm font-medium text-foreground">{property?.availableFrom || "N/A"}</span>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <User className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <span className="text-xs text-muted-foreground block font-medium">Preferred For</span>
                <span className="text-sm font-medium text-foreground">{property?.preferredFor || "N/A"}</span>
              </div>
            </div>
          </div>

          <hr className="border-border" />

          {/* Description */}
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
              <FileText className="w-4 h-4 text-primary" /> Listing Description
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line bg-muted/30 p-4 rounded-lg">
              {property?.description || "No description provided."}
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}
