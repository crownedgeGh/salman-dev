import PropertyCard from './PropertyCard';
import { FaSearch } from 'react-icons/fa';

export default function PropertyGrid({ properties }) {
  if (!properties || properties.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
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
      <p className="text-sm text-muted-foreground mb-4 font-medium">
        Showing <span className="text-foreground">{properties.length}</span> propert{properties.length === 1 ? 'y' : 'ies'}
      </p>
      <div className="flex flex-col gap-4">
        {properties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </div>
  );
}
