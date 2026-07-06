"use client";

import { useState, useEffect } from "react";
import { Search, Trash2, Pause, Play, Eye, Pencil, Plus } from "lucide-react";
import Link from "next/link";
import AdminTable from "@/components/admin/AdminTable";
import api from "@/lib/axios";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";

const STATUS_COLORS = {
  Active: "border-green-300 text-green-700 bg-green-50 dark:bg-green-900/20 dark:text-green-400",
  Paused: "border-yellow-300 text-yellow-700 bg-yellow-50 dark:bg-yellow-900/20 dark:text-yellow-500",
  Expired: "border-gray-300 text-gray-500 bg-gray-50 dark:bg-gray-900/20 dark:text-gray-400",
};

const FORMAT_COLORS = {
  Banner: "border-blue-300 text-blue-700 bg-blue-50 dark:bg-blue-900/20 dark:text-blue-400",
  Story: "border-purple-300 text-purple-700 bg-purple-50 dark:bg-purple-900/20 dark:text-purple-400",
  'Sponsored Property': "border-amber-300 text-amber-700 bg-amber-50 dark:bg-amber-900/20 dark:text-amber-400",
  'Sidebar Ad': "border-indigo-300 text-indigo-700 bg-indigo-50 dark:bg-indigo-900/20 dark:text-indigo-400"
};

export default function AdsPage() {
  const [ads, setAds] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    api.get('/ads')
      .then(res => {
        const formatted = res.data.map(ad => ({
          ...ad,
          id: ad._id,
          format: ad.type,
          owner: ad.owner || "Admin",
          expiryDate: "N/A"
        }));
        setAds(formatted);
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }, []);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleToggle = (adId) => {
    setAds((prev) =>
      prev.map((a) =>
        a.id === adId
          ? { ...a, status: a.status === "Active" ? "Paused" : "Active" }
          : a
      )
    );
  };

  const handleDelete = () => {
    setAds((prev) => prev.filter((a) => a.id !== deleteTarget.id));
    showToast(`Ad "${deleteTarget.title}" deleted.`);
    setDeleteTarget(null);
  };

  const ADS_COLUMNS = [
    { key: "id", label: "ID" },
    { key: "title", label: "Title", render: (val) => <span className="font-medium">{val}</span> },
    {
      key: "format",
      label: "Format",
      render: (val) => (
        <Badge variant="outline" className={FORMAT_COLORS[val]}>
          {val}
        </Badge>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (val) => (
        <Badge variant="outline" className={STATUS_COLORS[val]}>
          {val}
        </Badge>
      ),
    },
    {
      key: "impressions",
      label: "Impressions",
      render: (val) => <span className="font-semibold">{val.toLocaleString("en-IN")}</span>,
    },
    {
      key: "clicks",
      label: "Clicks",
      render: (val) => <span className="font-semibold">{val.toLocaleString("en-IN")}</span>,
    },
    {
      key: "ctr",
      label: "CTR %",
      render: (_val, row) => (
        <span className="font-semibold text-amber-600 dark:text-amber-400">
          {((row.clicks / row.impressions) * 100).toFixed(1)}%
        </span>
      ),
    },
    { key: "owner", label: "Owner" },
    { key: "expiryDate", label: "Expires" },
    {
      key: "actions",
      label: "Actions",
      render: (_, row) => (
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            className="h-7 text-xs gap-1.5"
            asChild
          >
            <Link href={`/admin/ads/view/${row.id}`}>
              <Eye className="w-3.5 h-3.5" /> View
            </Link>
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="h-7 text-xs gap-1.5 border-amber-200 hover:bg-amber-50 dark:hover:bg-amber-900/20 text-amber-600"
            asChild
          >
            <Link href={`/admin/ads/edit/${row.id}`}>
              <Pencil className="w-3.5 h-3.5" /> Edit
            </Link>
          </Button>
          {row.status !== "Expired" && (
            <Button
              size="sm"
              variant="outline"
              className="h-7 text-xs gap-1.5"
              onClick={() => handleToggle(row.id)}
            >
              {row.status === "Active" ? (
                <><Pause className="w-3.5 h-3.5" /> Pause</>
              ) : (
                <><Play className="w-3.5 h-3.5" /> Activate</>
              )}
            </Button>
          )}
          <Button
            size="sm"
            variant="outline"
            className="h-7 text-xs gap-1.5 text-red-600 border-red-200 hover:bg-red-50 dark:hover:bg-red-900/20"
            onClick={() => setDeleteTarget(row)}
          >
            <Trash2 className="w-3.5 h-3.5" /> Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Ads</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Manage ad creatives and monitor performance
          </p>
        </div>
        <Button asChild className="flex items-center gap-2 self-start sm:self-auto">
          <Link href="/admin/ads/newAd">
            <Plus className="w-4 h-4" />
            <span>New Ad Post</span>
          </Link>
        </Button>
      </div>

      {/* ── Ads Table ── */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <h2 className="text-base font-semibold text-foreground">
            All Ads ({ads.length})
          </h2>
          <div className="relative max-w-sm w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search ads…"
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <AdminTable
          columns={ADS_COLUMNS}
          data={ads}
          searchQuery={searchQuery}
          isLoading={isLoading}
          pageSize={10}
        />
      </div>

      {/* Delete Dialog */}
      <Dialog open={!!deleteTarget} onOpenChange={() => setDeleteTarget(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Ad</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete{" "}
              <strong>{deleteTarget?.title}</strong>? This cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setDeleteTarget(null)}>
              Cancel
            </Button>
            <Button
              className="bg-red-600 hover:bg-red-700 text-white"
              onClick={handleDelete}
            >
              Delete Ad
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-foreground text-background text-sm px-4 py-2.5 rounded-xl shadow-lg animate-in slide-in-from-bottom-4 duration-300">
          {toast}
        </div>
      )}
    </div>
  );
}
