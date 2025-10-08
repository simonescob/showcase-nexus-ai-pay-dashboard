import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { useAuth } from '../contexts/AuthContext';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(loginSchema),
  });
  const navigate = useNavigate();
  const { login } = useAuth();

  const onSubmit = async (data) => {
    const result = await login(data.email, data.password);
    if (result.success) {
      toast.success('Login successful!');
      navigate('/dashboard');
    } else {
      toast.error(result.error || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900 dark:to-pink-900 py-12 px-4 sm:px-6 lg:px-8 animate-fade-in relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-accent/5 to-vibrant/5 animate-pulse-slow"></div>
      <Toaster />
      <div className="max-w-md w-full space-y-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl p-10 rounded-3xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 relative z-10">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-primary to-accent rounded-2xl mx-auto mb-6 flex items-center justify-center animate-float">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          {/* <h2 className="text-4xl font-display font-extrabold bg-gradient-to-r from-primary via-accent to-vibrant bg-clip-text text-transparent mb-2">
            Welcome Back
          </h2> */}
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
            Sign in to your ProdDash account
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Or{' '}
            <Link to="/register" className="font-semibold text-primary hover:text-accent transition-all duration-300 hover:underline">
              create a new account
            </Link>
          </p>
        </div>
        <form className="mt-8 space-y-8" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-6">
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
                  className="appearance-none relative block w-full px-5 py-4 border-2 border-gray-200 dark:border-gray-600 placeholder-gray-400 text-gray-900 dark:text-white rounded-2xl bg-gray-50/50 dark:bg-gray-700/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary focus:bg-white dark:focus:bg-gray-800 transition-all duration-300 text-lg"
                  placeholder="Enter your email address"
                />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/5 to-accent/5 opacity-0 focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
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
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none relative block w-full px-5 py-4 border-2 border-gray-200 dark:border-gray-600 placeholder-gray-400 text-gray-900 dark:text-white rounded-2xl bg-gray-50/50 dark:bg-gray-700/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary focus:bg-white dark:focus:bg-gray-800 transition-all duration-300 text-lg"
                  placeholder="Enter your password"
                />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/5 to-accent/5 opacity-0 focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
              {errors.password && <p className="text-error text-sm mt-2 animate-slide-up">{errors.password.message}</p>}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm">
              <a href="#" className="font-semibold text-primary hover:text-accent transition-all duration-300 hover:underline">
                Forgot your password?
              </a>
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="group relative w-full flex justify-center py-5 px-6 border border-transparent text-xl font-semibold rounded-2xl text-white bg-gradient-to-r from-primary via-accent to-primary hover:scale-105 hover:shadow-glow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-500 shadow-xl overflow-hidden"
            >
              <span className="relative z-10">Sign In</span>
              <div className="absolute inset-0 bg-gradient-to-r from-accent via-vibrant to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;