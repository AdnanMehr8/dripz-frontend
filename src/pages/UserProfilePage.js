import React, { useEffect } from 'react';
import { Container, Card, Button, Spinner, Alert, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserProfile, fetchUserOrders } from '../redux/authSlice';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/UserProfilePage.css';

const UserProfilePage = () => {
  const dispatch = useDispatch();
  const { user, token, status, error } = useSelector((state) => state.auth);
  const { orders, orderStatus, orderError } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user && token) {
      if (!user.profile || !user.profile.name) {
        dispatch(fetchUserProfile(user.profile._id));
      }
      dispatch(fetchUserOrders(user._id));
    }
  }, [dispatch, user, token]);

  const calculateOrderTotal = (order) => {
    if (!order.items || order.items.length === 0) return 0;
    return order.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  return (
    <div className="user-profile-container">
      {status === 'loading' && <Spinner animation="border" className="loading-spinner" />}
      {status === 'failed' && <Alert variant="danger">Error: {error}</Alert>}

      {user && user.profile ? (
        <>
          <div className="user-profile-card">
            <div >
            <Card.Img
              variant="top"
              src={user.profile.profilePicture || 'default-profile-picture-url.jpg'}
              alt="Profile Picture"
              className="profile-picture"
            />
            </div>
            <Card.Body>
              <Card.Title className="profile-name">{user.profile.name}</Card.Title>
              <Card.Text className="profile-email">{user.email}</Card.Text>
              <Card.Text className="profile-bio">{user.profile.bio}</Card.Text>
              <Card.Text className="profile-location">{user.profile.location}</Card.Text>
              <Button variant="primary" href="/edit-profile" className="edit-profile-button">
                Edit Profile
              </Button>
            </Card.Body>
          </div>

          {orderStatus === 'loading' && <Spinner animation="border" className="loading-spinner" />}
          {orderStatus === 'failed' && <Alert variant="danger">Error: {orderError}</Alert>}

          {orders && orders.length > 0 ? (
            <div className='table-container'>
                <div className='order-title' >
                 <p>Your Orders</p>
                </div>
            <Table striped bordered hover className="orders-table ">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Order Name</th>
                  <th>Quantity</th>
                  <th>Product Image</th>
                  <th>Date</th>
                  <th>Total Price</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.flatMap((order) =>
                  order.items.map((item) => (
                    <tr className='table-contents' key={item._id}>
                      <td>{order._id}</td>
                      <td>{item.productId.title}</td>
                      <td>{item.quantity}</td>
                      <td>
                        <img
                          src={item.productId.image}
                          alt={item.productId.title}
                          className="order-product-image"
                        />
                      </td>
                      <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                      <td>${calculateOrderTotal(order).toFixed(2)}</td>
                      <td>{order.status || 'Processing'}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </Table>
            </div>
          ) : (
            <p>No orders found.</p>
          )}
        </>
      ) : (
        <p className="no-profile-message">No user profile found.</p>
      )}
    </div>
  );
};

export default UserProfilePage;
