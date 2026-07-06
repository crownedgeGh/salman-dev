'use client';

import { useState, useMemo, useEffect, useCallback } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import api from '@/lib/axios';
import PropertyGrid from '@/components/PropertyGrid';
import FilterSidebar from '@/components/FilterSidebar';
import FilterSheet from '@/components/FilterSheet';
import {
  FaSearch, FaTimes, FaHome, FaBuilding, FaChartArea, FaStore,
  FaMapMarkerAlt, FaArrowRight, FaWarehouse, FaTag, FaBolt,
} from 'react-icons/fa';

// ─── constants ───────────────────────────────────────────────
const defaultFilters = {
  type: '',
  purpose: '',
  locality: '',
  priceMin: '',
  priceMax: '',
};

const LOCALITIES = [
  'Shankar Nagar', 'Telibandha', 'Pandri', 'Mowa',
  'VIP Road', 'Khamardih', 'Avanti Vihar', 'Pachpedi Naka',
];

const QUICK_TYPES = [
  { label: 'House', icon: FaHome, type: 'House' },
  { label: 'Flat', icon: FaBuilding, type: 'Flat' },
  { label: 'Office', icon: FaBuilding, type: 'Office' },
  { label: 'Warehouse', icon: FaWarehouse, type: 'Warehouse' },
];

// ─── price helper ─────────────────────────────────────────────
function parsePriceLakh(priceStr) {
  if (!priceStr) return null;
  const str = String(priceStr).toLowerCase().replace(/[₹,]/g, '');
  if (str.includes('crore') || str.includes('cr')) return parseFloat(str) * 100;
  if (str.includes('lakh') || str.includes('l')) return parseFloat(str);
  if (str.includes('/mo') || str.includes('month')) return null;
  return parseFloat(str);
}

