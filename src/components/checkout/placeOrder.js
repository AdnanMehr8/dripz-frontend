import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../../styles/PlaceOrder.css';
import { useDispatch, useSelector } from 'react-redux';
import { createOrder } from '../../redux/orderSlice';
import { deleteCart, resetCartState } from '../../redux/cartSlice';

const PlaceOrder = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { cartItems } = useSelector((state) => state.cartItems); 
    const { user } = useSelector((state) => state.auth);

    useEffect(() => {
        if (!user || !user._id) {
            console.error('User ID is not available');
            return;
        }

        if (cartItems.length > 0) {
            const orderItems = cartItems.map(item => ({
                productId: item.productId._id,
                quantity: item.quantity,
                price: Number(item.productId.price)
            }));

            const totalPrice = orderItems.reduce((total, item) => total + (item.price * item.quantity), 0);

            const orderData = {
                userId: user._id,
                items: orderItems,
                totalPrice: Number(totalPrice.toFixed(2)),
            };

            console.log('Order Data:', orderData);

            // Create the order and reset the cart state
            dispatch(createOrder(orderData))
                .unwrap()  // Ensure you handle the promise correctly
                .then(() => {
                    // Reset cart state after order creation
                    dispatch(deleteCart());
                    // Redirect to the confirmation page or home page
                })
                .catch((error) => {
                    console.error('Failed to create order:', error);
                    // Optionally handle error state
                });
        } else {
            console.error('No products in the cart');
        }

    }, [user, cartItems, dispatch, navigate]);

    const idRandomGenerator = () => {
        let random = Math.floor(Math.random() * 10);
        return random;
    };

    let randomNumber = '#' + idRandomGenerator() + idRandomGenerator() + idRandomGenerator() + idRandomGenerator() + idRandomGenerator() + idRandomGenerator() + idRandomGenerator();

    return (
        <div className='mt-5 mb-5'>
            <div className='place-container'>
                <h1>📦</h1>
                <h3 className='text-center'>Thank you for your order!</h3>
                <p className='text-center'>
                    Your order number is in
                    <strong> process</strong>. You can track the order status in your <a href='/profile'>profile.</a>
                </p>
                <button className='button' onClick={() => navigate('/')}>Back to Home</button>
            </div>
        </div>
    );
};

export default PlaceOrder;
