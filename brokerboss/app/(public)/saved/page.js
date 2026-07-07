'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import PropertyCard from '@/components/PropertyCard';
import { Bookmark, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function SavedPropertiesPage() {
  const { isLoggedIn, authLoading, setAuthModalOpen } = useAuth();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isLoggedIn || authLoading) {
      setLoading(false);
      return;
    }

    const fetchSavedProperties = async () => {
      try {
        const res = await fetch('/api/users/saved');
        if (res.ok) {
          const data = await res.json();
          setProperties(data.properties || []);
        }
      } catch (error) {
        console.error("Failed to fetch saved properties", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSavedProperties();
  }, [isLoggedIn, authLoading]);

  if (authLoading || (isLoggedIn && loading)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center p-6 text-center max-w-md mx-auto">
        <div className="h-20 w-20 bg-orange-50 dark:bg-orange-950/30 rounded-full flex items-center justify-center mb-6">
          <Lock className="h-10 w-10 text-orange-500" />
        </div>
        <h1 className="text-3xl font-extrabold text-foreground mb-3">Login Required</h1>
        <p className="text-muted-foreground mb-8">
          You need to be logged in to view and manage your saved properties. Create an account or login to access this feature.
        </p>
        <Button onClick={() => setAuthModalOpen(true)} className="w-full max-w-xs font-bold text-base h-12 rounded-xl">
          Login / Register
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 md:py-12 max-w-5xl">
      <div className="flex items-center gap-3 mb-8">
        <div className="h-12 w-12 rounded-xl bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
          <Bookmark className="h-6 w-6 text-orange-600 dark:text-orange-400" />
        </div>
        <div>
          <h1 className="text-3xl font-extrabold text-foreground">Saved Properties</h1>
          <p className="text-muted-foreground font-medium">You have {properties.length} bookmarked properties</p>
        </div>
      </div>

      {properties.length === 0 ? (
        <div className="bg-white dark:bg-gray-900 rounded-3xl p-12 text-center border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col items-center">
          <Bookmark className="h-16 w-16 text-gray-300 dark:text-gray-700 mb-6" />
          <h3 className="text-xl font-bold text-foreground mb-2">No saved properties yet</h3>
          <p className="text-muted-foreground max-w-md mx-auto mb-6">
            Click the bookmark icon on any property card to save it here for later.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {properties.map((property) => (
            <PropertyCard key={property._id} property={property} />
          ))}
        </div>
      )}
    </div>
  );
}
