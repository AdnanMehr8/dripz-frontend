import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserProfile, editUserProfile } from '../redux/authSlice';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import '../styles/EditProfilePage.css'; // Assuming you have a CSS file for custom styles

const EditProfilePage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user, token, status, error } = useSelector((state) => state.auth);

    const [formData, setFormData] = useState({
        name: '',
        location: '',
        profilePicture: ''
    });

    useEffect(() => {
        if (user && token && (!user.profile || !user.profile.name)) {
            dispatch(fetchUserProfile(user.profile._id));
        }
    }, [dispatch, user, token]);

    useEffect(() => {
        if (user && user.profile) {
            setFormData({
                name: user.profile.name || '',
                location: user.profile.location || '',
                profilePicture: user.profile.profilePicture || ''
            });
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (user && user.profile) {
            dispatch(editUserProfile({ profileId: user.profile._id, profileData: formData }))
                .unwrap()
                .then(() => {
                    navigate('/profile'); // Navigate to profile page or refresh
                })
                .catch((err) => {
                    console.error(err.message);
                });
        }
    };

    return (
        <Container className="edit-profile-container">
            {status === 'loading' && <Spinner animation="border" className="loading-spinner" />}
            {status === 'failed' && <Alert variant="danger">Error: {error}</Alert>}

            <Form onSubmit={handleSubmit} className="edit-profile-form">
                <h2 className="form-heading">Edit Profile</h2>

                <Form.Group controlId="formName" className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="form-control"
                    />
                </Form.Group>

                <Form.Group controlId="formLocation" className="mb-3">
                    <Form.Label>Location</Form.Label>
                    <Form.Control
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        className="form-control"
                    />
                </Form.Group>

                <Form.Group controlId="formProfilePicture" className="mb-3">
                    <Form.Label>Profile Picture URL</Form.Label>
                    <Form.Control
                        type="text"
                        name="profilePicture"
                        value={formData.profilePicture}
                        onChange={handleChange}
                        className="form-control"
                    />
                </Form.Group>

                <Button variant="primary" type="submit" className="submit-button">
                    Save Changes
                </Button>
            </Form>
        </Container>
    );
};

export default EditProfilePage;
