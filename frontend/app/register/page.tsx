'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Mail, Lock, User, CheckCircle } from 'lucide-react';
import api from '@/lib/api';
import { setToken } from '@/lib/auth';

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = 'Passwords do not match';
    if (!agreed) newErrors.terms = 'You must agree to terms';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    try {
      await api.post('/api/auth/register', {
        email: formData.email,
        full_name: formData.name,
        password: formData.password,
      });
      const loginResponse = await api.post('/api/auth/login', {
        email: formData.email,
        password: formData.password,
      });
      setToken(loginResponse.data.access_token);
      router.push('/dashboard');
    } catch (error: unknown) {
      const message =
        error instanceof Error
          ? error.message
          : 'Registration failed';
      setErrors({
        server: message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-8 shadow-xl">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent mb-2">
              Join GK Trader
            </h1>
            <p className="text-gray-400">Start trading professionally today</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {errors.server && <p className="text-sm text-red-500">{errors.server}</p>}
            <div className="relative">
              <Input
                label="Full Name"
                type="text"
                name="name"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
                error={errors.name}
              />
              <User className="absolute right-3 top-9 text-gray-500" size={20} />
            </div>

            <div className="relative">
              <Input
                label="Email Address"
                type="email"
                name="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
              />
              <Mail className="absolute right-3 top-9 text-gray-500" size={20} />
            </div>

            <div className="relative">
              <Input
                label="Password"
                type="password"
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                error={errors.password}
              />
              <Lock className="absolute right-3 top-9 text-gray-500" size={20} />
            </div>

            <div className="relative">
              <Input
                label="Confirm Password"
                type="password"
                name="confirmPassword"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={handleChange}
                error={errors.confirmPassword}
              />
              <CheckCircle className="absolute right-3 top-9 text-gray-500" size={20} />
            </div>

            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="w-4 h-4 rounded bg-gray-800 border-gray-700 mt-1"
              />
              <span className="text-sm text-gray-400">
                I agree to the{' '}
                <Link href="#" className="text-blue-500 hover:text-blue-400">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link href="#" className="text-blue-500 hover:text-blue-400">
                  Privacy Policy
                </Link>
              </span>
            </label>
            {errors.terms && <p className="text-xs text-red-500">{errors.terms}</p>}

            <Button variant="primary" size="lg" className="w-full" disabled={loading}>
              {loading ? 'Creating account…' : 'Create Account'}
            </Button>
          </form>

          <p className="mt-6 text-center text-gray-400">
            Already have an account?{' '}
            <Link href="/login" className="text-blue-500 hover:text-blue-400 font-semibold">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
