import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { styled } from '@mui/system';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import api from '../../api/api';
import '../../styles/payment.css';
import Checkout from './Check';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY); // Replace with your Stripe public key


const FormGrid = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

const PaymentForm = () => {
  const navigate = useNavigate();
  const [paymentType, setPaymentType] = React.useState('creditCard');
  const [amount, setAmount] = React.useState(5000); // Amount in cents (e.g., 50.00 USD)
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    // const {token, error} = await stripe.createToken(cardElement);
    const { paymentMethod, error } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      toast.error(error.message);
      return;
    }

    try {
      const response = await api.post('/checkout-session', {
        payment_method: paymentMethod.id,
        amount: 5000,
        currency: 'usd',
        // source: token.id,
        description: 'Payment description',
      });
      

      const result = await response.json();
      if (result.success) {
        const { client_secret } = result.paymentIntent;
  
        // Confirm the Payment Intent on the client side
        const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(client_secret);
  
        if (confirmError) {
          toast.error(confirmError.message);
        } else if (paymentIntent.status === 'succeeded') {
          toast.success('Payment successful');
          navigate('/checkout/review-order');
        } else {
          toast.error('Payment failed or requires additional action');
        }
      } else {
        toast.error(result.error);
      }
    } catch (error) {
      toast.error('An error occurred');
    }
  };

  return (
    <div>
      <Checkout />
      <div className="box-container">
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 600, margin: 'auto' }}>
      <Typography variant="h6" align='center' fontWeight='bold' marginTop='10px' gutterBottom>
        Payment Form
      </Typography>
      <FormGrid>
        <CardElement />
        <Button type="submit" variant="contained" className='button' disabled={!stripe}>
          Pay
        </Button>
      </FormGrid>
      <ToastContainer />
    </Box>
    </div>
    </div>
  );
};

const PaymentWrapper = () => (
  <Elements stripe={stripePromise}>
    <PaymentForm />
  </Elements>
);

export default PaymentWrapper;