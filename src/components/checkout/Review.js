import React, { useState, useEffect } from 'react';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux'; // Import useSelector
import { useNavigate } from 'react-router-dom';
import Checkout from './Check';
import api from '../../api/api';
import '../../styles/Review.css'; 
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

export default function Review() {
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Retrieve shipping details from Redux store
  const shippingDetails = useSelector((state) => state.checkout.checkOutShippingData);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await api.get('/cart');
        if (response.data.items) {
          setCartItems(response.data.items);
        } else {
          console.error('Cart items not found in response');
        }
      } catch (error) {
        setError('Error fetching cart items. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, []);

  useEffect(() => {
    setProducts(cartItems);
  }, [cartItems]);

  const totalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.quantity * (item.productId?.price || 0)), 0).toFixed(2); 
  }

  const handleClick = async () => {
    try {
      const stripe = await stripePromise;
      const response = await api.post('/checkout/payment');
      const session = response.data;

      const result = await stripe.redirectToCheckout({ sessionId: session.id });

      if (result.error) {
        console.error(result.error.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  if (loading) return <Typography align="center">Loading...</Typography>;
  if (error) return <Typography align="center" color="error">{error}</Typography>;

  return (
    <div className="review-container">
      <Checkout />
      <div className='r-container'>
        <Stack spacing={2}>
          <Stack
            direction="column"
            divider={<Divider flexItem />}
            spacing={2}
            sx={{ my: 2 }}
          >
            <div>
              <Typography component='h1' variant='h6' fontWeight='bold' align='center' marginBottom='15px'>
                Shipment Details
              </Typography>
              {shippingDetails.length > 0 ? (
                shippingDetails.map((detail, index) => (
                  <Typography key={index} gutterBottom>
                    {`${detail.firstName || 'N/A'} ${detail.lastName || 'N/A'}, ${detail.address || 'N/A'}, ${detail.city || 'N/A'}, ${detail.state || 'N/A'}, ${detail.zip || 'N/A'}, ${detail.country || 'N/A'}`}
                  </Typography>
                ))
              ) : (
                <Typography>No shipping details available</Typography>
              )}
            </div>
            <div className='seperator'></div>
            <div>
              <Typography component='h1' variant='h6' fontWeight='bold' align='center' marginBottom='15px'>
                Payment Details
              </Typography>
              <Grid className='product-review-grid' container spacing={7}>
                {products.map((item) => (
                  <Grid item xs={12} sm={6} md={4} key={item._id}>
                    <Stack direction="row" spacing={2} alignItems="center" className="product-item">
                      {item.productId?.image ? (
                        <img
                          src={item.productId.image}
                          alt={item.productId.title || 'Product Image'}
                          className="cart-item-image"
                        />
                      ) : (
                        <Typography>No image</Typography>
                      )}
                      <Stack direction="column" spacing={1}>
                        <Typography variant="body1" color="text.secondary">
                          {item.productId?.title || 'N/A'}
                        </Typography>
                        <Typography variant="body2">Quantity: {item.quantity}</Typography>
                        <Typography variant="body2">
                          Price: ${(item.quantity * item.productId?.price)?.toFixed(2) || '0.00'}
                        </Typography>
                      </Stack>
                    </Stack>
                  </Grid>
                ))}
              </Grid>
              <div className='t-total'>
                <Typography>Total Price: ${totalPrice()}</Typography> 
              </div>
              <div className='r-button'>
                <button onClick={handleClick} className='button'>Place Order</button>
              </div>
            </div>
          </Stack>
        </Stack>
      </div>
    </div>
  );
}
