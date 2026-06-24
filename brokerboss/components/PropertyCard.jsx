'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  FaMapMarkerAlt,
  FaRulerCombined,
  FaPhone,
  FaHome,
  FaStore,
  FaBuilding,
  FaWarehouse,
  FaChartArea,
  FaWhatsapp,
  FaCheckCircle,
} from 'react-icons/fa';

const typeIconMap = {
  House: FaHome,
  Flat: FaBuilding,
  Shop: FaStore,
  Plot: FaChartArea,
  Home: FaHome,
  Office: FaBuilding,
  Warehouse: FaWarehouse,
};

const typeColorMap = {
  House: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  Flat: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
  Shop: 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200',
  Plot: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  Home: 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200',
  Office: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200',
  Warehouse: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
};

function CallBrokerButtons({ broker, compact }) {
  return (
    <div className={`flex flex-wrap items-center gap-2 w-full sm:w-auto ${compact ? 'mt-2' : 'mt-4 sm:mt-0'}`}>
      <a href={`tel:${broker.phone.replace(/\s/g, '')}`} className="flex-1 sm:flex-none">
        <Button size={compact ? 'sm' : 'default'} className={`w-full gap-1.5 shadow-sm font-medium ${compact ? 'h-8 text-xs px-3' : ''}`}>
          <FaPhone className={compact ? 'h-3 w-3' : 'h-3.5 w-3.5'} />
          Call Now
        </Button>
      </a>
      <Button
        variant="outline"
        size={compact ? 'sm' : 'default'}
        className={`flex-1 sm:flex-none gap-1.5 border-primary text-primary hover:bg-primary/10 shadow-sm font-medium ${compact ? 'h-8 text-xs px-3' : ''}`}
      >
        <FaWhatsapp className={compact ? 'h-3.5 w-3.5' : 'h-4 w-4'} />
        WhatsApp
      </Button>
    </div>
  );
}

/**
 * PropertyCard
 * @param {object}  property
 * @param {boolean} [compact=false]  – reduces card height for dense listing views
 *
 * Image ratio is always 9:16 (portrait). Card height is fixed and does NOT
 * grow with the image — the image is contained inside its aspect-ratio box.
 */
