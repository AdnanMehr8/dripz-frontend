import React, { useEffect, useState } from 'react';
import { Container, Table, Button, Alert, Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCartItem, fetchAllCartItems, resetCartState, updateCartItem } from '../redux/cartSlice';
import '../styles/CartPage.css'; // Assuming you have a CSS file for custom styles
import { debounce } from 'lodash';

const CartPage = () => {
  const dispatch = useDispatch();
  const { cartItems, status, error, cartStatus } = useSelector((state) => state.cartItems);
  const [isCheckoutDisabled, setIsCheckoutDisabled] = useState(true);

  useEffect(() => {
    dispatch(fetchAllCartItems());
    // dispatch(resetCartState());
  }, [dispatch]);
  
  useEffect(() => {
    setIsCheckoutDisabled(cartItems.length === 0)
  }, [cartItems]);

  const debouncedUpdateQuantity = debounce((productId, quantity) => {
    dispatch(updateCartItem({ productId, quantity }));
  }, 300);

  const handleQuantityChange = (productId, newQuantity) => {
    const quantity = parseInt(newQuantity, 10);
    if (quantity > 0) {
      // Optimistic update
      const updatedItems = cartItems.map(item =>
        item.productId._id === productId ? { ...item, quantity } : item
      );
      dispatch({ type: 'cartitems/optimisticUpdate', payload: updatedItems });
      debouncedUpdateQuantity(productId, quantity);
    }
  };

  const handleDelete = (productId) => {
    dispatch(deleteCartItem(productId))
      .unwrap()
      .then(() => {
        // Item successfully deleted
        console.log('Item removed from cart');
      })
      .catch((error) => {
        // Handle any errors
        console.error('Failed to remove item:', error);
      });
  };

  return (
    <Container className="cart-page-container">
      <h2 className="cart-heading">Your Cart</h2>
      {status === 'loading' && <Spinner animation="border" className="loading-spinner" />}
      {status === 'failed' && <Alert variant="danger">Error: {error}</Alert>}
      {cartStatus && <Alert variant="info">{cartStatus}</Alert>}
      <Table striped bordered hover className="cart-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Product</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Total</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(cartItems) && cartItems.length > 0 ? (
            cartItems.map(item => (
              <tr key={item._id}>
                <td>
                  {item.productId && item.productId.image ? (
                    <img
                      src={item.productId.image}
                      alt={item.productId.title || 'Product Image'}
                      className="cart-item-image"
                    />
                  ) : (
                    'No image'
                  )}
                </td>
                <td>{item.productId && item.productId.title ? item.productId.title : 'N/A'}</td>
                <td>
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => handleQuantityChange(item.productId._id || item.productId, e.target.value)}
                    min="1"
                    className="quantity-input"
                  />
                </td>
                <td>${((item.productId && item.productId.price) || 0).toFixed(2)}</td>
                <td>${(item.quantity * ((item.productId && item.productId.price) || 0)).toFixed(2)}</td>
                <td>
                  <Button variant="danger" onClick={() => handleDelete(item.productId._id)}>
                    Remove
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No items in cart</td>
            </tr>
          )}
        </tbody>
      </Table>
      <Button variant="primary" disabled={isCheckoutDisabled} href="/checkout/shipping-address" className="checkout-button">
        Proceed to Checkout
      </Button>
    </Container>
  );
};

export default CartPage;