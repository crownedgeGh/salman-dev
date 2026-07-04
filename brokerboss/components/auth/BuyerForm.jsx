'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import {
  FaUser,
  FaPhone,
  FaMapMarkerAlt,
  FaRupeeSign,
  FaAlignLeft,
  FaCheckCircle,
  FaHome,
  FaStore,
  FaBuilding,
  FaChartArea,
  FaWarehouse,
} from 'react-icons/fa';

const PROPERTY_TYPES = [
  { id: 'flat', label: 'Flat', icon: FaBuilding },
  { id: 'house', label: 'House', icon: FaHome },
  { id: 'shop', label: 'Shop', icon: FaStore },
  { id: 'plot', label: 'Plot', icon: FaChartArea },
  { id: 'office', label: 'Office', icon: FaWarehouse },
];

const BUDGET_OPTIONS = [
  { value: 'under-20L', label: 'Under ₹20L' },
  { value: '20L-50L', label: '₹20L – ₹50L' },
  { value: '50L-1Cr', label: '₹50L – ₹1Cr' },
  { value: '1Cr-2Cr', label: '₹1Cr – ₹2Cr' },
  { value: 'above-2Cr', label: 'Above ₹2Cr' },
];

const initialProfile = {
  name: '',
  phone: '',
  city: '',
  preferredArea: '',
  budgetRange: '',
  notes: '',
  password: '',
  confirmPassword: '',
};

function FormField({ id, label, icon: Icon, error, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium text-foreground flex items-center gap-2">
        <Icon className="h-3.5 w-3.5 text-primary" />
        {label}
      </label>
      {children}
      {error && (
        <p className="text-xs text-destructive flex items-center gap-1">
          <FaCheckCircle className="h-3 w-3" /> {error}
        </p>
      )}
    </div>
  );
}

export default function BuyerForm() {
  const router = useRouter();
  const { register } = useAuth();
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [profile, setProfile] = useState(initialProfile);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const inputClass =
    'w-full rounded-lg border border-border bg-input px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors';

  const toggleType = (id) => {
    setSelectedTypes((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
    );
    if (errors.propertyTypes) setErrors((prev) => ({ ...prev, propertyTypes: '' }));
  };

  const validate = () => {
    const e = {};
    if (selectedTypes.length === 0) e.propertyTypes = 'Please select at least one property type';
    if (!profile.name.trim()) e.name = 'Full name is required';
    if (!profile.phone.trim()) e.phone = 'Phone number is required';
    if (!profile.city.trim()) e.city = 'City is required';
    if (!profile.budgetRange) e.budgetRange = 'Please select a budget range';
    if (!profile.password) e.password = 'Password is required';
    else if (profile.password.length < 6) e.password = 'Password must be at least 6 characters';
    if (profile.password !== profile.confirmPassword) e.confirmPassword = 'Passwords do not match';
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const e2 = validate();
    if (Object.keys(e2).length) { setErrors(e2); return; }
    
    const email = `${profile.phone}@example.com`;
    const password = profile.password;

    const res = await register('buyer', { ...profile, propertyTypes: selectedTypes, email, password });
    if (res && res.success) {
      setSubmitted(true);
      setTimeout(() => router.push('/'), 1200);
    } else {
      setErrors({ phone: res?.error || 'Registration failed' });
    }
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
        <FaCheckCircle className="h-14 w-14 text-primary" />
        <h2 className="text-2xl font-bold">Happy house hunting!</h2>
        <p className="text-muted-foreground">Your Buyer account is ready. Redirecting…</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
      {/* Property Type Selector */}
      <div className="flex flex-col gap-3">
        <p className="text-sm font-medium text-foreground">
          What type of property are you looking for? *
        </p>
        <div className="flex flex-wrap gap-3">
          {PROPERTY_TYPES.map(({ id, label, icon: Icon }) => {
            const selected = selectedTypes.includes(id);
            return (
              <button
                key={id}
                type="button"
                id={`buyer-type-${id}`}
                onClick={() => toggleType(id)}
                aria-pressed={selected}
                className={`flex items-center gap-2 px-4 py-2 rounded-full border-2 text-sm font-medium transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                  selected
                    ? 'border-primary bg-primary text-primary-foreground shadow-sm'
                    : 'border-border bg-muted text-muted-foreground hover:border-primary hover:text-foreground'
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                {label}
              </button>
            );
          })}
        </div>
        {errors.propertyTypes && (
          <p className="text-xs text-destructive flex items-center gap-1">
            <FaCheckCircle className="h-3 w-3" /> {errors.propertyTypes}
          </p>
        )}
      </div>

      {/* Profile Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <FormField id="buyer-name" label="Full Name *" icon={FaUser} error={errors.name}>
          <input
            id="buyer-name"
            name="name"
            type="text"
            placeholder=""
            value={profile.name}
            onChange={handleChange}
            className={inputClass}
            autoComplete="name"
          />
        </FormField>

        <FormField id="buyer-phone" label="Phone Number *" icon={FaPhone} error={errors.phone}>
          <input
            id="buyer-phone"
            name="phone"
            type="tel"
            placeholder=""
            value={profile.phone}
            onChange={handleChange}
            className={inputClass}
            autoComplete="tel"
          />
        </FormField>

        <FormField id="buyer-city" label="City *" icon={FaMapMarkerAlt} error={errors.city}>
          <input
            id="buyer-city"
            name="city"
            type="text"
            placeholder=""
            value={profile.city}
            onChange={handleChange}
            className={inputClass}
          />
        </FormField>

        <FormField id="buyer-preferred-area" label="Preferred Area (optional)" icon={FaMapMarkerAlt} error={errors.preferredArea}>
          <input
            id="buyer-preferred-area"
            name="preferredArea"
            type="text"
            placeholder=""
            value={profile.preferredArea}
            onChange={handleChange}
            className={inputClass}
          />
        </FormField>

        <FormField id="buyer-budget" label="Budget Range *" icon={FaRupeeSign} error={errors.budgetRange}>
          <select
            id="buyer-budget"
            name="budgetRange"
            value={profile.budgetRange}
            onChange={handleChange}
            className={inputClass}
          >
            <option value=""></option>
            {BUDGET_OPTIONS.map(({ value, label }) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
        </FormField>

        <FormField id="buyer-password" label="Password *" icon={FaCheckCircle} error={errors.password}>
          <input
            id="buyer-password"
            name="password"
            type="password"
            placeholder="Min 6 characters"
            value={profile.password}
            onChange={handleChange}
            className={inputClass}
          />
        </FormField>

        <FormField id="buyer-confirm-password" label="Confirm Password *" icon={FaCheckCircle} error={errors.confirmPassword}>
          <input
            id="buyer-confirm-password"
            name="confirmPassword"
            type="password"
            placeholder="Re-enter password"
            value={profile.confirmPassword}
            onChange={handleChange}
            className={inputClass}
          />
        </FormField>
      </div>

      {/* Notes */}
      <FormField id="buyer-notes" label="Additional Notes (optional)" icon={FaAlignLeft} error={errors.notes}>
        <textarea
          id="buyer-notes"
          name="notes"
          rows={3}
          maxLength={200}
          placeholder=""
          value={profile.notes}
          onChange={handleChange}
          className={`${inputClass} resize-none`}
        />
        <span className="text-xs text-muted-foreground self-end">{profile.notes.length}/200</span>
      </FormField>

      <button
        type="submit"
        id="buyer-form-submit"
        className="mt-2 w-full rounded-lg bg-primary text-primary-foreground py-3 font-semibold text-sm hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-ring"
      >
        Create Buyer Account
      </button>
    </form>
  );
}
