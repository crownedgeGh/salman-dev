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

function CallBrokerButton({ broker }) {
  const { isLoggedIn } = useAuth();

  // On mobile: always show tel: link (no login required)
  // On web: show number if logged in, else show prompt
  return (
    <div className="flex flex-col gap-2">
      {/* Mobile-only: always show dialpad link */}
      <a
        href={`tel:${broker.phone.replace(/\s/g, '')}`}
        className="md:hidden"
      >
        <Button className="w-full gap-2" size="sm">
          <FaPhone className="h-3.5 w-3.5" />
          Call Broker
        </Button>
      </a>

      {/* Desktop-only: conditional */}
      <div className="hidden md:block">
        {isLoggedIn ? (
          <div className="flex items-center gap-2 bg-muted rounded-md px-3 py-2">
            <FaPhone className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
            <span className="text-sm font-medium">{broker.phone}</span>
          </div>
        ) : (
          <Button variant="outline" size="sm" className="w-full gap-2 text-muted-foreground" disabled>
            <FaLock className="h-3.5 w-3.5" />
            Login to view number
          </Button>
        )}
      </div>
    </div>
  );
}

export default function PropertyCard({ property }) {
  const TypeIcon = typeIconMap[property.type] || FaBuilding;
  const typeColor = typeColorMap[property.type] || 'bg-gray-100 text-gray-800';

  return (
    <Card className="flex flex-col h-full hover:shadow-md transition-shadow duration-200">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${typeColor}`}>
              <TypeIcon className="h-3 w-3" />
              {property.type}
            </span>
            <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${
              property.purpose === 'Sale'
                ? 'border-green-500 text-green-700 dark:text-green-400'
                : 'border-blue-500 text-blue-700 dark:text-blue-400'
            }`}>
              {property.purpose}
            </span>
          </div>
        </div>
        <h3 className="font-semibold text-sm leading-snug mt-2 line-clamp-2">
          {property.title}
        </h3>
      </CardHeader>

      <CardContent className="flex-1 pb-3">
        <p className="text-xs text-muted-foreground line-clamp-3 mb-3">
          {property.description}
        </p>

        <div className="space-y-1.5">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <FaMapMarkerAlt className="h-3 w-3 shrink-0" />
            <span>{property.locality}, {property.city}</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <FaRulerCombined className="h-3 w-3 shrink-0" />
            <span>{property.area}</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-semibold">
            <FaTag className="h-3 w-3 shrink-0 text-muted-foreground" />
            <span>{property.price}</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="pt-3 border-t flex-col items-start gap-3">
        <CallBrokerButton broker={property.broker} />
        <p className="text-xs text-muted-foreground">
          Posted by: <span className="font-medium text-foreground">{property.broker.name}</span>
        </p>
      </CardFooter>
    </Card>
  );
}
