'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import {
  FaBuilding, FaHome, FaStore, FaChartArea, FaWarehouse,
  FaMapMarkerAlt, FaRupeeSign, FaAlignLeft, FaCalendarAlt,
  FaPhone, FaUser, FaCheckCircle, FaHashtag, FaBed,
  FaBath, FaRulerCombined, FaCar, FaCompass, FaLayerGroup,
  FaTag, FaArrowRight, FaClipboardList,
} from 'react-icons/fa';

// ── Helpers ────────────────────────────────────────────────────────────────
function genPropertyId() {
  const letters = 'ABCDEFGHJKLMNPQRSTUVWXYZ';
  const l1 = letters[Math.floor(Math.random() * letters.length)];
  const l2 = letters[Math.floor(Math.random() * letters.length)];
  const nums = String(Math.floor(100 + Math.random() * 900));
  return `${l1}${l2}${nums}`;
}

// ── Config ─────────────────────────────────────────────────────────────────
const PROPERTY_TYPES = ['Flat', 'House', 'Shop', 'Plot', 'Office', 'Warehouse'];
const PURPOSES       = ['Sale', 'Rent'];
const FURNISHINGS    = ['Unfurnished', 'Semi-Furnished', 'Furnished'];
const FACINGS        = ['East', 'West', 'North', 'South', 'North-East', 'North-West', 'South-East', 'South-West'];
const PREFERRED_FOR  = ['Any', 'Family', 'Bachelor', 'Company / Firm'];
const AREA_UNITS     = ['sq ft', 'Acre'];
const LOCALITIES     = [
  'Shankar Nagar', 'Telibandha', 'Khamardih', 'Avanti Vihar',
  'Pandri', 'VIP Road', 'Mowa', 'Pachpedi Naka', 'Civil Lines',
  'Raipur Naka', 'Tatibandh', 'Saddu', 'Kurud Road', 'Rajatalab',
];

const RESIDENTIAL = ['Flat', 'House'];

// ── Section heading ────────────────────────────────────────────────────────
function SectionHead({ icon: Icon, title, subtitle }) {
  return (
    <div className="flex items-start gap-3 mb-5">
      <span className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
        <Icon className="h-4 w-4 text-primary" />
      </span>
      <div>
        <h2 className="font-bold text-base text-foreground leading-tight">{title}</h2>
        {subtitle && <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>}
      </div>
    </div>
  );
}

// ── Field wrapper ──────────────────────────────────────────────────────────
function Field({ id, label, required, error, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium text-foreground">
        {label} {required && <span className="text-destructive">*</span>}
      </label>
      {children}
      {error && (
        <p className="text-xs text-destructive flex items-center gap-1">
          <FaCheckCircle className="h-3 w-3 shrink-0" /> {error}
        </p>
      )}
    </div>
  );
}