// ─── Discovery UI ─────────────────────────────────────────────
function DiscoveryState({ onFilterChange, onSearch, properties }) {
  const INTENT_TILES = [
    {
      label: 'Buy a Property',
      sub: 'Houses, Flats & Villas for sale',
      filter: { purpose: 'Sale', type: '' },
      icon: FaHome,
      gradient: 'from-blue-500 to-blue-700',
      count: properties.filter((p) => p.purpose === 'Sale').length,
    },
    {
      label: 'Rent a Property',
      sub: 'Monthly rental listings',
      filter: { purpose: 'Rent', type: '' },
      icon: FaTag,
      gradient: 'from-amber-500 to-amber-700',
      count: properties.filter((p) => p.purpose === 'Rent').length,
    },
    {
      label: 'Buy a Plot',
      sub: 'Residential & commercial land',
      filter: { type: 'Plot', purpose: '' },
      icon: FaChartArea,
      gradient: 'from-emerald-500 to-emerald-700',
      count: properties.filter((p) => p.type === 'Plot').length,
    },
  ];

  return (
    <div className="animate-in fade-in duration-300">
      {/* Big intent question */}
      <div className="text-center mb-8 md:mb-10">
        <p className="text-xs font-semibold tracking-widest text-primary uppercase mb-2">Raipur's Property Marketplace</p>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-foreground">
          What are you looking for?
        </h1>
        <p className="text-muted-foreground text-sm mt-2">
          Choose a category below to explore verified listings
        </p>
      </div>

      {/* ── 3 Intent Tiles ── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 mb-10">
        {INTENT_TILES.map(({ label, sub, filter, icon: Icon, gradient, count }) => (
          <button
            key={label}
            onClick={() => onFilterChange(filter)}
            className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br ${gradient} text-white p-5 md:p-6 text-left hover:scale-[1.03] active:scale-[0.98] transition-all duration-200 shadow-lg hover:shadow-xl`}
          >
            {/* Decorative blob */}
            <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full bg-white/10 group-hover:scale-150 transition-transform duration-500" />
            <div className="absolute -bottom-6 -left-4 w-16 h-16 rounded-full bg-white/5" />

            <Icon className="h-8 w-8 md:h-10 md:w-10 mb-3 relative z-10 opacity-90" />
            <p className="font-extrabold text-base md:text-lg leading-tight relative z-10">{label}</p>
            <p className="text-white/70 text-xs mt-1 relative z-10">{sub}</p>
            <div className="mt-3 inline-flex items-center gap-1 bg-white/20 text-white text-xs font-semibold px-2.5 py-1 rounded-full relative z-10">
              <FaBolt className="h-2.5 w-2.5" />
              {count} listings
            </div>
          </button>
        ))}
      </div>

      {/* ── Popular Localities ── */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-base md:text-lg flex items-center gap-2">
            <FaMapMarkerAlt className="h-4 w-4 text-primary" />
            Popular Localities
          </h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 md:gap-3">
          {LOCALITIES.map((loc) => {
            const count = properties.filter((p) => p.locality === loc).length;
            return (
              <button
                key={loc}
                onClick={() => onFilterChange({ locality: loc })}
                className="group flex items-center justify-between bg-background border border-border/60 hover:border-primary hover:bg-primary/5 rounded-xl px-4 py-3 transition-all duration-150 text-left"
              >
                <div>
                  <p className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors">{loc}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{count} propert{count === 1 ? 'y' : 'ies'}</p>
                </div>
                <FaArrowRight className="h-3 w-3 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Quick type pills ── */}
      <div className="mb-8">
        <h2 className="font-bold text-base md:text-lg mb-4">Browse by Type</h2>
        <div className="flex flex-wrap gap-2">
          {QUICK_TYPES.map(({ label, icon: Icon, type }) => (
            <button
              key={type}
              onClick={() => onFilterChange({ type })}
              className="flex items-center gap-2 border border-border rounded-full px-4 py-2 text-sm font-medium text-muted-foreground hover:border-primary hover:text-primary hover:bg-primary/5 transition-all"
            >
              <Icon className="h-3.5 w-3.5" />
              {label}
            </button>
          ))}
          {/* Browse all */}
          <button
            onClick={() => onSearch('house')}
            className="flex items-center gap-2 bg-primary text-primary-foreground rounded-full px-4 py-2 text-sm font-medium hover:bg-primary/90 transition-all"
          >
            <FaSearch className="h-3.5 w-3.5" />
            Show All
          </button>
        </div>
      </div>

      {/* ── Stats strip ── */}
      <div className="grid grid-cols-3 gap-3 border-t border-border/50 pt-8">
        {[
          { value: `${properties.filter(p => p.purpose === 'Sale').length}`, label: 'For Sale' },
          { value: `${properties.filter(p => p.purpose === 'Rent').length}`, label: 'For Rent' },
          { value: `${new Set(properties.map(p => p.locality)).size}`, label: 'Localities' },
        ].map(({ value, label }) => (
          <div key={label} className="text-center py-3">
            <p className="text-2xl md:text-3xl font-extrabold text-primary">{value}</p>
            <p className="text-xs text-muted-foreground mt-1">{label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Active filter pill strip ──────────────────────────────────
function ActiveFilterPills({ filters, searchQuery, onClearFilter, onClearSearch, onClearAll }) {
  const pills = [];
  if (filters.purpose) pills.push({ key: 'purpose', label: filters.purpose === 'Sale' ? '🏠 For Sale' : '🔑 For Rent' });
  if (filters.type) pills.push({ key: 'type', label: `Type: ${filters.type}` });
  if (filters.locality) pills.push({ key: 'locality', label: `📍 ${filters.locality}` });
  if (filters.priceMin) pills.push({ key: 'priceMin', label: `Min ₹${filters.priceMin}L` });
  if (filters.priceMax) pills.push({ key: 'priceMax', label: `Max ₹${filters.priceMax}L` });
  if (searchQuery) pills.push({ key: '__search', label: `"${searchQuery}"` });

  if (pills.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2 mb-4 p-3 bg-primary/5 border border-primary/20 rounded-xl">
      <span className="text-xs font-semibold text-primary">Filters:</span>
      {pills.map(({ key, label }) => (
        <span
          key={key}
          className="inline-flex items-center gap-1.5 bg-white dark:bg-card border border-border text-xs font-medium px-3 py-1.5 rounded-full shadow-sm"
        >
          {label}
          <button
            onClick={() => key === '__search' ? onClearSearch() : onClearFilter(key)}
            className="text-muted-foreground hover:text-destructive transition-colors ml-0.5"
          >
            <FaTimes className="h-2.5 w-2.5" />
          </button>
        </span>
      ))}
      <button
        onClick={onClearAll}
        className="ml-auto text-xs text-muted-foreground hover:text-destructive underline underline-offset-2 transition-colors"
      >
        Clear all
      </button>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────
import { Suspense } from 'react';

function PropertiesPageInner() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/properties', { params: { _t: Date.now() } }).then(res => {
      console.log('Fetched properties length:', res.data.length);
      console.log('Fetched properties:', res.data);
      setProperties(res.data);
      setLoading(false);
    }).catch(err => {
      console.error('Error fetching properties:', err);
      setLoading(false);
    });
  }, []);

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const filters = useMemo(() => {
    let purpose = '';
    let type = '';

    const types = searchParams.getAll('type');
    types.forEach(t => {
      const lower = t.toLowerCase();
      if (lower === 'buy') purpose = 'Sale';
      else if (lower === 'rent') purpose = 'Rent';
      else type = t.charAt(0).toUpperCase() + t.slice(1);
    });

    return {
      type,
      purpose,
      locality: searchParams.get('locality') || '',
      priceMin: searchParams.get('priceMin') || '',
      priceMax: searchParams.get('priceMax') || '',
    };
  }, [searchParams]);

  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');

  // Update local search query if URL changes (e.g. back button)
  useEffect(() => {
    setSearchQuery(searchParams.get('q') || '');
  }, [searchParams]);

  const updateUrl = useCallback((newFilters, newQuery) => {
    const params = new URLSearchParams();

    if (newFilters.purpose === 'Sale') params.append('type', 'buy');
    else if (newFilters.purpose === 'Rent') params.append('type', 'rent');

    if (newFilters.type) params.append('type', newFilters.type.toLowerCase());

    if (newFilters.locality) params.set('locality', newFilters.locality);
    if (newFilters.priceMin) params.set('priceMin', newFilters.priceMin);
    if (newFilters.priceMax) params.set('priceMax', newFilters.priceMax);
    if (newQuery) params.set('q', newQuery);

    const query = params.toString();
    router.push(`${pathname}${query ? `?${query}` : ''}`, { scroll: false });
  }, [pathname, router]);

  const handleFilterChange = (partial) => {
    updateUrl({ ...filters, ...partial }, searchQuery);
  };

  const handleClearFilter = (key) => {
    updateUrl({ ...filters, [key]: '' }, searchQuery);
  };

  const handleClearAll = () => {
    setSearchQuery('');
    updateUrl(defaultFilters, '');
  };

  // Debounced search query sync
  useEffect(() => {
    const handler = setTimeout(() => {
      if (searchQuery !== (searchParams.get('q') || '')) {
        updateUrl(filters, searchQuery);
      }
    }, 400);
    return () => clearTimeout(handler);
  }, [searchQuery, filters, searchParams, updateUrl]);

  const activeCount = Object.values(filters).filter(Boolean).length;

  // Search is "active" when any filter or query is set
  const isSearchActive = activeCount > 0 || searchQuery.trim().length > 0;

  const filtered = useMemo(() => {
    let result = properties;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter((p) =>
        p.title.toLowerCase().includes(q) ||
        p.type.toLowerCase().includes(q) ||
        p.locality.toLowerCase().includes(q) ||
        p.city.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.purpose.toLowerCase().includes(q) ||
        p.price.toLowerCase().includes(q) ||
        p.area.toLowerCase().includes(q) ||
        p.broker.name.toLowerCase().includes(q)
      );
    }
    return result.filter((p) => {
      if (filters.type && p.type !== filters.type) return false;
      if (filters.purpose && p.purpose !== filters.purpose) return false;
      if (filters.locality && p.locality !== filters.locality) return false;
      if (filters.priceMin || filters.priceMax) {
        const priceLakh = parsePriceLakh(p.price);
        if (priceLakh === null) return true;
        if (filters.priceMin && priceLakh < Number(filters.priceMin)) return false;
        if (filters.priceMax && priceLakh > Number(filters.priceMax)) return false;
      }
      return true;
    });
  }, [filters, searchQuery, properties]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 md:px-6 py-24 flex flex-col items-center justify-center min-h-[50vh]">
        <div className="h-10 w-10 rounded-full border-4 border-primary/20 border-t-primary animate-spin mb-4" />
        <p className="text-muted-foreground font-medium animate-pulse">Loading properties…</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 md:px-6 py-6 md:py-8 max-w-7xl">

      {/* ── Always-visible Search Bar ─────────────────── */}
      <div className="mb-6">
        <div className="relative w-full">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none z-10" />
          <input
            id="properties-search"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by property name, type, location, broker…"
            className="w-full pl-11 pr-11 py-3.5 rounded-2xl border border-border bg-background text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all shadow-sm"
            aria-label="Search properties"
            autoComplete="off"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-1"
              aria-label="Clear search"
            >
              <FaTimes className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {/* ── DISCOVERY STATE — shown when nothing selected ─── */}
      {!isSearchActive && (
        <DiscoveryState
          onFilterChange={handleFilterChange}
          onSearch={setSearchQuery}
          properties={properties}
        />
      )}

      {/* ── RESULTS STATE — shown after selection ─────────── */}
      {isSearchActive && (
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
          {/* Active filter pills */}
          <ActiveFilterPills
            filters={filters}
            searchQuery={searchQuery}
            onClearFilter={handleClearFilter}
            onClearSearch={() => setSearchQuery('')}
            onClearAll={handleClearAll}
          />

          {/* Mobile filter trigger */}
          <div className="mb-4 md:hidden">
            <FilterSheet
              filters={filters}
              onFilterChange={handleFilterChange}
              onClear={handleClearAll}
              activeCount={activeCount}
            />
          </div>

          <div className="flex gap-5 md:gap-6">
            {/* Desktop Sidebar */}
            <aside className="hidden md:block w-56 shrink-0">
              <div className="sticky top-24 border rounded-xl p-4 bg-card shadow-sm">
                <FilterSidebar
                  filters={filters}
                  onFilterChange={handleFilterChange}
                  onClear={handleClearAll}
                />
              </div>
            </aside>

            {/* Property Grid */}
            <div className="flex-1 min-w-0">
              {/* Result count */}
              <p className="text-sm text-muted-foreground mb-3">
                <span className="font-bold text-foreground text-base">{filtered.length}</span>{' '}
                propert{filtered.length === 1 ? 'y' : 'ies'} found
                {searchQuery && <span className="italic"> for "{searchQuery}"</span>}
              </p>
              <PropertyGrid properties={filtered} compact />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function PropertiesPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-muted-foreground">Loading properties…</div>}>
      <PropertiesPageInner />
    </Suspense>
  );
}
