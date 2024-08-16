import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, StripeCheckout } from '@stripe/react-stripe-js';
import api from '../../api/api';

// Make sure to replace with your actual public key from Stripe
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const Payment = () => {
  const handleClick = async () => {
    try {
      const stripe = await stripePromise;
      const response = await api.post('/checkout/payment');
      const session = response.data;
      
      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (result.error) {
        console.error(result.error.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="App">
      <h1>Stripe Payment Demo</h1>
      <button onClick={handleClick}>Checkout</button>
    </div>
  );
}

export default Payment;