'use client';

import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import api from '@/lib/axios';
import ProfileCompletionRing from '@/components/user/ProfileCompletionRing';
import {
  FaArrowLeft,
  FaSave,
  FaSpinner,
  FaCheckCircle,
  FaExclamationCircle,
} from 'react-icons/fa';

// ─── Role field definitions ───────────────────────────────────────────────────
const ROLE_FIELDS = {
  broker: [
    { key: 'name',              label: 'Full Name',          type: 'text',     required: true },
    { key: 'phone',             label: 'Phone Number',        type: 'tel',      required: true },
    { key: 'city',              label: 'City',                type: 'text',     required: false },
    { key: 'firmName',          label: 'Firm / Agency Name',  type: 'text',     required: false },
    { key: 'areasOfOperation',  label: 'Areas of Operation',  type: 'text',     required: false, hint: 'e.g. Shankar Nagar, Telibandha, Pandri' },
    { key: 'reraNumber',        label: 'RERA Number',         type: 'text',     required: false },
    { key: 'yearsOfExperience', label: 'Years of Experience', type: 'number',   required: false },
    { key: 'bio',               label: 'Bio / About You',     type: 'textarea', required: false, hint: 'Tell buyers about yourself' },
  ],
  owner: [
    { key: 'name',         label: 'Full Name',      type: 'text',     required: true },
    { key: 'phone',        label: 'Phone Number',   type: 'tel',      required: true },
    { key: 'city',         label: 'City',           type: 'text',     required: false },
    { key: 'area',         label: 'Locality / Area', type: 'text',    required: false },
    { key: 'propertyType', label: 'Property Type',  type: 'text',     required: false, hint: 'e.g. House, Flat, Plot' },
    { key: 'description',  label: 'About',          type: 'textarea', required: false },
  ],
  buyer: [
    { key: 'name',          label: 'Full Name',       type: 'text',     required: true },
    { key: 'phone',         label: 'Phone Number',    type: 'tel',      required: true },
    { key: 'city',          label: 'City',            type: 'text',     required: false },
    { key: 'budgetRange',   label: 'Budget Range',    type: 'text',     required: false, hint: 'e.g. 20L – 50L' },
    { key: 'preferredArea', label: 'Preferred Area',  type: 'text',     required: false },
    { key: 'notes',         label: 'Additional Notes', type: 'textarea', required: false },
  ],
};

const roleLabels = { buyer: 'Buyer', owner: 'Owner', broker: 'Broker' };

function getFieldsForRole(role) {
  return ROLE_FIELDS[role] || ROLE_FIELDS.buyer;
}

function calcCompletion(profile, role) {
  if (!profile) return 0;
  const fields = getFieldsForRole(role);
  const total = fields.length + 1; // +1 for email
  let filled = profile.email ? 1 : 0;
  fields.forEach(({ key }) => {
    const val = profile[key];
    if (val !== null && val !== undefined && String(val).trim() !== '') filled++;
  });
  return Math.round((filled / total) * 100);
}

// ─── Field component ──────────────────────────────────────────────────────────
function FormField({ field, value, onChange }) {
  const inputClass =
    'w-full text-sm bg-background border border-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all';

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-bold text-muted-foreground uppercase tracking-wide flex items-center gap-1">
        {field.label}
        {field.required && <span className="text-red-400">*</span>}
      </label>
      {field.type === 'textarea' ? (
        <textarea
          id={`profile-${field.key}`}
          rows={3}
          value={value || ''}
          onChange={(e) => onChange(field.key, e.target.value)}
          placeholder={field.hint || `Enter ${field.label.toLowerCase()}…`}
          className={`${inputClass} resize-none`}
        />
      ) : (
        <input
          id={`profile-${field.key}`}
          type={field.type}
          value={value || ''}
          onChange={(e) => onChange(field.key, e.target.value)}
          placeholder={field.hint || `Enter ${field.label.toLowerCase()}…`}
          className={inputClass}
        />
      )}
    </div>
  );
}

