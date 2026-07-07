import connectToDatabase from '@/lib/mongodb';
import User from '@/lib/models/User';
import Link from 'next/link';
import { Phone, MapPin, Building, Briefcase } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export const metadata = {
  title: 'Brokers | BrokerBoss',
  description: 'Find top real estate brokers in your area.',
};

export default async function BrokersPage() {
  let brokers = [];

  try {
    await connectToDatabase();
    // Fetch users who are brokers, sorting by latest joined or maybe by name
    brokers = await User.find({ role: { $in: ['broker', 'Broker'] } })
      .select('-password')
      .sort({ createdAt: -1 })
      .lean();
  } catch (error) {
    console.error("Failed to fetch brokers:", error);
  }

  const getValidImg = (img) => typeof img === 'string' && (img.startsWith('http') || img.startsWith('/') || img.startsWith('data:')) ? img : null;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-8 lg:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        <div className="mb-8 md:mb-10 text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-extrabold text-foreground mb-3">Our Verified Brokers</h1>
          <p className="text-muted-foreground max-w-2xl text-sm md:text-base">
            Connect with experienced real estate professionals who can help you find your dream property or sell your existing one at the best price.
          </p>
        </div>

        {brokers.length === 0 ? (
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-10 text-center shadow-sm border border-border/50">
            <h3 className="text-xl font-bold text-foreground mb-2">No Brokers Found</h3>
            <p className="text-muted-foreground">We currently don't have any registered brokers.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {brokers.map((broker) => {
              const name = broker.name || 'Unknown Broker';
              const role = broker.role || 'Broker';
              const city = broker.city || 'Not specified';
              const firmName = broker.firmName || '';
              const yearsOfExperience = broker.yearsOfExperience ? `${broker.yearsOfExperience} Yrs` : '';
              const profileImage = getValidImg(broker.passportPhoto) || getValidImg(broker.image) || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop';
              const brokerUrl = `/viewBroker/${broker._id.toString()}`;

              return (
                <Link href={brokerUrl} key={broker._id.toString()} className="group">
                  <div className="bg-white dark:bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-border/60 group-hover:border-primary/30 h-full flex flex-col p-6">
                    
                    {/* Header Image and Title Area */}
                    <div className="flex items-center gap-4 mb-6">
                      <div className="h-16 w-16 rounded-full overflow-hidden border-2 border-primary/20 shadow-sm bg-gray-100 shrink-0">
                        <img src={profileImage} alt={name} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" />
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
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
