import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { api } from '../utils/api';
import {
  Sun,
  Moon,
  User,
  Mail,
  Camera,
  Bell,
  BellOff,
  Shield,
  Key,
  Smartphone,
  CreditCard,
  TrendingUp,
  History,
  Save,
  AlertCircle
} from 'lucide-react';
import toast from 'react-hot-toast';

const SettingsTab = () => {
  const { user, updateSubscription } = useAuth();
  const { theme, toggleTheme } = useTheme();

  // Profile settings state
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    avatar: user?.avatar || ''
  });

  // Notification settings state
  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    pushNotifications: false,
    taskReminders: true,
    weeklyReports: true,
    marketingEmails: false
  });

  // Security settings state
  const [securityData, setSecurityData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    twoFactorEnabled: false
  });

  // Form validation state
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  const handleProfileUpdate = (field, value) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleNotificationChange = (setting, value) => {
    setNotifications(prev => ({ ...prev, [setting]: value }));
  };

  const handleSecurityUpdate = (field, value) => {
    setSecurityData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateProfileForm = () => {
    const newErrors = {};
    if (!profileData.name.trim()) newErrors.name = 'Name is required';
    if (!profileData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(profileData.email)) newErrors.email = 'Email is invalid';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePasswordForm = () => {
    const newErrors = {};
    if (!securityData.currentPassword) newErrors.currentPassword = 'Current password is required';
    if (!securityData.newPassword) newErrors.newPassword = 'New password is required';
    else if (securityData.newPassword.length < 8) newErrors.newPassword = 'Password must be at least 8 characters';
    if (!securityData.confirmPassword) newErrors.confirmPassword = 'Please confirm your password';
    else if (securityData.newPassword !== securityData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveProfile = async () => {
    if (!validateProfileForm()) return;

    setSaving(true);
    try {
      const updatedUser = await api.updateUserProfile({
        name: profileData.name,
        email: profileData.email,
      });

      // Update the auth context with the new user data
      if (window.authContext && window.authContext.refreshUserProfile) {
        await window.authContext.refreshUserProfile();
      }

      toast.success('Profile updated successfully!');
    } catch (error) {
      toast.error(error.message || 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  const handleChangePassword = async () => {
    if (!validatePasswordForm()) return;

    setSaving(true);
    try {
      // Note: The API might not have a password change endpoint yet
      // This would need to be implemented in the backend
      await api.updateUserProfile({
        current_password: securityData.currentPassword,
        new_password: securityData.newPassword,
      });

      setSecurityData(prev => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      }));
      toast.success('Password changed successfully!');
    } catch (error) {
      toast.error(error.message || 'Failed to change password');
    } finally {
      setSaving(false);
    }
  };

  const handleSubscribe = async (plan) => {
    try {
      const response = await api.createCheckoutSession(plan);
      if (response.url) {
        window.location.href = response.url;
      } else {
        throw new Error('No checkout URL received');
      }
    } catch (error) {
      toast.error('Failed to create checkout session');
      console.error('Error creating checkout session:', error);
    }
  };

  return (
    <div className="space-y-8 bg-gray-50 dark:bg-gray-900 min-h-screen p-6">
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Settings</h2>

      {/* Theme Settings */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700">
        <div className="flex items-center mb-4">
          {theme === 'light' ? <Sun className="w-5 h-5 mr-3 text-yellow-500" /> : <Moon className="w-5 h-5 mr-3 text-blue-400" />}
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Appearance</h3>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-600 dark:text-gray-300">Theme</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Choose between light and dark mode</p>
          </div>
          <button
            onClick={toggleTheme}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              theme === 'dark' ? 'bg-primary' : 'bg-gray-200'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                theme === 'dark' ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
      </div>

      {/* Profile Settings */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700">
        <div className="flex items-center mb-6">
          <User className="w-5 h-5 mr-3 text-primary" />
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Profile Settings</h3>
        </div>

        <div className="space-y-6">
          {/* Avatar Section */}
          <div className="flex items-center space-x-6">
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center text-white text-2xl font-semibold">
                {profileData.avatar || profileData.name?.charAt(0) || 'U'}
              </div>
              <button className="absolute -bottom-2 -right-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white hover:bg-blue-600 transition-colors">
                <Camera className="w-4 h-4" />
              </button>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">Profile Picture</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">Upload a new avatar image</p>
            </div>
          </div>

          {/* Name Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Full Name
            </label>
            <input
              type="text"
              value={profileData.name}
              onChange={(e) => handleProfileUpdate('name', e.target.value)}
              className={`w-full px-4 py-3 border rounded-2xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary transition-all ${
                errors.name ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
              }`}
              placeholder="Enter your full name"
            />
            {errors.name && <p className="mt-1 text-sm text-red-500 flex items-center"><AlertCircle className="w-4 h-4 mr-1" />{errors.name}</p>}
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={profileData.email}
              onChange={(e) => handleProfileUpdate('email', e.target.value)}
              className={`w-full px-4 py-3 border rounded-2xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary transition-all ${
                errors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
              }`}
              placeholder="Enter your email"
            />
            {errors.email && <p className="mt-1 text-sm text-red-500 flex items-center"><AlertCircle className="w-4 h-4 mr-1" />{errors.email}</p>}
          </div>

          <button
            onClick={handleSaveProfile}
            disabled={saving}
            className="flex items-center px-6 py-3 bg-primary text-white rounded-2xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            <Save className="w-4 h-4 mr-2" />
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>

      {/* Notification Settings */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700">
        <div className="flex items-center mb-6">
          <Bell className="w-5 h-5 mr-3 text-primary" />
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Notification Preferences</h3>
        </div>

        <div className="space-y-4">
          {[
            { key: 'emailAlerts', label: 'Email Alerts', desc: 'Get notified about important updates' },
            { key: 'pushNotifications', label: 'Push Notifications', desc: 'Receive push notifications on your device' },
            { key: 'taskReminders', label: 'Task Reminders', desc: 'Reminders for upcoming and overdue tasks' },
            { key: 'weeklyReports', label: 'Weekly Reports', desc: 'Weekly summary of your productivity' },
            { key: 'marketingEmails', label: 'Marketing Emails', desc: 'Product updates and promotional content' }
          ].map(({ key, label, desc }) => (
            <div key={key} className="flex items-center justify-between py-3">
              <div className="flex-1">
                <div className="flex items-center">
                  <span className="font-medium text-gray-900 dark:text-white">{label}</span>
                  {notifications[key] ? <Bell className="w-4 h-4 ml-2 text-green-500" /> : <BellOff className="w-4 h-4 ml-2 text-gray-400" />}
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">{desc}</p>
              </div>
              <button
                onClick={() => handleNotificationChange(key, !notifications[key])}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  notifications[key] ? 'bg-green-500' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    notifications[key] ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Security Settings */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700">
        <div className="flex items-center mb-6">
          <Shield className="w-5 h-5 mr-3 text-primary" />
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Security Settings</h3>
        </div>

        <div className="space-y-6">
          {/* Password Change */}
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white mb-4 flex items-center">
              <Key className="w-4 h-4 mr-2" />
              Change Password
            </h4>
            <div className="space-y-4">
              <div>
                <input
                  type="password"
                  placeholder="Current password"
                  value={securityData.currentPassword}
                  onChange={(e) => handleSecurityUpdate('currentPassword', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-2xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary transition-all ${
                    errors.currentPassword ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                  }`}
                />
                {errors.currentPassword && <p className="mt-1 text-sm text-red-500 flex items-center"><AlertCircle className="w-4 h-4 mr-1" />{errors.currentPassword}</p>}
              </div>
              <div>
                <input
                  type="password"
                  placeholder="New password"
                  value={securityData.newPassword}
                  onChange={(e) => handleSecurityUpdate('newPassword', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-2xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary transition-all ${
                    errors.newPassword ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                  }`}
                />
                {errors.newPassword && <p className="mt-1 text-sm text-red-500 flex items-center"><AlertCircle className="w-4 h-4 mr-1" />{errors.newPassword}</p>}
              </div>
              <div>
                <input
                  type="password"
                  placeholder="Confirm new password"
                  value={securityData.confirmPassword}
                  onChange={(e) => handleSecurityUpdate('confirmPassword', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-2xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary transition-all ${
                    errors.confirmPassword ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                  }`}
                />
                {errors.confirmPassword && <p className="mt-1 text-sm text-red-500 flex items-center"><AlertCircle className="w-4 h-4 mr-1" />{errors.confirmPassword}</p>}
              </div>
              <button
                onClick={handleChangePassword}
                disabled={saving}
                className="px-6 py-3 bg-primary text-white rounded-2xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {saving ? 'Changing...' : 'Change Password'}
              </button>
            </div>
          </div>

          {/* Two-Factor Authentication */}
          <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Smartphone className="w-5 h-5 mr-3 text-gray-600 dark:text-gray-400" />
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">Two-Factor Authentication</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Add an extra layer of security to your account</p>
                </div>
              </div>
              <button
                onClick={() => handleSecurityUpdate('twoFactorEnabled', !securityData.twoFactorEnabled)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  securityData.twoFactorEnabled ? 'bg-green-500' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    securityData.twoFactorEnabled ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Subscription Management */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700">
        <div className="flex items-center mb-6">
          <CreditCard className="w-5 h-5 mr-3 text-primary" />
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Subscription Management</h3>
        </div>

        <div className="space-y-6">
          {/* Current Plan */}
          <div className="bg-gradient-to-r from-primary/10 to-accent/10 p-6 rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white capitalize">{user?.role || 'Free'} Plan</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">Current active subscription</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-primary">
                  {user?.role === 'free' ? '$0' : user?.role === 'pro' ? '$9' : '$29'}/mo
                </p>
              </div>
            </div>
          </div>

          {/* Plan Options */}
          <div className="grid md:grid-cols-3 gap-4">
            <div className={`border-2 p-4 rounded-xl transition-all ${
              user?.role === 'free' ? 'border-primary bg-primary/5' : 'border-gray-200 dark:border-gray-700'
            }`}>
              <h4 className="font-semibold text-gray-900 dark:text-white">Free</h4>
              <p className="text-2xl font-bold text-primary mb-2">$0</p>
              <ul className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                <li>• 50 tasks/month</li>
                <li>• Basic analytics</li>
                <li>• Community support</li>
              </ul>
              <button className={`w-full py-2 rounded-xl transition-all ${
                user?.role === 'free'
                  ? 'bg-gray-200 text-gray-800 cursor-default'
                  : 'bg-primary text-white hover:bg-blue-700'
              }`}>
                {user?.role === 'free' ? 'Current Plan' : 'Downgrade'}
              </button>
            </div>

            <div className={`border-2 p-4 rounded-xl transition-all ${
              user?.role === 'pro' ? 'border-primary bg-primary/5' : 'border-gray-200 dark:border-gray-700'
            }`}>
              <h4 className="font-semibold text-gray-900 dark:text-white">Pro</h4>
              <p className="text-2xl font-bold text-primary mb-2">$9</p>
              <ul className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                <li>• Unlimited tasks</li>
                <li>• Advanced analytics</li>
                <li>• Priority support</li>
              </ul>
              <button
                onClick={() => handleSubscribe('pro')}
                className={`w-full py-2 rounded-xl transition-all ${
                  user?.role === 'pro'
                    ? 'bg-gray-200 text-gray-800 cursor-default'
                    : 'bg-primary text-white hover:bg-blue-700'
                }`}
              >
                {user?.role === 'pro' ? 'Current Plan' : 'Upgrade'}
              </button>
            </div>

            <div className={`border-2 p-4 rounded-xl transition-all ${
              user?.role === 'enterprise' ? 'border-primary bg-primary/5' : 'border-gray-200 dark:border-gray-700'
            }`}>
              <h4 className="font-semibold text-gray-900 dark:text-white">Enterprise</h4>
              <p className="text-2xl font-bold text-primary mb-2">$29</p>
              <ul className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                <li>• Everything in Pro</li>
                <li>• Team collaboration</li>
                <li>• API access</li>
              </ul>
              <button
                onClick={() => handleSubscribe('enterprise')}
                className={`w-full py-2 rounded-xl transition-all ${
                  user?.role === 'enterprise'
                    ? 'bg-gray-200 text-gray-800 cursor-default'
                    : 'bg-primary text-white hover:bg-blue-700'
                }`}
              >
                {user?.role === 'enterprise' ? 'Current Plan' : 'Upgrade'}
              </button>
            </div>
          </div>

          {/* Billing History */}
          <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
            <button className="flex items-center text-primary hover:text-blue-700 transition-colors">
              <History className="w-4 h-4 mr-2" />
              View Billing History
              <TrendingUp className="w-4 h-4 ml-2" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsTab;