'use client';

import { useState, useEffect, useMemo } from 'react';
import { useAuth } from '@/context/AuthContext';
import api from '@/lib/axios';
import ProfileCompletionRing from '@/components/user/ProfileCompletionRing';
import { FaSave, FaSpinner } from 'react-icons/fa';

// ─── Role field definitions ──────────────────────────────────────────────────
const ROLE_FIELDS = {
  broker: [
    { key: 'name',               label: 'Full Name',            type: 'text' },
    { key: 'phone',              label: 'Phone Number',          type: 'tel' },
    { key: 'city',               label: 'City',                  type: 'text' },
    { key: 'firmName',           label: 'Firm / Agency Name',    type: 'text' },
    { key: 'areasOfOperation',   label: 'Areas of Operation',    type: 'text' },
    { key: 'reraNumber',         label: 'RERA Number',           type: 'text' },
    { key: 'yearsOfExperience',  label: 'Years of Experience',   type: 'number' },
    { key: 'bio',                label: 'Bio',                   type: 'textarea' },
  ],
  owner: [
    { key: 'name',         label: 'Full Name',      type: 'text' },
    { key: 'phone',        label: 'Phone Number',   type: 'tel' },
    { key: 'city',         label: 'City',           type: 'text' },
    { key: 'area',         label: 'Area / Locality', type: 'text' },
    { key: 'propertyType', label: 'Property Type',  type: 'text' },
    { key: 'description',  label: 'About',          type: 'textarea' },
  ],
  buyer: [
    { key: 'name',           label: 'Full Name',             type: 'text' },
    { key: 'phone',          label: 'Phone Number',           type: 'tel' },
    { key: 'city',           label: 'City',                  type: 'text' },
    { key: 'budgetRange',    label: 'Budget Range',           type: 'text' },
    { key: 'preferredArea',  label: 'Preferred Area',         type: 'text' },
    { key: 'notes',          label: 'Additional Notes',       type: 'textarea' },
  ],
};

// Default to buyer fields if role is unknown
const getFieldsForRole = (role) => ROLE_FIELDS[role] || ROLE_FIELDS.buyer;

// ─── Completion % calculation ─────────────────────────────────────────────────
function calcCompletion(profile, role) {
  if (!profile) return 0;
  const fields = getFieldsForRole(role);
  const total = fields.length + 1; // +1 for email (always present)
  let filled = profile.email ? 1 : 0;
  fields.forEach(({ key }) => {
    const val = profile[key];
    if (val !== null && val !== undefined && String(val).trim() !== '') filled++;
  });
  return Math.round((filled / total) * 100);
}

const roleLabels = { buyer: 'Buyer', owner: 'Owner', broker: 'Broker' };

export default function MyProfile() {
  const { userProfile, userRole, updateProfile } = useAuth();
  const fields = getFieldsForRole(userRole);

  // Initialise form from profile
  const initialForm = useMemo(() => {
    const form = {};
    fields.forEach(({ key }) => { form[key] = userProfile?.[key] ?? ''; });
    return form;
  }, [userProfile, fields]);

  const [form, setForm] = useState(initialForm);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null); // { type: 'success'|'error', msg }

  // Re-sync if profile changes externally
  useEffect(() => { setForm(initialForm); }, [initialForm]);

  const completion = useMemo(() => calcCompletion(userProfile, userRole), [userProfile, userRole]);

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    setToast(null);
    try {
      const res = await api.put('/users/profile', form);
      updateProfile(res.data);
      setToast({ type: 'success', msg: 'Profile updated successfully!' });
    } catch (err) {
      setToast({ type: 'error', msg: err?.response?.data?.error || 'Failed to save profile.' });
    } finally {
      setSaving(false);
      setTimeout(() => setToast(null), 4000);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Completion ring */}
      <div className="flex flex-col items-center py-4 border-b border-border/60">
        <ProfileCompletionRing percentage={completion} />
      </div>

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

      {/* Read-only info */}
      <div className="flex flex-col gap-1">
        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Email</label>
        <p className="text-sm text-foreground bg-muted/40 border border-border rounded-lg px-3 py-2.5 select-all">
          {userProfile?.email || '—'}
        </p>
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Role</label>
        <span className="inline-flex w-fit items-center px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20 capitalize">
          {roleLabels[userRole] || userRole || 'User'}
        </span>
      </div>

      {/* Editable role fields */}
      {fields.map(({ key, label, type }) => (
        <div key={key} className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
            {label}
          </label>
          {type === 'textarea' ? (
            <textarea
              id={`profile-field-${key}`}
              rows={3}
              value={form[key] || ''}
              onChange={(e) => handleChange(key, e.target.value)}
              className="text-sm bg-background border border-border rounded-lg px-3 py-2.5 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary resize-none transition-all"
              placeholder={`Enter ${label.toLowerCase()}…`}
            />
          ) : (
            <input
              id={`profile-field-${key}`}
              type={type}
              value={form[key] || ''}
              onChange={(e) => handleChange(key, e.target.value)}
              className="text-sm bg-background border border-border rounded-lg px-3 py-2.5 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
              placeholder={`Enter ${label.toLowerCase()}…`}
            />
          )}
        </div>
      ))}

      {/* Save button */}
      <button
        id="profile-save-btn"
        onClick={handleSave}
        disabled={saving}
        className="mt-2 flex items-center justify-center gap-2 w-full bg-primary hover:bg-primary/90 disabled:opacity-60 text-primary-foreground font-semibold text-sm px-4 py-3 rounded-xl transition-all shadow-sm"
      >
        {saving ? (
          <FaSpinner className="h-4 w-4 animate-spin" />
        ) : (
          <FaSave className="h-4 w-4" />
        )}
        {saving ? 'Saving…' : 'Save Profile'}
      </button>
    </div>
  );
}
