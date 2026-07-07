import { notFound } from 'next/navigation';
import connectToDatabase from '@/lib/mongodb';
import Property from '@/lib/models/Property';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import BackButton from '@/components/BackButton';
import { 
  MapPin, Ruler, Phone, Building, Store, 
  CheckCircle, Calendar, Share2, Heart,
  BedDouble, Bath, CarFront, Compass, Sofa, Users, Banknote, Info, Home
} from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';

export default async function PropertyDetailsPage({ params }) {
  const { id } = await params;
  
  let property = null;
  try {
    await connectToDatabase();
    property = await Property.findById(id).lean().catch(() => null);
    if (!property) {
      property = await Property.findOne({ id: id }).lean().catch(() => null);
    }
  } catch (err) {
    console.error("Failed to fetch property details:", err.message);
  }

  if (!property) {
    notFound();
  }

  // Ensure fields are available even if schema strict:false was used
  const type = property.type || 'N/A';
  const purpose = property.purpose || 'Sale';
  const price = property.price || 'Contact for price';
  const area = property.area || (property.areaSize ? `${property.areaSize} ${property.areaUnit || ''}` : 'N/A');
  const bedrooms = property.bedrooms || 'N/A';
  const bathrooms = property.bathrooms || 'N/A';
  const furnishing = property.furnishing || 'N/A';
  const parking = property.parking || 'N/A';
  const facing = property.facing || 'N/A';
  const floorInfo = property.floorNo ? `${property.floorNo} / ${property.totalFloors || 'N/A'}` : 'N/A';
  const maintenance = property.maintenanceCharge || 'N/A';
  const availableFrom = property.availableFrom ? new Date(property.availableFrom).toLocaleDateString() : 'Ready to move';
  const preferredFor = property.preferredFor || 'Any';
  const title = property.title || 'Property Details';
  const locality = property.locality || '';
  const city = property.city || '';
  const landmark = property.landmark || '';
  const description = property.description || 'No description provided for this property.';
  
  const brokerName = property.broker?.name || property.contactName || property.owner || 'Unknown Broker';
  const brokerPhone = property.broker?.phone || property.contactPhone || '';
  const getValidImg = (img) => typeof img === 'string' && (img.startsWith('http') || img.startsWith('/')) ? img : null;
  const brokerImage = getValidImg(property.broker?.image) || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop';
  const propertyImage = getValidImg(property.images?.[0]) || getValidImg(property.thumbnail) || 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&q=80&w=1000';

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pb-28 lg:pb-24">
      {/* Top Navbar */}
      <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-b sticky top-0 z-20 px-4 py-3 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <BackButton />
          <h1 className="font-semibold text-lg line-clamp-1">{title}</h1>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full hover:bg-muted bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-800">
            <Share2 className="h-4 w-4 text-gray-600 dark:text-gray-300" />
          </Button>
          <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full hover:bg-red-50 bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-800">
            <Heart className="h-4 w-4 text-gray-400 hover:text-red-500 transition-colors" />
          </Button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-3 sm:px-6 py-4 md:py-6">
        {/* Main Content Layout */}
        <div className="flex flex-col lg:flex-row gap-5 lg:gap-8">
          
          {/* Left Column (Images & Details) */}
          <div className="flex-1 space-y-4 md:space-y-6 overflow-hidden">
            
            {/* Image Gallery */}
            <div className="relative w-full rounded-2xl overflow-hidden aspect-[16/10] md:aspect-[21/9] bg-gray-200 shadow-md">
              <img 
                src={propertyImage} 
                alt={title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 flex gap-2">
                <Badge className="bg-black/75 hover:bg-black/90 backdrop-blur-md border-none text-sm px-3 py-1 shadow-sm text-white">
                  {type}
                </Badge>
                <Badge className={`backdrop-blur-md border-none text-sm px-3 py-1 shadow-sm text-white ${purpose === 'Sale' ? 'bg-green-600/90' : 'bg-blue-600/90'}`}>
                  For {purpose}
                </Badge>
              </div>
            </div>

            {/* Title & Location Header */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-4 md:p-6 shadow-sm border border-gray-100 dark:border-gray-800">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-3 md:gap-4">
                <div>
                  <h1 className="text-xl md:text-2xl sm:text-3xl font-extrabold text-foreground leading-tight mb-2 md:mb-3">
                    {title}
                  </h1>
                  <p className="flex items-center text-muted-foreground text-sm sm:text-base font-medium">
                    <MapPin className="text-primary h-4 w-4 mr-2" />
                    {locality}{locality && city ? ', ' : ''}{city}
                    {landmark && <span className="ml-1 text-gray-400">(Near {landmark})</span>}
                  </p>
                </div>
                <div className="bg-primary/5 border border-primary/20 p-3 md:p-4 rounded-xl md:text-right shrink-0 mt-2 md:mt-0">
                  <p className="text-xs md:text-sm text-muted-foreground font-bold mb-0.5 md:mb-1">Asking Price</p>
                  <span className="text-2xl md:text-3xl font-black text-primary tracking-tight block">
                    {price}
                  </span>
                  {property.negotiable === "Yes" && <span className="text-xs text-green-600 font-bold uppercase tracking-wider mt-1 block">Negotiable</span>}
                </div>
              </div>
            </div>

            {/* Specifications Grid */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-4 md:p-6 shadow-sm border border-gray-100 dark:border-gray-800">
              <h3 className="font-bold text-lg md:text-xl mb-4 md:mb-6 text-foreground flex items-center gap-2">
                <Info className="text-primary w-5 h-5" /> Property Overview
              </h3>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-y-5 md:gap-y-8 gap-x-3 md:gap-x-4">
                <SpecItem icon={<Home className="w-5 h-5" />} label="Type" value={type} />
                <SpecItem icon={<Ruler className="w-5 h-5" />} label="Area" value={area} />
                <SpecItem icon={<BedDouble className="w-5 h-5" />} label="Bedrooms" value={bedrooms} />
                <SpecItem icon={<Bath className="w-5 h-5" />} label="Bathrooms" value={bathrooms} />
                <SpecItem icon={<Building className="w-5 h-5" />} label="Floor" value={floorInfo} />
                <SpecItem icon={<Sofa className="w-5 h-5" />} label="Furnishing" value={furnishing} />
                <SpecItem icon={<CarFront className="w-5 h-5" />} label="Parking" value={parking} />
                <SpecItem icon={<Compass className="w-5 h-5" />} label="Facing" value={facing} />
                <SpecItem icon={<Calendar className="w-5 h-5" />} label="Available From" value={availableFrom} />
                <SpecItem icon={<Users className="w-5 h-5" />} label="Preferred For" value={preferredFor} />
                <SpecItem icon={<Banknote className="w-5 h-5" />} label="Maintenance" value={maintenance} />
              </div>
            </div>

            {/* Description */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-4 md:p-6 shadow-sm border border-gray-100 dark:border-gray-800">
              <h3 className="font-bold text-lg md:text-xl mb-3 md:mb-4 text-foreground border-b border-border/50 pb-2 md:pb-3">About this Property</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base leading-relaxed whitespace-pre-line">
                {description}
              </p>
            </div>

          </div>

          {/* Right Column (Sticky Broker Info) */}
          <div className="lg:w-80 shrink-0">
            <div className="sticky top-24 bg-white dark:bg-gray-900 rounded-2xl p-4 md:p-6 shadow-md border border-gray-100 dark:border-gray-800 flex flex-col items-center text-center mb-6 lg:mb-0">
              <div className="relative mb-3 md:mb-4">
                <div className="h-20 w-20 md:h-24 md:w-24 rounded-full overflow-hidden border-4 border-white shadow-lg bg-gray-100 mx-auto">
                  <img src={brokerImage} alt={brokerName} className="h-full w-full object-cover" />
                </div>
                <div className="absolute -bottom-2 -right-2 bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-xs font-bold flex items-center gap-1 border border-blue-200 shadow-sm">
                  <CheckCircle className="h-3 w-3" />
                  Verified
                </div>
              </div>
              
              <p className="text-[10px] md:text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1">Contact</p>
              <h4 className="font-extrabold text-lg md:text-xl text-foreground mb-4 md:mb-6">{brokerName}</h4>
              
              {/* Hide the contact buttons on mobile since we have a fixed bottom bar */}
              <div className="w-full space-y-3 hidden lg:block">
                <a href={`tel:${brokerPhone?.replace(/\\s/g, '') || ''}`} className="block w-full">
                  <Button className="w-full h-12 text-sm font-bold shadow-md hover:shadow-lg transition-all gap-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl">
                    <Phone className="h-4 w-4" />
                    Call {brokerName.split(' ')[0]}
                  </Button>
                </a>
                <Button variant="outline" className="w-full h-12 text-sm font-bold shadow-sm hover:shadow-md transition-all gap-2 border-green-500/30 text-green-700 bg-green-50 hover:bg-green-100 hover:text-green-800 dark:bg-green-900/20 dark:text-green-400 dark:hover:bg-green-900/40 rounded-xl">
                  <FaWhatsapp className="h-5 w-5" />
                  WhatsApp
                </Button>
              </div>
              
              <p className="text-xs text-gray-400 mt-6 flex items-center justify-center gap-1">
                <Calendar className="w-3 h-3" /> Posted on {property.postedAt ? new Date(property.postedAt).toLocaleDateString() : new Date(property.createdAt || Date.now()).toLocaleDateString()}
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* Mobile Sticky CTA */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-t border-border/50 p-4 shadow-[0_-4px_20px_-5px_rgba(0,0,0,0.1)] z-40 flex items-center gap-3">
        <a href={`tel:${brokerPhone?.replace(/\\s/g, '') || ''}`} className="flex-1">
          <Button className="w-full h-12 text-sm font-bold shadow-md gap-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl">
            <Phone className="h-4 w-4" />
            Call
          </Button>
        </a>
        <Button variant="outline" className="flex-1 h-12 text-sm font-bold shadow-sm gap-2 border-green-500/30 text-green-700 bg-green-50 hover:bg-green-100 dark:bg-green-900/20 dark:text-green-400 hover:dark:bg-green-900/40 rounded-xl">
          <FaWhatsapp className="h-5 w-5" />
          WhatsApp
        </Button>
      </div>
    </div>
  );
}

function SpecItem({ icon, label, value }) {
  return (
    <div className="flex flex-col gap-1 md:gap-1.5">
      <div className="flex items-center gap-1.5 md:gap-2 text-muted-foreground mb-0.5 md:mb-1">
        <div className="text-primary/70 scale-90 md:scale-100 origin-left">{icon}</div>
        <span className="text-[10px] md:text-xs font-bold uppercase tracking-wider">{label}</span>
      </div>
      <span className="font-bold text-foreground text-sm sm:text-base leading-tight">{value}</span>
    </div>
  );
}
