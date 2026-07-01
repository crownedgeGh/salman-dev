"use client";

import { useState, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  User,
  Calendar,
  FileText,
  CheckCircle,
  Megaphone
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AdImageUploader from "@/components/admin/AdImageUploader";


export default function EditAdPage({ params }) {
  const router = useRouter();
  const { id } = use(params);
  const adId = parseInt(id, 10);

  // Find corresponding ad
  const ad = [].find((a) => a.id === adId) || [][0];

  const [form, setForm] = useState({
    title: ad?.title || "",
    format: ad?.format || "Banner",
    status: ad?.status || "Active",
    expiryDate: ad?.expiryDate || "",
    owner: ad?.owner || "",
    imageUrl: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=500&h=280&fit=crop", // placeholder preset image
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

  const handleFileSelect = (file, url) => {
    setForm((prev) => ({ ...prev, imageUrl: url || "" }));
    if (errors.imageUrl) setErrors((prev) => ({ ...prev, imageUrl: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const e2 = {};
    if (!form.title.trim()) e2.title = "Ad Title is required";
    if (!form.owner.trim()) e2.owner = "Owner / Advertiser name is required";
    if (!form.expiryDate) e2.expiryDate = "Expiry date is required";
    if (!form.imageUrl) e2.imageUrl = "Please upload an ad creative image";

    if (Object.keys(e2).length) {
      setErrors(e2);
      return;
    }

    setSubmitted(true);
    showToast("Ad settings updated successfully!");
    setTimeout(() => {
      router.push("/admin/ads");
    }, 1500);
  };

  const inputClass =
    "w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors";

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Back Button */}
      <div>
        <Button asChild variant="ghost" className="gap-2 -ml-2 text-muted-foreground hover:text-foreground">
          <Link href="/admin/ads">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Ads</span>
          </Link>
        </Button>
      </div>

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Edit Ad Campaign</h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          Modify configuration settings or replace ad creatives.
        </p>
      </div>

      {/* Form Content */}
      <div className="p-6 rounded-xl border border-border bg-card shadow-sm space-y-6">
        {submitted ? (
          <div className="flex flex-col items-center justify-center gap-4 py-12 text-center">
            <CheckCircle className="h-14 w-14 text-green-500 animate-bounce" />
            <h2 className="text-xl font-bold">Successfully Updated!</h2>
            <p className="text-muted-foreground text-sm">
              The ad details have been saved. Redirecting...
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Left Column - Fields */}
              <div className="space-y-5">
                {/* Title */}
                <div className="space-y-1.5">
                  <label htmlFor="ad-title" className="text-sm font-medium text-foreground flex items-center gap-2">
                    <Megaphone className="h-4 w-4 text-primary" /> Ad Title *
                  </label>
                  <Input
                    id="ad-title"
                    name="title"
                    type="text"
                    value={form.title}
                    onChange={handleChange}
                    className={errors.title ? "border-destructive focus:ring-destructive" : ""}
                  />
                  {errors.title && <p className="text-xs text-destructive">{errors.title}</p>}
                </div>

                {/* Format Dropdown */}
                <div className="space-y-1.5">
                  <label htmlFor="ad-format" className="text-sm font-medium text-foreground flex items-center gap-2">
                    <FileText className="h-4 w-4 text-primary" /> Ad Format *
                  </label>
                  <select
                    id="ad-format"
                    name="format"
                    value={form.format}
                    onChange={handleChange}
                    className={inputClass}
                  >
                    <option value="Banner">Banner Ad (16/9)</option>
                    <option value="Story">Story Ad (9/16)</option>
                  </select>
                </div>

                {/* Status Dropdown */}
                <div className="space-y-1.5">
                  <label htmlFor="ad-status" className="text-sm font-medium text-foreground flex items-center gap-2">
                    <FileText className="h-4 w-4 text-primary" /> Status *
                  </label>
                  <select
                    id="ad-status"
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                    className={inputClass}
                  >
                    <option value="Active">Active</option>
                    <option value="Paused">Paused</option>
                    <option value="Expired">Expired</option>
                  </select>
                </div>

                {/* Expiry Date */}
                <div className="space-y-1.5">
                  <label htmlFor="ad-expiry" className="text-sm font-medium text-foreground flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-primary" /> Expiry Date *
                  </label>
                  <Input
                    id="ad-expiry"
                    name="expiryDate"
                    type="date"
                    value={form.expiryDate}
                    onChange={handleChange}
                    className={errors.expiryDate ? "border-destructive focus:ring-destructive" : ""}
                  />
                  {errors.expiryDate && <p className="text-xs text-destructive">{errors.expiryDate}</p>}
                </div>

                {/* Owner */}
                <div className="space-y-1.5">
                  <label htmlFor="ad-owner" className="text-sm font-medium text-foreground flex items-center gap-2">
                    <User className="h-4 w-4 text-primary" /> Advertiser / Owner *
                  </label>
                  <Input
                    id="ad-owner"
                    name="owner"
                    type="text"
                    value={form.owner}
                    onChange={handleChange}
                    className={errors.owner ? "border-destructive focus:ring-destructive" : ""}
                  />
                  {errors.owner && <p className="text-xs text-destructive">{errors.owner}</p>}
                </div>
              </div>

              {/* Right Column - Image Upload */}
              <div className="flex flex-col justify-between">
                <div className="space-y-4">
                  {form.format === "Banner" ? (
                    <AdImageUploader
                      label="Ad Creative Graphic (current: Banner)"
                      aspectRatio="16/9"
                      onFileSelect={handleFileSelect}
                    />
                  ) : (
                    <div className="flex justify-center">
                      <div className="w-full max-w-[280px]">
                        <AdImageUploader
                          label="Ad Creative Graphic (current: Story)"
                          aspectRatio="9/16"
                          onFileSelect={handleFileSelect}
                        />
                      </div>
                    </div>
                  )}
                  {errors.imageUrl && (
                    <p className="text-xs text-destructive text-center mt-2">{errors.imageUrl}</p>
                  )}
                </div>

                <div className="flex gap-4 mt-6">
                  <Button type="button" variant="outline" asChild className="flex-1">
                    <Link href="/admin/ads">Cancel</Link>
                  </Button>
                  <Button type="submit" className="flex-1">
                    Save Changes
                  </Button>
                </div>
              </div>

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
