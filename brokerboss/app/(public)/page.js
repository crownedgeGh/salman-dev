import Link from 'next/link';
import connectToDatabase from '@/lib/mongodb';
import Property from '@/lib/models/Property';
import FeaturedCarousel from '@/components/FeaturedCarousel';
import { FaHome, FaBuilding, FaStore, FaChartArea, FaWarehouse, FaMapMarkerAlt, FaPhone, FaWhatsapp, FaCheckCircle, FaArrowRight, FaStar, FaUsers, FaHandshake, FaShieldAlt, FaKey, FaMoneyBillWave, FaChartBar, FaCity, FaBolt, FaTag } from 'react-icons/fa';

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

const HERO_BUTTONS = [
  {
    label: 'Buy a Property',
    description: 'Houses, Flats & Villas',
    icon: FaHome,
    listings: '15 listings',
    href: '/properties?type=buy',
    bgColor: 'bg-blue-600 hover:bg-blue-700',
  },
  {
    label: 'Rent a Property',
    description: 'Monthly rental listings',
    icon: FaTag,
    listings: '8 listings',
    href: '/properties?type=rent',
    bgColor: 'bg-orange-500 hover:bg-orange-600',
  },
  {
    label: 'Buy a Plot',
    description: 'Residential & commercial land',
    icon: FaChartArea,
    listings: '4 listings',
    href: '/properties?type=plot',
    bgColor: 'bg-emerald-600 hover:bg-emerald-700',
  },
];

