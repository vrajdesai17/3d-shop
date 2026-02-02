import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { useSnapshot } from 'valtio';
import state from '../store';
import { getAuthHeaders } from '../store/auth';
import { getCartTotal } from '../store/cart';
import CheckoutForm from '../components/CheckoutForm';
import { fadeAnimation } from '../config/motion';

const Checkout = () => {
  const snap = useSnapshot(state);
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch publishable key
    fetch('http://localhost:8080/api/v1/payment/config')
      .then(res => res.json())
      .then(data => {
        setStripePromise(loadStripe(data.publishableKey));
      })
      .catch(err => console.error('Error loading Stripe:', err));
  }, []);

  useEffect(() => {
    if (snap.checkoutOpen && snap.isAuthenticated && snap.cart.length > 0) {
      // Create payment intent
      fetch('http://localhost:8080/api/v1/payment/create-payment-intent', {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({
          amount: getCartTotal(),
          items: snap.cart
        })
      })
        .then(res => res.json())
        .then(data => {
          setClientSecret(data.clientSecret);
          setLoading(false);
        })
        .catch(err => {
          console.error('Error creating payment intent:', err);
          setLoading(false);
        });
    }
  }, [snap.checkoutOpen, snap.isAuthenticated, snap.cart]);

  const appearance = {
    theme: 'stripe',
    variables: {
      colorPrimary: snap.color,
    },
  };

  return (
    <AnimatePresence>
      {snap.checkoutOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            {...fadeAnimation}
            onClick={() => state.checkoutOpen = false}
          />
          <motion.div
            className="fixed inset-0 m-auto w-full max-w-md h-fit glassmorphism shadow-2xl z-50 p-6 rounded-lg"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Checkout</h2>
              <button
                onClick={() => state.checkoutOpen = false}
                className="text-2xl hover:opacity-70"
              >
                ×
              </button>
            </div>

            <div className="mb-6">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Subtotal:</span>
                <span className="font-semibold">${getCartTotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Items:</span>
                <span>{snap.cart.reduce((sum, item) => sum + item.quantity, 0)}</span>
              </div>
            </div>

            {loading ? (
              <div className="text-center py-8">
                <p>Loading payment form...</p>
              </div>
            ) : clientSecret && stripePromise ? (
              <Elements stripe={stripePromise} options={{ clientSecret, appearance }}>
                <CheckoutForm clientSecret={clientSecret} />
              </Elements>
            ) : (
              <div className="text-center py-8">
                <p className="text-red-600">Failed to load payment form</p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Checkout;
