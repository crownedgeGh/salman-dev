'use client';

import { useState, useEffect } from 'react';
import api from '@/lib/axios';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { FaSave, FaSpinner, FaTimes } from 'react-icons/fa';

const PROPERTY_TYPES = ['House', 'Flat', 'Plot', 'Office', 'Shop', 'Warehouse', 'Villa', 'Other'];
const PURPOSES = ['Sale', 'Rent'];
const FURNISHING_OPTIONS = ['Unfurnished', 'Semi-Furnished', 'Fully Furnished'];

function FieldError({ msg }) {
  if (!msg) return null;
  return <p className="text-xs text-red-500 mt-0.5">{msg}</p>;
}

const buildInitialForm = (property) => ({
  title:       property?.title || '',
  type:        property?.type || '',
  purpose:     property?.purpose || '',
  price:       property?.price || '',
  area:        property?.area || '',
  areaSize:    property?.areaSize || '',
  areaUnit:    property?.areaUnit || 'sq ft',
  locality:    property?.locality || '',
  city:        property?.city || '',
  description: property?.description || '',
  bhk:         property?.bhk || property?.BHK || '',
  furnishing:  property?.furnishing || '',
  bathroom:    property?.bathroom || '',
});

export default function EditPropertyModal({ property, onClose, onSaved }) {
  const [form, setForm] = useState(() => buildInitialForm(property));
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);

  // Re-populate when property changes
  useEffect(() => {
    if (property) setForm(buildInitialForm(property));
    setErrors({});
    setToast(null);
  }, [property]);

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: '' }));
  };

  const validate = () => {
    const errs = {};
    if (!form.title.trim()) errs.title = 'Title is required';
    if (!form.type) errs.type = 'Property type is required';
    if (!form.price.trim()) errs.price = 'Price is required';
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setSaving(true);
    setToast(null);
    try {
      const id = property?._id || property?.id;
      await api.put(`/properties/${id}`, form);
      setToast({ type: 'success', msg: 'Property updated!' });
      setTimeout(() => {
        onSaved?.();
        onClose?.();
      }, 800);
    } catch (err) {
      setToast({ type: 'error', msg: err?.response?.data?.error || 'Failed to update property.' });
    } finally {
      setSaving(false);
    }
  };

  const inputClass =
    'text-sm bg-background border border-border rounded-lg px-3 py-2.5 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all w-full';
  const selectClass =
    'text-sm bg-background border border-border rounded-lg px-3 py-2.5 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all w-full';

  return (
    <Dialog open={!!property} onOpenChange={(open) => { if (!open) onClose?.(); }}>
      <DialogContent className="max-w-lg w-full max-h-[90vh] overflow-y-auto p-0">
        <DialogHeader className="px-5 pt-5 pb-4 border-b border-border/60">
          <DialogTitle className="text-lg font-bold">Edit Property</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 px-5 py-4">
          {/* Toast */}
          {toast && (
            <div
              className={`text-sm px-4 py-2.5 rounded-xl border font-medium ${
                toast.type === 'success'
                  ? 'bg-green-50 dark:bg-green-950/40 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800'
                  : 'bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800'
              }`}
            >
              {toast.msg}
            </div>
          )}

          {/* Title */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Title *</label>
            <input
              id="edit-prop-title"
              type="text"
              value={form.title}
              onChange={(e) => handleChange('title', e.target.value)}
              className={inputClass}
              placeholder="Property title…"
            />
            <FieldError msg={errors.title} />
          </div>

          {/* Type & Purpose */}
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Type *</label>
              <select
                id="edit-prop-type"
                value={form.type}
                onChange={(e) => handleChange('type', e.target.value)}
                className={selectClass}
              >
                <option value="">Select type</option>
                {PROPERTY_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
              <FieldError msg={errors.type} />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Purpose</label>
              <select
                id="edit-prop-purpose"
                value={form.purpose}
                onChange={(e) => handleChange('purpose', e.target.value)}
                className={selectClass}
              >
                <option value="">Select purpose</option>
                {PURPOSES.map((p) => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
          </div>

          {/* Price */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Price *</label>
            <input
              id="edit-prop-price"
              type="text"
              value={form.price}
              onChange={(e) => handleChange('price', e.target.value)}
              className={inputClass}
              placeholder="e.g. ₹45,00,000 or ₹15,000/mo"
            />
            <FieldError msg={errors.price} />
          </div>

          {/* Area */}
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Area (text)</label>
              <input
                id="edit-prop-area"
                type="text"
                value={form.area}
                onChange={(e) => handleChange('area', e.target.value)}
                className={inputClass}
                placeholder="e.g. 1200 sq ft"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Area Size</label>
              <input
                id="edit-prop-areaSize"
                type="number"
                value={form.areaSize}
                onChange={(e) => handleChange('areaSize', e.target.value)}
                className={inputClass}
                placeholder="1200"
              />
            </div>
          </div>

          {/* Locality & City */}
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Locality</label>
              <input
                id="edit-prop-locality"
                type="text"
                value={form.locality}
                onChange={(e) => handleChange('locality', e.target.value)}
                className={inputClass}
                placeholder="Locality…"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">City</label>
              <input
                id="edit-prop-city"
                type="text"
                value={form.city}
                onChange={(e) => handleChange('city', e.target.value)}
                className={inputClass}
                placeholder="City…"
              />
            </div>
          </div>

          {/* BHK / Furnishing / Bathroom */}
          <div className="grid grid-cols-3 gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">BHK</label>
              <input
                id="edit-prop-bhk"
                type="number"
                min={1}
                max={10}
                value={form.bhk}
                onChange={(e) => handleChange('bhk', e.target.value)}
                className={inputClass}
                placeholder="2"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Furnishing</label>
              <select
                id="edit-prop-furnishing"
                value={form.furnishing}
                onChange={(e) => handleChange('furnishing', e.target.value)}
                className={selectClass}
              >
                <option value="">Select</option>
                {FURNISHING_OPTIONS.map((f) => <option key={f} value={f}>{f}</option>)}
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Bathroom</label>
              <input
                id="edit-prop-bathroom"
                type="number"
                min={1}
                max={10}
                value={form.bathroom}
                onChange={(e) => handleChange('bathroom', e.target.value)}
                className={inputClass}
                placeholder="2"
              />
            </div>
          </div>

          {/* Description */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Description</label>
            <textarea
              id="edit-prop-description"
              rows={4}
              value={form.description}
              onChange={(e) => handleChange('description', e.target.value)}
              className={`${inputClass} resize-none`}
              placeholder="Describe the property…"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2 pb-1">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 flex items-center justify-center gap-2 border border-border text-foreground hover:bg-accent text-sm font-semibold py-3 rounded-xl transition-all"
            >
              <FaTimes className="h-3.5 w-3.5" />
              Cancel
            </button>
            <button
              id="edit-prop-save-btn"
              type="submit"
              disabled={saving}
              className="flex-1 flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 disabled:opacity-60 text-primary-foreground text-sm font-semibold py-3 rounded-xl transition-all shadow-sm"
            >
              {saving ? <FaSpinner className="h-4 w-4 animate-spin" /> : <FaSave className="h-4 w-4" />}
              {saving ? 'Saving…' : 'Save Changes'}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
