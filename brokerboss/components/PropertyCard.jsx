'use client';

import { useAuth } from '@/context/AuthContext';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import {
  FaMapMarkerAlt,
  FaRulerCombined,
  FaTag,
  FaPhone,
  FaLock,
  FaHome,
  FaStore,
  FaBuilding,
  FaWarehouse,
  FaChartArea,
  FaWhatsapp,
  FaEnvelope,
  FaCheckCircle,
  FaThumbsUp
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

function CallBrokerButtons({ broker }) {
  return (
    <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto mt-4 sm:mt-0">
      {/* Call Button */}
      <a href={`tel:${broker.phone.replace(/\s/g, '')}`} className="flex-1 sm:flex-none">
        <Button className="w-full gap-2 shadow-sm font-medium">
          <FaPhone className="h-3.5 w-3.5" />
          Call Now
        </Button>
      </a>

      {/* WhatsApp Button */}
      <Button variant="outline" className="flex-1 sm:flex-none gap-2 border-primary text-primary hover:bg-primary/10 shadow-sm font-medium">
        <FaWhatsapp className="h-4 w-4" />
        WhatsApp
      </Button>
    </div>
  );
}

export default function PropertyCard({ property }) {
  const TypeIcon = typeIconMap[property.type] || FaBuilding;
  const typeColor = typeColorMap[property.type] || 'bg-gray-100 text-gray-800';

  return (
    <Card className="flex flex-col sm:flex-row overflow-hidden hover:shadow-lg transition-all duration-200 border-border/60 bg-white dark:bg-card">
      {/* Left side: Image/Logo placeholder */}
      <div className="w-full sm:w-[220px] shrink-0 bg-muted border-r border-border/40 relative">
        <img 
          src={property.broker.image} 
          alt={property.broker.name} 
          className="w-full h-48 sm:h-full object-cover"
        />
        <div className="absolute top-2 left-2 flex gap-1">
          <Badge className="bg-black/60 hover:bg-black/80 backdrop-blur-sm border-none text-[10px] px-1.5 py-0">
            {property.type}
          </Badge>
          <Badge className={`backdrop-blur-sm border-none text-[10px] px-1.5 py-0 ${property.purpose === 'Sale' ? 'bg-green-600/80' : 'bg-blue-600/80'}`}>
            {property.purpose}
          </Badge>
        </div>
      </div>

      {/* Right side: Details */}
      <div className="flex-1 p-4 sm:p-5 flex flex-col justify-between min-w-0">
        <div>
          {/* Header Row */}
          <div className="flex items-start justify-between gap-4 mb-2">
            <div>
              <h3 className="font-bold text-lg leading-tight text-foreground line-clamp-2">
                {property.title}
              </h3>
              
              {/* Broker Info & Ratings */}
              <div className="mt-2 flex flex-col gap-1.5">
                <div className="flex items-center gap-1.5 text-sm">
                  <span className="text-muted-foreground text-xs">Posted by</span>
                  <span className="font-semibold text-foreground flex items-center gap-1.5">
                    {property.broker.name}
                  </span>
                  <div className="flex items-center gap-1 text-blue-600 font-bold text-[10px] bg-blue-50 px-1 py-0.5 rounded border border-blue-100 ml-1">
                    <FaCheckCircle className="h-2.5 w-2.5" />
                    Verified
                  </div>
                </div>
                
                <div className="flex items-center gap-1.5">
                  <span className="bg-green-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded shadow-sm flex items-center gap-1">
                    4.8 <span className="text-[9px]">★</span>
                  </span>
                  <span className="text-muted-foreground text-xs font-medium">156 Ratings</span>
                </div>
              </div>
            </div>
            <div className="text-right shrink-0">
              <p className="font-bold text-lg text-primary">{property.price}</p>
              <p className="text-xs text-muted-foreground line-through">{property.price} +</p>
            </div>
          </div>

          {/* Location */}
          <div className="flex items-center gap-2 text-sm text-foreground mb-3 font-medium">
            <FaMapMarkerAlt className="h-4 w-4 text-muted-foreground" />
            {property.locality}, {property.city}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="bg-muted text-muted-foreground text-xs font-medium px-2.5 py-1 rounded-full border border-border/50 shadow-sm">
              <FaRulerCombined className="inline mr-1.5 h-3 w-3" />
              {property.area}
            </span>
          </div>
          
          <p className="text-sm text-muted-foreground line-clamp-2 border-t pt-3 border-border/50 mb-4 sm:mb-2">
            {property.description}
          </p>
        </div>

        {/* Action Buttons */}
        <CallBrokerButtons broker={property.broker} />
      </div>
    </Card>
  );
}
