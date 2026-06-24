'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { properties } from '@/data/properties';
import { FaHome, FaBuilding, FaStore, FaChartArea, FaWarehouse, FaMapMarkerAlt, FaPhone, FaWhatsapp, FaCheckCircle, FaArrowRight, FaStar, FaUsers, FaHandshake, FaShieldAlt, FaSearch, FaTimes, FaChevronDown, FaRupeeSign } from 'react-icons/fa';

const typeIconMap = {
  House: FaHome,
  Flat: FaBuilding,
  Shop: FaStore,
  Plot: FaChartArea,
  Home: FaHome,
  Office: FaBuilding,
  Warehouse: FaWarehouse,
};

const typeBadgeColor = {
  House: 'bg-blue-100 text-blue-700',
  Flat: 'bg-purple-100 text-purple-700',
  Shop: 'bg-amber-100 text-amber-700',
  Plot: 'bg-green-100 text-green-700',
  Home: 'bg-pink-100 text-pink-700',
  Office: 'bg-indigo-100 text-indigo-700',
  Warehouse: 'bg-orange-100 text-orange-700',
};

// Featured cards – pick 4 diverse listings
const featuredProperties = properties.slice(0, 4);

// Category quick links
const categories = [
  { label: 'Houses', icon: FaHome, type: 'House', color: 'bg-blue-50 text-blue-600 border-blue-100' },
  { label: 'Flats', icon: FaBuilding, type: 'Flat', color: 'bg-purple-50 text-purple-600 border-purple-100' },
  { label: 'Shops', icon: FaStore, type: 'Shop', color: 'bg-amber-50 text-amber-600 border-amber-100' },
  { label: 'Plots', icon: FaChartArea, type: 'Plot', color: 'bg-green-50 text-green-600 border-green-100' },
  { label: 'Offices', icon: FaBuilding, type: 'Office', color: 'bg-indigo-50 text-indigo-600 border-indigo-100' },
  { label: 'Warehouses', icon: FaWarehouse, type: 'Warehouse', color: 'bg-orange-50 text-orange-600 border-orange-100' },
];

const stats = [
  { icon: FaHome, label: 'Properties Listed', value: '500+' },
  { icon: FaUsers, label: 'Verified Brokers', value: '120+' },
  { icon: FaHandshake, label: 'Deals Closed', value: '1,200+' },
  { icon: FaShieldAlt, label: 'Trusted by Buyers', value: '8,000+' },
];

// ── Localities present in the data ────────────────────────────────────
const LOCALITIES = [
  'Shankar Nagar', 'Telibandha', 'Khamardih', 'Avanti Vihar',
  'Pandri', 'VIP Road', 'Mowa', 'Pachpedi Naka', 'Civil Lines',
];

const PROPERTY_TYPES = [
  { label: 'All Types', value: '' },
  { label: 'House', value: 'House' },
  { label: 'Flat', value: 'Flat' },
  { label: 'Plot', value: 'Plot' },
  { label: 'Shop', value: 'Shop' },
  { label: 'Office', value: 'Office' },
  { label: 'Warehouse', value: 'Warehouse' },
];

const BUDGETS = [
  { label: 'Any Budget', value: '' },
  { label: 'Under ₹20 Lakh', value: '0-20' },
  { label: '₹20 – 50 Lakh', value: '20-50' },
  { label: '₹50 – 1 Crore', value: '50-100' },
  { label: '₹1 – 2 Crore', value: '100-200' },
  { label: 'Above ₹2 Crore', value: '200-' },
];

const SEARCH_TABS = [
  { label: 'Buy', value: 'Sale' },
  { label: 'Rent', value: 'Rent' },
  { label: 'Plot', value: 'Plot' },
  { label: 'Commercial', value: 'Commercial' },
];

