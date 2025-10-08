import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import toast, { Toaster } from 'react-hot-toast';

const registerSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(registerSchema),
  });
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    console.log('Submitting register form with data:', data);
    const result = await registerUser(data.email, data.password, data.firstName, data.lastName);
    console.log('Register result:', result);
    if (result.success) {
      console.log('Registration successful, navigating to /dashboard');
      toast.success('Registration successful!');
      navigate('/dashboard');
    } else {
      console.log('Registration failed:', result.error);
      toast.error(result.error || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-green-900 dark:to-blue-900 py-12 px-4 sm:px-6 lg:px-8 animate-fade-in relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-success/5 via-primary/5 to-accent/5 animate-pulse-slow"></div>
      <Toaster />
      <div className="max-w-md w-full space-y-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl p-10 rounded-3xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 relative z-10">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-success to-primary rounded-2xl mx-auto mb-6 flex items-center justify-center animate-float">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
          </div>
          <h2 className="text-4xl font-display font-extrabold bg-gradient-to-r from-success via-primary to-accent bg-clip-text text-transparent mb-2">
            Join ProdDash
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
            Create your account and start your productivity journey
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Or{' '}
            <Link to="/login" className="font-semibold text-primary hover:text-accent transition-all duration-300 hover:underline">
              sign in to existing account
            </Link>
          </p>
        </div>
        <form className="mt-8 space-y-8" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <label htmlFor="firstName" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  First Name
                </label>
                <div className="relative">
                  <input
                    {...register('firstName')}
                    id="firstName"
                    name="firstName"
                    type="text"
                    autoComplete="given-name"
                    required
                    className="appearance-none relative block w-full px-5 py-4 border-2 border-gray-200 dark:border-gray-600 placeholder-gray-400 text-gray-900 dark:text-white rounded-2xl bg-gray-50/50 dark:bg-gray-700/50 focus:outline-none focus:ring-2 focus:ring-success focus:border-success focus:bg-white dark:focus:bg-gray-800 transition-all duration-300 text-lg"
                    placeholder="Enter your first name"
                  />
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-success/5 to-primary/5 opacity-0 focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>
                {errors.firstName && <p className="text-error text-sm mt-2 animate-slide-up">{errors.firstName.message}</p>}
              </div>
              <div className="relative">
                <label htmlFor="lastName" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Last Name
                </label>
                <div className="relative">
                  <input
                    {...register('lastName')}
                    id="lastName"
                    name="lastName"
                    type="text"
                    autoComplete="family-name"
                    required
                    className="appearance-none relative block w-full px-5 py-4 border-2 border-gray-200 dark:border-gray-600 placeholder-gray-400 text-gray-900 dark:text-white rounded-2xl bg-gray-50/50 dark:bg-gray-700/50 focus:outline-none focus:ring-2 focus:ring-success focus:border-success focus:bg-white dark:focus:bg-gray-800 transition-all duration-300 text-lg"
                    placeholder="Enter your last name"
                  />
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-success/5 to-primary/5 opacity-0 focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>
                {errors.lastName && <p className="text-error text-sm mt-2 animate-slide-up">{errors.lastName.message}</p>}
              </div>
            </div>
            <div className="relative">
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Email address
              </label>
              <div className="relative">
                <input
                  {...register('email')}
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none relative block w-full px-5 py-4 border-2 border-gray-200 dark:border-gray-600 placeholder-gray-400 text-gray-900 dark:text-white rounded-2xl bg-gray-50/50 dark:bg-gray-700/50 focus:outline-none focus:ring-2 focus:ring-success focus:border-success focus:bg-white dark:focus:bg-gray-800 transition-all duration-300 text-lg"
                  placeholder="Enter your email address"
                />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-success/5 to-primary/5 opacity-0 focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
              {errors.email && <p className="text-error text-sm mt-2 animate-slide-up">{errors.email.message}</p>}
            </div>
            <div className="relative">
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  {...register('password')}
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  required
                  className="appearance-none relative block w-full px-5 py-4 pr-12 border-2 border-gray-200 dark:border-gray-600 placeholder-gray-400 text-gray-900 dark:text-white rounded-2xl bg-gray-50/50 dark:bg-gray-700/50 focus:outline-none focus:ring-2 focus:ring-success focus:border-success focus:bg-white dark:focus:bg-gray-800 transition-all duration-300 text-lg"
                  placeholder="Create a strong password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 focus:outline-none focus:text-gray-600 dark:focus:text-gray-300 z-10"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-success/5 to-primary/5 opacity-0 focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
              {errors.password && <p className="text-error text-sm mt-2 animate-slide-up">{errors.password.message}</p>}
            </div>
            <div className="relative">
              <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  {...register('confirmPassword')}
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  required
                  className="appearance-none relative block w-full px-5 py-4 pr-12 border-2 border-gray-200 dark:border-gray-600 placeholder-gray-400 text-gray-900 dark:text-white rounded-2xl bg-gray-50/50 dark:bg-gray-700/50 focus:outline-none focus:ring-2 focus:ring-success focus:border-success focus:bg-white dark:focus:bg-gray-800 transition-all duration-300 text-lg"
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 focus:outline-none focus:text-gray-600 dark:focus:text-gray-300 z-10"
                  aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
                >
                  {showConfirmPassword ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-success/5 to-primary/5 opacity-0 focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
              {errors.confirmPassword && <p className="text-error text-sm mt-2 animate-slide-up">{errors.confirmPassword.message}</p>}
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="group relative w-full flex justify-center py-5 px-6 border border-transparent text-xl font-semibold rounded-2xl text-white bg-gradient-to-r from-success via-primary to-accent hover:scale-105 hover:shadow-glow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-success transition-all duration-500 shadow-xl overflow-hidden"
            >
              <span className="relative z-10">Create Account</span>
              <div className="absolute inset-0 bg-gradient-to-r from-accent via-vibrant to-success opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;