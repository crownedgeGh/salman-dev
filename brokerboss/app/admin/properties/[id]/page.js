"use client";

import { useState, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
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
  ShieldAlert
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
  const propertyId = parseInt(id, 10);

  // Find the property in the mock list
  const property = [].find((p) => p.id === propertyId) || [][0];

  const [form, setForm] = useState({
    title: property?.title || "",
    type: property?.type || "Apartment",
    location: property?.location || "",
    price: property?.price || "",
    status: property?.status || "Active",
    owner: property?.owner || "",
  });

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
    if (!form.location.trim()) e2.location = "Location is required";
    if (!form.price.trim()) e2.price = "Price is required";
    if (!form.owner.trim()) e2.owner = "Owner is required";

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
            Modify details for: <strong className="text-foreground">{property?.title}</strong>
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
                  <Building className="h-4 w-4 text-primary" /> Property Type *
                </label>
                <select
                  id="prop-type"
                  name="type"
                  value={form.type}
                  onChange={handleChange}
                  className={inputClass}
                >
                  <option value="Apartment">Apartment</option>
                  <option value="House">House</option>
                  <option value="Plot">Plot</option>
                  <option value="Villa">Villa</option>
                  <option value="Commercial">Commercial</option>
                  <option value="Industrial">Industrial</option>
                  <option value="Farmhouse">Farmhouse</option>
                </select>
              </div>

              {/* Price */}
              <div className="space-y-1.5">
                <label htmlFor="prop-price" className="text-sm font-medium text-foreground flex items-center gap-2">
                  <Coins className="h-4 w-4 text-primary" /> Price / Budget *
                </label>
                <Input
                  id="prop-price"
                  name="price"
                  type="text"
                  value={form.price}
                  onChange={handleChange}
                  placeholder="e.g. ₹68 Lac or ₹1.2 Cr"
                  className={errors.price ? "border-destructive focus:ring-destructive" : ""}
                />
                {errors.price && <p className="text-xs text-destructive">{errors.price}</p>}
              </div>

              {/* Location */}
              <div className="space-y-1.5">
                <label htmlFor="prop-location" className="text-sm font-medium text-foreground flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary" /> Location *
                </label>
                <Input
                  id="prop-location"
                  name="location"
                  type="text"
                  value={form.location}
                  onChange={handleChange}
                  className={errors.location ? "border-destructive focus:ring-destructive" : ""}
                />
                {errors.location && <p className="text-xs text-destructive">{errors.location}</p>}
              </div>

              {/* Owner */}
              <div className="space-y-1.5">
                <label htmlFor="prop-owner" className="text-sm font-medium text-foreground flex items-center gap-2">
                  <User className="h-4 w-4 text-primary" /> Owner / Lister *
                </label>
                <Input
                  id="prop-owner"
                  name="owner"
                  type="text"
                  value={form.owner}
                  onChange={handleChange}
                  className={errors.owner ? "border-destructive focus:ring-destructive" : ""}
                />
                {errors.owner && <p className="text-xs text-destructive">{errors.owner}</p>}
              </div>

              {/* Status */}
              <div className="space-y-1.5">
                <label htmlFor="prop-status" className="text-sm font-medium text-foreground flex items-center gap-2">
                  <FileText className="h-4 w-4 text-primary" /> Status *
                </label>
                <select
                  id="prop-status"
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                  className={inputClass}
                >
                  <option value="Active">Active</option>
                  <option value="Sold">Sold</option>
                  <option value="Pending">Pending</option>
                </select>
              </div>
            </div>

            <div className="flex gap-4 pt-4">
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
