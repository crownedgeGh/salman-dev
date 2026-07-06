'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import {
  Bookmark,
  Share2,
  ChevronDown,
  Phone,
  Star,
  MapPin,
  User,
  CheckCircle2,
} from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';

// Helper to generate consistent, realistic mocked specs based on property id & type
function getPropertySpecs(property) {
  const propId = property._id || property.id || '123';
  const idNum = parseInt(propId.replace(/\D/g, '')) || 7;
  const isRent = property.purpose === 'Rent';

  // Photo Count
  const photoCount = ((idNum * 3) % 12) + 6;

  // Age/Updated
  const updateDays = (idNum * 2) % 5;
  const updatedText = updateDays === 0 ? 'Updated today' : `Updated ${updateDays} days ago`;

  // Extracted BHK if present in title
  const bhkMatch = property.title.match(/(\d)\s*BHK/i);
  const bhk = bhkMatch ? bhkMatch[1] : '2';

  // Price formatting and deposit
  let formattedPrice = property.price;
  let depositText = '';
  const numericPriceStr = property.price ? property.price.toString().replace(/[^\d]/g, '') : '';
  const priceVal = parseInt(numericPriceStr) || 0;

  if (isRent) {
    const depositVal = priceVal * 2;
    formattedPrice = priceVal ? `₹${priceVal.toLocaleString('en-IN')}` : property.price;
    depositText = depositVal ? `Security Deposit: ₹${depositVal.toLocaleString('en-IN')}` : '';
  } else {
    // Sale
    formattedPrice = priceVal ? `₹${priceVal.toLocaleString('en-IN')}` : property.price;
    
    // Calculate Rate
    const areaVal = property.areaSize ? parseInt(property.areaSize.toString().replace(/[^\d]/g, '')) : 0;
    if (priceVal && areaVal) {
      const rate = Math.round(priceVal / areaVal);
      depositText = `₹${rate.toLocaleString('en-IN')} / ${property.areaUnit || 'sq ft'}`;
    }
  }

  // Specifications based on Type
  const specs = [];
  if (['House', 'Flat', 'Home'].includes(property.type)) {
    const furnishingOptions = ['Semi-Furnished', 'Fully Furnished', 'Unfurnished'];
    const furnishing = furnishingOptions[idNum % furnishingOptions.length];

    const tenantOptions = ['Family/Bachelors', 'Family Only', 'Bachelors Only'];
    const tenant = tenantOptions[(idNum + 1) % tenantOptions.length];

    specs.push({ label: 'BHK', value: `${bhk} BHK` });
    specs.push({ label: 'FURNISHING', value: furnishing });
    specs.push({ label: 'BATHROOM', value: `${parseInt(bhk) || 2}` });
    specs.push({ label: 'TENANT PREFERRED', value: tenant });
  } else if (['Plot'].includes(property.type)) {
    const facingOptions = ['East', 'North', 'West', 'South'];
    const facing = facingOptions[idNum % facingOptions.length];

    const boundaryOptions = ['Yes', 'No'];
    const boundary = boundaryOptions[(idNum + 2) % boundaryOptions.length];

    specs.push({ label: 'FACES', value: facing });
    specs.push({ label: 'BOUNDARY WALL', value: boundary });
    specs.push({ label: 'LAND AUTHORITY', value: 'RERA Approved' });
  } else {
    // Commercial / Shop / Office / Warehouse
    const availabilityOptions = ['Immediately', '15 Days', '30 Days'];
    const availability = availabilityOptions[idNum % availabilityOptions.length];

    const parkingOptions = ['Available', 'Covered', 'Not Available'];
    const parking = parkingOptions[(idNum + 1) % parkingOptions.length];

    specs.push({ label: 'AVAILABILITY', value: availability });
    specs.push({ label: 'PARKING', value: parking });
    specs.push({ label: 'LIFT', value: idNum % 2 === 0 ? 'Yes' : 'No' });
  }

  return {
    photoCount,
    updatedText,
    formattedPrice,
    depositText,
    specs,
  };
}

