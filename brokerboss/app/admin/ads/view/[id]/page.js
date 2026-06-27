"use client";

import { use } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  User,
  Calendar,
  FileText,
  Megaphone,
  Pencil,
  BarChart3,
  MousePointerClick,
  Percent,
  Eye
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MOCK_ADS } from "@/data/adminMock";

const STATUS_COLORS = {
  Active: "border-green-300 text-green-700 bg-green-50 dark:bg-green-900/20 dark:text-green-400",
  Paused: "border-yellow-300 text-yellow-700 bg-yellow-50 dark:bg-yellow-900/20 dark:text-yellow-500",
  Expired: "border-gray-300 text-gray-500 bg-gray-50 dark:bg-gray-900/20 dark:text-gray-400",
};

const FORMAT_COLORS = {
  Banner: "border-blue-300 text-blue-700 bg-blue-50 dark:bg-blue-900/20 dark:text-blue-400",
  Story: "border-purple-300 text-purple-700 bg-purple-50 dark:bg-purple-900/20 dark:text-purple-400",
};

export default function ViewAdPage({ params }) {
  const { id } = use(params);
  const adId = parseInt(id, 10);

  // Find dynamic ad or default to first mock ad
  const ad = MOCK_ADS.find((a) => a.id === adId) || MOCK_ADS[0];

  const ctr = ad ? ((ad.clicks / ad.impressions) * 100).toFixed(1) : "0.0";

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Back Button */}
      <div>
        <Button asChild variant="ghost" className="gap-2 -ml-2 text-muted-foreground hover:text-foreground">
          <Link href="/admin/ads">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Ads</span>
          </Link>
        </Button>
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">View Ad Details</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Monitor and review parameters of: <strong className="text-foreground">{ad?.title}</strong>
          </p>
        </div>

        {/* Edit Link */}
        <Button asChild className="flex items-center gap-2 self-start sm:self-auto">
          <Link href={`/admin/ads/edit/${ad?.id}`}>
            <Pencil className="w-4 h-4" />
            <span>Edit Ad Settings</span>
          </Link>
        </Button>
      </div>

      {/* Details Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Ad Graphic Preview Column */}
        <div className="md:col-span-1 p-6 rounded-xl border border-border bg-card shadow-sm flex flex-col gap-4">
          <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
            <FileText className="w-4 h-4 text-primary" /> Creative Preview
          </h3>
          <div className="w-full bg-muted border border-border rounded-lg overflow-hidden flex items-center justify-center">
            {ad?.format === "Banner" ? (
              <div className="w-full aspect-[16/9] relative bg-cover bg-center flex items-center justify-center" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=500&h=280&fit=crop')` }}>
                <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-3 text-white">
                  <span className="text-[10px] font-bold tracking-widest uppercase text-amber-400">16:9 Banner</span>
                  <h4 className="text-sm font-bold line-clamp-1">{ad?.title}</h4>
                </div>
              </div>
            ) : (
              <div className="w-[180px] aspect-[9/16] relative bg-cover bg-center flex items-center justify-center my-2" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=280&h=500&fit=crop')` }}>
                <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-3 text-white">
                  <span className="text-[10px] font-bold tracking-widest uppercase text-amber-400">9:16 Story</span>
                  <h4 className="text-xs font-bold line-clamp-2">{ad?.title}</h4>
                </div>
              </div>
            )}
          </div>
          <div className="flex gap-2">
            <Badge variant="outline" className={`flex-1 py-1 text-center justify-center ${STATUS_COLORS[ad?.status]}`}>
              {ad?.status}
            </Badge>
            <Badge variant="outline" className={`flex-1 py-1 text-center justify-center ${FORMAT_COLORS[ad?.format]}`}>
              {ad?.format}
            </Badge>
          </div>
        </div>

        {/* Ad stats Column */}
        <div className="md:col-span-2 p-6 rounded-xl border border-border bg-card shadow-sm space-y-6">
          <h3 className="text-base font-semibold text-foreground border-b border-border pb-2">
            Ad Details & Performance
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6">
            
            {/* Title */}
            <div className="flex items-start gap-3 col-span-1 sm:col-span-2">
              <Megaphone className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <span className="text-xs text-muted-foreground block font-medium">Ad Campaign Title</span>
                <span className="text-base font-bold text-foreground">{ad?.title}</span>
              </div>
            </div>

            {/* Owner */}
            <div className="flex items-start gap-3">
              <User className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <span className="text-xs text-muted-foreground block font-medium">Advertiser / Owner</span>
                <span className="text-sm font-medium text-foreground">@{ad?.owner}</span>
              </div>
            </div>

            {/* Expiry Date */}
            <div className="flex items-start gap-3">
              <Calendar className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <span className="text-xs text-muted-foreground block font-medium">Expires On</span>
                <span className="text-sm font-medium text-foreground">{ad?.expiryDate}</span>
              </div>
            </div>

          </div>

          <hr className="border-border" />

          {/* Performance Grid */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-primary" /> Metrics Overview
            </h4>
            
            <div className="grid grid-cols-3 gap-4">
              
              {/* Impressions */}
              <div className="p-3.5 bg-muted/40 border border-border/60 rounded-xl space-y-1">
                <span className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider flex items-center gap-1">
                  <Eye className="w-3 h-3 text-blue-500" /> Impressions
                </span>
                <div className="text-lg font-bold text-foreground">
                  {ad?.impressions.toLocaleString("en-IN")}
                </div>
              </div>

              {/* Clicks */}
              <div className="p-3.5 bg-muted/40 border border-border/60 rounded-xl space-y-1">
                <span className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider flex items-center gap-1">
                  <MousePointerClick className="w-3 h-3 text-green-500" /> Clicks
                </span>
                <div className="text-lg font-bold text-foreground">
                  {ad?.clicks.toLocaleString("en-IN")}
                </div>
              </div>

              {/* CTR */}
              <div className="p-3.5 bg-muted/40 border border-border/60 rounded-xl space-y-1">
                <span className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider flex items-center gap-1">
                  <Percent className="w-3 h-3 text-amber-500" /> CTR %
                </span>
                <div className="text-lg font-bold text-amber-600 dark:text-amber-400">
                  {ctr}%
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
