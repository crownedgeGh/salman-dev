'use client';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { FaFilter, FaTimes } from 'react-icons/fa';

const propertyTypes = ['House', 'Flat', 'Shop', 'Plot', 'Office', 'Warehouse'];
const localities = ['Shankar Nagar', 'Telibandha', 'Pandri', 'Mowa', 'VIP Road', 'Khamardih', 'Avanti Vihar', 'Pachpedi Naka'];

export default function FilterSidebar({ filters, onFilterChange, onClear }) {
  const hasActiveFilters =
    filters.type || filters.purpose || filters.locality || filters.priceMin || filters.priceMax;

  const handleTypeToggle = (type) => {
    onFilterChange({ type: filters.type === type ? '' : type });
  };

  return (
    <div className="space-y-4 pb-6">

      {/* Property Type */}
      <div>
        <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-3">
          Property Type
        </h3>
        <div className="flex flex-wrap gap-2">
          {propertyTypes.map((type) => (
            <button
              key={type}
              onClick={() => handleTypeToggle(type)}
              className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                filters.type === type
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'border-border text-muted-foreground hover:border-foreground hover:text-foreground'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      <Separator />

      {/* Purpose */}
      <div>
        <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-3">
          Purpose
        </h3>
        <div className="flex gap-2">
          {['Sale', 'Rent'].map((p) => (
            <button
              key={p}
              onClick={() => onFilterChange({ purpose: filters.purpose === p ? '' : p })}
              className={`text-xs px-4 py-1.5 rounded-full border transition-colors flex-1 ${
                filters.purpose === p
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'border-border text-muted-foreground hover:border-foreground hover:text-foreground'
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      <Separator />

      {/* Locality */}
      <div>
        <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-3">
          Locality
        </h3>
        <div className="space-y-1">
          <button
            onClick={() => onFilterChange({ locality: '' })}
            className={`w-full text-left text-xs px-3 py-1.5 rounded-md transition-colors ${
              !filters.locality
                ? 'bg-accent text-accent-foreground font-medium'
                : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
            }`}
          >
            All Localities
          </button>
          {localities.map((loc) => (
            <button
              key={loc}
              onClick={() => onFilterChange({ locality: filters.locality === loc ? '' : loc })}
              className={`w-full text-left text-xs px-3 py-1.5 rounded-md transition-colors ${
                filters.locality === loc
                  ? 'bg-accent text-accent-foreground font-medium'
                  : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
              }`}
            >
              {loc}
            </button>
          ))}
        </div>
      </div>

      <Separator />

      {/* Price Range */}
      <div>
        <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-3">
          Price Range (₹ in Lakh)
        </h3>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">Min</label>
            <input
              type="number"
              value={filters.priceMin}
              onChange={(e) => onFilterChange({ priceMin: e.target.value })}
              placeholder="e.g. 10"
              className="w-full px-3 py-1.5 text-xs rounded-md border border-border bg-background focus:outline-none focus:ring-1 focus:ring-ring"
            />
          </div>
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">Max</label>
            <input
              type="number"
              value={filters.priceMax}
              onChange={(e) => onFilterChange({ priceMax: e.target.value })}
              placeholder="e.g. 100"
              className="w-full px-3 py-1.5 text-xs rounded-md border border-border bg-background focus:outline-none focus:ring-1 focus:ring-ring"
            />
          </div>
        </div>
      </div>

      {hasActiveFilters && (
        <>
          <Separator />
          <Button variant="outline" size="sm" className="w-full" onClick={onClear}>
            Clear All Filters
          </Button>
        </>
      )}
    </div>
  );
}
