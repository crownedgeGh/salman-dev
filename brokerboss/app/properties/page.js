'use client';

import { useState, useMemo } from 'react';
import { properties } from '@/data/properties';
import PropertyGrid from '@/components/PropertyGrid';
import FilterSidebar from '@/components/FilterSidebar';
import FilterSheet from '@/components/FilterSheet';

const defaultFilters = {
  type: '',
  purpose: '',
  locality: '',
  priceMin: '',
  priceMax: '',
};

function parsePriceLakh(priceStr) {
  const str = priceStr.toLowerCase().replace(/[₹,]/g, '');
  if (str.includes('crore') || str.includes('cr')) {
    const num = parseFloat(str);
    return num * 100;
  }
  if (str.includes('lakh') || str.includes('l')) {
    return parseFloat(str);
  }
  // Monthly rent — ignore price filter for rents
  if (str.includes('/mo') || str.includes('month')) {
    return null;
  }
  return parseFloat(str);
}

export default function PropertiesPage() {
  const [filters, setFilters] = useState(defaultFilters);

  const handleFilterChange = (partial) => {
    setFilters((prev) => ({ ...prev, ...partial }));
  };

  const handleClear = () => setFilters(defaultFilters);

  const activeCount = Object.values(filters).filter(Boolean).length;

  const filtered = useMemo(() => {
    return properties.filter((p) => {
      if (filters.type && p.type !== filters.type) return false;
      if (filters.purpose && p.purpose !== filters.purpose) return false;
      if (filters.locality && p.locality !== filters.locality) return false;
      if (filters.priceMin || filters.priceMax) {
        const priceLakh = parsePriceLakh(p.price);
        if (priceLakh === null) return true; // don't filter rental by price range
        if (filters.priceMin && priceLakh < Number(filters.priceMin)) return false;
        if (filters.priceMax && priceLakh > Number(filters.priceMax)) return false;
      }
      return true;
    });
  }, [filters]);

  return (
    <div className="container mx-auto px-4 md:px-6 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">All Properties</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Browse all available properties in Raipur, Chhattisgarh
        </p>
      </div>

      {/* Mobile filter trigger */}
      <div className="mb-4 md:hidden">
        <FilterSheet
          filters={filters}
          onFilterChange={handleFilterChange}
          onClear={handleClear}
          activeCount={activeCount}
        />
      </div>

      <div className="flex gap-6">
        {/* Desktop Sidebar */}
        <aside className="hidden md:block w-60 shrink-0">
          <div className="sticky top-24 border rounded-lg p-4 bg-card">
            <FilterSidebar
              filters={filters}
              onFilterChange={handleFilterChange}
              onClear={handleClear}
            />
          </div>
        </aside>

        {/* Property Grid */}
        <div className="flex-1 min-w-0">
          <PropertyGrid properties={filtered} />
        </div>
      </div>
    </div>
  );
}