// ── Main form ──────────────────────────────────────────────────────────────
export default function PostPropertyForm() {
  const router = useRouter();
  const { userProfile, isLoggedIn, userRole } = useAuth();
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors]       = useState({});

  const [form, setForm] = useState({
    propertyId:      '',
    title:           '',
    type:            '',
    purpose:         '',
    city:            'Raipur',
    locality:        '',
    landmark:        '',
    areaSize:        '',
    areaUnit:        'sq ft',
    floorNo:         '',
    totalFloors:     '',

    bathrooms:       '',
    furnishing:      '',
    parking:         '',
    facing:          '',
    price:           '',
    negotiable:      '',
    maintenanceCharge: '',
    availableFrom:   '',
    preferredFor:    '',
    description:     '',
  });

  // Generate property ID once on mount
  useEffect(() => {
    setForm((prev) => ({ ...prev, propertyId: genPropertyId() }));
  }, []);

  const isResidential = RESIDENTIAL.includes(form.type);

  const input = 'w-full rounded-lg border border-border bg-input px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors';
  const select = `${input} appearance-none cursor-pointer`;

  const set = (field) => (e) => {
    const val = e.target.value;
    setForm((p) => ({ ...p, [field]: val }));
    if (errors[field]) setErrors((p) => ({ ...p, [field]: '' }));
  };

  const validate = () => {
    const e = {};
    if (!form.title.trim())    e.title    = 'Property title is required';
    if (!form.type)            e.type     = 'Property type is required';
    if (!form.purpose)         e.purpose  = 'Purpose is required';
    if (!form.locality.trim()) e.locality = 'Area / locality is required';
    if (!form.areaSize.trim() || isNaN(Number(form.areaSize))) e.areaSize = 'Enter a valid area size';
    if (!form.price.trim() || isNaN(Number(form.price)))       e.price    = 'Enter a valid price';
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    
    try {
      const { default: api } = await import('@/lib/axios');
      // Attach the logged-in user's ID as broker.id so /api/properties/mine can filter
      const payload = {
        ...form,
        ownerType: userRole || 'Broker',
        broker: {
          id:    userProfile?._id?.toString() || userProfile?.id?.toString() || '',
          name:  userProfile?.name  || '',
          phone: userProfile?.phone || '',
          role:  userRole || 'broker',
          // Include broker's profile photo so property cards can display it
          image: userProfile?.passportPhoto || userProfile?.image || '',
        },
      };
      await api.post('/properties', payload);
      setSubmitted(true);
      setTimeout(() => router.push('/'), 2000);
    } catch (error) {
      console.error("Failed to post property", error);
      alert("Failed to post property. Please try again.");
    }
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center gap-5 py-20 text-center">
        <span className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center">
          <FaCheckCircle className="h-10 w-10 text-primary" />
        </span>
        <h2 className="text-2xl font-bold">Listing Submitted!</h2>
        <p className="text-muted-foreground max-w-xs">
          Property <span className="font-semibold text-primary">{form.propertyId}</span> has been posted.
          Redirecting to home…
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-8">

      {/* ── 1. Property Identity ─────────────────────────────────── */}
      <div className="rounded-2xl border border-border bg-card p-5 md:p-6">
        <SectionHead icon={FaClipboardList} title="Property Identity" subtitle="Basic info about your listing" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* Auto-generated ID */}
          <Field id="prop-id" label="Property ID">
            <div className="flex items-center gap-2 rounded-lg border border-border bg-muted/50 px-3 py-2.5">
              <FaHashtag className="h-3.5 w-3.5 text-primary shrink-0" />
              <span className="font-mono font-bold text-sm text-primary tracking-widest">{form.propertyId}</span>
              <span className="text-xs text-muted-foreground ml-auto">Auto-generated</span>
            </div>
          </Field>

          {/* Purpose */}
          <Field id="prop-purpose" label="Purpose" required error={errors.purpose}>
            <div className="flex gap-2">
              {PURPOSES.map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => { setForm((prev) => ({ ...prev, purpose: p })); if (errors.purpose) setErrors((prev) => ({ ...prev, purpose: '' })); }}
                  className={`flex-1 py-2.5 rounded-lg border-2 text-sm font-semibold transition-all ${
                    form.purpose === p
                      ? 'border-primary bg-primary text-primary-foreground'
                      : 'border-border bg-card text-muted-foreground hover:border-primary'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </Field>

          {/* Title */}
          <Field id="prop-title" label="Property Title" required error={errors.title}>
            <input id="prop-title" type="text" value={form.title} onChange={set('title')}
              className={input} maxLength={80} />
            <span className="text-xs text-muted-foreground self-end">{form.title.length}/80</span>
          </Field>

          {/* Type */}
          <Field id="prop-type" label="Property Type" required error={errors.type}>
            <select id="prop-type" value={form.type} onChange={set('type')} className={select}>
              <option value=""></option>
              {PROPERTY_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </Field>
        </div>
      </div>

      {/* ── 2. Location ──────────────────────────────────────────── */}
      <div className="rounded-2xl border border-border bg-card p-5 md:p-6">
        <SectionHead icon={FaMapMarkerAlt} title="Location" subtitle="City and area — no full address required" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <Field id="prop-city" label="City" required>
            <input id="prop-city" type="text" value={form.city} onChange={set('city')} className={input} />
          </Field>

          <Field id="prop-locality" label="Area / Locality" required error={errors.locality}>
            <select id="prop-locality" value={form.locality} onChange={set('locality')} className={select}>
              <option value=""></option>
              {LOCALITIES.map((l) => <option key={l} value={l}>{l}</option>)}
            </select>
          </Field>

          <Field id="prop-landmark" label="Nearby Landmark (optional)">
            <input id="prop-landmark" type="text" value={form.landmark} onChange={set('landmark')} className={input} />
          </Field>
        </div>
      </div>

      {/* ── 3. Property Details ───────────────────────────────────── */}
      <div className="rounded-2xl border border-border bg-card p-5 md:p-6">
        <SectionHead icon={FaBuilding} title="Property Details & Pricing" subtitle="Specifications, features, and price" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* Price */}
          <Field id="prop-price" label="Price (₹)" required error={errors.price}>
            <div className="relative">
              <FaRupeeSign className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
              <input id="prop-price" type="number" min="0" value={form.price} onChange={set('price')}
                className={`${input} pl-8`} placeholder="Enter total amount" />
            </div>
          </Field>

          {/* Negotiable */}
          <Field id="prop-negotiable" label="Price Negotiable?">
            <div className="flex gap-2">
              {['Yes', 'No'].map((v) => (
                <button key={v} type="button"
                  onClick={() => setForm((p) => ({ ...p, negotiable: v }))}
                  className={`flex-1 py-2.5 rounded-lg border-2 text-sm font-medium transition-all ${
                    form.negotiable === v
                      ? 'border-primary bg-primary text-primary-foreground'
                      : 'border-border bg-card text-muted-foreground hover:border-primary'
                  }`}
                >{v}</button>
              ))}
            </div>
          </Field>

          {/* Area Size + Unit */}
          <Field id="prop-area" label="Total Area" required error={errors.areaSize}>
            <div className="flex gap-2">
              <input id="prop-area" type="number" min="1" value={form.areaSize} onChange={set('areaSize')}
                className={`${input} flex-1`} placeholder="Area size" />
              <select value={form.areaUnit} onChange={set('areaUnit')} className={`${select.replace('w-full', '')} w-28 flex-none`}>
                {AREA_UNITS.map((u) => <option key={u} value={u}>{u}</option>)}
              </select>
            </div>
          </Field>

          {/* Floor No */}
          <Field id="prop-floor" label="Floor No. (optional)">
            <input id="prop-floor" type="number" min="0" value={form.floorNo} onChange={set('floorNo')} className={input} />
          </Field>

          {/* Total Floors */}
          <Field id="prop-total-floors" label="Total Floors in Building (optional)">
            <input id="prop-total-floors" type="number" min="1" value={form.totalFloors} onChange={set('totalFloors')} className={input} />
          </Field>

          {/* Bathrooms — residential only */}
          {isResidential && (
            <Field id="prop-bath" label="Bathrooms (optional)">
              <select id="prop-bath" value={form.bathrooms} onChange={set('bathrooms')} className={select}>
                <option value=""></option>
                {['1', '2', '3', '4', '5+'].map((b) => <option key={b} value={b}>{b}</option>)}
              </select>
            </Field>
          )}

          {/* Furnishing — not for plots */}
          {form.type !== 'Plot' && (
            <Field id="prop-furnishing" label="Furnishing Status (optional)">
              <select id="prop-furnishing" value={form.furnishing} onChange={set('furnishing')} className={select}>
                <option value=""></option>
                {FURNISHINGS.map((f) => <option key={f} value={f}>{f}</option>)}
              </select>
            </Field>
          )}

          {/* Parking */}
          <Field id="prop-parking" label="Parking Available (optional)">
            <div className="flex gap-2">
              {['Yes', 'No'].map((v) => (
                <button key={v} type="button"
                  onClick={() => setForm((p) => ({ ...p, parking: v }))}
                  className={`flex-1 py-2.5 rounded-lg border-2 text-sm font-medium transition-all ${
                    form.parking === v
                      ? 'border-primary bg-primary text-primary-foreground'
                      : 'border-border bg-card text-muted-foreground hover:border-primary'
                  }`}
                >{v}</button>
              ))}
            </div>
          </Field>

          {/* Facing */}
          <Field id="prop-facing" label="Facing Direction (optional)">
            <select id="prop-facing" value={form.facing} onChange={set('facing')} className={select}>
              <option value=""></option>
              {FACINGS.map((f) => <option key={f} value={f}>{f}</option>)}
            </select>
          </Field>

          {/* Maintenance — flat/office only */}
          {['Flat', 'Office'].includes(form.type) && (
            <Field id="prop-maintenance" label="Maintenance Charge / Month (optional)">
              <div className="relative">
                <FaRupeeSign className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                <input id="prop-maintenance" type="number" min="0" value={form.maintenanceCharge}
                  onChange={set('maintenanceCharge')} className={`${input} pl-8`} />
              </div>
            </Field>
          )}

          {/* Available From */}
          <Field id="prop-available" label="Available From (optional)">
            <input id="prop-available" type="date" value={form.availableFrom}
              onChange={set('availableFrom')} className={input} />
          </Field>

          {/* Preferred For */}
          <Field id="prop-preferred" label="Preferred For (optional)">
            <select id="prop-preferred" value={form.preferredFor} onChange={set('preferredFor')} className={select}>
              <option value=""></option>
              {PREFERRED_FOR.map((p) => <option key={p} value={p}>{p}</option>)}
            </select>
          </Field>
        </div>
      </div>

      {/* ── 5. Description ───────────────────────────────────────── */}
      <div className="rounded-2xl border border-border bg-card p-5 md:p-6">
        <SectionHead icon={FaAlignLeft} title="Description" subtitle="Describe your property (optional)" />
        <textarea
          id="prop-description"
          value={form.description}
          onChange={set('description')}
          rows={4}
          maxLength={500}
          className={`${input} resize-none w-full`}
        />
        <span className="text-xs text-muted-foreground mt-1 block text-right">{form.description.length}/500</span>
      </div>



      {/* ── Submit ───────────────────────────────────────────────── */}
      <button
        type="submit"
        id="post-property-submit"
        className="w-full flex items-center justify-center gap-3 bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-base py-4 rounded-xl transition-all shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-ring active:scale-[.98]"
      >
        <FaTag className="h-4 w-4" />
        Post Property — FREE
        <FaArrowRight className="h-4 w-4" />
      </button>
    </form>
  );
}
