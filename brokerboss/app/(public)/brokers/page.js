import connectToDatabase from '@/lib/mongodb';
import User from '@/lib/models/User';
import Property from '@/lib/models/Property';
import Link from 'next/link';
import { Phone, MapPin, Building, Briefcase, Home, ChevronLeft, ChevronRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Suspense } from 'react';
import BrokerSearch from './BrokerSearch';

export const metadata = {
  title: 'Brokers | BrokerBoss',
  description: 'Find top real estate brokers in your area.',
};

export default async function BrokersPage(props) {
  const searchParams = await props.searchParams;
  const page = parseInt(searchParams?.page || '1', 10);
  const search = searchParams?.search || '';
  const exp = searchParams?.exp || '';

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-8 lg:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        <div className="mb-8 md:mb-10 text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-extrabold text-foreground mb-3 ">Our Verified Brokers</h1>
        
        </div>

        {/* Search & Filter Bar */}
        <Suspense>
          <BrokerSearch initialSearch={search} initialExp={exp} />
        </Suspense>

        <Suspense key={`${page}-${search}-${exp}`} fallback={<BrokersSkeleton />}>
          <BrokersList page={page} search={search} exp={exp} />
        </Suspense>

      </div>
    </div>
  );
}

function BrokersSkeleton() {
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="bg-white dark:bg-card rounded-2xl p-6 h-[220px] border border-border/60 shadow-sm animate-pulse flex flex-col">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-16 w-16 rounded-full bg-gray-200 dark:bg-gray-800"></div>
              <div className="flex-1 space-y-2">
                <div className="h-5 bg-gray-200 dark:bg-gray-800 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded w-1/2"></div>
              </div>
            </div>
            <div className="mt-auto space-y-3">
              <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded-lg w-full"></div>
              <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded-lg w-full"></div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-20 flex justify-center items-center gap-2 animate-pulse">
        <div className="h-10 w-10 bg-gray-200 dark:bg-gray-800 rounded-md"></div>
        <div className="h-10 w-10 bg-gray-200 dark:bg-gray-800 rounded-md"></div>
        <div className="h-10 w-10 bg-gray-200 dark:bg-gray-800 rounded-md"></div>
      </div>
    </div>
  );
}

