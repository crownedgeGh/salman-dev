'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useCallback, useTransition, useState, useEffect } from 'react';
import { Search, SlidersHorizontal, ChevronDown, Loader2, X } from 'lucide-react';

const EXPERIENCE_FILTERS = [
  { label: 'By Experience', value: '' },
  { label: '0 – 2 Years', value: '0-2' },
  { label: '3 – 5 Years', value: '3-5' },
  { label: '6 – 10 Years', value: '6-10' },
  { label: '10+ Years', value: '10+' },
];

export default function BrokerSearch({ initialSearch = '', initialExp = '' }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [inputValue, setInputValue] = useState(searchParams.get('search') ?? initialSearch);
  const currentExp = searchParams.get('exp') ?? initialExp;
  const hasFilters = inputValue || currentExp;

  const createQS = useCallback((updates) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([k, v]) => v ? params.set(k, v) : params.delete(k));
    params.delete('page');
    return params.toString();
  }, [searchParams]);

  useEffect(() => {
    const t = setTimeout(() => {
      startTransition(() =>
        router.push(`${pathname}?${createQS({ search: inputValue })}`)
      );
    }, 400);
    return () => clearTimeout(t);
  }, [inputValue]);

  const handleExp = (v) =>
    startTransition(() => router.push(`${pathname}?${createQS({ exp: v })}`));

  const handleClear = () => {
    setInputValue('');
    startTransition(() => router.push(pathname));
  };

  return (
    <div className="mb-8">
      <div className="flex items-center gap-3 flex-wrap">

        {/* ── Search ── */}
        <div className="flex items-center gap-2.5 px-4 py-3 bg-white dark:bg-card border border-border rounded-2xl shadow-sm w-80 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/15 transition-all duration-200">
          {isPending
            ? <Loader2 size={16} className="text-muted-foreground shrink-0 animate-spin" />
            : <Search size={16} className="text-muted-foreground shrink-0" />
          }
          <input
            id="broker-search-input"
            type="text"
            placeholder="Search by name…"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="flex-1 min-w-0 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
          />
          {inputValue && (
            <button onClick={() => setInputValue('')} className="text-muted-foreground hover:text-foreground transition-colors shrink-0">
              <X size={14} />
            </button>
          )}
        </div>

        {/* ── Experience Filter ── */}
        <div className="relative flex items-center gap-2.5 px-4 py-3 bg-white dark:bg-card border border-border rounded-2xl shadow-sm focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/15 transition-all duration-200">
          <SlidersHorizontal size={15} className="text-muted-foreground shrink-0" />
          <select
            id="broker-exp-filter"
            value={currentExp}
            onChange={(e) => handleExp(e.target.value)}
            className="appearance-none bg-transparent text-sm text-foreground outline-none cursor-pointer pr-5 w-36"
            aria-label="Filter by experience"
          >
            {EXPERIENCE_FILTERS.map((f) => (
              <option key={f.value} value={f.value}>{f.label}</option>
            ))}
          </select>
          <ChevronDown size={14} className="text-muted-foreground pointer-events-none absolute right-1 top-1/2 -translate-y-1/2" />
        </div>

        {/* ── Clear ── */}
        {hasFilters && (
          <button
            onClick={handleClear}
            disabled={isPending}
            className="flex items-center gap-1.5 px-4 py-3 rounded-2xl border border-border bg-white dark:bg-card text-sm text-muted-foreground hover:text-destructive hover:border-destructive hover:bg-destructive/5 shadow-sm transition-all duration-200 disabled:opacity-50"
          >
            <X size={14} />
            Clear
          </button>
        )}
      </div>

      {/* ── Active pills ── */}
      {(searchParams.get('search') || currentExp) && (
        <div className="flex flex-wrap gap-2 items-center mt-3">
          <span className="text-xs text-muted-foreground">Active:</span>
          {searchParams.get('search') && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
              Name: <strong>{searchParams.get('search')}</strong>
            </span>
          )}
          {currentExp && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
              {EXPERIENCE_FILTERS.find(f => f.value === currentExp)?.label}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
