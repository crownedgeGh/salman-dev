'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { FaPhone, FaCheckCircle, FaLock } from 'react-icons/fa';

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

export default function LoginForm() {
  const router = useRouter();
  const { login } = useAuth();
  
  const [form, setForm] = useState({ phone: '', password: '' });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const inputClass =
    'w-full rounded-lg border border-border bg-input px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors';

  const validate = () => {
    const e = {};
    if (!form.phone.trim()) e.phone = 'Phone number is required';
    if (!form.password) e.password = 'Password is required';
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
    
    setIsLoading(true);
    const email = `${form.phone}@example.com`;
    
    const res = await login(email, form.password);
    setIsLoading(false);
    
    if (res && res.success) {
      router.push('/');
    } else {
      setErrors({ phone: res?.error || 'Invalid credentials' });
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
      <div className="flex flex-col gap-5">
        <FormField id="login-phone" label="Phone Number" icon={FaPhone} error={errors.phone}>
          <input
            id="login-phone"
            name="phone"
            type="tel"
            placeholder="Enter your 10-digit phone number"
            value={form.phone}
            onChange={handleChange}
            className={inputClass}
            autoComplete="tel"
          />
        </FormField>

        <FormField id="login-password" label="Password" icon={FaLock} error={errors.password}>
          <input
            id="login-password"
            name="password"
            type="password"
            placeholder="Enter your password"
            value={form.password}
            onChange={handleChange}
            className={inputClass}
          />
        </FormField>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full rounded-lg bg-primary text-primary-foreground py-3 font-semibold text-sm hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50"
      >
        {isLoading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
}