function HeroSearch() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('Sale');
  const [locality, setLocality] = useState('');
  const [localityChips, setLocalityChips] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [propertyType, setPropertyType] = useState('');
  const [budget, setBudget] = useState('');

  const suggestions = LOCALITIES.filter(
    (l) => l.toLowerCase().includes(locality.toLowerCase()) && locality.length > 0 && !localityChips.includes(l)
  );

  function addChip(loc) {
    if (!localityChips.includes(loc)) setLocalityChips((prev) => [...prev, loc]);
    setLocality('');
    setShowSuggestions(false);
  }

  function removeChip(loc) {
    setLocalityChips((prev) => prev.filter((c) => c !== loc));
  }

  function handleSearch() {
    const params = new URLSearchParams();
    if (activeTab === 'Sale' || activeTab === 'Rent') params.set('purpose', activeTab);
    if (activeTab === 'Plot') { params.set('type', 'Plot'); }
    if (activeTab === 'Commercial') { params.set('type', 'Shop'); }
    if (propertyType) params.set('type', propertyType);
    if (localityChips.length > 0) params.set('locality', localityChips[0]);
    if (budget) {
      const [min, max] = budget.split('-');
      if (min) params.set('priceMin', min);
      if (max) params.set('priceMax', max);
    }
    router.push(`/properties?${params.toString()}`);
  }

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* ── Tab strip ── */}
      <div className="flex items-center gap-1 mb-3">
        {SEARCH_TABS.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all ${
              activeTab === tab.value
                ? 'bg-card text-primary shadow-md'
                : 'bg-white/15 text-white/80 hover:bg-white/25 hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ── Search bar ── */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center bg-card rounded-2xl shadow-2xl overflow-hidden border border-border">

        {/* Location section */}
        <div className="flex-1 min-w-0 relative border-b sm:border-b-0 sm:border-r border-border/30">
          <div className="flex flex-wrap items-center gap-1.5 px-4 py-3 min-h-[52px]">
            <FaMapMarkerAlt className="h-4 w-4 text-primary shrink-0" />
            {localityChips.map((chip) => (
              <span
                key={chip}
                className="inline-flex items-center gap-1 bg-primary/10 text-primary text-xs font-semibold px-2.5 py-1 rounded-full border border-primary/20"
              >
                {chip}
                <button onClick={() => removeChip(chip)} className="hover:text-red-500 transition-colors">
                  <FaTimes className="h-2.5 w-2.5" />
                </button>
              </span>
            ))}
            <input
              type="text"
              value={locality}
              onChange={(e) => { setLocality(e.target.value); setShowSuggestions(true); }}
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
              placeholder={localityChips.length === 0 ? 'Search locality, area…' : 'Add more…'}
              className="flex-1 min-w-[100px] text-sm text-foreground placeholder:text-muted-foreground bg-transparent outline-none"
            />
          </div>
          {/* Suggestions dropdown */}
          {showSuggestions && suggestions.length > 0 && (
            <ul className="absolute top-full left-0 right-0 bg-popover border border-border rounded-xl shadow-xl z-50 mt-1 overflow-hidden">
              {suggestions.map((s) => (
                <li
                  key={s}
                  onMouseDown={() => addChip(s)}
                  className="flex items-center gap-2 px-4 py-2.5 text-sm hover:bg-primary/5 cursor-pointer transition-colors"
                >
                  <FaMapMarkerAlt className="h-3.5 w-3.5 text-primary shrink-0" />
                  {s}, Raipur
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Property type dropdown */}
        <div className="relative border-b sm:border-b-0 sm:border-r border-border/30">
          <div className="flex items-center gap-2 px-4 py-3 min-h-[52px] cursor-pointer">
            <FaHome className="h-4 w-4 text-muted-foreground shrink-0" />
            <select
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
              className="bg-transparent text-sm text-foreground outline-none cursor-pointer pr-6 appearance-none w-28 sm:w-32"
            >
              {PROPERTY_TYPES.map((t) => (
                <option key={t.value} value={t.value}>{t.label}</option>
              ))}
            </select>
            <FaChevronDown className="h-3 w-3 text-muted-foreground shrink-0 pointer-events-none" />
          </div>
        </div>

        {/* Budget dropdown */}
        <div className="relative border-b sm:border-b-0 sm:border-r border-border/30">
          <div className="flex items-center gap-2 px-4 py-3 min-h-[52px] cursor-pointer">
            <FaRupeeSign className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
            <select
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="bg-transparent text-sm text-foreground outline-none cursor-pointer pr-6 appearance-none w-28 sm:w-36"
            >
              {BUDGETS.map((b) => (
                <option key={b.value} value={b.value}>{b.label}</option>
              ))}
            </select>
            <FaChevronDown className="h-3 w-3 text-muted-foreground shrink-0 pointer-events-none" />
          </div>
        </div>

        {/* Search button */}
        <button
          onClick={handleSearch}
          className="flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 active:scale-95 text-primary-foreground font-bold px-6 py-3 sm:rounded-none rounded-xl sm:rounded-r-2xl text-sm transition-all shadow-inner m-2 sm:m-0 sm:px-8 sm:min-h-[52px]"
        >
          <FaSearch className="h-4 w-4" />
          <span>Search</span>
        </button>
      </div>
    </div>
  );
}

function FeaturedCard({ property }) {
  const badgeColor = typeBadgeColor[property.type] || 'bg-gray-100 text-gray-700';

  return (
    <div className="group bg-white dark:bg-card rounded-2xl border border-border/60 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col">
      {/*
        Card Image — strict 9:16 portrait ratio.
        We use padding-top trick (177.78% = 16/9 * 100) so the container
        always maintains 9:16 regardless of parent width.
        maxHeight caps it so cards don't become too tall on wide screens.
      */}
      <div className="relative w-full overflow-hidden bg-muted" style={{ paddingTop: 'min(177.78%, 220px)' }}>
        <img
          src={property.broker.image}
          alt={property.title}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Type + Purpose badges — stacked top-left */}
        <div className="absolute top-2.5 left-2.5 flex gap-1.5">
          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full backdrop-blur-sm shadow-sm ${badgeColor} border`}>
            {property.type}
          </span>
          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full backdrop-blur-sm shadow-sm border ${property.purpose === 'Sale' ? 'bg-green-100 text-green-700 border-green-200' : 'bg-sky-100 text-sky-700 border-sky-200'}`}>
            {property.purpose}
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-3 sm:p-4 flex flex-col flex-1">
        {/* Title */}
        <h3 className="font-bold text-sm text-foreground line-clamp-2 leading-snug mb-1 group-hover:text-primary transition-colors">
          {property.title}
        </h3>

        {/* Price — bold, right under title (not on image) */}
        <p className="text-primary font-extrabold text-base mb-1.5">{property.price}</p>

        {/* Location */}
        <div className="flex items-center gap-1 text-muted-foreground text-[11px] mb-3">
          <FaMapMarkerAlt className="h-3 w-3 shrink-0" />
          <span className="line-clamp-1">{property.locality}, {property.city}</span>
        </div>

        {/* Broker row */}
        <div className="flex items-center gap-2 mt-auto pt-3 border-t border-border/40">
          <div className="w-7 h-7 rounded-full overflow-hidden bg-muted shrink-0 border border-border/40">
            <img src={property.broker.image} alt={property.broker.name} className="w-full h-full object-cover" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[11px] font-semibold text-foreground line-clamp-1">{property.broker.name}</p>
            <div className="flex items-center gap-0.5 text-blue-600 text-[9px] font-bold">
              <FaCheckCircle className="h-2.5 w-2.5" /> Verified
            </div>
          </div>
          <a href={`tel:${property.broker.phone.replace(/\s/g, '')}`} className="shrink-0">
            <button className="bg-primary hover:bg-primary/90 text-primary-foreground text-[10px] font-semibold px-2.5 py-1.5 rounded-lg flex items-center gap-1 transition-colors shadow-sm whitespace-nowrap">
              <FaPhone className="h-2.5 w-2.5" /> Call
            </button>
          </a>
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <>
      {/* ── Hero Section ─────────────────────────────── */}
      <section className="relative overflow-hidden flex items-center justify-center min-h-[85vh] md:min-h-[90vh]">
        <img
          src="/homebb.jpg"
          alt="Real Estate Hero Background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/45 to-black/85" />

        <div className="container mx-auto px-4 md:px-6 text-center relative z-10 py-20 md:py-32">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-semibold px-4 py-2 rounded-full mb-6 shadow-lg">
            <FaStar className="h-3 w-3 text-yellow-400" />
            Raipur's #1 Property Marketplace
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] text-white drop-shadow-lg mb-4">
            Find Your Dream<br className="hidden sm:block" /> Property in Raipur
          </h1>
          <p className="text-lg md:text-2xl font-medium mt-4 mb-10 text-white/80 max-w-2xl mx-auto">
            Where brokers list and buyers connect instantly. Explore verified listings across Raipur, Chhattisgarh.
          </p>

          {/* ── Hero Search Widget ── */}
          <HeroSearch />

          {/* Secondary link */}
          <p className="mt-5 text-white/50 text-xs">
            Or{' '}
            <Link href="/properties" className="text-white/80 underline underline-offset-2 hover:text-white transition-colors">
              browse all properties
            </Link>
          </p>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/50 animate-bounce">
          <div className="w-5 h-8 rounded-full border-2 border-white/30 flex items-start justify-center pt-1">
            <div className="w-1 h-2 bg-white/60 rounded-full" />
          </div>
        </div>
      </section>

      {/* ── Stats Bar ────────────────────────────────── */}
      <section className="bg-primary text-primary-foreground py-6">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {stats.map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/15 rounded-xl flex items-center justify-center shrink-0">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-extrabold text-xl leading-none">{value}</p>
                  <p className="text-primary-foreground/70 text-xs mt-0.5">{label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Browse by Category ───────────────────────── */}
      <section className="py-12 md:py-16 bg-muted/30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-extrabold text-foreground">Browse by Category</h2>
            <p className="text-muted-foreground text-sm mt-2">Find the right property type for your needs</p>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {categories.map(({ label, icon: Icon, type, color }) => (
              <Link key={type} href={`/properties?type=${type}`}>
                <div className={`flex flex-col items-center gap-2 p-3 md:p-4 rounded-2xl border cursor-pointer hover:shadow-md transition-all hover:-translate-y-0.5 ${color} bg-opacity-60`}>
                  <Icon className="h-6 w-6 md:h-7 md:w-7" />
                  <span className="text-xs md:text-sm font-semibold text-center">{label}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Properties ──────────────────────── */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6">
          {/* Section header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-8">
            <div>
              <span className="text-primary font-semibold text-sm tracking-wide uppercase">Handpicked For You</span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-foreground mt-1">Featured Properties</h2>
              <p className="text-muted-foreground text-sm mt-1">Top verified listings from trusted brokers in Raipur</p>
            </div>
            <Link href="/properties">
              <button className="flex items-center gap-2 text-primary font-semibold text-sm hover:gap-3 transition-all shrink-0">
                View All <FaArrowRight className="h-3.5 w-3.5" />
              </button>
            </Link>
          </div>

          {/*
            Responsive grid:
            - Mobile (default): 2 columns
            - Tablet (md): 3 columns
            - Desktop (lg): 4 columns
            We show all 4 cards but only 2 are visible on mobile (rest wrap naturally)
          */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
            {featuredProperties.map((property) => (
              <FeaturedCard key={property.id} property={property} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Choose BrokerBoss ────────────────────── */}
      <section className="py-12 md:py-16 bg-muted/30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-extrabold text-foreground">Why Choose BrokerBoss?</h2>
            <p className="text-muted-foreground text-sm mt-2 max-w-xl mx-auto">We make finding property in Raipur fast, transparent, and reliable.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {[
              { icon: FaShieldAlt, title: 'Verified Listings', desc: 'Every property and broker is manually verified for authenticity and accuracy.', color: 'text-blue-600 bg-blue-50' },
              { icon: FaUsers, title: 'Direct Broker Contact', desc: 'Connect directly with brokers — no middlemen, no hidden commissions.', color: 'text-green-600 bg-green-50' },
              { icon: FaHandshake, title: 'Fast Deal Closure', desc: 'Our streamlined process helps buyers and brokers close deals in record time.', color: 'text-purple-600 bg-purple-50' },
            ].map(({ icon: Icon, title, desc, color }) => (
              <div key={title} className="bg-background rounded-2xl border border-border/60 p-6 hover:shadow-md transition-shadow">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${color}`}>
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="font-bold text-base text-foreground mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ───────────────────────────────── */}
      <section className="py-14 md:py-20 bg-primary relative overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-white/5" />
        <div className="absolute -bottom-14 -left-10 w-64 h-64 rounded-full bg-white/5" />
        <div className="container mx-auto px-4 md:px-6 text-center relative z-10">
          <h2 className="text-2xl md:text-4xl font-extrabold text-primary-foreground mb-3">
            Ready to Find Your Next Property?
          </h2>
          <p className="text-primary-foreground/75 text-sm md:text-base mb-8 max-w-xl mx-auto">
            Browse hundreds of verified listings or list your property and connect with thousands of buyers today.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/properties">
              <button className="bg-white text-primary font-bold px-8 py-3.5 rounded-xl text-base shadow-xl hover:shadow-2xl hover:scale-105 transition-all flex items-center gap-2 justify-center">
                Browse Properties <FaArrowRight className="h-4 w-4" />
              </button>
            </Link>
            <Link href="/contact">
              <button className="border-2 border-white/50 text-primary-foreground font-bold px-8 py-3.5 rounded-xl text-base hover:bg-white/10 transition-all flex items-center gap-2 justify-center">
                Contact Us <FaPhone className="h-4 w-4" />
              </button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
