import * as React from 'react';
import { useState, useEffect } from 'react';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux'; // Import useSelector
import { useNavigate } from 'react-router-dom';
import Checkout from './Check';
import { Container } from 'react-bootstrap';
import api from '../../api/api';
import '../../styles/Review.css'; // Add this CSS file for custom styles

export default function Review() {
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Retrieve shipping details from Redux store
  const shippingDetails = useSelector((state) => state.checkout.checkOutShippingData);
  console.log('Customer: ', shippingDetails)

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await api.get('/cart');
        console.log('Cart items response:', response.data); // Debugging line
        if (response.data.items) {
          setCartItems(response.data.items);
        } else {
          console.error('Cart items not found in response');
        }
      } catch (error) {
        setError('No user authenticated.');
        console.error('Error fetching cart items:', error);
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
    return cartItems.reduce((total, item) => {
      return total + (item.quantity * (item.productId?.price || 0));
    }, 0).toFixed(2); 
  }

  const placeOrder = () => {
    navigate('/checkout/payment-details');
    
  }

 

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <div>
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
              <Container>
                <Typography component='h1' variant='h6' fontWeight='bold' align='center' marginBottom='15px' gutterBottom>
                  Shipment details
                </Typography>
                <Container>
                  {shippingDetails.length > 0 ? (
                    shippingDetails.map((detail, index) => (
                      <Typography key={index} gutterBottom>
                        {`${detail.firstName || 'N/A'} ${detail.lastName || 'N/A'}, ${detail.address || 'N/A'}, ${detail.city || 'N/A'}, ${detail.state || 'N/A'}, ${detail.zip || 'N/A'}, ${detail.country || 'N/A'}`}
                      </Typography>
                    ))
                  ) : (
                    <Typography>No shipping details available</Typography>
                  )}
                </Container>
              </Container>
            </div>
            <div>
              <Typography component='h1' variant='h6' fontWeight='bold' align='center' marginBottom='15px' gutterBottom>
                Payment details
              </Typography>
              <Grid container spacing={10}>
                {products.map((item) => (
                  <Grid item xs={12} sm={6} md={3} key={item._id}>
                    <Stack direction="row" spacing={2} alignItems="center" className="product-item">
                      <Typography variant="body2">
                        {item.productId?.image ? (
                          <img
                            src={item.productId.image}
                            alt={item.productId.title || 'Product Image'}
                            className="cart-item-image"
                          />
                        ) : (
                          'No image'
                        )}
                      </Typography>
                      <Stack direction="column" spacing={1}>
                        <Typography variant="body1" color="text.secondary">
                          {item.productId?.title || 'N/A'}
                        </Typography>
                        <Typography variant="body2">{item.quantity}</Typography>
                        <Typography variant="body2">
                          ${(item.quantity * item.productId?.price)?.toFixed(2) || '0.00'}
                        </Typography>
                      </Stack>
                    </Stack>
                  </Grid>
                ))}
              </Grid>
              <div className='t-total'>
                <Typography fontWeight='bold'>Total Price: ${totalPrice()}</Typography> 
              </div>
              <div className='r-button'>
                <button onClick={placeOrder} className='button'>Place Order</button>
              </div>
            </div>
          </Stack>
        </Stack>
      </div>
    </div>
  );
}
