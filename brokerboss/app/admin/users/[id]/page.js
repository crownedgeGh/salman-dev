"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import api from "@/lib/axios";
import {
  ArrowLeft,
  User,
  Mail,
  MapPin,
  Calendar,
  Building,
  ShieldCheck,
  ShieldAlert,
  Fingerprint,
  Phone,
  Briefcase,
  Layers,
  FileText,
  Clock,
  IdCard,
  Hash,
  Coins
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function UserDetailsPage({ params }) {
  const { id } = use(params);
  
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [docViewer, setDocViewer] = useState({ open: false, title: "", url: "", type: "" });

  const handleViewDoc = (title, url) => {
    setDocViewer({ 
      open: true, 
      title, 
      url, 
      type: url?.includes('application/pdf') ? 'pdf' : 'image' 
    });
  };

  useEffect(() => {
    // In mock setup or real api
    api.get(`/users/${id}`)
      .then(res => {
        setUser(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div className="p-12 text-center text-muted-foreground animate-pulse">Loading user details...</div>;
  }

  if (!user) {
    return <div className="p-12 text-center text-destructive">User not found</div>;
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Back Button */}
      <div>
        <Button asChild variant="ghost" className="gap-2 -ml-2 text-muted-foreground hover:text-foreground">
          <Link href="/admin/users">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Users</span>
          </Link>
        </Button>
      </div>

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">User Details</h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          View full registration profile and details for this user.
        </p>
      </div>

      {/* User Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Info block */}
        <div className="md:col-span-1 p-6 rounded-xl border border-border bg-card shadow-sm flex flex-col items-center text-center gap-4">
          <Avatar className="w-20 h-20 text-xl font-bold bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
            {user?.passportPhoto ? (
                <img 
                  src={user.passportPhoto.startsWith('http') || user.passportPhoto.startsWith('data:') ? user.passportPhoto : `/${user.passportPhoto}`} 
                  alt={user?.name || user?.username} 
                  className="w-full h-full object-cover object-top rounded-full" 
                />
            ) : (
              <AvatarFallback>{user?.avatar || user?.name?.[0] || 'U'}</AvatarFallback>
            )}
          </Avatar>
          
          <div>
            <h2 className="text-lg font-bold text-foreground">{user?.name || user?.username || "Unnamed User"}</h2>
            <Badge variant="outline" className="mt-1.5 capitalize bg-primary/5 text-primary border-primary/20">
              {user?.role || "user"}
            </Badge>
          </div>

          <Badge
            variant="outline"
            className={`w-full py-1 justify-center ${
              user?.status === "Active"
                ? "border-green-300 text-green-700 bg-green-50 dark:bg-green-900/20 dark:text-green-400"
                : "border-red-300 text-red-700 bg-red-50 dark:bg-red-900/20 dark:text-red-400"
            }`}
          >
            {user?.status === "Active" ? (
              <span className="flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5" /> Active</span>
            ) : (
              <span className="flex items-center gap-1"><ShieldAlert className="w-3.5 h-3.5" /> Blocked</span>
            )}
          </Badge>
        </div>

        {/* Detailed Metadata fields */}
        <div className="md:col-span-2 p-6 rounded-xl border border-border bg-card shadow-sm space-y-6">
          <h3 className="text-base font-semibold text-foreground border-b border-border pb-2">
            Basic Profile
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* User ID */}
            <div className="flex items-center gap-3">
              <Fingerprint className="w-4 h-4 text-primary shrink-0" />
              <div>
                <span className="text-xs text-muted-foreground block font-medium">User ID</span>
                <span className="text-sm font-medium text-foreground">{user?.id || id}</span>
              </div>
            </div>



            {/* Phone */}
            <div className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-primary shrink-0" />
              <div>
                <span className="text-xs text-muted-foreground block font-medium">Phone Number</span>
                <span className="text-sm font-medium text-foreground break-all">{user?.phone || 'N/A'}</span>
              </div>
            </div>

            {/* Location / City */}
            <div className="flex items-center gap-3">
              <MapPin className="w-4 h-4 text-primary shrink-0" />
              <div>
                <span className="text-xs text-muted-foreground block font-medium">City / Location</span>
                <span className="text-sm font-medium text-foreground">{user?.city || user?.location || 'N/A'}</span>
              </div>
            </div>

            {/* Date Joined */}
            <div className="flex items-center gap-3">
              <Calendar className="w-4 h-4 text-primary shrink-0" />
              <div>
                <span className="text-xs text-muted-foreground block font-medium">Date Joined</span>
                <span className="text-sm font-medium text-foreground">{user?.joinDate || user?.createdAt || 'N/A'}</span>
              </div>
            </div>

            {/* Properties Listed (for Owner/Broker) */}
            {(user?.role === 'owner' || user?.role === 'broker') && (
              <div className="flex items-center gap-3">
                <Building className="w-4 h-4 text-primary shrink-0" />
                <div>
                  <span className="text-xs text-muted-foreground block font-medium">Properties Listed</span>
                  <span className="text-sm font-semibold text-amber-600 dark:text-amber-400">
                    {user?.propertiesListed || 0} listings
                  </span>
                </div>
              </div>
            )}
          </div>

          <hr className="border-border" />

          <h3 className="text-base font-semibold text-foreground border-b border-border pb-2">
            Role Specific Details
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Broker Specific Details */}
            {user?.role === 'broker' && (
              <>
                <div className="flex items-center gap-3">
                  <Briefcase className="w-4 h-4 text-primary shrink-0" />
                  <div>
                    <span className="text-xs text-muted-foreground block font-medium">Firm Name</span>
                    <span className="text-sm font-medium text-foreground">{user?.firmName || 'N/A'}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-primary shrink-0" />
                  <div>
                    <span className="text-xs text-muted-foreground block font-medium">Areas of Operation</span>
                    <span className="text-sm font-medium text-foreground">{user?.areasOfOperation || 'N/A'}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <IdCard className="w-4 h-4 text-primary shrink-0" />
                  <div>
                    <span className="text-xs text-muted-foreground block font-medium">RERA Number</span>
                    <span className="text-sm font-medium text-foreground">{user?.reraNumber || 'N/A'}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-primary shrink-0" />
                  <div>
                    <span className="text-xs text-muted-foreground block font-medium">Years of Experience</span>
                    <span className="text-sm font-medium text-foreground">{user?.yearsOfExperience || 'N/A'}</span>
                  </div>
                </div>
                
                {/* Documents section */}
                <div className="sm:col-span-2 pt-4 mt-2 border-t border-border">
                  <h4 className="text-sm font-semibold mb-3">Uploaded Documents</h4>
                  <div className="flex flex-wrap gap-3">
                    {user?.aadhar && (
                      <Button variant="outline" size="sm" onClick={() => handleViewDoc("Aadhar Card", user.aadhar)}>
                        <FileText className="w-4 h-4 mr-2" /> View Aadhar Card
                      </Button>
                    )}
                    {user?.passportPhoto && (
                      <Button variant="outline" size="sm" onClick={() => handleViewDoc("Profile Photo", user.passportPhoto)}>
                        <FileText className="w-4 h-4 mr-2" /> View Profile Photo
                      </Button>
                    )}
                    {!user?.aadhar && !user?.passportPhoto && (
                      <span className="text-sm text-muted-foreground">No documents uploaded.</span>
                    )}
                  </div>
                </div>
              </>
            )}

            {/* Buyer Specific Details */}
            {user?.role === 'buyer' && (
              <>
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-primary shrink-0" />
                  <div>
                    <span className="text-xs text-muted-foreground block font-medium">Preferred Area</span>
                    <span className="text-sm font-medium text-foreground">{user?.preferredArea || 'N/A'}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Coins className="w-4 h-4 text-primary shrink-0" />
                  <div>
                    <span className="text-xs text-muted-foreground block font-medium">Budget Range</span>
                    <span className="text-sm font-medium text-foreground">{user?.budgetRange || 'N/A'}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 sm:col-span-2">
                  <Building className="w-4 h-4 text-primary shrink-0" />
                  <div>
                    <span className="text-xs text-muted-foreground block font-medium">Property Types</span>
                    <span className="text-sm font-medium text-foreground">
                      {Array.isArray(user?.propertyTypes) ? user.propertyTypes.join(', ') : (user?.propertyTypes || 'N/A')}
                    </span>
                  </div>
                </div>
              </>
            )}

            {/* Owner Specific Details */}
            {user?.role === 'owner' && (
              <>
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-primary shrink-0" />
                  <div>
                    <span className="text-xs text-muted-foreground block font-medium">Area / Locality</span>
                    <span className="text-sm font-medium text-foreground">{user?.area || 'N/A'}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Building className="w-4 h-4 text-primary shrink-0" />
                  <div>
                    <span className="text-xs text-muted-foreground block font-medium">Property Type Offered</span>
                    <span className="text-sm font-medium text-foreground">{user?.propertyType || 'N/A'}</span>
                  </div>
                </div>
              </>
            )}
            
          </div>

          <hr className="border-border" />

          {/* Description / Bio / Notes */}
          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
              <FileText className="w-4 h-4 text-primary" /> Additional Details
            </h4>
            <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line bg-muted/30 p-4 rounded-lg">
              {user?.bio || user?.description || user?.notes || "No additional description or notes provided."}
            </p>
          </div>

        </div>
      </div>

      {/* Document Viewer Modal */}
      <Dialog open={docViewer.open} onOpenChange={(open) => !open && setDocViewer({ ...docViewer, open: false })}>
        <DialogContent className="sm:max-w-4xl w-[95vw] h-[85vh] flex flex-col p-4">
          <DialogHeader className="mb-2 shrink-0">
            <DialogTitle className="text-xl">{docViewer.title}</DialogTitle>
          </DialogHeader>
          <div className="flex-1 overflow-auto bg-black/5 dark:bg-white/5 rounded-lg flex items-center justify-center p-2 relative">
            {docViewer.type === 'pdf' ? (
              <iframe src={docViewer.url} className="w-full h-full border-0 rounded" title={docViewer.title} />
            ) : (
              <img src={docViewer.url} alt={docViewer.title} className="max-w-full max-h-full object-contain rounded" />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
