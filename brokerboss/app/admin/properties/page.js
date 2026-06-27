"use client";

import { useState } from "react";
import { Search, Trash2, ExternalLink, Filter } from "lucide-react";
import AdminTable from "@/components/admin/AdminTable";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { MOCK_PROPERTIES } from "@/data/adminMock";

const STATUS_COLORS = {
  Active: "border-green-300 text-green-700 bg-green-50 dark:bg-green-900/20 dark:text-green-400",
  Sold: "border-gray-300 text-gray-600 bg-gray-50 dark:bg-gray-900/20 dark:text-gray-400",
  Pending: "border-yellow-300 text-yellow-700 bg-yellow-50 dark:bg-yellow-900/20 dark:text-yellow-500",
};

export default function PropertiesPage() {
  const [properties, setProperties] = useState(MOCK_PROPERTIES);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [toast, setToast] = useState(null);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleDelete = () => {
    setProperties((prev) => prev.filter((p) => p.id !== deleteTarget.id));
    showToast(`Property "${deleteTarget.title}" deleted.`);
    setDeleteTarget(null);
  };

  // Apply status filter before passing to AdminTable
  const filteredData =
    statusFilter === "All"
      ? properties
      : properties.filter((p) => p.status === statusFilter);

  const PROPERTIES_COLUMNS = [
    {
      key: "title",
      label: "Property",
      render: (val, row) => (
        <div className="flex items-center gap-3">
          <img
            src={row.thumbnail}
            alt={val}
            className="w-12 h-9 object-cover rounded-lg shrink-0 border border-border"
          />
          <span className="font-medium text-foreground line-clamp-1 max-w-[180px]">{val}</span>
        </div>
      ),
    },
    { key: "type", label: "Type" },
    { key: "location", label: "Location" },
    {
      key: "price",
      label: "Price",
      render: (val) => (
        <span className="font-semibold text-amber-600 dark:text-amber-400">{val}</span>
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
    { key: "owner", label: "Owner" },
    { key: "dateListed", label: "Listed On" },
    {
      key: "actions",
      label: "Actions",
      render: (val, row) => (
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            className="h-7 text-xs gap-1.5"
            onClick={() => window.open(`/properties/${val}`, "_blank")}
          >
            <ExternalLink className="w-3.5 h-3.5" /> View
          </Button>
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
    <div className="space-y-5">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Properties</h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          {properties.length} listings in total
        </p>
      </div>

      {/* Filters row */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by title or location…"
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-40 gap-2">
            <Filter className="w-4 h-4 text-muted-foreground shrink-0" />
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Status</SelectItem>
            <SelectItem value="Active">Active</SelectItem>
            <SelectItem value="Sold">Sold</SelectItem>
            <SelectItem value="Pending">Pending</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <AdminTable
        columns={PROPERTIES_COLUMNS}
        data={filteredData}
        searchQuery={searchQuery}
        pageSize={10}
      />

      {/* Delete Dialog */}
      <Dialog open={!!deleteTarget} onOpenChange={() => setDeleteTarget(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Property</DialogTitle>
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
              Delete Property
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