function HeroCTA() {
  return (
    <div className="w-full max-w-4xl mx-auto mt-6 px-1 sm:px-2">
      <div className="grid grid-cols-3 gap-2 sm:gap-4">
        {HERO_BUTTONS.map(({ label, description, icon: Icon, href, listings, bgColor }) => (
          <Link
            key={label}
            href={href}
            className={`group relative flex flex-col text-left ${bgColor} rounded-xl sm:rounded-2xl p-2.5 sm:p-5 transition-all duration-300 shadow-lg hover:shadow-2xl hover:-translate-y-1 active:scale-[0.98] overflow-hidden`}
          >
            {/* Top-right decorative circle */}
            <div className="absolute top-[-10px] right-[-10px] sm:top-[-20px] sm:right-[-20px] w-14 h-14 sm:w-24 sm:h-24 bg-white/10 rounded-full transition-transform duration-500 group-hover:scale-110" />

            {/* Icon */}
            <Icon className="relative z-10 h-4 w-4 sm:h-7 sm:w-7 text-white mb-1.5 sm:mb-3" />

            {/* Text content */}
            <div className="relative z-10 flex-1">
              <p className="font-bold text-white text-[11px] sm:text-base leading-tight mb-0.5">{label}</p>
              <p className="text-white/80 text-[8px] sm:text-xs leading-snug mb-2 sm:mb-4 line-clamp-2 sm:line-clamp-1">{description}</p>
            </div>

            {/* Listings Pill */}
            <div className="relative z-10 inline-flex items-center gap-0.5 sm:gap-1 bg-white/20 w-fit px-1.5 py-0.5 sm:px-2 sm:py-0.5 rounded-full mt-auto">
              <FaBolt className="h-2 w-2 text-white" />
              <span className="text-white font-semibold text-[8px] sm:text-[10px]">{listings}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}


function FeaturedCard({ property }) {
  const badgeColor = typeBadgeColor[property.type] || 'bg-gray-100 text-gray-700';

  const broker = property.broker || {
    name: 'BrokerBoss Agent',
    image: '',
    phone: '+919876543210'
  };
  const displayRole = broker.role || property.ownerType || (broker.name?.toLowerCase().includes('owner') ? 'Owner' : 'Broker');
  const getValidImg = (img) => {
    if (typeof img !== 'string' || !img.trim()) return null;
    if (img.includes('unsplash.com')) return null;
    if (img.startsWith('http') || img.startsWith('/') || img.startsWith('data:')) return img;
    return `/${img}`;
  };

  return (
    <div className="group bg-white dark:bg-card rounded-2xl border border-border/60 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col relative">
      <Link href={`/properties/${property._id || property.id}`} className="absolute inset-0 z-10" aria-label={`View ${property.title}`} />
      {/*
        Card Image — 4:3 landscape ratio.
        We use padding-top (75%) and object-contain with bg-white so the tall logo doesn't get cut off.
      */}
      <div className="relative w-full overflow-hidden bg-white" style={{ paddingTop: '75%' }}>
        <img
          src={getValidImg(property.images?.[0]) || getValidImg(property.thumbnail) || '/homebb.webp'}
          alt={property.title}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />


      </div>

      {/* Card Body */}
      <div className="p-2.5 sm:p-4 flex flex-col flex-1">
        {/* Title */}
        <div className="flex flex-col items-start gap-1 mb-1">
          <span className="inline-block bg-muted text-muted-foreground text-[9px] font-bold px-1.5 py-0.5 rounded border border-border/50">
            ID: {property.propertyId || `BB${100 + ((parseInt((property._id || property.id || '123').replace(/\D/g, '')) || 7) % 900)}`}
          </span>
          <h3 className="font-bold text-xs sm:text-sm text-foreground line-clamp-2 leading-snug group-hover:text-primary transition-colors">
            {property.title}
          </h3>
        </div>

        {/* Price — bold, right under title (not on image) */}
        <p className="text-primary font-extrabold text-sm sm:text-base mb-1 sm:mb-1.5">
          ₹ {parseInt(property.price.replace(/[^\d]/g, '') || 0).toLocaleString('en-IN')}
        </p>

        {/* Location */}
        <div className="flex items-center gap-1 text-muted-foreground text-[10px] sm:text-[11px] mb-2 sm:mb-3">
          <FaMapMarkerAlt className="h-2.5 w-2.5 sm:h-3 sm:w-3 shrink-0" />
          <span className="line-clamp-1">{property.locality}, {property.city}</span>
        </div>

        {/* Broker row */}
        <div className="flex items-center gap-1.5 sm:gap-2 mt-auto pt-2 sm:pt-3 border-t border-border/40 relative z-20">
          <Link href={broker.id || broker._id ? `/viewBroker/${broker.id || broker._id}` : '#'} className="flex items-center gap-1.5 sm:gap-2 flex-1 min-w-0 group/broker hover:opacity-80 transition-opacity">
            <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full overflow-hidden bg-muted shrink-0 border border-border/40 flex items-center justify-center">
              <img 
                src={getValidImg(broker.image) || getValidImg(broker.passportPhoto) || `https://ui-avatars.com/api/?name=${encodeURIComponent(broker.name || 'User')}&background=e2e8f0&color=475569`} 
                alt={broker.name || 'User'} 
                className="w-full h-full object-cover" 
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[10px] sm:text-[11px] font-semibold text-foreground line-clamp-1 group-hover/broker:underline cursor-pointer">{broker.name}</p>
              <div className="flex items-center gap-0.5 text-emerald-600 text-[8px] sm:text-[9px] font-bold">
                <FaCheckCircle className="h-2 w-2 sm:h-2.5 sm:w-2.5" /> Verified
              </div>
            </div>
          </Link>

          <a href={`tel:${broker.phone.replace(/\s/g, '')}`} className="shrink-0 z-20">
            <button className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-primary hover:from-blue-700 hover:to-blue-700 text-white text-[10px] sm:text-[11px] font-bold px-3 py-1.5 sm:px-3.5 sm:py-1.5 rounded-full flex items-center gap-1.5 transition-all shadow-[0_2px_10px_rgba(37,99,235,0.25)] hover:shadow-[0_4px_12px_rgba(37,99,235,0.4)] active:scale-95 group">
              <div className="absolute inset-0 w-full h-full bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out rounded-full" />
              <FaPhone className="h-2.5 w-2.5 sm:h-2.5 sm:w-2.5 relative z-10" />
              <span className="relative z-10">Call</span>
            </button>
          </a>
        </div>
      </div>
    </div>
  );
}

export default async function HomePage() {
  let featuredProperties = [];
  try {
    await connectToDatabase();
    const properties = await Property
      .find({ isFeatured: true, status: { $nin: ['Disable', 'Sold Out'] } })
      .select('-__v')
      .sort({ createdAt: -1 })
      .limit(10)
      .lean();
    // Convert ObjectIds to strings
    featuredProperties = JSON.parse(JSON.stringify(properties));
  } catch (err) {
    console.error("Failed to fetch featured properties:", err.message);
  }

  return (
    <>
      {/* ── Hero Section ─────────────────────────────── */}
      <section className="relative overflow-hidden flex items-center justify-center min-h-[85vh] md:min-h-[90vh]">
        <picture className="absolute inset-0 w-full h-full">
          <source srcSet="/homebb.webp" type="image/webp" />
          <img
            src="/homebb.jpg"
            alt="Real Estate Hero Background"
            className="w-full h-full object-cover"
            fetchPriority="high"
          />
        </picture>


        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/10 md:bg-none pointer-events-none" />
        <div className="hidden md:block absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.6)_0%,rgba(0,0,0,0.2)_45%,transparent_70%)] pointer-events-none" />

        <div className="container mx-auto px-4 md:px-6 text-center relative z-10 py-12 md:py-32">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white text-[11px] sm:text-xs font-semibold px-3 sm:px-4 py-1.5 sm:py-2 rounded-full mb-4 md:mb-6 shadow-lg">
            <FaStar className="h-3 w-3 text-yellow-400" />
            Raipur's #1 Property Marketplace
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] text-white drop-shadow-lg mb-3 md:mb-4">
            Find Your Dream<br className="hidden sm:block" /> Property in Raipur
          </h1>
          <p className="text-sm sm:text-lg md:text-2xl font-medium mt-2 mb-6 md:mb-10 text-white/90 max-w-2xl mx-auto drop-shadow-md">
            Brokers list. Buyers connect. Explore verified listings in Raipur, CG.
          </p>

          {/* ── Hero CTA Buttons ── */}
          <HeroCTA />
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
            Carousel with responsive sizing:
            - Mobile (default): 85vw width (scrollable continuation)
            - Tablet (md): 3 columns (33.333% width minus gap)
            - Desktop (lg): 4 columns (25% width minus gap)
          */}
          <FeaturedCarousel>
            {featuredProperties.map((property) => (
              <div 
                key={property._id} 
                className="w-[85vw] md:w-[calc(33.333%-11px)] lg:w-[calc(25%-12px)] shrink-0 snap-center md:snap-start"
              >
                <FeaturedCard property={property} />
              </div>
            ))}
          </FeaturedCarousel>
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
              <div key={title} className="bg-background rounded-2xl border border-border/60 p-6 hover:shadow-md transition-shadow relative">
                <div className="absolute top-4 right-4 bg-green-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-md shadow-sm">FREE</div>
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
