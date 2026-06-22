'use client';

import { useState, useMemo } from 'react';
import { properties } from '@/data/properties';
import SearchBar from '@/components/SearchBar';
import PropertyGrid from '@/components/PropertyGrid';
import { FaBuilding, FaCheckCircle, FaPhone } from 'react-icons/fa';

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

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 leading-[1.1] text-white drop-shadow-sm">
            Raipur's Property Marketplace            <br className="hidden md:block" />
          </h1>
          <h3 className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-8 text-primary bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-primary">Where brokers list and buyers connect instantly.</h3>


          <div className="flex justify-center mb-10 max-w-4xl mx-auto drop-shadow-2xl">
            <SearchBar value={searchQuery} onChange={setSearchQuery} />
          </div>


        </div>
      </section>

      {/* Layout Section */}
      <section className="bg-muted/20 py-10">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Main Listings Column */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-4 bg-background p-4 rounded-lg shadow-sm border">
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
                <div className="flex justify-center mt-6">
                  <button
                    onClick={() => setVisibleCount((prev) => prev + 8)}
                    className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-2.5 rounded-md font-medium text-sm transition-colors shadow-sm w-full md:w-auto"
                  >
                    Show More
                  </button>
                </div>
              )}
            </div>

            {/* Right Sidebar */}
            <aside className="w-full lg:w-[340px] shrink-0 space-y-6">
              {/* Lead Generation Form */}
              <div className="bg-background rounded-lg shadow-sm border p-5">
                <h3 className="font-bold text-lg mb-1">Get the List of Top</h3>
                <p className="text-primary font-medium text-sm mb-2">Estate Agents in Raipur</p>
                <p className="text-xs text-muted-foreground mb-4">We'll send you contact details in seconds for free</p>

                <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
                  <div className="flex items-center gap-4 text-sm mb-3">
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input type="radio" name="reqType" defaultChecked className="text-primary" /> Buy/Sell
                    </label>
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input type="radio" name="reqType" className="text-primary" /> Rent
                    </label>
                  </div>
                  <input type="text" placeholder="Your Name" className="w-full text-sm border rounded-md px-3 py-2.5 focus:outline-none focus:ring-1 focus:ring-primary" />
                  <input type="tel" placeholder="Mobile Number" className="w-full text-sm border rounded-md px-3 py-2.5 focus:outline-none focus:ring-1 focus:ring-primary" />
                  <button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-2.5 rounded-md text-sm transition-colors mt-2">
                    Send Enquiry &raquo;
                  </button>
                </form>
              </div>

              {/* Customers Top Picks */}
              <div className="bg-background rounded-lg shadow-sm border p-5">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xl">👍</span>
                  <h3 className="font-bold text-lg">Customers "Top Picks"</h3>
                </div>
                <p className="text-xs font-medium text-muted-foreground mb-4 border-b pb-2">Estate Agents For Commercial Spaces</p>

                <div className="space-y-4">
                  {/* Dummy Ad 1 */}
                  <div className="group cursor-pointer">
                    <div className="h-32 bg-gray-200 rounded-md mb-2 overflow-hidden">
                      <img src="/homebb.jpg" alt="Ad" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                    </div>
                    <h4 className="font-semibold text-sm">Raipur Real Estate</h4>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                      <span className="bg-green-600 text-white px-1.5 rounded text-[10px]">4.4 ★</span>
                      <span>65 Ratings</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">Shankar Nagar</p>
                    <button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded py-1.5 text-xs font-medium mt-2 flex items-center justify-center gap-1">
                      <FaPhone className="h-2.5 w-2.5" /> 09845208256
                    </button>
                  </div>
                  {/* Dummy Ad 2 */}
                  <div className="group cursor-pointer pt-4 border-t">
                    <div className="h-32 bg-gray-200 rounded-md mb-2 overflow-hidden">
                      <img src="/homebb2.jpg" alt="Ad" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                    </div>
                    <h4 className="font-semibold text-sm">City Properties</h4>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                      <span className="bg-green-600 text-white px-1.5 rounded text-[10px]">4.2 ★</span>
                      <span>121 Ratings</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">Civil Lines</p>
                    <button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded py-1.5 text-xs font-medium mt-2 flex items-center justify-center gap-1">
                      <FaPhone className="h-2.5 w-2.5" /> 09845215921
                    </button>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