export default function PropertyCard({ property, compact = false }) {
  const router = useRouter();
  const [isLiked, setIsLiked] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const { photoCount, updatedText, formattedPrice, depositText, specs } = getPropertySpecs(property);
  const isRent = property.purpose === 'Rent';

  const propId = property._id || property.id;
  const handleCardClick = () => {
    if (propId) router.push(`/properties/${propId}`);
  };

  const handleAction = (e, callback) => {
    e.stopPropagation();
    if (callback) callback();
  };

  // Broker fallback in case it's missing (e.g., from test data)
  const broker = property.broker || {
    name: 'BrokerBoss Agent',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=256&h=256',
    phone: '+919876543210'
  };
  const brokerPhone = broker.phone || '+919876543210';

  // Image Source - fallback to property image or broker image
  const imageUrl = property.images?.[0] || broker.image || '/badge.png';

  // Specifications logic: only collapse when there are 5 or 6 specs in total.
  // We combine the base specs and the AREA spec.
  const allFeatures = [...specs, { label: 'AREA', value: property.area }];
  const hasCollapse = allFeatures.length >= 5;
  const visibleFeatures = (hasCollapse && !isExpanded) ? allFeatures.slice(0, 3) : allFeatures;

  return (
    <Card
      onClick={handleCardClick}
      className={`group relative flex flex-col md:flex-row overflow-hidden hover:shadow-lg transition-all duration-300 border border-border/80 bg-white dark:bg-card cursor-pointer rounded-2xl p-0 ${
        compact ? 'mb-2' : 'mb-4'
      }`}
    >
      {/* ────────────────────────────────────────────────
          LEFT COLUMN: IMAGE & BADGES
          ──────────────────────────────────────────────── */}
      <div className="relative shrink-0 w-full md:w-[260px] bg-muted overflow-hidden flex flex-col border-r border-border/50">
        {/* Aspect Ratio Box for Image */}
        <div className="relative w-full aspect-[16/10] md:aspect-[4/3] overflow-hidden">
          <img
            src={imageUrl}
            alt={property.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          


          {/* Overlay: Updated tag */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2 pt-6">
            <span className="text-white text-[11px] font-semibold tracking-wide drop-shadow-sm">
              {updatedText}
            </span>
          </div>
        </div>

        {/* Below Image Section (Desktop & Mobile unified) */}
        <div className="p-3 bg-gray-50/50 dark:bg-muted/10 flex flex-col gap-1.5 border-t border-border/40 text-xs overflow-visible">
          <div className="flex items-center gap-1.5 text-muted-foreground relative group/broker">
            <User className="h-3.5 w-3.5 text-gray-400 shrink-0" />
            <span className="font-semibold text-foreground truncate cursor-pointer hover:underline">
              {broker.name}
            </span>
            <span className="text-[10px] bg-gray-200/60 dark:bg-muted text-muted-foreground px-1.5 py-0.2 rounded font-medium capitalize">
              {broker.role || property.ownerType || 'Broker'}
            </span>
            
            {/* Broker Hover Card */}
            <div className="absolute bottom-full left-0 mb-2 hidden group-hover/broker:flex flex-col bg-white dark:bg-card border border-border/80 shadow-xl rounded-xl p-3 w-48 z-50">
              <div className="flex items-center gap-3">
                <img src={broker.image} alt={broker.name} className="w-10 h-10 rounded-full object-cover border border-border/50" />
                <div>
                  <p className="font-bold text-sm text-foreground leading-tight">{broker.name}</p>
                  <p className="text-[10px] text-muted-foreground capitalize">{broker.role || property.ownerType || 'Broker'}</p>
                </div>
              </div>
              <div className="mt-2 text-xs flex items-center gap-1 text-emerald-600 font-semibold">
                <CheckCircle2 className="h-3.5 w-3.5" /> Verified Partner
              </div>
              <div className="mt-2 text-xs text-muted-foreground font-medium">
                <Phone className="h-3 w-3 inline mr-1" /> {broker.phone}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-bold text-[11px]">
            <CheckCircle2 className="h-3.5 w-3.5 shrink-0 fill-emerald-100 dark:fill-none" />
            Verified Trusted Partner
          </div>
        </div>
      </div>

      {/* ────────────────────────────────────────────────
          MIDDLE COLUMN: PROPERTY SPECS & DESCRIPTION
          ──────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col justify-between p-4 md:p-5 min-w-0">
        <div>
          {/* Header Row: Title & Action Icons */}
          <div className="flex items-start justify-between gap-3 mb-2">
            <div className="flex flex-col items-start gap-1 flex-1">
              <span className="inline-block bg-muted text-muted-foreground text-[10px] font-bold px-2 py-0.5 rounded-md border border-border/50">
                ID: {property.propertyId || `BB${100 + ((parseInt(propId.replace(/\D/g, '')) || 7) % 900)}`}
              </span>
              <h3 className="font-extrabold text-foreground text-sm md:text-base leading-snug line-clamp-2 hover:text-primary transition-colors">
                {property.title}
              </h3>
            </div>
            
            {/* Quick Actions (Heart, Share, Info) */}
            <div className="flex items-center gap-1 shrink-0">
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => handleAction(e, () => setIsLiked(!isLiked))}
                className={`h-8 w-8 rounded-full hover:bg-blue-50 dark:hover:bg-blue-950/20 text-muted-foreground ${
                  isLiked ? 'text-primary fill-primary' : 'hover:text-primary'
                }`}
                aria-label="Save property"
              >
                <Bookmark className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => handleAction(e, () => {
                  if (navigator.share && propId) {
                    navigator.share({ title: property.title, url: window.location.origin + `/properties/${propId}` });
                  }
                })}
                className="h-8 w-8 rounded-full hover:bg-blue-50 dark:hover:bg-blue-950/20 text-muted-foreground hover:text-blue-500"
                aria-label="Share property"
              >
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Location details */}
          <div className="flex items-center gap-1 text-muted-foreground text-xs font-semibold mb-3">
            <MapPin className="h-3.5 w-3.5 text-muted-foreground/80 shrink-0" />
            <span className="truncate">{property.locality}, {property.city}</span>
          </div>

          {/* Dynamic Specifications Grid (Magicbricks style) */}
          <div 
            onClick={(e) => {
              if (hasCollapse) {
                e.stopPropagation();
                setIsExpanded(!isExpanded);
              }
            }}
            className={`bg-gray-50/70 dark:bg-muted/30 border border-border/50 rounded-xl p-3 mb-3 grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-2.5 relative group/specs ${
              hasCollapse ? 'cursor-pointer hover:bg-gray-100/50 dark:hover:bg-muted/40 transition-colors' : ''
            }`}
          >
            {visibleFeatures.map((spec, idx) => (
              <div key={idx} className="min-w-0 border-r border-border/30 last:border-none pr-1">
                <span className="block text-[9px] font-bold text-muted-foreground uppercase tracking-wider mb-0.5">
                  {spec.label}
                </span>
                <span className="block text-xs font-bold text-foreground truncate">
                  {spec.value}
                </span>
              </div>
            ))}
            
            {/* Small Dropdown arrow to match the design */}
            {hasCollapse && (
              <div className="absolute right-2.5 bottom-2 text-gray-400 group-hover/specs:text-foreground transition-all">
                <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} />
              </div>
            )}
          </div>

          {/* Description Snippet */}
          <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2 mb-2 relative pr-4">
            {property.description}
            <span className="inline-block text-primary font-semibold text-[10px] ml-1 hover:underline whitespace-nowrap cursor-pointer">
              Read more...
            </span>
          </p>
        </div>

        {/* Mobile-only Price and CTA area (hidden on desktop) */}
        <div className="flex md:hidden items-center justify-between border-t border-border/40 pt-3 mt-2">
          <div className="flex flex-col">
            <span className="text-base font-black text-foreground">{formattedPrice}</span>
            <span className="text-[10px] text-muted-foreground leading-none">{isRent ? '/month' : ''}</span>
          </div>

          <div className="flex items-center gap-1.5">
            <Button
              variant="outline"
              size="sm"
              onClick={(e) => handleAction(e, () => {
                window.open(`https://wa.me/${brokerPhone.replace(/[^\d]/g, '')}?text=Hello, I am interested in ${encodeURIComponent(property.title)} at ${window.location.origin + `/properties/${propId}`}`, '_blank');
              })}
              className="border-primary text-primary hover:bg-primary/10 font-bold h-8 text-[11px] px-3 rounded-lg flex items-center gap-1 bg-transparent"
            >
              <FaWhatsapp className="h-3.5 w-3.5" />
              WhatsApp
            </Button>
            <a
              href={`tel:${brokerPhone.replace(/\s/g, '')}`}
              onClick={(e) => e.stopPropagation()}
              className="inline-block"
            >
              <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold h-8 text-[11px] px-3 shadow-sm rounded-lg flex items-center gap-1">
                <Phone className="h-3 w-3" />
                Call Now
              </Button>
            </a>
          </div>
        </div>
      </div>

      {/* ────────────────────────────────────────────────
          RIGHT COLUMN: PRICE & ACTION PANEL (DESKTOP)
          ──────────────────────────────────────────────── */}
      <div className="hidden md:flex shrink-0 w-[180px] bg-[#f4faff] dark:bg-blue-950/10 border-l border-border/50 flex-col justify-between p-5 text-center">
        {/* Price display */}
        <div className="mt-2">
          <div className="flex items-center justify-center gap-1 text-2xl font-black text-gray-900 dark:text-white leading-none">
            {formattedPrice}
            {isRent && <span className="text-xs font-semibold text-muted-foreground mt-1">/mo</span>}
          </div>
          <span className="block text-[10px] text-muted-foreground font-semibold mt-1.5 hover:underline decoration-dotted cursor-pointer leading-tight">
            {depositText}
          </span>
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-2.5 w-full mt-4">
          <Button
            variant="outline"
            onClick={(e) => handleAction(e, () => {
              window.open(`https://wa.me/${brokerPhone.replace(/[^\d]/g, '')}?text=Hello, I am interested in ${encodeURIComponent(property.title)} at ${window.location.origin + `/properties/${propId}`}`, '_blank');
            })}
            className="w-full border-primary text-primary hover:bg-primary/10 font-bold text-xs h-9 rounded-lg transition-colors flex items-center justify-center gap-1.5 bg-transparent"
          >
            <FaWhatsapp className="h-4 w-4" />
            WhatsApp
          </Button>

          <a
            href={`tel:${brokerPhone.replace(/\s/g, '')}`}
            onClick={(e) => e.stopPropagation()}
            className="w-full"
          >
            <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-xs h-9 shadow-sm rounded-lg transition-colors flex items-center justify-center gap-1.5">
              <Phone className="h-3.5 w-3.5" />
              Contact Broker
            </Button>
          </a>
        </div>
      </div>
    </Card>
  );
}