// ─── Toast ────────────────────────────────────────────────────────────────────
function Toast({ toast }) {
  if (!toast) return null;
  const isSuccess = toast.type === 'success';
  return (
    <div
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-lg border text-sm font-semibold transition-all ${
        isSuccess
          ? 'bg-green-50 dark:bg-green-950/80 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800'
          : 'bg-red-50 dark:bg-red-950/80 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800'
      }`}
    >
      {isSuccess
        ? <FaCheckCircle className="h-4 w-4 shrink-0" />
        : <FaExclamationCircle className="h-4 w-4 shrink-0" />}
      {toast.msg}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function MyProfilePage() {
  const { isLoggedIn, authLoading, userRole, userProfile, updateProfile } = useAuth();
  const router = useRouter();

  const fields = getFieldsForRole(userRole);

  // Build initial form from profile
  const initialForm = useMemo(() => {
    const form = {};
    fields.forEach(({ key }) => { form[key] = userProfile?.[key] ?? ''; });
    return form;
  }, [userProfile, fields]);

  const [form, setForm] = useState(initialForm);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);

  // Re-sync if profile refreshes
  useEffect(() => { setForm(initialForm); }, [initialForm]);

  // Redirect if not logged in (wait for auth check to finish first)
  useEffect(() => {
    if (!authLoading && !isLoggedIn) router.push('/login');
  }, [authLoading, isLoggedIn, router]);

  const completion = useMemo(() => calcCompletion(userProfile, userRole), [userProfile, userRole]);

  if (authLoading) return null; // wait — don't flash redirect

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const showToast = (type, msg) => {
    setToast({ type, msg });
    setTimeout(() => setToast(null), 4000);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await api.put('/users/profile', form);
      updateProfile(res.data);
      showToast('success', 'Profile updated successfully!');
    } catch (err) {
      showToast('error', err?.response?.data?.error || 'Failed to save profile.');
    } finally {
      setSaving(false);
    }
  };

  if (!isLoggedIn) return null;

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* ── Page Header ───────────────────────────────── */}
      <div className="border-b border-border/60 bg-background/95 backdrop-blur-sm sticky top-16 z-30">
        <div className="container mx-auto px-4 md:px-6 max-w-2xl py-4 flex items-center gap-3">
          <button
            onClick={() => router.back()}
            className="h-9 w-9 rounded-xl border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-accent transition-all"
          >
            <FaArrowLeft className="h-3.5 w-3.5" />
          </button>
          <div>
            <h1 className="text-lg font-extrabold text-foreground">My Profile</h1>
            <p className="text-xs text-muted-foreground capitalize">
              {roleLabels[userRole] || 'User'} account
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 max-w-2xl py-6 md:py-8 flex flex-col gap-6">

        {/* ── Profile Completion Card ─────────────────── */}
        <div className="bg-card border border-border/60 rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-6">
          <ProfileCompletionRing percentage={completion} />
          <div className="flex-1 text-center sm:text-left">
            <p className="font-bold text-foreground text-base">
              {completion < 50
                ? 'Your profile needs attention'
                : completion < 80
                ? 'Almost there!'
                : 'Great profile!'}
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              {completion < 100
                ? `Fill in all fields to reach 100% — complete profiles get more enquiries`
                : 'Your profile is fully complete. Buyers can see all your details.'}
            </p>
            {/* Mini progress bar */}
            <div className="mt-3 h-1.5 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{
                  width: `${completion}%`,
                  backgroundColor: completion >= 80 ? '#22c55e' : completion >= 40 ? '#f59e0b' : '#ef4444',
                }}
              />
            </div>
          </div>
        </div>

        {/* ── Read-only Info ──────────────────────────── */}
        <div className="bg-card border border-border/60 rounded-2xl p-5 flex flex-col gap-4">
          <h2 className="text-sm font-bold text-foreground">Account Info</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-muted-foreground uppercase tracking-wide">Email</label>
              <p className="text-sm text-foreground bg-muted/40 border border-border rounded-xl px-4 py-3 select-all break-all">
                {userProfile?.email || '—'}
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-muted-foreground uppercase tracking-wide">Role</label>
              <div className="flex items-center h-[46px]">
                <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-semibold bg-primary/10 text-primary border border-primary/20 capitalize">
                  {roleLabels[userRole] || userRole || 'User'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Editable Fields ─────────────────────────── */}
        <div className="bg-card border border-border/60 rounded-2xl p-5 flex flex-col gap-4">
          <h2 className="text-sm font-bold text-foreground">
            {roleLabels[userRole] || 'User'} Details
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {fields.map((field) => (
              <div
                key={field.key}
                className={field.type === 'textarea' ? 'sm:col-span-2' : ''}
              >
                <FormField
                  field={field}
                  value={form[field.key]}
                  onChange={handleChange}
                />
              </div>
            ))}
          </div>
        </div>

        {/* ── Save Button (sticky on mobile) ──────────── */}
        <div className="fixed bottom-0 left-0 right-0 sm:static bg-background/95 sm:bg-transparent backdrop-blur-sm sm:backdrop-blur-none border-t sm:border-0 border-border/60 px-4 py-4 sm:px-0 sm:py-0 z-40">
          <div className="max-w-2xl mx-auto">
            <button
              id="profile-save-btn"
              onClick={handleSave}
              disabled={saving}
              className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 disabled:opacity-60 text-primary-foreground font-bold text-sm px-6 py-4 rounded-2xl transition-all shadow-md hover:shadow-lg"
            >
              {saving ? (
                <FaSpinner className="h-4 w-4 animate-spin" />
              ) : (
                <FaSave className="h-4 w-4" />
              )}
              {saving ? 'Saving changes…' : 'Save Profile'}
            </button>
          </div>
        </div>
      </div>

      {/* Toast notification */}
      <Toast toast={toast} />
    </div>
  );
}
