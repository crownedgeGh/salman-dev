import { notFound } from 'next/navigation';
import connectToDatabase from '@/lib/mongodb';
import User from '@/lib/models/User';
import Property from '@/lib/models/Property';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import BackButton from '@/components/BackButton';
import PropertyCard from '@/components/PropertyCard';
import { 
  Phone, MapPin, Building, Briefcase, Award, Map, Info, Home
} from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import mongoose from 'mongoose';

export default async function ViewBrokerPage({ params }) {
  const { id } = await params;
  
  if (!mongoose.Types.ObjectId.isValid(id)) {
    notFound();
  }

  let user = null;
  let properties = [];
  try {
    await connectToDatabase();
    // Exclude heavy fields: password, aadhar (base64 doc scan)
    user = await User.findById(id).select('-password -aadhar -__v -savedProperties').lean();
    if (user) {
      properties = await Property.find({ 'broker.id': id })
        .select('-__v')
        .sort({ createdAt: -1 })
        .lean();
    }
  } catch (err) {
    console.error("Failed to fetch user details:", err.message);
  }

  if (!user) {
    notFound();
  }

  const name = user.name || 'Unknown Broker';
  const role = user.role || 'Broker';
  const phone = user.phone || '';
  const city = user.city || 'Not specified';
  const firmName = user.firmName || '';
  const areasOfOperation = user.areasOfOperation || '';
  const reraNumber = user.reraNumber || '';
  const yearsOfExperience = user.yearsOfExperience ? `${user.yearsOfExperience} Years` : '';
  const bio = user.bio || user.description || 'No bio provided for this profile.';
  
  const getValidImg = (img) => {
    if (typeof img !== 'string' || !img.trim()) return null;
    if (img.includes('unsplash.com')) return null;
    return img.startsWith('http') || img.startsWith('/') || img.startsWith('data:') ? img : null;
  };
  const profileImage = getValidImg(user.passportPhoto) || getValidImg(user.image) || `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=e2e8f0&color=475569`;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pb-28 lg:pb-12">
      {/* Top Navbar */}
      <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-b sticky top-0 z-20 px-4 py-3 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <BackButton />
          <h1 className="font-semibold text-lg line-clamp-1">Broker Profile</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 md:py-10">
        
        {/* Profile Header Card */}
        <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100 dark:border-gray-800 mb-6 md:mb-8 flex flex-col md:flex-row items-center md:items-start gap-6">
            <div className="h-24 w-24 md:h-32 md:w-32 rounded-full overflow-hidden border-4 border-primary/10 dark:border-primary/20 shadow-md bg-gray-100 shrink-0">
              <img src={profileImage} alt={name} className="h-full w-full object-cover object-top" />
            </div>
            
            <div className="flex-1 text-center md:text-left pt-2 md:pt-4">
              <Badge className="mb-2 bg-primary/10 text-primary hover:bg-primary/20 border-none capitalize">{role}</Badge>
              <h1 className="text-2xl md:text-4xl font-extrabold text-foreground mb-2">{name}</h1>
              <p className="flex items-center justify-center md:justify-start text-muted-foreground text-sm font-medium">
                <MapPin className="h-4 w-4 mr-1 text-primary" />
                {city}
              </p>
            </div>
            
            {/* Desktop Actions */}
            <div className="hidden md:flex gap-3 shrink-0">
              {phone && (
                <>
                  <a href={`tel:${phone.replace(/\\s/g, '')}`}>
                    <Button className="h-12 px-6 font-bold shadow-md hover:shadow-lg transition-all gap-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl">
                      <Phone className="h-4 w-4" />
                      Call
                    </Button>
                  </a>
                  {/* We use an anchor for WhatsApp on desktop just to be safe, or just Button with onClick */}
                  <a href={`https://wa.me/${phone.replace(/[^\\d]/g, '')}`} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" className="h-12 px-6 font-bold shadow-sm hover:shadow-md transition-all gap-2 border-green-500/30 text-green-700 bg-green-50 hover:bg-green-100 dark:bg-green-900/20 dark:text-green-400 dark:hover:bg-green-900/40 rounded-xl">
                      <FaWhatsapp className="h-5 w-5" />
                      WhatsApp
                    </Button>
                  </a>
                </>
              )}
            </div>
          </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-8 md:mb-12">
          
          {/* Main Content (Bio & Firm) */}
          <div className="md:col-span-2 space-y-6 md:space-y-8">
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100 dark:border-gray-800 h-full">
              <h3 className="font-bold text-lg md:text-xl mb-4 text-foreground flex items-center gap-2 border-b border-border/50 pb-3">
                <Info className="text-primary w-5 h-5" /> About {name}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-line text-sm md:text-base">
                {bio}
              </p>
            </div>
          </div>
          
          {/* Sidebar (Quick Stats) */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-800 h-full">
              <h3 className="font-bold text-lg mb-4 text-foreground border-b border-border/50 pb-3">Professional Details</h3>
              
              <div className="space-y-5">
                {firmName && (
                  <div className="flex gap-3 items-start">
                    <Building className="w-5 h-5 text-primary/70 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider mb-1">Firm Name</p>
                      <p className="font-bold text-foreground">{firmName}</p>
                    </div>
                  </div>
                )}
                
                {yearsOfExperience && (
                  <div className="flex gap-3 items-start">
                    <Briefcase className="w-5 h-5 text-primary/70 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider mb-1">Experience</p>
                      <p className="font-bold text-foreground">{yearsOfExperience}</p>
                    </div>
                  </div>
                )}
                
                {reraNumber && (
                  <div className="flex gap-3 items-start">
                    <Award className="w-5 h-5 text-primary/70 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider mb-1">RERA Number</p>
                      <p className="font-bold text-foreground">{reraNumber}</p>
                    </div>
                  </div>
                )}
                
                {areasOfOperation && (
                  <div className="flex gap-3 items-start">
                    <Map className="w-5 h-5 text-primary/70 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider mb-1">Operates In</p>
                      <p className="font-bold text-foreground leading-snug">{areasOfOperation}</p>
                    </div>
                  </div>
                )}
                
                {(!firmName && !yearsOfExperience && !reraNumber && !areasOfOperation) && (
                  <p className="text-muted-foreground text-sm italic">No additional professional details provided.</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Listed Properties Section */}
        <div className="mt-8">
          <h3 className="font-bold text-xl md:text-2xl mb-6 text-foreground flex items-center gap-2">
            <Home className="text-primary w-6 h-6" /> Properties by {name}
          </h3>
          
          {properties.length > 0 ? (
            <div className="flex flex-col gap-4">
              {properties.map(property => (
                <div key={property._id.toString()} className="w-full transition-all">
                  <PropertyCard property={{...property, _id: property._id.toString()}} compact={true} />
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-10 text-center shadow-sm border border-border/50">
              <p className="text-muted-foreground">This broker hasn't listed any properties yet.</p>
            </div>
          )}
        </div>

      </div>

      {/* Mobile Sticky CTA */}
      {phone && (
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-t border-border/50 p-4 shadow-[0_-4px_20px_-5px_rgba(0,0,0,0.1)] z-40 flex items-center gap-3">
          <a href={`tel:${phone.replace(/\\s/g, '')}`} className="flex-1">
            <Button className="w-full h-12 text-sm font-bold shadow-md gap-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl">
              <Phone className="h-4 w-4" />
              Call
            </Button>
          </a>
          <a href={`https://wa.me/${phone.replace(/[^\\d]/g, '')}`} target="_blank" rel="noopener noreferrer" className="flex-1">
            <Button variant="outline" className="w-full h-12 text-sm font-bold shadow-sm gap-2 border-green-500/30 text-green-700 bg-green-50 hover:bg-green-100 dark:bg-green-900/20 dark:text-green-400 hover:dark:bg-green-900/40 rounded-xl">
              <FaWhatsapp className="h-5 w-5" />
              WhatsApp
            </Button>
          </a>
        </div>
      )}
    </div>
  );
}
