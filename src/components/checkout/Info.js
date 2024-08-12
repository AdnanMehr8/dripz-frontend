import * as React from 'react';
import PropTypes from 'prop-types';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { useState, useEffect } from 'react';
import api from '../../api/api';

// const products = [
//   {
//     name: 'Professional plan',
//     desc: 'Monthly subscription',
//     price: '$15.00',
//   },
//   {
//     name: 'Dedicated support',
//     desc: 'Included in the Professional plan',
//     price: 'Free',
//   },
//   {
//     name: 'Hardware',
//     desc: 'Devices needed for development',
//     price: '$69.99',
//   },
//   {
//     name: 'Landing page template',
//     desc: 'License',
//     price: '$49.99',
//   },
// ];

function Info() {
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;
  return (
    <React.Fragment>
      <Typography variant="subtitle2" color="text.secondary">
        Total
      </Typography>
      <Typography variant="h4" gutterBottom>
        ${totalPrice()}
        
      </Typography>
      <List disablePadding>
        {products.map((item) => (
          <ListItem key={item._id} sx={{ py: 1, px: 0 }}>
            <ListItemText
              sx={{ mr: 2 }}
              primary= {item.productId?.title || 'N/A'}
              secondary={item.quantity}
            />
            <Typography variant="body1" fontWeight="medium">
            ${(item.quantity * item.productId?.price)?.toFixed(2) || '0.00'}
            </Typography>
          </ListItem>
        ))}
      </List>
    </React.Fragment>
  );
}

// Info.propTypes = {
//   totalPrice: PropTypes.string.isRequired,

// };

export default Info;