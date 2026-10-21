'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { adminLogin } from '@/lib/api/admin.auth';
import { Eye, EyeOff } from 'lucide-react';
import SunhomSpinner from '@/components/common/SunhomSpinner';

export default function AdminLoginForm() {
  const router = useRouter();

  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await adminLogin({
        identifier,
        password,
      });

      router.push('/admin/dashboard');
    } catch {
      setError('Invalid admin credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md rounded-2xl bg-white px-6 py-8 shadow-xl sm:px-10 sm:py-12">
      {/* Brand */}
      <div className="text-center">
        <h1 className="font-playfair text-2xl sm:text-3xl text-brand-primary">
          SUNHOM
        </h1>
        <p className="mt-1 text-sm text-textMuted">
          Admin Portal
        </p>
      </div>

      <form onSubmit={submit} className="mt-8 space-y-5">
        {/* Identifier */}
        <div>
          <label className="block text-sm font-medium text-textSecondary">
            Email or Mobile Number
          </label>
          <input
            type="text"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            placeholder="contact@sunhom.in"
            required
            disabled={loading}
            className="mt-2 w-full rounded-lg border border-gray-200 bg-brand-cream px-4 py-3 text-sm
              focus:border-brand-primary focus:outline-none focus:ring-2
              focus:ring-brand-primary/20 disabled:opacity-60"
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium text-textSecondary">
            Password
          </label>

          <div className="relative mt-2">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              disabled={loading}
              className="w-full rounded-lg border border-gray-200 bg-brand-cream px-4 py-3 pr-12 text-sm
                focus:border-brand-primary focus:outline-none focus:ring-2
                focus:ring-brand-primary/20 disabled:opacity-60"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-brand-primary"
              tabIndex={-1}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        {/* Error */}
        {error && (
          <p className="text-sm text-red-600">
            {error}
          </p>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="mt-2 flex w-full items-center justify-center rounded-lg bg-brand-primary py-3
            text-sm font-medium text-white transition hover:bg-brand-primary-dark
            disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <SunhomSpinner size="xs" speed="fast" />
              Signing in...
            </span>
          ) : (
            'Sign In'
          )}
        </button>
      </form>

      <div className="mt-6 text-center text-sm text-textMuted">
        Forgot your password?{' '}
        <span className="cursor-pointer text-brand-primary hover:underline">
          Reset it here
        </span>
      </div>
    </div>
  );
}
