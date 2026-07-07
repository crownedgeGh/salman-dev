'use client';

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import FilterSidebar from './FilterSidebar';
import { FaSlidersH } from 'react-icons/fa';

export default function FilterSheet({ filters, onFilterChange, onClear, activeCount, children }) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        {children || (
          <Button variant="outline" size="sm" className="gap-2 md:hidden">
            <FaSlidersH className="h-3.5 w-3.5" />
            Filters
          {activeCount > 0 && (
            <span className="h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
              {activeCount}
            </span>
          )}
        </Button>
        )}
      </SheetTrigger>
      <SheetContent side="left" className="w-[85vw] sm:w-80 overflow-y-auto overflow-x-hidden p-5 flex flex-col gap-2">
        <SheetHeader className="px-0 pt-0 pb-2">
          <SheetTitle>Filter Properties</SheetTitle>
        </SheetHeader>
        <FilterSidebar filters={filters} onFilterChange={onFilterChange} onClear={onClear} />
      </SheetContent>
    </Sheet>
  );
}