async function BrokersList({ page, search, exp }) {
  let brokers = [];
  let totalPages = 1;
  const currentPage = page;

  try {
    const limit = 12;
    const skip = (currentPage - 1) * limit;

    await connectToDatabase();

    // Build query
    const query = { role: { $in: ['broker', 'Broker'] } };

    // Name search (case-insensitive)
    if (search) {
      query.name = { $regex: search, $options: 'i' };
    }

    // Experience filter
    if (exp) {
      if (exp === '0-2') {
        query.yearsOfExperience = { $gte: 0, $lte: 2 };
      } else if (exp === '3-5') {
        query.yearsOfExperience = { $gte: 3, $lte: 5 };
      } else if (exp === '6-10') {
        query.yearsOfExperience = { $gte: 6, $lte: 10 };
      } else if (exp === '10+') {
        query.yearsOfExperience = { $gte: 10 };
      }
    }

    // Optimized: run count and find in parallel
    const [totalBrokers, fetchedBrokers] = await Promise.all([
      User.countDocuments(query),
      User.find(query)
        .select('-password -aadhar -__v -savedProperties')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean()
    ]);

    totalPages = Math.ceil(totalBrokers / limit) || 1;

    // Fetch active property counts for each broker
    const brokerIds = fetchedBrokers.map(b => b._id.toString());
    const propertyCounts = await Property.aggregate([
      { $match: { 'broker.id': { $in: brokerIds }, status: { $ne: 'Disable' } } },
      { $group: { _id: '$broker.id', count: { $sum: 1 } } }
    ]);

    const countMap = {};
    propertyCounts.forEach(pc => {
      countMap[pc._id] = pc.count;
    });

    brokers = fetchedBrokers.map(broker => ({
      ...broker,
      propertyCount: countMap[broker._id.toString()] || 0
    }));
  } catch (error) {
    console.error("Failed to fetch brokers:", error);
  }

  const getValidImg = (img) => {
    if (typeof img !== 'string' || !img.trim()) return null;
    if (img.includes('unsplash.com')) return null;
    return img.startsWith('http') || img.startsWith('/') || img.startsWith('data:') ? img : null;
  };

  // Build pagination URL helper (preserve search/exp params)
  const pageUrl = (p) => {
    const params = new URLSearchParams();
    if (search) params.set('search', search);
    if (exp) params.set('exp', exp);
    params.set('page', String(p));
    return `/brokers?${params.toString()}`;
  };

  if (brokers.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-900 rounded-2xl p-10 text-center shadow-sm border border-border/50">
        <h3 className="text-xl font-bold text-foreground mb-2">No Brokers Found</h3>
        <p className="text-muted-foreground">
          {search || exp
            ? 'No brokers match your search or filter. Try adjusting your criteria.'
            : "We currently don't have any registered brokers."}
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-in fade-in duration-500">
        {brokers.map((broker) => {
          const name = broker.name || 'Unknown Broker';
          const role = broker.role || 'Broker';
          const city = broker.city || 'Not specified';
          const firmName = broker.firmName || '';
          const yearsOfExperience = broker.yearsOfExperience ? `${broker.yearsOfExperience} Yrs` : '';
          const profileImage = getValidImg(broker.passportPhoto) || getValidImg(broker.image) || `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=e2e8f0&color=475569`;
          const brokerUrl = `/viewBroker/${broker._id.toString()}`;

          return (
            <Link href={brokerUrl} key={broker._id.toString()} className="group">
              <div className="bg-white dark:bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-border/60 group-hover:border-primary/30 h-full flex flex-col p-6">

                {/* Header Image and Title Area */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-16 w-16 rounded-full overflow-hidden border-2 border-primary/20 shadow-sm bg-gray-100 shrink-0">
                    <img src={profileImage} alt={name} className="h-full w-full object-cover object-top group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-bold text-foreground mb-1 group-hover:text-primary transition-colors line-clamp-1">{name}</h3>
                    <div className="flex items-center text-muted-foreground text-xs">
                      <MapPin className="h-3 w-3 mr-1 text-primary/70 shrink-0" />
                      <span className="truncate">{city}</span>
                    </div>
                  </div>
                </div>

                {/* Content Area */}
                <div className="flex-1 flex flex-col">
                  <div className="mt-auto space-y-2">
                    {firmName && (
                      <div className="flex items-center gap-2 text-xs text-foreground/80 bg-gray-50 dark:bg-muted/30 p-2 rounded-lg">
                        <Building className="h-3.5 w-3.5 text-primary/70 shrink-0" />
                        <span className="truncate">{firmName}</span>
                      </div>
                    )}
                    {yearsOfExperience && (
                      <div className="flex items-center gap-2 text-xs text-foreground/80 bg-gray-50 dark:bg-muted/30 p-2 rounded-lg">
                        <Briefcase className="h-3.5 w-3.5 text-primary/70 shrink-0" />
                        <span>{yearsOfExperience} Exp.</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2 text-xs text-foreground/80 bg-gray-50 dark:bg-muted/30 p-2 rounded-lg">
                      <Home className="h-3.5 w-3.5 text-primary/70 shrink-0" />
                      <span>{broker.propertyCount} {broker.propertyCount === 1 ? 'Property' : 'Properties'} Listed</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div
          className="flex justify-center items-center gap-2 w-full clear-both"
          style={{ marginTop: '80px', marginBottom: '48px' }}
        >
          <Button
            variant="outline"
            size="icon"
            asChild
            disabled={currentPage <= 1}
            className={currentPage <= 1 ? "pointer-events-none opacity-50" : ""}
          >
            <Link href={pageUrl(currentPage - 1)} scroll={true}>
              <ChevronLeft className="h-4 w-4" />
            </Link>
          </Button>

          <div className="flex items-center gap-1 mx-2">
            {Array.from({ length: totalPages }).map((_, i) => {
              const pageNum = i + 1;
              // Show first, last, current, and adjacent pages
              if (
                pageNum === 1 ||
                pageNum === totalPages ||
                (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
              ) {
                return (
                  <Button
                    key={pageNum}
                    variant={currentPage === pageNum ? "default" : "outline"}
                    size="sm"
                    className={`w-9 h-9 ${currentPage === pageNum ? "pointer-events-none" : ""}`}
                    asChild
                  >
                    <Link href={pageUrl(pageNum)} scroll={true}>
                      {pageNum}
                    </Link>
                  </Button>
                );
              } else if (
                pageNum === currentPage - 2 ||
                pageNum === currentPage + 2
              ) {
                return <span key={pageNum} className="px-1 text-muted-foreground">...</span>;
              }
              return null;
            })}
          </div>

          <Button
            variant="outline"
            size="icon"
            asChild
            disabled={currentPage >= totalPages}
            className={currentPage >= totalPages ? "pointer-events-none opacity-50" : ""}
          >
            <Link href={pageUrl(currentPage + 1)} scroll={true}>
              <ChevronRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      )}
    </>
  );
}
