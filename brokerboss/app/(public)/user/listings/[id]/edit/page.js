'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import api from '@/lib/axios';
import {
  FaArrowLeft, FaSave, FaSpinner, FaCheckCircle, FaExclamationCircle,
} from 'react-icons/fa';

const PROPERTY_TYPES = ['Flat', 'House', 'Plot', 'Office', 'Shop', 'Warehouse', 'Villa', 'Other'];
const PURPOSES = ['Sale', 'Rent'];
const FURNISHING_OPTIONS = ['Unfurnished', 'Semi-Furnished', 'Fully Furnished'];
const FACINGS = ['East', 'West', 'North', 'South', 'North-East', 'North-West', 'South-East', 'South-West'];
const AREA_UNITS = ['sq ft', 'sq yards', 'Marla', 'Bigha', 'Acre'];

// ─── Reusable field wrapper ───────────────────────────────────────────────────
function Field({ label, required, error, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-bold text-muted-foreground uppercase tracking-wide">
        {label}{required && <span className="text-red-400 ml-0.5">*</span>}
      </label>
      {children}
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}

// ─── Section card ─────────────────────────────────────────────────────────────
function Section({ title, children }) {
  return (
    <div className="bg-card border border-border/60 rounded-2xl p-5 md:p-6 flex flex-col gap-4">
      <h2 className="text-sm font-bold text-foreground border-b border-border/60 pb-3">{title}</h2>
      {children}
    </div>
  );
}

const inputClass =
  'w-full text-sm bg-background border border-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all';
const selectClass =
  'w-full text-sm bg-background border border-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all appearance-none cursor-pointer';

// ─── Toast notification ───────────────────────────────────────────────────────
function Toast({ toast }) {
  if (!toast) return null;
  const ok = toast.type === 'success';
  return (
    <div className={`fixed bottom-24 sm:bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-xl border text-sm font-semibold whitespace-nowrap ${ok
      ? 'bg-green-50 dark:bg-green-950/90 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800'
      : 'bg-red-50 dark:bg-red-950/90 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800'
      }`}>
      {ok ? <FaCheckCircle className="h-4 w-4 shrink-0" /> : <FaExclamationCircle className="h-4 w-4 shrink-0" />}
      {toast.msg}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function EditPropertyPage() {
  const { id } = useParams();
  const router = useRouter();
  const { isLoggedIn, authLoading } = useAuth();

  const [property, setProperty] = useState(null);
  const [fetching, setFetching] = useState(true);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState(null);
  const [form, setForm] = useState({});

  // Auth guard
  useEffect(() => {
    if (!authLoading && !isLoggedIn) router.push('/login');
  }, [authLoading, isLoggedIn, router]);

  // Fetch the property
  useEffect(() => {
    if (!id || authLoading) return;
    api.get(`/properties/${id}`)
      .then((res) => {
        const p = res.data;
        setProperty(p);
        setForm({
          title: p.title || '',
          type: p.type || '',
          purpose: p.purpose || '',
          price: p.price || '',
          area: p.area || '',
          areaSize: p.areaSize || '',
          areaUnit: p.areaUnit || 'sq ft',
          locality: p.locality || '',
          city: p.city || '',
          landmark: p.landmark || '',
          description: p.description || '',
          bhk: p.bhk || p.BHK || p.bedrooms || '',
          furnishing: p.furnishing || '',
          bathroom: p.bathroom || p.bathrooms || '',
          parking: p.parking || '',
          facing: p.facing || '',
          floorNo: p.floorNo || '',
          totalFloors: p.totalFloors || '',
        });
      })
      .catch(() => {
        setToast({ type: 'error', msg: 'Failed to load property.' });
      })
      .finally(() => setFetching(false));
  }, [id, authLoading]);

  const set = (key) => (e) => {
    setForm((prev) => ({ ...prev, [key]: e.target.value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: '' }));
  };

  const validate = () => {
    const e = {};
    if (!form.title?.trim()) e.title = 'Title is required';
    if (!form.type) e.type = 'Type is required';
    if (!form.price?.trim()) e.price = 'Price is required';
    return e;
  };

  const showToast = (type, msg) => {
    setToast({ type, msg });
    setTimeout(() => setToast(null), 4000);
  };

  const handleSave = async () => {
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setSaving(true);
    try {
      await api.put(`/properties/${id}`, form);
      showToast('success', 'Property updated successfully!');
      setTimeout(() => router.push('/user/listings'), 1500);
    } catch (err) {
      showToast('error', err?.response?.data?.error || 'Failed to save. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  if (authLoading || fetching) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <FaSpinner className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-muted-foreground">Property not found.</p>
        <button onClick={() => router.back()} className="text-sm text-primary hover:underline">Go back</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-28">
      {/* ── Sticky Header ───────────────────────────────── */}
      <div className="sticky top-16 z-30 bg-background/95 backdrop-blur-sm border-b border-border/60">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl py-4 flex items-center gap-3">
          <button
            onClick={() => router.back()}
            className="h-9 w-9 rounded-xl border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-accent transition-all shrink-0"
          >
            <FaArrowLeft className="h-3.5 w-3.5" />
          </button>
          <div className="flex-1 min-w-0">
            <h1 className="text-base font-extrabold text-foreground">Edit Property</h1>
            <p className="text-xs text-muted-foreground truncate">{property.title}</p>
          </div>
        </div>
      </div>

      {/* ── Form ────────────────────────────────────────── */}
      <div className="container mx-auto px-4 md:px-6 max-w-3xl py-6 flex flex-col gap-5">

        {/* Basic Info */}
        <Section title="Basic Information">
          <Field label="Title" required error={errors.title}>
            <input id="edit-title" type="text" value={form.title} onChange={set('title')}
              placeholder="Property title…" className={inputClass} />
          </Field>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Type" required error={errors.type}>
              <select id="edit-type" value={form.type} onChange={set('type')} className={selectClass}>
                <option value="">Select type</option>
                {PROPERTY_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </Field>
            <Field label="Purpose">
              <select id="edit-purpose" value={form.purpose} onChange={set('purpose')} className={selectClass}>
                <option value="">Select</option>
                {PURPOSES.map((p) => <option key={p} value={p}>{p}</option>)}
              </select>
            </Field>
          </div>

          <Field label="Price" required error={errors.price}>
            <input id="edit-price" type="text" value={form.price} onChange={set('price')}
              placeholder="e.g. ₹45,00,000 or ₹15,000/mo" className={inputClass} />
          </Field>
        </Section>

        {/* Location */}
        <Section title="Location">
          <div className="grid grid-cols-2 gap-4">
            <Field label="Locality">
              <input id="edit-locality" type="text" value={form.locality} onChange={set('locality')}
                placeholder="Locality / area…" className={inputClass} />
            </Field>
            <Field label="City">
              <input id="edit-city" type="text" value={form.city} onChange={set('city')}
                placeholder="City…" className={inputClass} />
            </Field>
          </div>
          <Field label="Landmark">
            <input id="edit-landmark" type="text" value={form.landmark} onChange={set('landmark')}
              placeholder="Nearby landmark…" className={inputClass} />
          </Field>
        </Section>

        {/* Area & Specs */}
        <Section title="Property Details">
          <div className="grid grid-cols-2 gap-4">
            <Field label="Area (display text)">
              <input id="edit-area" type="text" value={form.area} onChange={set('area')}
                placeholder="e.g. 1200 sq ft" className={inputClass} />
            </Field>
            <Field label="Area Size (number)">
              <input id="edit-areaSize" type="number" value={form.areaSize} onChange={set('areaSize')}
                placeholder="1200" className={inputClass} />
            </Field>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <Field label="BHK / Bedrooms">
              <input id="edit-bhk" type="number" min={1} max={10} value={form.bhk} onChange={set('bhk')}
                placeholder="2" className={inputClass} />
            </Field>
            <Field label="Bathrooms">
              <input id="edit-bathroom" type="number" min={1} max={10} value={form.bathroom} onChange={set('bathroom')}
                placeholder="2" className={inputClass} />
            </Field>
            <Field label="Parking">
              <input id="edit-parking" type="text" value={form.parking} onChange={set('parking')}
                placeholder="1 car" className={inputClass} />
            </Field>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Furnishing">
              <select id="edit-furnishing" value={form.furnishing} onChange={set('furnishing')} className={selectClass}>
                <option value="">Select</option>
                {FURNISHING_OPTIONS.map((f) => <option key={f} value={f}>{f}</option>)}
              </select>
            </Field>
            <Field label="Facing">
              <select id="edit-facing" value={form.facing} onChange={set('facing')} className={selectClass}>
                <option value="">Select</option>
                {FACINGS.map((f) => <option key={f} value={f}>{f}</option>)}
              </select>
            </Field>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Floor No.">
              <input id="edit-floorNo" type="text" value={form.floorNo} onChange={set('floorNo')}
                placeholder="3" className={inputClass} />
            </Field>
            <Field label="Total Floors">
              <input id="edit-totalFloors" type="text" value={form.totalFloors} onChange={set('totalFloors')}
                placeholder="10" className={inputClass} />
            </Field>
          </div>
        </Section>

        {/* Description */}
        <Section title="Description">
          <Field label="About this property">
            <textarea id="edit-description" rows={5} value={form.description} onChange={set('description')}
              placeholder="Describe the property in detail…"
              className={`${inputClass} resize-none`} />
          </Field>
        </Section>


      </div>

      {/* ── Sticky Save Bar ─────────────────────────────── */}
      <div className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-t border-border/60 px-4 py-4 z-40">
        <div className="container mx-auto max-w-3xl flex gap-3">
          <button
            onClick={() => router.back()}
            className="flex-none px-5 py-3.5 rounded-2xl border border-border text-sm font-semibold text-muted-foreground hover:text-foreground hover:bg-accent transition-all"
          >
            Cancel
          </button>
          <button
            id="edit-save-btn"
            onClick={handleSave}
            disabled={saving}
            className="flex-1 flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 disabled:opacity-60 text-primary-foreground font-bold text-sm py-3.5 rounded-2xl transition-all shadow-md"
          >
            {saving ? <FaSpinner className="h-4 w-4 animate-spin" /> : <FaSave className="h-4 w-4" />}
            {saving ? 'Saving…' : 'Save Changes'}
          </button>
        </div>
      </div>

      <Toast toast={toast} />
    </div>
  );
}
