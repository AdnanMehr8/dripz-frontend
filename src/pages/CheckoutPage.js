import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/CheckoutPage.css';
import Checkout from '../components/checkout/Check';
import AddressForm from '../components/checkout/SAddress';
import { Container } from 'react-bootstrap';
import Review from '../components/checkout/Review';
import { useNavigate } from 'react-router-dom';



const CheckoutPage = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/checkout/shipping-address')
  }
  return (
    <div >
    <Checkout />
    <div className='checkoutpage-container'>
    <p>Please fill in the fields in checkout process carefully </p>
    <button onClick={handleNavigate} class="button">Go to Shipping Address</button>
    </div>
</div>
  );
};

export default CheckoutPage;
