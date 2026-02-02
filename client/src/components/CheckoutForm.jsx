import React, { useState } from 'react';
import {
  PaymentElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js';
import { useSnapshot } from 'valtio';
import state from '../store';
import { getAuthHeaders } from '../store/auth';
import { clearCart } from '../store/cart';
import CustomButton from './CustomButton';

const CheckoutForm = ({ clientSecret }) => {
  const snap = useSnapshot(state);
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/order-confirmation`,
      },
      redirect: 'if_required',
    });

    if (error) {
      setMessage(error.message);
      setIsLoading(false);
    } else if (paymentIntent && paymentIntent.status === 'succeeded') {
      // Payment successful! Create order in database
      try {
        const orderItems = snap.cart.map(item => ({
          product: item.productType,
          quantity: item.quantity,
          price: item.price,
          designSnapshot: {
            color: item.color,
            logoDecal: item.logoDecal,
            fullDecal: item.fullDecal,
            isLogoTexture: item.isLogoTexture,
            isFullTexture: item.isFullTexture,
          }
        }));

        const response = await fetch('http://localhost:8080/api/v1/orders', {
          method: 'POST',
          headers: getAuthHeaders(),
          body: JSON.stringify({
            items: orderItems,
            totalAmount: snap.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
            paymentInfo: {
              method: 'stripe',
              transactionId: paymentIntent.id,
              status: 'completed'
            }
          })
        });

        if (response.ok) {
          setMessage('Payment successful! Your order has been placed.');
          clearCart();
          setTimeout(() => {
            state.cartOpen = false;
            state.checkoutOpen = false;
          }, 2000);
        }
      } catch (err) {
        setMessage('Payment successful but order creation failed. Please contact support.');
      }

      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <PaymentElement />

      {message && (
        <div className={`p-4 rounded ${message.includes('successful') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {message}
        </div>
      )}

      <CustomButton
        type="filled"
        title={isLoading ? 'Processing...' : 'Pay Now'}
        handleClick={handleSubmit}
        customStyles="w-full py-3 font-bold"
      />
    </form>
  );
};

export default CheckoutForm;
