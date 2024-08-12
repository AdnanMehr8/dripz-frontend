import React, { useEffect } from 'react';
import { Container, Card, Button, Spinner, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserProfile } from '../redux/authSlice';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/UserProfilePage.css'; // Assuming you have a CSS file for custom styles

const UserProfilePage = () => {
  const dispatch = useDispatch();
  const { user, token, status, error } = useSelector((state) => state.auth);

  useEffect(() => {
    // Fetch the profile if the user is authenticated and profile ID is not already set
    if (user && token && (!user.profile || !user.profile.name)) {
      dispatch(fetchUserProfile(user.profile._id));
    }
  }, [dispatch, user, token]);

  return (
    <Container className="user-profile-container">
      {status === 'loading' && <Spinner animation="border" className="loading-spinner" />}
      {status === 'failed' && <Alert variant="danger">Error: {error}</Alert>}

      {user && user.profile ? (
        <Card className="user-profile-card">
          <Card.Img
            variant="top"
            src={user.profile.profilePicture || 'default-profile-picture-url.jpg'}
            alt="Profile Picture"
            className="profile-picture"
          />
          <Card.Body>
            <Card.Title className="profile-name">{user.profile.name}</Card.Title>
            <Card.Text className="profile-email">{user.email}</Card.Text>
            <Card.Text className="profile-bio">{user.profile.bio}</Card.Text>
            <Card.Text className="profile-location">{user.profile.location}</Card.Text>
            <Button variant="primary" href="/edit-profile" className="edit-profile-button">
              Edit Profile
            </Button>
          </Card.Body>
        </Card>
      ) : (
        <p className="no-profile-message">No user profile found.</p>
      )}
    </Container>
  );
};

export default UserProfilePage;
