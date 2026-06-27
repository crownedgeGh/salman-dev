"use client";

import { use } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  User,
  MapPin,
  Building,
  Calendar,
  FileText,
  Coins,
  Pencil
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MOCK_PROPERTIES } from "@/data/adminMock";

const STATUS_COLORS = {
  Active: "border-green-300 text-green-700 bg-green-50 dark:bg-green-900/20 dark:text-green-400",
  Sold: "border-gray-300 text-gray-600 bg-gray-50 dark:bg-gray-900/20 dark:text-gray-400",
  Pending: "border-yellow-300 text-yellow-700 bg-yellow-50 dark:bg-yellow-900/20 dark:text-yellow-500",
};

export default function ViewPropertyPage({ params }) {
  const { id } = use(params);
  const propertyId = parseInt(id, 10);

  // Find the property in the mock list
  const property = MOCK_PROPERTIES.find((p) => p.id === propertyId) || MOCK_PROPERTIES[0];

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
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

        {/* Edit Button */}
        <Button asChild className="flex items-center gap-2 self-start sm:self-auto">
          <Link href={`/admin/properties/${property?.id}`}>
            <Pencil className="w-4 h-4" />
            <span>Edit Property</span>
          </Link>
        </Button>
      </div>

      {/* Details Container */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Thumbnail Column */}
        <div className="md:col-span-1 p-6 rounded-xl border border-border bg-card shadow-sm flex flex-col items-center justify-center gap-4">
          <img
            src={property?.thumbnail || "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=300&h=200&fit=crop"}
            alt={property?.title}
            className="w-full aspect-[4/3] object-cover rounded-lg border border-border"
          />
          <Badge variant="outline" className={`w-full py-1 text-center justify-center font-semibold text-sm ${STATUS_COLORS[property?.status]}`}>
            {property?.status}
          </Badge>
        </div>

        {/* Details Column */}
        <div className="md:col-span-2 p-6 rounded-xl border border-border bg-card shadow-sm space-y-6">
          <div>
            <h2 className="text-xl font-bold text-foreground leading-tight">
              {property?.title}
            </h2>
            <p className="text-sm text-muted-foreground mt-1 flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-primary shrink-0" />
              {property?.location}
            </p>
          </div>

          <hr className="border-border" />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6">
            
            {/* Price */}
            <div className="flex items-start gap-3">
              <Coins className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <span className="text-xs text-muted-foreground block font-medium">Price / Budget</span>
                <span className="text-base font-semibold text-amber-600 dark:text-amber-400">
                  {property?.price}
                </span>
              </div>
            </div>

            {/* Type */}
            <div className="flex items-start gap-3">
              <Building className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <span className="text-xs text-muted-foreground block font-medium">Property Type</span>
                <span className="text-base font-medium text-foreground">
                  {property?.type}
                </span>
              </div>
            </div>

            {/* Owner / Lister */}
            <div className="flex items-start gap-3">
              <User className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <span className="text-xs text-muted-foreground block font-medium">Owner / Lister</span>
                <span className="text-base font-medium text-foreground">
                  @{property?.owner}
                </span>
              </div>
            </div>

            {/* Listed On */}
            <div className="flex items-start gap-3">
              <Calendar className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <span className="text-xs text-muted-foreground block font-medium">Date Listed</span>
                <span className="text-base font-medium text-foreground">
                  {property?.dateListed}
                </span>
              </div>
            </div>

          </div>

          <hr className="border-border" />

          {/* Description Placeholder */}
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
              <FileText className="w-4 h-4 text-primary" /> Listing Description
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              This property is listed as active and located in {property?.location}. 
              For further queries or negotiation regarding this {property?.type.toLowerCase()}, 
              please contact the owner @{property?.owner}.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}
