'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AuthPage() {
  const router = useRouter();
  const [isSignup, setIsSignup] = useState(false);
  const [form, setForm] = useState({ email: '', password: '', name: '', role: 'user' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (isSignup) {
      // Sign up request
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const err = await res.json();
        setError(err.error || 'Failed to sign up');
        return;
      }

      // Sign in immediately after signup
      await signIn('credentials', {
        email: form.email,
        password: form.password,
        callbackUrl: '/',
      });
    } else {
      const res = await signIn('credentials', {
        email: form.email,
        password: form.password,
        redirect: false,
      });

      if (res?.error) {
        setError('Invalid credentials');
      } else {
        router.push('/');
      }
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">{isSignup ? 'Sign Up' : 'Sign In'}</h2>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        {isSignup && (
          <>
            <input
              name="name"
              placeholder="Name"
              value={form.name}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
            
          </>
        )}

        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded"
        >
          {isSignup ? 'Sign Up' : 'Sign In'}
        </button>
      </form>

      <p className="mt-4 text-sm text-center">
        {isSignup ? 'Already have an account?' : 'New user?'}{' '}
        <button
          onClick={() => setIsSignup(!isSignup)}
          className="text-blue-600 underline"
        >
          {isSignup ? 'Sign In' : 'Sign Up'}
        </button>
      </p>
    </div>
  );
}
