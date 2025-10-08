import React, { useState, useEffect } from 'react';
import { api } from '../utils/api';
import toast from 'react-hot-toast';

const BillingTab = ({ onSubscribe, currentPlan = 'free' }) => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      setLoading(true);
      const response = await api.getPlans();
      // Normalize prices to ensure they are numbers without extra $
      const normalizedPlans = (response.plans || []).map(plan => ({
        ...plan,
        price: parseFloat(plan.price.toString().replace(/\$/g, '')) || 0
      }));
      setPlans(normalizedPlans);
    } catch (error) {
      toast.error('Failed to load subscription plans');
      console.error('Error fetching plans:', error);
      // Fallback to static plans if API fails
      setPlans([
        {
          id: 'free',
          name: 'Free',
          description: 'Perfect for getting started',
          price: 0,
          features: ['50 tasks/month', 'Basic analytics', 'Community support'],
        },
        {
          id: 'pro',
          name: 'Pro',
          description: 'For power users',
          price: 9,
          features: ['Unlimited tasks', 'Advanced analytics', 'Priority support', 'Custom reports'],
        },
        {
          id: 'enterprise',
          name: 'Enterprise',
          description: 'For teams',
          price: 29,
          features: ['Everything in Pro', 'Team collaboration', 'API access', 'Dedicated support'],
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Billing</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="border border-gray-200 dark:border-gray-700 p-6 rounded-lg animate-pulse">
              <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
              <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded mb-4"></div>
              <div className="space-y-2 mb-6">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
              </div>
              <div className="h-10 bg-gray-300 dark:bg-gray-600 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Billing</h2>
      <div className="grid md:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`border p-6 rounded-lg flex flex-col h-full ${
              currentPlan === plan.id
                ? 'border-primary bg-primary/5'
                : 'border-gray-200 dark:border-gray-700'
            }`}
          >
            <div className="flex-grow">
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">{plan.name}</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">{plan.description}</p>
              <p className="text-3xl font-bold text-primary mb-4">
                ${plan.price}{plan.price > 0 ? '/mo' : ''}
              </p>
              <ul className="text-sm text-gray-600 dark:text-gray-300 mb-6">
                {plan.features.map((feature, index) => (
                  <li key={index}>• {feature}</li>
                ))}
              </ul>
            </div>
            {currentPlan === plan.id ? (
              <button className="w-full bg-gray-200 text-gray-800 py-2 rounded mt-auto">Current Plan</button>
            ) : (
              <button
                onClick={() => onSubscribe(plan.id)}
                className="w-full bg-primary text-white py-2 rounded hover:bg-blue-700 mt-auto"
              >
                {plan.price === 0 ? 'Get Started' : 'Subscribe'}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BillingTab;