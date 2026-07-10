"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search, Trash2, ShieldBan, ShieldCheck, Eye, Filter, RefreshCw } from "lucide-react";
import Link from "next/link";
import AdminTable from "@/components/admin/AdminTable";
import api from "@/lib/axios";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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


// ─── Cache helpers ─────────────────────────────────────────
const USERS_CACHE_KEY = 'bb_admin_users_cache';
const USERS_CACHE_TTL = 60 * 1000; // 1 minute

function readUsersCache() {
  try {
    const raw = sessionStorage.getItem(USERS_CACHE_KEY);
    if (!raw) return null;
    const { data, ts } = JSON.parse(raw);
    if (Date.now() - ts > USERS_CACHE_TTL) { sessionStorage.removeItem(USERS_CACHE_KEY); return null; }
    return data;
  } catch { return null; }
}
function writeUsersCache(data) {
  try { sessionStorage.setItem(USERS_CACHE_KEY, JSON.stringify({ data, ts: Date.now() })); } catch { }
}
function clearUsersCache() {
  try { sessionStorage.removeItem(USERS_CACHE_KEY); } catch { }
}

export default function UsersPage() {
  const router = useRouter();
  // Always start with server-safe defaults to avoid hydration mismatch
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [roleFilter, setRoleFilter] = useState("All");
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleteAllConfirm, setDeleteAllConfirm] = useState(false);
  const [toast, setToast] = useState(null);

  const fetchUsers = (force = false) => {
    const cached = !force && readUsersCache();
    if (cached) {
      setUsers(cached);
      setIsLoading(false);
      // Refresh in background silently
      api.get('/users').then(res => { setUsers(res.data); writeUsersCache(res.data); }).catch(() => { });
      return;
    }
    setIsLoading(true);
    api.get('/users').then(res => { setUsers(res.data); writeUsersCache(res.data); }).catch(console.error).finally(() => setIsLoading(false));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleBlock = (userId) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === userId
          ? { ...u, status: u.status === "Active" ? "Blocked" : "Active" }
          : u
      )
    );
  };

  const handleDelete = () => {
    api.delete(`/users/${deleteTarget.id || deleteTarget._id}`).then(() => {
      setUsers((prev) => prev.filter((u) => u.id !== deleteTarget.id));
      clearUsersCache();
      showToast(`User "${deleteTarget.username}" deleted successfully.`);
      setDeleteTarget(null);
    }).catch(console.error);
  };

  const handleDeleteAll = () => {
    api.delete('/users').then(() => {
      setUsers([]);
      clearUsersCache();
      showToast('All users deleted successfully.');
      setDeleteAllConfirm(false);
    }).catch(console.error);
  };

  // Filter users by role before passing to AdminTable
  const filteredData =
    roleFilter === "All"
      ? users
      : users.filter((u) => u.role === roleFilter.toLowerCase());

  const USERS_COLUMNS = [
    {
      key: "username",
      label: "User",
      render: (val, row) => {
        const photoUrl = row.passportPhoto || row.image;
        return (
          <div className="flex items-center gap-2.5">
            <Avatar className="w-8 h-8 shrink-0">
              {photoUrl ? (
                <img
                  src={photoUrl.startsWith('http') || photoUrl.startsWith('data:') ? photoUrl : `/${photoUrl}`}
                  alt={val}
                  className="w-full h-full object-cover object-top rounded-full"
                />
              ) : (
                <AvatarFallback className="text-xs bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 font-semibold">
                  {row.avatar || val?.[0] || 'U'}
                </AvatarFallback>
              )}
            </Avatar>
            <span className="font-medium text-foreground">{val}</span>
          </div>
        );
      },
    },
    { key: "phone", label: "Mobile No." },
    { key: "location", label: "Location" },
    {
      key: "propertiesListed",
      label: "Properties",
      render: (val) => (
        <span className="font-semibold text-amber-600 dark:text-amber-400">{val}</span>
      ),
    },
    {
      key: "role",
      label: "User Type",
      render: (val) => {
        const role = val?.toLowerCase();
        let badgeStyle = "bg-primary/10 text-primary border-primary/20";

        if (role === "buyer") {
          badgeStyle = "bg-green-100 text-green-800 border-green-300 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800";
        }

        return (
          <Badge
            variant="outline"
            className={`capitalize ${badgeStyle}`}
          >
            {val}
          </Badge>
        );
      },
    },
    {
      key: "actions",
      label: "Actions",
      render: (_, row) => (
        <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
          <Button
            size="sm"
            variant="outline"
            className="h-7 text-xs gap-1.5"
            asChild
          >
            <Link href={`/admin/users/${row.id}`}>
              <Eye className="w-3.5 h-3.5" /> View
            </Link>
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="h-7 text-xs gap-1.5"
            onClick={() => handleBlock(row.id)}
          >
            {row.status === "Active" ? (
              <>
                <ShieldBan className="w-3.5 h-3.5" /> Block
              </>
            ) : (
              <>
                <ShieldCheck className="w-3.5 h-3.5" /> Unblock
              </>
            )}
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Users</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            {users.length} registered users
          </p>
        </div>
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <Button onClick={() => fetchUsers(true)} variant="outline" className="flex items-center gap-2">
            <RefreshCw className="w-4 h-4" />
            <span>Refresh</span>
          </Button>
          <Button onClick={() => setDeleteAllConfirm(true)} variant="outline" className="flex items-center gap-2 text-red-600 border-red-200 hover:bg-red-50 dark:hover:bg-red-900/20">
            <Trash2 className="w-4 h-4" />
            <span>Delete All</span>
          </Button>
        </div>
      </div>

      {/* Filters Row */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by name or mobile…"
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select value={roleFilter} onValueChange={setRoleFilter}>
          <SelectTrigger className="w-40 gap-2">
            <Filter className="w-4 h-4 text-muted-foreground shrink-0" />
            <SelectValue placeholder="Role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Roles</SelectItem>
            <SelectItem value="broker">Broker</SelectItem>
            <SelectItem value="owner">Owner</SelectItem>
            <SelectItem value="buyer">Buyer</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <AdminTable
        columns={USERS_COLUMNS}
        data={filteredData}
        searchQuery={searchQuery}
        isLoading={isLoading}
        onRowClick={(row) => router.push(`/admin/users/${row.id}`)}
        rowClassName={(row) => row.role === 'buyer' ? 'bg-green-50/50 dark:bg-green-950/20' : ''}
      />

      {/* Delete Confirmation Dialog */}
      <Dialog open={!!deleteTarget} onOpenChange={() => setDeleteTarget(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete User</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete user{" "}
              <strong>{deleteTarget?.username}</strong>? This action cannot be
              undone.
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
              Delete User
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete All Confirmation Dialog */}
      <Dialog open={deleteAllConfirm} onOpenChange={setDeleteAllConfirm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete All Users</DialogTitle>
            <DialogDescription>
              Are you absolutely sure you want to delete <strong>ALL</strong> users? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setDeleteAllConfirm(false)}>
              Cancel
            </Button>
            <Button
              className="bg-red-600 hover:bg-red-700 text-white"
              onClick={handleDeleteAll}
            >
              Yes, Delete All
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-foreground text-background text-sm px-4 py-2.5 rounded-xl shadow-lg animate-in slide-in-from-bottom-4 duration-300">
          {toast}
        </div>
      )}
    </div>
  );
}
