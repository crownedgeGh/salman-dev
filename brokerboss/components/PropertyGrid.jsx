import PropertyCard from './PropertyCard';
import { FaSearch } from 'react-icons/fa';

/**
 * PropertyGrid
 * @param {object[]} properties
 * @param {boolean}  [compact=false]  – passes compact mode to each card
 */
export default function PropertyGrid({ properties, compact = false }) {
  if (!properties || properties.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 gap-4 text-center">
        <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center">
          <FaSearch className="h-7 w-7 text-muted-foreground" />
        </div>
        <div>
          <h3 className="text-lg font-semibold">No properties found</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Try adjusting your search or filters to find what you&apos;re looking for.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className={`flex flex-col ${compact ? 'gap-1.5 md:gap-2' : 'gap-2 md:gap-4'}`}>
        {properties.map((property, idx) => (
          <PropertyCard key={property._id || property.id || idx} property={property} compact={compact} />
        ))}
      </div>
    </div>
  );
}
