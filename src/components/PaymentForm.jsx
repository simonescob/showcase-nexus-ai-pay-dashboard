import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import toast from 'react-hot-toast';
import { api } from '../utils/api';
import { useAuth } from '../contexts/AuthContext';

const PaymentForm = ({ plan, onSuccess, onCancel }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { user, refreshUserProfile, updateSubscription } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Get user email from auth context
      const userEmail = user?.email;
      if (!userEmail) {
        throw new Error('User email not found. Please log in again.');
      }

      // Create payment method
      const { error: methodError, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: elements.getElement(CardElement),
      });

      if (methodError) {
        setError(methodError.message);
        setLoading(false);
        return;
      }

      // Call API to create payment intent and confirm payment
      const formattedPrice = parseFloat(plan.price.toFixed(2));
      const data = await api.createPaymentIntent(plan.id, formattedPrice * 100, paymentMethod.id, userEmail);

      if (data.status === 'succeeded') {
        toast.success('Payment successful! Subscription activated.');
        // Update subscription_tier in user
        updateSubscription(plan.id);
        onSuccess(plan.id);
        // Refresh user data after successful payment to update plan and subscription status
        try {
          await refreshUserProfile();
        } catch (error) {
          console.error('Failed to refresh user data:', error);
        }
      } else if (data.status === 'requires_action') {
        // Handle 3D Secure or additional authentication
        const { error: confirmError } = await stripe.confirmCardPayment(data.client_secret);
        if (confirmError) {
          throw new Error(confirmError.message || 'Payment authentication failed');
        } else {
          toast.success('Payment successful! Subscription activated.');
          // Update subscription_tier in user
          updateSubscription(plan.id);
          onSuccess(plan.id);
          // Refresh user data
          try {
            await refreshUserProfile();
          } catch (error) {
            console.error('Failed to refresh user data:', error);
          }
        }
      } else if (data.status === 'requires_payment_method') {
        toast.error('Payment method was declined. Please try a different card.');
        throw new Error('Payment method was declined. Please try a different card.');
      } else if (data.status === 'failed') {
        toast.error('Payment failed. Please try again.');
        throw new Error('Payment failed. Please try again.');
      } else if (data.status === 'canceled') {
        toast.error('Payment was canceled.');
        throw new Error('Payment was canceled.');
      } else {
        toast.error(`Payment ${data.status}. Please try again or contact support.`);
        throw new Error(`Payment ${data.status}. Please try again or contact support.`);
      }
    } catch (error) {
      console.error('Payment error:', error);
      setError(error.message);
      toast.error('Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const cardStyle = {
    style: {
      base: {
        fontSize: '16px',
        color: '#424770',
        '::placeholder': {
          color: '#aab7c4',
        },
      },
      invalid: {
        color: '#9e2146',
      },
    },
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg max-w-md w-full mx-4">
        <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
          Subscribe to {plan.name}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          ${plan.price.toFixed(2)}/month
        </p>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Card Information
            </label>
            <div className="border border-gray-300 dark:border-gray-600 rounded-md p-3">
              <CardElement options={{ ...cardStyle, hidePostalCode: true }} />
            </div>
          </div>

          {error && (
            <div className="mb-4 text-red-600 text-sm">
              {error}
            </div>
          )}

          <div className="flex space-x-3">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 bg-gray-200 text-gray-800 py-2 rounded hover:bg-gray-300"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-primary text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
              disabled={!stripe || loading}
            >
              {loading ? 'Processing...' : `Pay $${plan.price.toFixed(2)}`}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PaymentForm;