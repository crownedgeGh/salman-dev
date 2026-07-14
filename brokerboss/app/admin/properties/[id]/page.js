"use client";

import { useState, use, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import api from '@/lib/axios';
import {
  ArrowLeft,
  User,
  Phone,
  MapPin,
  Building,
  Briefcase,
  Clock,
  FileText,
  CheckCircle,
  Home,
  Store,
  Layers,
  Warehouse,
  Coins,
  ShieldAlert,
  Hash
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const PROPERTY_TYPES = [
  { id: "flat", label: "Flat", icon: Building },
  { id: "house", label: "House", icon: Home },
  { id: "shop", label: "Shop", icon: Store },
  { id: "plot", label: "Plot", icon: Layers },
  { id: "office", label: "Office", icon: Warehouse },
];

export default function EditPropertyPage({ params }) {
  const router = useRouter();
  const { id } = use(params);
  const propertyIdParam = parseInt(id, 10);

  const [form, setForm] = useState({
    title: "",
    type: "",
    purpose: "",
    city: "Raipur",
    locality: "",
    landmark: "",
    areaSize: "",
    areaUnit: "sq ft",
    floorNo: "",
    totalFloors: "",
    bedrooms: "",
    bathrooms: "",
    furnishing: "",
    parking: "",
    facing: "",
    price: "",
    negotiable: "No",
    maintenanceCharge: "",
    availableFrom: "",
    preferredFor: "",
    status: "Active",
    owner: "",
  });

  useEffect(() => {
    api.get(`/properties`).then(res => {
      const p = res.data.find(item => String(item.id) === String(id) || String(item._id) === String(id));
      if (p) {
        setForm({
          title: p.title || "",
          type: p.type || "",
          purpose: p.purpose || "",
          city: p.city || "Raipur",
          locality: p.locality || "",
          landmark: p.landmark || "",
          areaSize: p.areaSize || "",
          areaUnit: p.areaUnit || "sq ft",
          floorNo: p.floorNo || "",
          totalFloors: p.totalFloors || "",
          bedrooms: p.bedrooms || "",
          bathrooms: p.bathrooms || "",
          furnishing: p.furnishing || "",
          parking: p.parking || "",
          facing: p.facing || "",
          price: p.price || "",
          negotiable: p.negotiable || "No",
          maintenanceCharge: p.maintenanceCharge || "",
          availableFrom: p.availableFrom || "",
          preferredFor: p.preferredFor || "",
          status: p.status || "Active",
          owner: p.owner?.name || p.broker?.name || "",
        });
      }
    }).catch(console.error);
  }, [id]);

  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState(null);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    const e2 = {};
    if (!form.title.trim()) e2.title = "Property Title is required";
    if (!form.city.trim()) e2.city = "City is required";
    if (!form.locality.trim()) e2.locality = "Locality is required";
    if (!form.price.trim()) e2.price = "Price is required";
    if (!form.owner.trim()) e2.owner = "Owner Name is required";

    if (Object.keys(e2).length) {
      setErrors(e2);
      return;
    }

    setSubmitted(true);
    showToast("Property updated successfully!");
    setTimeout(() => {
      router.push("/admin/properties");
    }, 1500);
  };

  const handleDisableProperty = () => {
    setForm((prev) => ({ ...prev, status: "Pending" }));
    showToast("Property listing has been disabled.");
    setTimeout(() => {
      router.push("/admin/properties");
    }, 1500);
  };

  const inputClass =
    "w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors";

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Back Button */}
      <div>
        <Button asChild variant="ghost" className="gap-2 -ml-2 text-muted-foreground hover:text-foreground">
          <Link href="/admin/properties">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Properties</span>
          </Link>
        </Button>
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Edit Property Listing</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Modify details for: <strong className="text-foreground">{form.title || 'Property'}</strong>
          </p>
        </div>

        {/* Disable Button */}
        <Button
          type="button"
          variant="outline"
          onClick={handleDisableProperty}
          className="flex items-center gap-2 border-red-200 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 self-start sm:self-auto"
        >
          <ShieldAlert className="w-4 h-4" />
          <span>Disable this property</span>
        </Button>
      </div>

      {/* Form Card */}
      <div className="p-6 rounded-xl border border-border bg-card shadow-sm space-y-6">
        {submitted ? (
          <div className="flex flex-col items-center justify-center gap-4 py-12 text-center">
            <CheckCircle className="h-14 w-14 text-green-500 animate-bounce" />
            <h2 className="text-xl font-bold">Successfully Updated!</h2>
            <p className="text-muted-foreground text-sm">
              The property details have been updated. Redirecting...
            </p>
          </div>
        ) : (
          <form onSubmit={handleUpdateSubmit} noValidate className="space-y-6">

            <h3 className="text-lg font-semibold border-b pb-2 mb-4">Basic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Title */}
              <div className="space-y-1.5 md:col-span-2">
                <label htmlFor="prop-title" className="text-sm font-medium text-foreground flex items-center gap-2">
                  <Building className="h-4 w-4 text-primary" /> Property Title *
                </label>
                <Input
                  id="prop-title"
                  name="title"
                  type="text"
                  value={form.title}
                  onChange={handleChange}
                  className={errors.title ? "border-destructive focus:ring-destructive" : ""}
                />
                {errors.title && <p className="text-xs text-destructive">{errors.title}</p>}
              </div>

              {/* Type */}
              <div className="space-y-1.5">
                <label htmlFor="prop-type" className="text-sm font-medium text-foreground flex items-center gap-2">
                  <Building className="h-4 w-4 text-primary" /> Property Type
                </label>
                <select id="prop-type" name="type" value={form.type} onChange={handleChange} className={inputClass}>
                  <option value="">Select...</option>
                  <option value="Flat">Flat</option>
                  <option value="House">House</option>
                  <option value="Shop">Shop</option>
                  <option value="Plot">Plot</option>
                  <option value="Office">Office</option>
                  <option value="Warehouse">Warehouse</option>
                </select>
              </div>

              {/* Purpose */}
              <div className="space-y-1.5">
                <label htmlFor="prop-purpose" className="text-sm font-medium text-foreground flex items-center gap-2">
                  <Briefcase className="h-4 w-4 text-primary" /> Purpose
                </label>
                <select id="prop-purpose" name="purpose" value={form.purpose} onChange={handleChange} className={inputClass}>
                  <option value="">Select...</option>
                  <option value="Sale">Sale</option>
                  <option value="Rent">Rent</option>
                </select>
              </div>

              {/* Status */}
              <div className="space-y-1.5">
                <label htmlFor="prop-status" className="text-sm font-medium text-foreground flex items-center gap-2">
                  <FileText className="h-4 w-4 text-primary" /> Status *
                </label>
                <select id="prop-status" name="status" value={form.status} onChange={handleChange} className={inputClass}>
                  <option value="Active">Active</option>
                  <option value="Sold">Sold</option>
                  <option value="Pending">Pending</option>
                </select>
              </div>
            </div>

            <h3 className="text-lg font-semibold border-b pb-2 mb-4 mt-6">Location & Pricing</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* City */}
              <div className="space-y-1.5">
                <label htmlFor="prop-city" className="text-sm font-medium text-foreground flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary" /> City *
                </label>
                <Input id="prop-city" name="city" type="text" value={form.city} onChange={handleChange} className={errors.city ? "border-destructive focus:ring-destructive" : ""} />
                {errors.city && <p className="text-xs text-destructive">{errors.city}</p>}
              </div>

              {/* Locality */}
              <div className="space-y-1.5">
                <label htmlFor="prop-locality" className="text-sm font-medium text-foreground flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary" /> Locality *
                </label>
                <Input id="prop-locality" name="locality" type="text" value={form.locality} onChange={handleChange} className={errors.locality ? "border-destructive focus:ring-destructive" : ""} />
                {errors.locality && <p className="text-xs text-destructive">{errors.locality}</p>}
              </div>

              {/* Landmark */}
              <div className="space-y-1.5 md:col-span-2">
                <label htmlFor="prop-landmark" className="text-sm font-medium text-foreground flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary" /> Landmark
                </label>
                <Input id="prop-landmark" name="landmark" type="text" value={form.landmark} onChange={handleChange} />
              </div>

              {/* Price */}
              <div className="space-y-1.5">
                <label htmlFor="prop-price" className="text-sm font-medium text-foreground flex items-center gap-2">
                  <Coins className="h-4 w-4 text-primary" /> Price (₹) *
                </label>
                <Input id="prop-price" name="price" type="text" value={form.price} onChange={handleChange} className={errors.price ? "border-destructive focus:ring-destructive" : ""} />
                {errors.price && <p className="text-xs text-destructive">{errors.price}</p>}
              </div>

              {/* Negotiable */}
              <div className="space-y-1.5">
                <label htmlFor="prop-negotiable" className="text-sm font-medium text-foreground flex items-center gap-2">
                  <Coins className="h-4 w-4 text-primary" /> Negotiable
                </label>
                <select id="prop-negotiable" name="negotiable" value={form.negotiable} onChange={handleChange} className={inputClass}>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>

              {/* Maintenance Charge */}
              <div className="space-y-1.5">
                <label htmlFor="prop-maintenance" className="text-sm font-medium text-foreground flex items-center gap-2">
                  <Coins className="h-4 w-4 text-primary" /> Maintenance Charge
                </label>
                <Input id="prop-maintenance" name="maintenanceCharge" type="text" value={form.maintenanceCharge} onChange={handleChange} />
              </div>
            </div>

            <h3 className="text-lg font-semibold border-b pb-2 mb-4 mt-6">Property Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Area Size */}
              <div className="space-y-1.5">
                <label htmlFor="prop-areaSize" className="text-sm font-medium text-foreground flex items-center gap-2">
                  <Layers className="h-4 w-4 text-primary" /> Area Size
                </label>
                <div className="flex gap-2">
                  <Input id="prop-areaSize" name="areaSize" type="text" value={form.areaSize} onChange={handleChange} className="flex-1" />
                  <select name="areaUnit" value={form.areaUnit} onChange={handleChange} className={`${inputClass} w-28`}>
                    <option value="sq ft">sq ft</option>
                    <option value="sq yards">sq yards</option>
                    <option value="Marla">Marla</option>
                    <option value="Bigha">Bigha</option>
                    <option value="Acre">Acre</option>
                  </select>
                </div>
              </div>

              {/* Bedrooms */}
              <div className="space-y-1.5">
                <label htmlFor="prop-bedrooms" className="text-sm font-medium text-foreground flex items-center gap-2">
                  <Home className="h-4 w-4 text-primary" /> Bedrooms
                </label>
                <select id="prop-bedrooms" name="bedrooms" value={form.bedrooms} onChange={handleChange} className={inputClass}>
                  <option value="">Select...</option>
                  {['1 RK', '1', '2', '3', '4', '5', '6+'].map(b => <option key={b} value={b}>{b} BHK</option>)}
                </select>
              </div>

              {/* Bathrooms */}
              <div className="space-y-1.5">
                <label htmlFor="prop-bathrooms" className="text-sm font-medium text-foreground flex items-center gap-2">
                  <Home className="h-4 w-4 text-primary" /> Bathrooms
                </label>
                <select id="prop-bathrooms" name="bathrooms" value={form.bathrooms} onChange={handleChange} className={inputClass}>
                  <option value="">Select...</option>
                  {['1', '2', '3', '4', '5+'].map(b => <option key={b} value={b}>{b}</option>)}
                </select>
              </div>

              {/* Floor Info */}
              <div className="space-y-1.5">
                <label htmlFor="prop-floorNo" className="text-sm font-medium text-foreground flex items-center gap-2">
                  <Building className="h-4 w-4 text-primary" /> Floor No
                </label>
                <Input id="prop-floorNo" name="floorNo" type="text" value={form.floorNo} onChange={handleChange} />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="prop-totalFloors" className="text-sm font-medium text-foreground flex items-center gap-2">
                  <Building className="h-4 w-4 text-primary" /> Total Floors
                </label>
                <Input id="prop-totalFloors" name="totalFloors" type="text" value={form.totalFloors} onChange={handleChange} />
              </div>

              {/* Furnishing */}
              <div className="space-y-1.5">
                <label htmlFor="prop-furnishing" className="text-sm font-medium text-foreground flex items-center gap-2">
                  <Home className="h-4 w-4 text-primary" /> Furnishing
                </label>
                <select id="prop-furnishing" name="furnishing" value={form.furnishing} onChange={handleChange} className={inputClass}>
                  <option value="">Select...</option>
                  {['Unfurnished', 'Semi-Furnished', 'Furnished'].map(f => <option key={f} value={f}>{f}</option>)}
                </select>
              </div>

              {/* Parking */}
              <div className="space-y-1.5">
                <label htmlFor="prop-parking" className="text-sm font-medium text-foreground flex items-center gap-2">
                  <Warehouse className="h-4 w-4 text-primary" /> Parking
                </label>
                <select id="prop-parking" name="parking" value={form.parking} onChange={handleChange} className={inputClass}>
                  <option value="">Select...</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>

              {/* Facing */}
              <div className="space-y-1.5">
                <label htmlFor="prop-facing" className="text-sm font-medium text-foreground flex items-center gap-2">
                  <Hash className="h-4 w-4 text-primary" /> Facing Direction
                </label>
                <select id="prop-facing" name="facing" value={form.facing} onChange={handleChange} className={inputClass}>
                  <option value="">Select...</option>
                  {['East', 'West', 'North', 'South', 'North-East', 'North-West', 'South-East', 'South-West'].map(f => <option key={f} value={f}>{f}</option>)}
                </select>
              </div>

              {/* Available From */}
              <div className="space-y-1.5">
                <label htmlFor="prop-availableFrom" className="text-sm font-medium text-foreground flex items-center gap-2">
                  <Clock className="h-4 w-4 text-primary" /> Available From
                </label>
                <Input id="prop-availableFrom" name="availableFrom" type="date" value={form.availableFrom} onChange={handleChange} />
              </div>

              {/* Preferred For */}
              <div className="space-y-1.5">
                <label htmlFor="prop-preferredFor" className="text-sm font-medium text-foreground flex items-center gap-2">
                  <User className="h-4 w-4 text-primary" /> Preferred For
                </label>
                <select id="prop-preferredFor" name="preferredFor" value={form.preferredFor} onChange={handleChange} className={inputClass}>
                  <option value="">Select...</option>
                  {['Any', 'Family', 'Bachelor', 'Company / Firm'].map(f => <option key={f} value={f}>{f}</option>)}
                </select>
              </div>
            </div>

            <h3 className="text-lg font-semibold border-b pb-2 mb-4 mt-6">Description</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Description */}
              <div className="space-y-1.5 md:col-span-2">
                <label htmlFor="prop-description" className="text-sm font-medium text-foreground flex items-center gap-2">
                  <FileText className="h-4 w-4 text-primary" /> Description
                </label>
                <textarea id="prop-description" name="description" rows={4} value={form.description} onChange={handleChange} className={inputClass + " resize-none"} />
              </div>
            </div>

            <div className="flex gap-4 pt-4 mt-6">
              <Button type="button" variant="outline" asChild className="flex-1">
                <Link href="/admin/properties">Cancel</Link>
              </Button>
              <Button type="submit" className="flex-1">
                Save Changes
              </Button>
            </div>
          </form>
        )}
      </div>

      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-foreground text-background text-sm px-4 py-2.5 rounded-xl shadow-lg animate-in slide-in-from-bottom-4 duration-300">
          {toast}
        </div>
      )}
    </div>
  );
}
