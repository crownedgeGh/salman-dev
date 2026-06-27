import { properties } from '@/data/properties';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import BackButton from '@/components/BackButton';
import { 
  FaMapMarkerAlt, FaRulerCombined, FaPhone, 
  FaWhatsapp, FaHome, FaBuilding, FaStore, FaChartArea, 
  FaCheckCircle, FaCalendarAlt, FaShareAlt, FaHeart
} from 'react-icons/fa';

export default async function PropertyDetailsPage({ params }) {
  const { id } = await params;
  const property = properties.find((p) => p.id === id);

  if (!property) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20">
      {/* Header / Nav */}
      <div className="bg-white dark:bg-card border-b sticky top-0 z-10 px-4 py-3 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <BackButton />
          <h1 className="font-semibold text-lg line-clamp-1">Property Details</h1>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-muted">
            <FaShareAlt className="h-4 w-4 text-muted-foreground hover:text-foreground transition-colors" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-muted">
            <FaHeart className="h-4 w-4 text-muted-foreground hover:text-red-500 transition-colors" />
          </Button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Main Content Card */}
        <Card className="overflow-hidden border-border/50 shadow-md bg-white dark:bg-card transition-all hover:shadow-lg">
          <div className="flex flex-col md:flex-row">
            {/* Image Section */}
            <div className="relative w-full md:w-2/5 aspect-[4/3] md:aspect-auto bg-muted">
              <img 
                src={property.broker.image} 
                alt={property.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                <Badge className="bg-black/70 hover:bg-black/80 backdrop-blur-md border-none text-xs px-2.5 py-0.5 shadow-sm">
                  {property.type}
                </Badge>
                <Badge className={`backdrop-blur-md border-none text-xs px-2.5 py-0.5 shadow-sm ${property.purpose === 'Sale' ? 'bg-green-600/90' : 'bg-blue-600/90'}`}>
                  {property.purpose}
                </Badge>
              </div>
            </div>

            {/* Details Section */}
            <div className="p-5 sm:p-6 md:w-3/5 flex flex-col justify-between">
              <div>
                <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-foreground leading-tight mb-3">
                  {property.title}
                </h1>
                
                <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mb-5 text-sm text-muted-foreground font-medium">
                  <div className="flex items-center gap-1.5">
                    <div className="p-1.5 bg-primary/10 rounded-full">
                      <FaMapMarkerAlt className="text-primary h-3.5 w-3.5" />
                    </div>
                    <span>{property.locality}, {property.city}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="p-1.5 bg-primary/10 rounded-full">
                      <FaRulerCombined className="text-primary h-3.5 w-3.5" />
                    </div>
                    <span>{property.area}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="p-1.5 bg-primary/10 rounded-full">
                      <FaCalendarAlt className="text-primary h-3.5 w-3.5" />
                    </div>
                    <span>Posted on {new Date(property.postedAt).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="mb-6 bg-muted/30 p-4 rounded-xl border border-border/40 inline-block">
                  <p className="text-sm text-muted-foreground font-semibold mb-0.5">Asking Price</p>
                  <span className="text-3xl md:text-4xl font-black text-primary tracking-tight">
                    {property.price}
                  </span>
                </div>

                <div className="mb-6">
                  <h3 className="font-bold text-lg mb-3 text-foreground border-b border-border/50 pb-2">Property Description</h3>
                  <p className="text-muted-foreground text-sm md:text-base leading-relaxed whitespace-pre-line">
                    {property.description}
                  </p>
                </div>
              </div>

              {/* Broker Section inline */}
              <div className="mt-4 pt-5 border-t border-border/50">
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-muted overflow-hidden border-2 border-primary/20 shadow-sm">
                      <img src={property.broker.image} alt={property.broker.name} className="h-full w-full object-cover" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Broker</span>
                        <div className="flex items-center gap-1 text-blue-600 font-bold bg-blue-50 dark:bg-blue-900/30 px-1.5 py-0.5 rounded text-[10px] border border-blue-100 dark:border-blue-800 shadow-sm">
                          <FaCheckCircle className="h-2.5 w-2.5" />
                          Verified
                        </div>
                      </div>
                      <h4 className="font-bold text-foreground text-base md:text-lg">{property.broker.name}</h4>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <a href={`tel:${property.broker.phone.replace(/\\s/g, '')}`} className="w-full sm:flex-1">
                    <Button className="w-full h-12 text-sm font-bold shadow-md hover:shadow-lg transition-all gap-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl">
                      <FaPhone className="h-4 w-4" />
                      Call {property.broker.name.split(' ')[0]}
                    </Button>
                  </a>
                  <Button variant="outline" className="w-full sm:flex-1 h-12 text-sm font-bold shadow-sm hover:shadow-md transition-all gap-2 border-primary/50 text-primary hover:bg-primary/5 rounded-xl">
                    <FaWhatsapp className="h-5 w-5" />
                    WhatsApp
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
