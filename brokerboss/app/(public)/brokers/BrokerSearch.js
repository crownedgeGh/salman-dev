'use client'; // Force rebuild to clear hydration cache

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
        <div className="relative w-full max-w-[280px] sm:max-w-[320px] md:max-w-md flex-1">
          {isPending ? (
            <Loader2 className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4 animate-spin" />
          ) : (
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
          )}
          <input
            id="broker-search-input"
            type="text"
            placeholder="Search by name…"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="w-full pl-10 pr-10 py-2.5 bg-background border border-border/60 hover:border-primary/50 focus:border-primary focus:ring-1 focus:ring-primary rounded-xl transition-all shadow-sm text-sm outline-none"
          />
          {inputValue && (
            <button onClick={() => setInputValue('')} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* ── Experience Filter ── */}
        <div className="relative w-[140px] sm:w-[160px] shrink-0">
          <SlidersHorizontal className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <select
            id="broker-exp-filter"
            value={currentExp}
            onChange={(e) => handleExp(e.target.value)}
            className="appearance-none w-full pl-10 pr-8 py-2.5 bg-background border border-border/60 hover:border-primary/50 focus:border-primary focus:ring-1 focus:ring-primary rounded-xl transition-all shadow-sm text-sm cursor-pointer outline-none text-foreground"
            aria-label="Filter by experience"
          >
            {EXPERIENCE_FILTERS.map((f) => (
              <option key={f.value} value={f.value}>{f.label}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4 pointer-events-none" />
        </div>

        {/* ── Clear ── */}
        {hasFilters && (
          <button
            onClick={handleClear}
            disabled={isPending}
            className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl border border-border/60 bg-background text-sm font-medium text-muted-foreground hover:text-destructive hover:border-destructive hover:bg-destructive/5 shadow-sm transition-all duration-200 disabled:opacity-50 shrink-0"
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
