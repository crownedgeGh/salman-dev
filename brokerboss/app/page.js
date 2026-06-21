'use client';

import { useState, useMemo } from 'react';
import { properties } from '@/data/properties';
import SearchBar from '@/components/SearchBar';
import PropertyGrid from '@/components/PropertyGrid';
import { FaBuilding, FaCheckCircle } from 'react-icons/fa';

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [visibleCount, setVisibleCount] = useState(8);

  const filteredProperties = useMemo(() => {
    if (!searchQuery.trim()) return properties;
    const q = searchQuery.toLowerCase();
    return properties.filter(
      (p) =>
        p.type.toLowerCase().includes(q) ||
        p.locality.toLowerCase().includes(q) ||
        p.city.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.title.toLowerCase().includes(q)
    );
  }, [searchQuery]);
  const displayedProperties = filteredProperties.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProperties.length;

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 border-b overflow-hidden flex items-center justify-center min-h-[80vh]">
        <img 
          src="/homebb.jpg" 
          alt="Real Estate Hero Background" 
          className="absolute inset-0 w-full h-full object-cover -z-10"
        />
        {/* Sleek Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80 -z-10"></div>
        
        <div className="container mx-auto px-4 md:px-6 text-center relative z-10">
          <div className="inline-flex items-center gap-2 text-xs font-medium px-4 py-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-md text-white mb-8 shadow-lg">
            <FaBuilding className="h-3.5 w-3.5" />
            Raipur&apos;s #1 Property Listing Platform
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 leading-[1.1] text-white drop-shadow-sm">
            Find Your Perfect Property
            <br className="hidden md:block" />
            <span className="text-primary bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-primary"> in Raipur, Chhattisgarh</span>
          </h1>
          <p className="text-gray-200 text-lg md:text-xl max-w-2xl mx-auto mb-10 font-medium drop-shadow-sm">
            Browse verified listings of houses, flats, shops, plots, offices and more. Connect directly with trusted brokers — no images, no fake listings.
          </p>

          <div className="flex justify-center mb-10 max-w-4xl mx-auto drop-shadow-2xl">
            <SearchBar value={searchQuery} onChange={setSearchQuery} />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-sm font-medium text-gray-200">
            {['Verified Brokers', '23+ Listings', 'All Property Types', 'Raipur Focused'].map((feat) => (
              <span key={feat} className="flex items-center gap-2 bg-black/20 px-3 py-1.5 rounded-full backdrop-blur-sm border border-white/10">
                <FaCheckCircle className="h-4 w-4 text-green-400" />
                {feat}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Listings Section */}
      <section className="container mx-auto px-4 md:px-6 py-10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold">
              {searchQuery ? `Results for "${searchQuery}"` : 'Featured Properties'}
            </h2>
            <p className="text-sm text-muted-foreground mt-0.5">
              {searchQuery
                ? `${filteredProperties.length} propert${filteredProperties.length === 1 ? 'y' : 'ies'} found`
                : 'Latest listings from verified brokers in Raipur'}
            </p>
          </div>
        </div>
        <PropertyGrid properties={displayedProperties} />
        {hasMore && (
          <div className="flex justify-center mt-10">
            <button
              onClick={() => setVisibleCount((prev) => prev + 8)}
              className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-2.5 rounded-md font-medium text-sm transition-colors shadow-sm"
            >
              Show More
            </button>
          </div>
        )}
      </section>
    </>
  );
}
