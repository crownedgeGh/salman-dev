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
  FaEdit,
  FaCamera,
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
  const total = fields.length + 1; // +1 for the profile picture
  let filled = 0;
  
  fields.forEach(({ key }) => {
    const val = profile[key];
    if (val !== null && val !== undefined && String(val).trim() !== '') filled++;
  });
  const hasValidImage = (img) => {
    if (!img || typeof img !== 'string' || img.trim() === '' || img === '[object File]') return false;
    
    const dummyDomains = [
      'unsplash.com', 'ui-avatars.com', 'default', 
      'cloudflare-ipfs.com', 'avatars.githubusercontent.com', 
      'fakerapi.it', 'loremflickr.com', 'picsum.photos',
      'dummyimage.com', 'placehold.co', 'placekitten.com'
    ];
    
    if (dummyDomains.some(domain => img.toLowerCase().includes(domain))) {
      return false;
    }
    
    return true;
  };

  if (hasValidImage(profile.passportPhoto) || hasValidImage(profile.image)) {
    filled++;
  }
  
  return Math.round((filled / total) * 100);
}

// ─── Field component ──────────────────────────────────────────────────────────
function FormField({ field, value, onChange, disabled }) {
  const inputClass =
    'w-full text-sm bg-background border border-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all disabled:opacity-60 disabled:bg-muted/30 disabled:cursor-not-allowed';

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
          disabled={disabled}
        />
      ) : (
        <input
          id={`profile-${field.key}`}
          type={field.type}
          value={value || ''}
          onChange={(e) => onChange(field.key, e.target.value)}
          placeholder={field.hint || `Enter ${field.label.toLowerCase()}…`}
          className={inputClass}
          disabled={disabled}
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
  const [imageUploading, setImageUploading] = useState(false);
  const [toast, setToast] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

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
      setIsEditing(false);
    } catch (err) {
      showToast('error', err?.response?.data?.error || 'Failed to save profile.');
    } finally {
      setSaving(false);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      showToast('error', 'Image size should be less than 5MB');
      return;
    }

    const reader = new FileReader();
    reader.onload = async (event) => {
      const base64 = event.target.result;
      setForm(prev => ({ ...prev, passportPhoto: base64 }));
      try {
        setImageUploading(true);
        const res = await api.put('/users/profile', { passportPhoto: base64 });
        updateProfile(res.data);
        showToast('success', 'Profile picture updated successfully!');
      } catch (err) {
        showToast('error', 'Failed to upload profile picture.');
      } finally {
        setImageUploading(false);
      }
    };
    reader.readAsDataURL(file);
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
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-foreground">Account Info</h2>
          </div>
          
          <div className="flex items-center gap-5 mb-2">
            <div className="relative group shrink-0">
              <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-border shadow-sm bg-muted">
                <img 
                  src={((userProfile?.passportPhoto && userProfile.passportPhoto !== '[object File]') ? userProfile.passportPhoto : ((userProfile?.image && userProfile.image !== '[object File]') ? userProfile.image : `https://ui-avatars.com/api/?name=${encodeURIComponent(userProfile?.name || 'User')}&background=e2e8f0&color=475569`))} 
                  alt="Profile" 
                  onError={(e) => { e.target.onerror = null; e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(userProfile?.name || 'User')}&background=e2e8f0&color=475569`; }}
                  className={`w-full h-full object-cover object-top transition-opacity ${imageUploading ? 'opacity-50' : 'opacity-100'}`}
                />
                {imageUploading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-background/50 backdrop-blur-[2px]">
                    <FaSpinner className="w-6 h-6 animate-spin text-primary" />
                  </div>
                )}
              </div>
              <label className={`absolute bottom-0 right-0 bg-primary text-primary-foreground p-1.5 rounded-full cursor-pointer transition-transform shadow-md flex items-center justify-center ${imageUploading ? 'opacity-50 pointer-events-none' : 'hover:scale-110 hover:bg-primary/90'}`}>
                <FaCamera className="w-3.5 h-3.5" />
                <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} disabled={saving || imageUploading} />
              </label>
            </div>
            <div>
              <p className="font-bold text-lg text-foreground">{userProfile?.name || 'User'}</p>
              <p className="text-sm text-muted-foreground capitalize">{roleLabels[userRole] || userRole || 'User'}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-border/40 pt-4">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-muted-foreground uppercase tracking-wide">Mobile Number</label>
              <p className="text-sm text-foreground bg-muted/40 border border-border rounded-xl px-4 py-3 select-all break-all">
                {userProfile?.phone || '—'}
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
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-foreground">
              {roleLabels[userRole] || 'User'} Details
            </h2>
            <button 
              onClick={() => setIsEditing(!isEditing)} 
              className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-2 text-xs font-bold ${isEditing ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground hover:bg-foreground hover:text-background'}`}
            >
              <FaEdit className="w-3.5 h-3.5" />
              {isEditing ? 'Cancel Edit' : 'Edit'}
            </button>
          </div>

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
                  disabled={!isEditing}
                />
              </div>
            ))}
          </div>
        </div>

        {/* ── Save Button (sticky on mobile) ──────────── */}
        {isEditing && (
          <div className="fixed bottom-0 left-0 right-0 sm:static bg-background/95 sm:bg-transparent backdrop-blur-sm sm:backdrop-blur-none border-t sm:border-0 border-border/60 px-4 py-4 sm:px-0 sm:py-0 z-40 animate-in slide-in-from-bottom-2">
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
        )}
      </div>

      {/* Toast notification */}
      <Toast toast={toast} />
    </div>
  );
}
