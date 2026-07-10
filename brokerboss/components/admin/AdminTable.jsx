"use client";

import { useState, useMemo } from "react";
import { ChevronLeft, ChevronRight, SearchX, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function AdminTable({ columns = [], data = [], defaultPageSize = 15, searchQuery = "", isLoading = false, onRowClick, rowClassName }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(defaultPageSize);

  // Filter data by searchQuery
  const filtered = useMemo(() => {
    if (!searchQuery.trim()) return data;
    const q = searchQuery.toLowerCase();
    return data.filter((row) =>
      columns.some((col) => {
        const val = row[col.key];
        return val !== undefined && String(val).toLowerCase().includes(q);
      })
    );
  }, [data, searchQuery, columns]);

  // Reset to page 1 when filtered changes
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const safePage = Math.min(currentPage, totalPages);
  const paginated = filtered.slice((safePage - 1) * pageSize, safePage * pageSize);

  const goToPage = (p) => setCurrentPage(Math.max(1, Math.min(p, totalPages)));

  // Loading state
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-muted-foreground gap-3">
        <Loader2 className="w-8 h-8 animate-spin text-primary opacity-80" />
        <p className="text-sm font-medium">Loading data...</p>
      </div>
    );
  }

  // Empty state
  if (filtered.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-muted-foreground gap-3">
        <SearchX className="w-10 h-10 opacity-40" />
        <p className="text-sm font-medium">No results found</p>
        {searchQuery && <p className="text-xs opacity-70">Try adjusting your search query</p>}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* ── Desktop Table ── */}
      <div className="hidden lg:block rounded-xl border border-border overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-muted/50 border-b border-border">
              {columns.map((col, ci) => (
                <th
                  key={`th-${col.key}-${ci}`}
                  className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider whitespace-nowrap"
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginated.map((row, i) => (
              <tr
                key={row.id ?? i}
                onClick={() => onRowClick && onRowClick(row)}
                className={`border-b border-border/50 last:border-0 hover:bg-muted/30 transition-colors ${onRowClick ? 'cursor-pointer' : ''} ${rowClassName ? rowClassName(row) : ''}`}
              >
                {columns.map((col, ci) => (
                  <td key={`td-${col.key}-${ci}`} className="px-4 py-3 text-foreground align-middle">
                    {col.render ? col.render(row[col.key], row) : (row[col.key] ?? "—")}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ── Mobile / Tablet Cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:hidden">
        {paginated.map((row, i) => (
          <Card 
            key={row.id ?? i} 
            onClick={() => onRowClick && onRowClick(row)}
            className={`overflow-hidden shadow-sm ${onRowClick ? 'cursor-pointer hover:bg-muted/30 transition-colors' : ''} ${rowClassName ? rowClassName(row) : ''}`}
          >
            <CardContent className="p-4 space-y-2.5">
              {columns.map((col, ci) => (
                <div
                  key={`card-${col.key}-${ci}`}
                  className={`flex items-start justify-between gap-2 ${
                    ci === 0 ? "pb-2 border-b border-border/50" : ""
                  }`}
                >
                  {ci === 0 ? (
                    <div className="font-semibold text-foreground text-base w-full">
                      {col.render ? col.render(row[col.key], row) : (row[col.key] ?? "—")}
                    </div>
                  ) : (
                    <>
                      <span className="text-xs text-muted-foreground shrink-0 pt-0.5 w-28">{col.label}</span>
                      <span className="text-sm text-foreground text-right">
                        {col.render ? col.render(row[col.key], row) : (row[col.key] ?? "—")}
                      </span>
                    </>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* ── Pagination ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4">
          <p className="text-xs text-muted-foreground">
            Showing {filtered.length === 0 ? 0 : (safePage - 1) * pageSize + 1}–{Math.min(safePage * pageSize, filtered.length)} of {filtered.length}
          </p>
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-muted-foreground">Rows per page:</span>
            <select
              className="text-xs border border-border rounded-md px-1.5 py-0.5 bg-card text-foreground cursor-pointer focus:outline-none focus:ring-1 focus:ring-primary"
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setCurrentPage(1);
              }}
            >
              <option value={15}>15</option>
              <option value={30}>30</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
          </div>
        </div>
        
        {totalPages > 1 && (
          <div className="flex items-center justify-center sm:justify-end gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => goToPage(safePage - 1)}
              disabled={safePage === 1}
              className="h-8 w-8 p-0"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <span className="text-xs font-medium text-muted-foreground px-1">
              Page {safePage} of {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => goToPage(safePage + 1)}
              disabled={safePage === totalPages}
              className="h-8 w-8 p-0"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
