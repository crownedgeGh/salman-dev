'use client';

import { FaSearch, FaTimes } from 'react-icons/fa';

export default function SearchBar({ value, onChange, onSubmit, onFocus, onBlur, placeholder = 'Search by property type, locality, city...' }) {
  return (
    <form 
      className="relative w-full max-w-2xl"
      onSubmit={(e) => {
        e.preventDefault();
        if (onSubmit) onSubmit();
      }}
    >
      <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
      <input
        id="property-search"
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={onFocus}
        onBlur={onBlur}
        placeholder={placeholder}
        className="w-full pl-10 pr-10 py-3 rounded-xl border border-border bg-background text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-shadow shadow-sm"
        aria-label="Search properties"
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Clear search"
        >
          <FaTimes className="h-4 w-4" />
        </button>
      )}
    </form>
  );
}
