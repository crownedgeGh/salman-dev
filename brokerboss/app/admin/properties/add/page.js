"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Building,
  Home,
  Store,
  Layers,
  Warehouse,
  FileText,
  CheckCircle,
  MapPin,
  Coins,
  Image as ImageIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import api from "@/lib/axios";

const PROPERTY_TYPES = [
  { id: "flat", label: "Flat", icon: Building },
  { id: "house", label: "House", icon: Home },
  { id: "shop", label: "Shop", icon: Store },
  { id: "plot", label: "Plot", icon: Layers },
  { id: "office", label: "Office", icon: Warehouse },
];

export default function AddPropertyPage() {
  const router = useRouter();
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState(null);

  const [form, setForm] = useState({
    title: "",
    type: "",
    purpose: "",
    price: "",
    city: "",
    locality: "",
    description: "",
    thumbnail: "",
  });

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const e2 = {};
    if (!form.title.trim()) e2.title = "Title is required";
    if (!form.type) e2.type = "Type is required";
    if (!form.purpose) e2.purpose = "Purpose is required";
    if (!form.price.trim()) e2.price = "Price is required";
    if (!form.city.trim()) e2.city = "City is required";
    if (!form.locality.trim()) e2.locality = "Locality is required";

    if (Object.keys(e2).length) {
      setErrors(e2);
      return;
    }

    try {
      await api.post('/properties', {
        ...form,
        postedAt: new Date().toISOString(),
        status: "Active"
      });
      setSubmitted(true);
      showToast("Property added successfully!");
      setTimeout(() => {
        router.push("/admin/properties");
      }, 1500);
    } catch (error) {
      console.error(error);
      showToast("Failed to add property");
    }
  };

  const inputClass =
    "w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors";

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <Button asChild variant="ghost" className="gap-2 -ml-2 text-muted-foreground hover:text-foreground">
          <Link href="/admin/properties">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Properties</span>
          </Link>
        </Button>
      </div>

      <div>
        <h1 className="text-2xl font-bold text-foreground">Add New Property Listing</h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          Create a new property listing in the database.
        </p>
      </div>

      <div className="p-6 rounded-xl border border-border bg-card shadow-sm space-y-6">
        {submitted ? (
          <div className="flex flex-col items-center justify-center gap-4 py-12 text-center">
            <CheckCircle className="h-14 w-14 text-green-500 animate-bounce" />
            <h2 className="text-xl font-bold">Successfully Added!</h2>
            <p className="text-muted-foreground text-sm">
              The new property listing has been saved. Redirecting to table...
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-sm font-medium text-foreground flex items-center gap-2">
                  <FileText className="h-4 w-4 text-primary" /> Title *
                </label>
                <Input name="title" value={form.title} onChange={handleChange} className={errors.title ? "border-destructive focus:ring-destructive" : ""} />
                {errors.title && <p className="text-xs text-destructive">{errors.title}</p>}
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground flex items-center gap-2">
                  <Building className="h-4 w-4 text-primary" /> Property Type *
                </label>
                <select name="type" value={form.type} onChange={handleChange} className={`${inputClass} ${errors.type ? "border-destructive" : ""}`}>
                  <option value="">Select type...</option>
                  {PROPERTY_TYPES.map(({ id, label }) => (
                    <option key={id} value={label}>{label}</option>
                  ))}
                </select>
                {errors.type && <p className="text-xs text-destructive">{errors.type}</p>}
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground flex items-center gap-2">
                  <Building className="h-4 w-4 text-primary" /> Purpose *
                </label>
                <select name="purpose" value={form.purpose} onChange={handleChange} className={`${inputClass} ${errors.purpose ? "border-destructive" : ""}`}>
                  <option value="">Select purpose...</option>
                  <option value="Sale">Sale</option>
                  <option value="Rent">Rent</option>
                </select>
                {errors.purpose && <p className="text-xs text-destructive">{errors.purpose}</p>}
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground flex items-center gap-2">
                  <Coins className="h-4 w-4 text-primary" /> Price *
                </label>
                <Input name="price" type="text" value={form.price} onChange={handleChange} className={errors.price ? "border-destructive focus:ring-destructive" : ""} />
                {errors.price && <p className="text-xs text-destructive">{errors.price}</p>}
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground flex items-center gap-2">
                  <ImageIcon className="h-4 w-4 text-primary" /> Thumbnail URL
                </label>
                <Input name="thumbnail" type="text" value={form.thumbnail} onChange={handleChange} />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary" /> City *
                </label>
                <Input name="city" type="text" value={form.city} onChange={handleChange} className={errors.city ? "border-destructive focus:ring-destructive" : ""} />
                {errors.city && <p className="text-xs text-destructive">{errors.city}</p>}
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary" /> Locality *
                </label>
                <Input name="locality" type="text" value={form.locality} onChange={handleChange} className={errors.locality ? "border-destructive focus:ring-destructive" : ""} />
                {errors.locality && <p className="text-xs text-destructive">{errors.locality}</p>}
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground flex items-center gap-2">
                <FileText className="h-4 w-4 text-primary" /> Description
              </label>
              <textarea name="description" rows={4} value={form.description} onChange={handleChange} className={`${inputClass} resize-none`} />
            </div>

            <Button type="submit" className="w-full h-11 text-sm font-semibold">
              Save Property
            </Button>
          </form>
        )}
      </div>

      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-foreground text-background text-sm px-4 py-2.5 rounded-xl shadow-lg animate-in slide-in-from-bottom-4 duration-300">
          {toast}
        </div>
      )}
    </div>
  );
}
