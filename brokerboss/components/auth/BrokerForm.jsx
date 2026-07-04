'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import {
  FaUser,
  FaBuilding,
  FaPhone,
  FaMapMarkerAlt,
  FaIdCard,
  FaClock,
  FaAlignLeft,
  FaCheckCircle,
} from 'react-icons/fa';

const initialState = {
  name: '',
  firmName: '',
  phone: '',
  city: '',
  areasOfOperation: '',
  reraNumber: '',
  yearsOfExperience: '',
  bio: '',
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

export default function BrokerForm() {
  const router = useRouter();
  const { register } = useAuth();
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const inputClass =
    'w-full rounded-lg border border-border bg-input px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors';

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Full name is required';
    if (!form.firmName.trim()) e.firmName = 'Firm / agency name is required';
    if (!form.phone.trim()) e.phone = 'Phone number is required';
    if (!form.city.trim()) e.city = 'City is required';
    if (!form.areasOfOperation.trim()) e.areasOfOperation = 'Areas of operation are required';
    if (!form.password) e.password = 'Password is required';
    else if (form.password.length < 6) e.password = 'Password must be at least 6 characters';
    if (form.password !== form.confirmPassword) e.confirmPassword = 'Passwords do not match';
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const e2 = validate();
    if (Object.keys(e2).length) { setErrors(e2); return; }
    
    const email = `${form.phone}@example.com`;
    const password = form.password;

    const res = await register('broker', { ...form, email, password });
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
        <h2 className="text-2xl font-bold">You're all set!</h2>
        <p className="text-muted-foreground">Your Broker account has been created. Redirecting…</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Full Name */}
        <FormField id="broker-name" label="Full Name *" icon={FaUser} error={errors.name}>
          <input
            id="broker-name"
            name="name"
            type="text"
            placeholder=""
            value={form.name}
            onChange={handleChange}
            className={inputClass}
            autoComplete="name"
          />
        </FormField>

        {/* Firm Name */}
        <FormField id="broker-firm" label="Firm / Agency Name *" icon={FaBuilding} error={errors.firmName}>
          <input
            id="broker-firm"
            name="firmName"
            type="text"
            placeholder=""
            value={form.firmName}
            onChange={handleChange}
            className={inputClass}
          />
        </FormField>

        {/* Phone */}
        <FormField id="broker-phone" label="Phone Number *" icon={FaPhone} error={errors.phone}>
          <input
            id="broker-phone"
            name="phone"
            type="tel"
            placeholder=""
            value={form.phone}
            onChange={handleChange}
            className={inputClass}
            autoComplete="tel"
          />
        </FormField>

        {/* City */}
        <FormField id="broker-city" label="City *" icon={FaMapMarkerAlt} error={errors.city}>
          <input
            id="broker-city"
            name="city"
            type="text"
            placeholder=""
            value={form.city}
            onChange={handleChange}
            className={inputClass}
          />
        </FormField>

        {/* Areas of Operation */}
        <FormField id="broker-areas" label="Areas of Operation *" icon={FaMapMarkerAlt} error={errors.areasOfOperation}>
          <input
            id="broker-areas"
            name="areasOfOperation"
            type="text"
            placeholder=""
            value={form.areasOfOperation}
            onChange={handleChange}
            className={inputClass}
          />
        </FormField>

        {/* RERA / License Number */}
        <FormField id="broker-rera" label="RERA / License No. (optional)" icon={FaIdCard} error={errors.reraNumber}>
          <input
            id="broker-rera"
            name="reraNumber"
            type="text"
            placeholder=""
            value={form.reraNumber}
            onChange={handleChange}
            className={inputClass}
          />
        </FormField>

        {/* Years of Experience */}
        <FormField id="broker-experience" label="Years of Experience (optional)" icon={FaClock} error={errors.yearsOfExperience}>
          <input
            id="broker-experience"
            name="yearsOfExperience"
            type="number"
            min="0"
            max="60"
            placeholder=""
            value={form.yearsOfExperience}
            onChange={handleChange}
            className={inputClass}
          />
        </FormField>

        <FormField id="broker-password" label="Password *" icon={FaCheckCircle} error={errors.password}>
          <input
            id="broker-password"
            name="password"
            type="password"
            placeholder="Min 6 characters"
            value={form.password}
            onChange={handleChange}
            className={inputClass}
          />
        </FormField>

        <FormField id="broker-confirm-password" label="Confirm Password *" icon={FaCheckCircle} error={errors.confirmPassword}>
          <input
            id="broker-confirm-password"
            name="confirmPassword"
            type="password"
            placeholder="Re-enter password"
            value={form.confirmPassword}
            onChange={handleChange}
            className={inputClass}
          />
        </FormField>
      </div>

      {/* Bio */}
      <FormField id="broker-bio" label="Brief Bio (optional)" icon={FaAlignLeft} error={errors.bio}>
        <textarea
          id="broker-bio"
          name="bio"
          rows={3}
          maxLength={300}
          placeholder=""
          value={form.bio}
          onChange={handleChange}
          className={`${inputClass} resize-none`}
        />
        <span className="text-xs text-muted-foreground self-end">{form.bio.length}/300</span>
      </FormField>

      <button
        type="submit"
        id="broker-form-submit"
        className="mt-2 w-full rounded-lg bg-primary text-primary-foreground py-3 font-semibold text-sm hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-ring"
      >
        Create Broker Account
      </button>
    </form>
  );
}
