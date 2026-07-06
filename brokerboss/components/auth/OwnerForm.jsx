'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import {
  FaUser,
  FaPhone,
  FaMapMarkerAlt,
  FaBuilding,
  FaAlignLeft,
  FaCheckCircle,
} from 'react-icons/fa';

const PROPERTY_TYPES = ['Flat', 'House', 'Shop', 'Plot', 'Office', 'Multiples'];

const initialState = {
  name: '',
  phone: '',
  city: '',
  area: '',
  propertyType: '',
  description: '',
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

export default function OwnerForm() {
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
    if (!form.phone.trim()) e.phone = 'Phone number is required';
    if (!form.city.trim()) e.city = 'City is required';
    if (!form.area.trim()) e.area = 'Area / locality is required';
    if (!form.propertyType) e.propertyType = 'Please select a property type';
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
    
    const res = await register('owner', { ...form, email });
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
        <h2 className="text-2xl font-bold">Welcome aboard!</h2>
        <p className="text-muted-foreground">Your Owner account has been created. Redirecting…</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Full Name */}
        <FormField id="owner-name" label="Full Name *" icon={FaUser} error={errors.name}>
          <input
            id="owner-name"
            name="name"
            type="text"
            placeholder="Enter your full name"
            value={form.name}
            onChange={handleChange}
            className={inputClass}
            autoComplete="name"
          />
        </FormField>

        {/* Phone */}
        <FormField id="owner-phone" label="Phone Number *" icon={FaPhone} error={errors.phone}>
          <input
            id="owner-phone"
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
        <FormField id="owner-city" label="City *" icon={FaMapMarkerAlt} error={errors.city}>
          <input
            id="owner-city"
            name="city"
            type="text"
            placeholder=""
            value={form.city}
            onChange={handleChange}
            className={inputClass}
          />
        </FormField>

        {/* Area */}
        <FormField id="owner-area" label="Area / Locality *" icon={FaMapMarkerAlt} error={errors.area}>
          <input
            id="owner-area"
            name="area"
            type="text"
            placeholder=""
            value={form.area}
            onChange={handleChange}
            className={inputClass}
          />
        </FormField>

        {/* Property Type */}
        <FormField id="owner-property-type" label="Property Type Offered *" icon={FaBuilding} error={errors.propertyType}>
          <select
            id="owner-property-type"
            name="propertyType"
            value={form.propertyType}
            onChange={handleChange}
            className={inputClass}
          >
            <option value=""></option>
            {PROPERTY_TYPES.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </FormField>
      </div>

      {/* Description */}
      <FormField id="owner-description" label="Brief Description" icon={FaAlignLeft} error={errors.description}>
        <textarea
          id="owner-description"
          name="description"
          rows={3}
          maxLength={300}
          placeholder=""
          value={form.description}
          onChange={handleChange}
          className={`${inputClass} resize-none`}
        />
        <span className="text-xs text-muted-foreground self-end">{form.description.length}/300</span>
      </FormField>

      <button
        type="submit"
        id="owner-form-submit"
        className="mt-2 w-full rounded-lg bg-primary text-primary-foreground py-3 font-semibold text-sm hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-ring"
      >
        Create Owner Account
      </button>
    </form>
  );
}