export default function PropertyCard({ property, compact = false }) {
  const typeColor = typeColorMap[property.type] || 'bg-gray-100 text-gray-800';

  return (
    <Card className={`flex flex-col sm:flex-row overflow-hidden hover:shadow-md transition-all duration-200 border-border/60 bg-white dark:bg-card ${compact ? 'mb-1.5 sm:mb-2' : 'mb-2 sm:mb-4'}`}>

      {/* ────────────────────────────────────────────────
          MOBILE LAYOUT
          ──────────────────────────────────────────────── */}
      <div className="flex sm:hidden w-full">
        {/*
          Image column — fixed width, 9:16 portrait ratio.
          We achieve 9:16 by setting width and calculating height:
          compact: w=80px  → h = 80 * (16/9) ≈ 142px
          normal:  w=96px  → h = 96 * (16/9) ≈ 170px
        */}
        <div className={`shrink-0 relative bg-muted overflow-hidden rounded-l-lg ${compact ? 'w-[80px] h-[142px]' : 'w-[96px] h-[170px]'}`}>
          <img
            src={property.broker.image}
            alt={property.broker.name}
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Type + Purpose badges */}
          <div className="absolute top-1.5 left-1.5 flex flex-col gap-1">
            <Badge className="bg-black/60 hover:bg-black/80 backdrop-blur-sm border-none text-[9px] px-1.5 py-0">
              {property.type}
            </Badge>
            <Badge className={`backdrop-blur-sm border-none text-[9px] px-1.5 py-0 ${property.purpose === 'Sale' ? 'bg-green-600/80' : 'bg-blue-600/80'}`}>
              {property.purpose}
            </Badge>
          </div>
        </div>

        {/* Content column */}
        <div className={`flex-1 min-w-0 flex flex-col justify-between p-2.5 ${compact ? 'py-2' : 'py-3'}`}>
          {/* Title */}
          <h3 className="font-bold text-[12px] leading-tight text-foreground line-clamp-2 mb-1">
            {property.title}
          </h3>

          {/* Price — prominent, under title */}
          <p className="text-primary font-extrabold text-[13px] mb-1">{property.price}</p>

          {/* Broker name + verified */}
          <div className="flex items-center gap-1 mb-0.5">
            <span className="font-medium text-foreground text-[10px] line-clamp-1">
              {property.broker.name}
            </span>
            <div className="flex items-center gap-0.5 text-blue-600 font-bold text-[8px] bg-blue-50 px-1 py-[1px] rounded border border-blue-100 shrink-0">
              <FaCheckCircle className="h-2 w-2" />
              Verified
            </div>
          </div>

          {/* Location */}
          <div className="text-muted-foreground text-[10px] font-medium flex items-center gap-1 mb-2">
            <FaMapMarkerAlt className="h-2.5 w-2.5 shrink-0" />
            <span className="line-clamp-1">{property.locality}, {property.city}</span>
          </div>

          {/* Area tag */}
          <div className="mb-2">
            <span className="bg-muted text-muted-foreground text-[9px] font-medium px-1.5 py-0.5 rounded-full border border-border/50">
              <FaRulerCombined className="inline mr-1 h-2.5 w-2.5" />
              {property.area}
            </span>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-1.5">
            <a href={`tel:${property.broker.phone.replace(/\s/g, '')}`} className="flex-1">
              <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground gap-1 font-semibold text-[10px] h-7 rounded-md shadow-sm px-2">
                <FaPhone className="h-2.5 w-2.5" />
                Call Now
              </Button>
            </a>
            <Button variant="outline" className="flex-1 border-primary text-primary hover:bg-primary/10 font-semibold text-[10px] h-7 rounded-md shadow-sm px-2">
              <FaWhatsapp className="h-2.5 w-2.5" />
              WhatsApp
            </Button>
          </div>
        </div>
      </div>

      {/* ────────────────────────────────────────────────
          DESKTOP LAYOUT
          ──────────────────────────────────────────────── */}
      {/*
        Image column — fixed width + explicit height enforcing 9:16.
        compact: w=120px → h = 120 * (16/9) ≈ 213px
        normal:  w=160px → h = 160 * (16/9) ≈ 284px
        The card height is driven by the content column and the image
        is constrained inside its box (object-cover), so card height
        stays constant regardless of image content.
      */}
      <div className={`hidden sm:block relative shrink-0 bg-muted border-r border-border/40 overflow-hidden ${compact ? 'w-[120px] h-[213px]' : 'w-[160px] h-[284px]'}`}>
        <img
          src={property.broker.image}
          alt={property.broker.name}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          <Badge className="bg-black/60 hover:bg-black/80 backdrop-blur-sm border-none text-[10px] px-1.5 py-0">
            {property.type}
          </Badge>
          <Badge className={`backdrop-blur-sm border-none text-[10px] px-1.5 py-0 ${property.purpose === 'Sale' ? 'bg-green-600/80' : 'bg-blue-600/80'}`}>
            {property.purpose}
          </Badge>
        </div>
      </div>

      {/* Right: Details */}
      <div className={`hidden sm:flex flex-1 flex-col justify-between min-w-0 ${compact ? 'p-3' : 'p-5'}`}>
        <div>
          {/* Title — full width, no price on the right */}
          <h3 className={`font-bold leading-tight text-foreground mb-1 ${compact ? 'text-sm line-clamp-1' : 'text-lg line-clamp-2'}`}>
            {property.title}
          </h3>

          {/* Price — under the title, prominent */}
          <p className={`font-extrabold text-primary mb-2 ${compact ? 'text-sm' : 'text-xl'}`}>
            {property.price}
          </p>

          {/* Broker Info */}
          <div className={`flex flex-col ${compact ? 'gap-0.5 mb-2' : 'gap-1.5 mb-3'}`}>
            <div className="flex items-center gap-1.5">
              <span className="text-muted-foreground text-xs">By</span>
              <span className={`font-semibold text-foreground ${compact ? 'text-xs' : 'text-sm'}`}>
                {property.broker.name}
              </span>
              <div className={`flex items-center gap-1 text-blue-600 font-bold bg-blue-50 px-1 rounded border border-blue-100 ${compact ? 'text-[9px] py-[1px]' : 'text-[10px] py-0.5 ml-1'}`}>
                <FaCheckCircle className={compact ? 'h-2 w-2' : 'h-2.5 w-2.5'} />
                Verified
              </div>
            </div>

            {!compact && (
              <div className="flex items-center gap-1.5">
                <span className="bg-green-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded shadow-sm flex items-center gap-1">
                  4.8 <span className="text-[9px]">★</span>
                </span>
                <span className="text-muted-foreground text-xs font-medium">156 Ratings</span>
              </div>
            )}
          </div>

          {/* Location */}
          <div className={`flex items-center gap-1.5 text-foreground font-medium ${compact ? 'text-xs mb-1.5' : 'text-sm mb-3'}`}>
            <FaMapMarkerAlt className={`text-muted-foreground shrink-0 ${compact ? 'h-3 w-3' : 'h-4 w-4'}`} />
            {property.locality}, {property.city}
          </div>

          {/* Area tag */}
          <div className={`flex flex-wrap items-center gap-1.5 ${compact ? 'mb-1' : 'mb-3'}`}>
            <span className={`bg-muted text-muted-foreground font-medium rounded-full border border-border/50 shadow-sm ${compact ? 'text-[10px] px-2 py-0.5' : 'text-xs px-2.5 py-1'}`}>
              <FaRulerCombined className="inline mr-1 h-3 w-3" />
              {property.area}
            </span>
          </div>

          {!compact && (
            <p className="text-sm text-muted-foreground line-clamp-2 border-t pt-3 border-border/50 mb-2">
              {property.description}
            </p>
          )}
        </div>

        {/* Action Buttons */}
        <CallBrokerButtons broker={property.broker} compact={compact} />
      </div>
    </Card>
  );
}
