"use client";

import { useState } from "react";
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
  Coins
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

const BUDGET_OPTIONS = [
  { value: "under-20L", label: "Under ₹20L" },
  { value: "20L-50L", label: "₹20L – ₹50L" },
  { value: "50L-1Cr", label: "₹50L – ₹1Cr" },
  { value: "1Cr-2Cr", label: "₹1Cr – ₹2Cr" },
  { value: "above-2Cr", label: "Above ₹2Cr" },
];

export default function AddPropertyPage() {
  const router = useRouter();
  const [listingFor, setListingFor] = useState(null); // 'buyer', 'broker', 'owner'
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState(null);

  // Form states
  const [buyerForm, setBuyerForm] = useState({
    propertyTypes: [],
    name: "",
    phone: "",
    city: "",
    preferredArea: "",
    budgetRange: "",
    notes: "",
  });

  const [brokerForm, setBrokerForm] = useState({
    name: "",
    firmName: "",
    phone: "",
    city: "",
    areasOfOperation: "",
    reraNumber: "",
    yearsOfExperience: "",
    bio: "",
  });

  const [ownerForm, setOwnerForm] = useState({
    name: "",
    phone: "",
    city: "",
    area: "",
    propertyType: "",
    description: "",
  });

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  // Input styling
  const inputClass =
    "w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors";

  // Form validation & submission handlers
  const handleBuyerSubmit = (e) => {
    e.preventDefault();
    const e2 = {};
    if (buyerForm.propertyTypes.length === 0) {
      e2.propertyTypes = "Please select at least one property type";
    }
    if (!buyerForm.name.trim()) e2.name = "Full name is required";
    if (!buyerForm.phone.trim()) {
      e2.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(buyerForm.phone.replace(/\s/g, ""))) {
      e2.phone = "Enter a valid 10-digit number";
    }
    if (!buyerForm.city.trim()) e2.city = "City is required";
    if (!buyerForm.budgetRange) e2.budgetRange = "Please select a budget range";

    if (Object.keys(e2).length) {
      setErrors(e2);
      return;
    }

    // Success simulation
    setSubmitted(true);
    showToast("Buyer listing added successfully!");
    setTimeout(() => {
      router.push("/admin/properties");
    }, 1500);
  };

  const handleBrokerSubmit = (e) => {
    e.preventDefault();
    const e2 = {};
    if (!brokerForm.name.trim()) e2.name = "Full name is required";
    if (!brokerForm.firmName.trim()) e2.firmName = "Firm / agency name is required";
    if (!brokerForm.phone.trim()) {
      e2.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(brokerForm.phone.replace(/\s/g, ""))) {
      e2.phone = "Enter a valid 10-digit number";
    }
    if (!brokerForm.city.trim()) e2.city = "City is required";
    if (!brokerForm.areasOfOperation.trim()) {
      e2.areasOfOperation = "Areas of operation are required";
    }

    if (Object.keys(e2).length) {
      setErrors(e2);
      return;
    }

    // Success simulation
    setSubmitted(true);
    showToast("Broker listing added successfully!");
    setTimeout(() => {
      router.push("/admin/properties");
    }, 1500);
  };

  const handleOwnerSubmit = (e) => {
    e.preventDefault();
    const e2 = {};
    if (!ownerForm.name.trim()) e2.name = "Full name is required";
    if (!ownerForm.phone.trim()) {
      e2.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(ownerForm.phone.replace(/\s/g, ""))) {
      e2.phone = "Enter a valid 10-digit number";
    }
    if (!ownerForm.city.trim()) e2.city = "City is required";
    if (!ownerForm.area.trim()) e2.area = "Area / locality is required";
    if (!ownerForm.propertyType) e2.propertyType = "Please select a property type";

    if (Object.keys(e2).length) {
      setErrors(e2);
      return;
    }

    // Success simulation
    setSubmitted(true);
    showToast("Owner listing added successfully!");
    setTimeout(() => {
      router.push("/admin/properties");
    }, 1500);
  };

  const toggleBuyerPropertyType = (id) => {
    setBuyerForm((prev) => {
      const selected = prev.propertyTypes.includes(id)
        ? prev.propertyTypes.filter((t) => t !== id)
        : [...prev.propertyTypes, id];
      return { ...prev, propertyTypes: selected };
    });
    if (errors.propertyTypes) {
      setErrors((prev) => ({ ...prev, propertyTypes: "" }));
    }
  };

  const handleBuyerChange = (e) => {
    const { name, value } = e.target;
    setBuyerForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleBrokerChange = (e) => {
    const { name, value } = e.target;
    setBrokerForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleOwnerChange = (e) => {
    const { name, value } = e.target;
    setOwnerForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

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
      <div>
        <h1 className="text-2xl font-bold text-foreground">Add New Property Listing</h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          Create a new listing profile in the database.
        </p>
      </div>

      {/* STEP 1: Select Listing For */}
      <div className="p-6 rounded-xl border border-border bg-card shadow-sm space-y-4">
        <h2 className="text-lg font-semibold text-foreground">
          Are you listing property for Buyer, Broker, or Owner?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              id: "buyer",
              title: "Buyer Profile",
              desc: "Add property requirements for a client looking to buy.",
              color: "border-blue-500/20 hover:border-blue-500 bg-blue-500/5",
              activeColor: "ring-2 ring-primary border-primary bg-primary/10",
            },
            {
              id: "broker",
              title: "Broker Listing",
              desc: "Add broker representation profiles or project listings.",
              color: "border-amber-500/20 hover:border-amber-500 bg-amber-500/5",
              activeColor: "ring-2 ring-primary border-primary bg-primary/10",
            },
            {
              id: "owner",
              title: "Owner Property",
              desc: "Direct property listed by the owner for sale or rent.",
              color: "border-green-500/20 hover:border-green-500 bg-green-500/5",
              activeColor: "ring-2 ring-primary border-primary bg-primary/10",
            },
          ].map((item) => {
            const isActive = listingFor === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setListingFor(item.id);
                  setErrors({});
                }}
                className={`text-left p-5 rounded-xl border transition-all duration-200 ${
                  isActive ? item.activeColor : `${item.color} hover:shadow-md`
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-foreground">{item.title}</span>
                  {isActive && <CheckCircle className="w-5 h-5 text-primary" />}
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {item.desc}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* STEP 2: Render selected Form */}
      {listingFor && (
        <div className="p-6 rounded-xl border border-border bg-card shadow-sm space-y-6">
          <div className="border-b border-border pb-4">
            <h3 className="text-lg font-semibold capitalize text-foreground">
              {listingFor} details
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              Please fill out all the required information to save this listing.
            </p>
          </div>

          {submitted ? (
            <div className="flex flex-col items-center justify-center gap-4 py-12 text-center">
              <CheckCircle className="h-14 w-14 text-green-500 animate-bounce" />
              <h2 className="text-xl font-bold">Successfully Added!</h2>
              <p className="text-muted-foreground text-sm">
                The new property listing has been saved. Redirecting to table...
              </p>
            </div>
          ) : (
            <>
              {/* BUYER FORM */}
              {listingFor === "buyer" && (
                <form onSubmit={handleBuyerSubmit} noValidate className="space-y-6">
                  {/* Property Type Selector */}
                  <div className="space-y-3">
                    <label className="text-sm font-medium text-foreground block">
                      What type of property are they looking for? *
                    </label>
                    <div className="flex flex-wrap gap-2.5">
                      {PROPERTY_TYPES.map(({ id, label, icon: Icon }) => {
                        const selected = buyerForm.propertyTypes.includes(id);
                        return (
                          <button
                            key={id}
                            type="button"
                            onClick={() => toggleBuyerPropertyType(id)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-ring ${
                              selected
                                ? "border-primary bg-primary text-primary-foreground"
                                : "border-border bg-background text-muted-foreground hover:border-primary hover:text-foreground"
                            }`}
                          >
                            <Icon className="h-4 w-4" />
                            {label}
                          </button>
                        );
                      })}
                    </div>
                    {errors.propertyTypes && (
                      <p className="text-xs text-destructive flex items-center gap-1">
                        <CheckCircle className="h-3.5 w-3.5" /> {errors.propertyTypes}
                      </p>
                    )}
                  </div>

                  {/* Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* Full Name */}
                    <div className="space-y-1.5">
                      <label htmlFor="buyer-name" className="text-sm font-medium text-foreground flex items-center gap-2">
                        <User className="h-4 w-4 text-primary" /> Full Name *
                      </label>
                      <Input
                        id="buyer-name"
                        name="name"
                        type="text"
                        value={buyerForm.name}
                        onChange={handleBuyerChange}
                        className={errors.name ? "border-destructive focus:ring-destructive" : ""}
                      />
                      {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
                    </div>

                    {/* Phone Number */}
                    <div className="space-y-1.5">
                      <label htmlFor="buyer-phone" className="text-sm font-medium text-foreground flex items-center gap-2">
                        <Phone className="h-4 w-4 text-primary" /> Phone Number *
                      </label>
                      <Input
                        id="buyer-phone"
                        name="phone"
                        type="tel"
                        value={buyerForm.phone}
                        onChange={handleBuyerChange}
                        placeholder="e.g. 9876543210"
                        className={errors.phone ? "border-destructive focus:ring-destructive" : ""}
                      />
                      {errors.phone && <p className="text-xs text-destructive">{errors.phone}</p>}
                    </div>

                    {/* City */}
                    <div className="space-y-1.5">
                      <label htmlFor="buyer-city" className="text-sm font-medium text-foreground flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-primary" /> City *
                      </label>
                      <Input
                        id="buyer-city"
                        name="city"
                        type="text"
                        value={buyerForm.city}
                        onChange={handleBuyerChange}
                        className={errors.city ? "border-destructive focus:ring-destructive" : ""}
                      />
                      {errors.city && <p className="text-xs text-destructive">{errors.city}</p>}
                    </div>

                    {/* Preferred Area */}
                    <div className="space-y-1.5">
                      <label htmlFor="buyer-preferred-area" className="text-sm font-medium text-foreground flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-primary" /> Preferred Area (optional)
                      </label>
                      <Input
                        id="buyer-preferred-area"
                        name="preferredArea"
                        type="text"
                        value={buyerForm.preferredArea}
                        onChange={handleBuyerChange}
                      />
                    </div>

                    {/* Budget Range */}
                    <div className="space-y-1.5">
                      <label htmlFor="buyer-budget" className="text-sm font-medium text-foreground flex items-center gap-2">
                        <Coins className="h-4 w-4 text-primary" /> Budget Range *
                      </label>
                      <select
                        id="buyer-budget"
                        name="budgetRange"
                        value={buyerForm.budgetRange}
                        onChange={handleBuyerChange}
                        className={`${inputClass} ${errors.budgetRange ? "border-destructive" : ""}`}
                      >
                        <option value="">Select range...</option>
                        {BUDGET_OPTIONS.map(({ value, label }) => (
                          <option key={value} value={value}>{label}</option>
                        ))}
                      </select>
                      {errors.budgetRange && <p className="text-xs text-destructive">{errors.budgetRange}</p>}
                    </div>
                  </div>

                  {/* Notes */}
                  <div className="space-y-1.5">
                    <label htmlFor="buyer-notes" className="text-sm font-medium text-foreground flex items-center gap-2">
                      <FileText className="h-4 w-4 text-primary" /> Additional Notes (optional)
                    </label>
                    <textarea
                      id="buyer-notes"
                      name="notes"
                      rows={3}
                      maxLength={200}
                      value={buyerForm.notes}
                      onChange={handleBuyerChange}
                      className={`${inputClass} resize-none`}
                    />
                    <div className="text-right text-xs text-muted-foreground">
                      {buyerForm.notes.length}/200
                    </div>
                  </div>

                  <Button type="submit" className="w-full h-11 text-sm font-semibold">
                    Save Buyer Listing
                  </Button>
                </form>
              )}

              {/* BROKER FORM */}
              {listingFor === "broker" && (
                <form onSubmit={handleBrokerSubmit} noValidate className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* Full Name */}
                    <div className="space-y-1.5">
                      <label htmlFor="broker-name" className="text-sm font-medium text-foreground flex items-center gap-2">
                        <User className="h-4 w-4 text-primary" /> Full Name *
                      </label>
                      <Input
                        id="broker-name"
                        name="name"
                        type="text"
                        value={brokerForm.name}
                        onChange={handleBrokerChange}
                        className={errors.name ? "border-destructive focus:ring-destructive" : ""}
                      />
                      {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
                    </div>

                    {/* Firm Name */}
                    <div className="space-y-1.5">
                      <label htmlFor="broker-firm" className="text-sm font-medium text-foreground flex items-center gap-2">
                        <Building className="h-4 w-4 text-primary" /> Firm / Agency Name *
                      </label>
                      <Input
                        id="broker-firm"
                        name="firmName"
                        type="text"
                        value={brokerForm.firmName}
                        onChange={handleBrokerChange}
                        className={errors.firmName ? "border-destructive focus:ring-destructive" : ""}
                      />
                      {errors.firmName && <p className="text-xs text-destructive">{errors.firmName}</p>}
                    </div>

                    {/* Phone Number */}
                    <div className="space-y-1.5">
                      <label htmlFor="broker-phone" className="text-sm font-medium text-foreground flex items-center gap-2">
                        <Phone className="h-4 w-4 text-primary" /> Phone Number *
                      </label>
                      <Input
                        id="broker-phone"
                        name="phone"
                        type="tel"
                        value={brokerForm.phone}
                        onChange={handleBrokerChange}
                        placeholder="e.g. 9876543210"
                        className={errors.phone ? "border-destructive focus:ring-destructive" : ""}
                      />
                      {errors.phone && <p className="text-xs text-destructive">{errors.phone}</p>}
                    </div>

                    {/* City */}
                    <div className="space-y-1.5">
                      <label htmlFor="broker-city" className="text-sm font-medium text-foreground flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-primary" /> City *
                      </label>
                      <Input
                        id="broker-city"
                        name="city"
                        type="text"
                        value={brokerForm.city}
                        onChange={handleBrokerChange}
                        className={errors.city ? "border-destructive focus:ring-destructive" : ""}
                      />
                      {errors.city && <p className="text-xs text-destructive">{errors.city}</p>}
                    </div>

                    {/* Areas of Operation */}
                    <div className="space-y-1.5">
                      <label htmlFor="broker-areas" className="text-sm font-medium text-foreground flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-primary" /> Areas of Operation *
                      </label>
                      <Input
                        id="broker-areas"
                        name="areasOfOperation"
                        type="text"
                        value={brokerForm.areasOfOperation}
                        onChange={handleBrokerChange}
                        placeholder="e.g. Shankar Nagar, VIP Road"
                        className={errors.areasOfOperation ? "border-destructive focus:ring-destructive" : ""}
                      />
                      {errors.areasOfOperation && <p className="text-xs text-destructive">{errors.areasOfOperation}</p>}
                    </div>

                    {/* RERA Number */}
                    <div className="space-y-1.5">
                      <label htmlFor="broker-rera" className="text-sm font-medium text-foreground flex items-center gap-2">
                        <Briefcase className="h-4 w-4 text-primary" /> RERA / License No. (optional)
                      </label>
                      <Input
                        id="broker-rera"
                        name="reraNumber"
                        type="text"
                        value={brokerForm.reraNumber}
                        onChange={handleBrokerChange}
                      />
                    </div>

                    {/* Years of Experience */}
                    <div className="space-y-1.5">
                      <label htmlFor="broker-experience" className="text-sm font-medium text-foreground flex items-center gap-2">
                        <Clock className="h-4 w-4 text-primary" /> Years of Experience (optional)
                      </label>
                      <Input
                        id="broker-experience"
                        name="yearsOfExperience"
                        type="number"
                        min="0"
                        value={brokerForm.yearsOfExperience}
                        onChange={handleBrokerChange}
                      />
                    </div>
                  </div>

                  {/* Bio */}
                  <div className="space-y-1.5">
                    <label htmlFor="broker-bio" className="text-sm font-medium text-foreground flex items-center gap-2">
                      <FileText className="h-4 w-4 text-primary" /> Brief Bio (optional)
                    </label>
                    <textarea
                      id="broker-bio"
                      name="bio"
                      rows={3}
                      maxLength={300}
                      value={brokerForm.bio}
                      onChange={handleBrokerChange}
                      className={`${inputClass} resize-none`}
                    />
                    <div className="text-right text-xs text-muted-foreground">
                      {brokerForm.bio.length}/300
                    </div>
                  </div>

                  <Button type="submit" className="w-full h-11 text-sm font-semibold">
                    Save Broker Listing
                  </Button>
                </form>
              )}

              {/* OWNER FORM */}
              {listingFor === "owner" && (
                <form onSubmit={handleOwnerSubmit} noValidate className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* Full Name */}
                    <div className="space-y-1.5">
                      <label htmlFor="owner-name" className="text-sm font-medium text-foreground flex items-center gap-2">
                        <User className="h-4 w-4 text-primary" /> Full Name *
                      </label>
                      <Input
                        id="owner-name"
                        name="name"
                        type="text"
                        value={ownerForm.name}
                        onChange={handleOwnerChange}
                        className={errors.name ? "border-destructive focus:ring-destructive" : ""}
                      />
                      {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
                    </div>

                    {/* Phone Number */}
                    <div className="space-y-1.5">
                      <label htmlFor="owner-phone" className="text-sm font-medium text-foreground flex items-center gap-2">
                        <Phone className="h-4 w-4 text-primary" /> Phone Number *
                      </label>
                      <Input
                        id="owner-phone"
                        name="phone"
                        type="tel"
                        value={ownerForm.phone}
                        onChange={handleOwnerChange}
                        placeholder="e.g. 9876543210"
                        className={errors.phone ? "border-destructive focus:ring-destructive" : ""}
                      />
                      {errors.phone && <p className="text-xs text-destructive">{errors.phone}</p>}
                    </div>

                    {/* City */}
                    <div className="space-y-1.5">
                      <label htmlFor="owner-city" className="text-sm font-medium text-foreground flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-primary" /> City *
                      </label>
                      <Input
                        id="owner-city"
                        name="city"
                        type="text"
                        value={ownerForm.city}
                        onChange={handleOwnerChange}
                        className={errors.city ? "border-destructive focus:ring-destructive" : ""}
                      />
                      {errors.city && <p className="text-xs text-destructive">{errors.city}</p>}
                    </div>

                    {/* Area / Locality */}
                    <div className="space-y-1.5">
                      <label htmlFor="owner-area" className="text-sm font-medium text-foreground flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-primary" /> Area / Locality *
                      </label>
                      <Input
                        id="owner-area"
                        name="area"
                        type="text"
                        value={ownerForm.area}
                        onChange={handleOwnerChange}
                        className={errors.area ? "border-destructive focus:ring-destructive" : ""}
                      />
                      {errors.area && <p className="text-xs text-destructive">{errors.area}</p>}
                    </div>

                    {/* Property Type Offered */}
                    <div className="space-y-1.5">
                      <label htmlFor="owner-property-type" className="text-sm font-medium text-foreground flex items-center gap-2">
                        <Building className="h-4 w-4 text-primary" /> Property Type Offered *
                      </label>
                      <select
                        id="owner-property-type"
                        name="propertyType"
                        value={ownerForm.propertyType}
                        onChange={handleOwnerChange}
                        className={`${inputClass} ${errors.propertyType ? "border-destructive" : ""}`}
                      >
                        <option value="">Select type...</option>
                        {PROPERTY_TYPES.map(({ id, label }) => (
                          <option key={id} value={label}>{label}</option>
                        ))}
                      </select>
                      {errors.propertyType && <p className="text-xs text-destructive">{errors.propertyType}</p>}
                    </div>
                  </div>

                  {/* Description */}
                  <div className="space-y-1.5">
                    <label htmlFor="owner-description" className="text-sm font-medium text-foreground flex items-center gap-2">
                      <FileText className="h-4 w-4 text-primary" /> Brief Description (optional)
                    </label>
                    <textarea
                      id="owner-description"
                      name="description"
                      rows={3}
                      maxLength={300}
                      value={ownerForm.description}
                      onChange={handleOwnerChange}
                      className={`${inputClass} resize-none`}
                    />
                    <div className="text-right text-xs text-muted-foreground">
                      {ownerForm.description.length}/300
                    </div>
                  </div>

                  <Button type="submit" className="w-full h-11 text-sm font-semibold">
                    Save Owner Listing
                  </Button>
                </form>
              )}
            </>
          )}
        </div>
      )}

      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-foreground text-background text-sm px-4 py-2.5 rounded-xl shadow-lg animate-in slide-in-from-bottom-4 duration-300">
          {toast}
        </div>
      )}
    </div>
  );
}
