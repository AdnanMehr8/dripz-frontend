import * as React from 'react';
import { useEffect, useState } from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Grid from '@mui/material/Grid';
import OutlinedInput from '@mui/material/OutlinedInput';
import { styled } from '@mui/system';
import { useDispatch } from 'react-redux';
import { addShippingData } from '../../redux/checkOutSlice'; // Adjusted action import
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../styles/AddressForm.css';
import Checkout from './Check';
import { Typography } from '@mui/material';

const FormGrid = styled(Grid)(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

export default function AddressForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [inputValues, setInputValues] = useState({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: ''
  });

  useEffect(() => {
    // Dispatch the shipping data when all fields are filled
    if (Object.values(inputValues).every(value => value.trim() !== '')) {
      dispatch(addShippingData(inputValues));
    }
  }, [inputValues, dispatch]);

  const movetoNext = () => {
    if (Object.values(inputValues).every(value => value.trim() !== '')) {
      toast.success('Proceeding to payment details');
      navigate('/checkout/review-order');
      
    } else {
      toast.error('Please fill out all fields');
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputValues({ ...inputValues, [name]: value });
  };

  return (
    <div>
      <Checkout />
      <div className="grid-con">
        <Grid container spacing={3}>
          <div className='g-container'>
            <Typography component='h1' variant='h6' fontWeight='bold' align='center' marginBottom='20px' gutterBottom>   
              Shipping Address
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <FormLabel htmlFor="firstName" className="form-label" required>
                  First name
                </FormLabel>
                <OutlinedInput
                  id="firstName"
                  name="firstName"
                  value={inputValues.firstName}
                  type="text"
                  placeholder="John"
                  autoComplete="first name"
                  onChange={handleChange}
                  className="outlined-input"
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormLabel htmlFor="lastName" className="form-label" required>
                  Last name
                </FormLabel>
                <OutlinedInput
                  id="lastName"
                  name="lastName"
                  value={inputValues.lastName}
                  type="text"
                  placeholder="Snow"
                  autoComplete="last name"
                  onChange={handleChange}
                  className="outlined-input"
                  required
                />
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={12}>
                <FormLabel htmlFor="address" className="form-label" required>
                  Address line 1
                </FormLabel>
                <OutlinedInput
                  id="address"
                  name="address"
                  value={inputValues.address}
                  type="text"
                  placeholder="Street name and number"
                  autoComplete="shipping address-line"
                  onChange={handleChange}
                  className="outlined-input"
                  required
                />
              </Grid>
            </Grid>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <FormLabel htmlFor="city" className="form-label" required>
                  City
                </FormLabel>
                <OutlinedInput
                  id="city"
                  name="city"
                  value={inputValues.city}
                  type="text"
                  placeholder="New York"
                  autoComplete="city"
                  onChange={handleChange}
                  className="outlined-input"
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormLabel htmlFor="state" className="form-label" required>
                  State
                </FormLabel>
                <OutlinedInput
                  id="state"
                  name="state"
                  value={inputValues.state}
                  type="text"
                  placeholder="NY"
                  autoComplete="state"
                  onChange={handleChange}
                  className="outlined-input"
                  required
                />
              </Grid>
            </Grid>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <FormLabel htmlFor="zip" className="form-label" required>
                  Zip / Postal code
                </FormLabel>
                <OutlinedInput
                  id="zip"
                  name="zip"
                  value={inputValues.zip}
                  type="text"
                  placeholder="12345"
                  autoComplete="shipping postal-code"
                  onChange={handleChange}
                  className="outlined-input"
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormLabel htmlFor="country" className="form-label" required>
                  Country
                </FormLabel>
                <OutlinedInput
                  id="country"
                  name="country"
                  value={inputValues.country}
                  type="text"
                  placeholder="United States"
                  autoComplete="shipping country"
                  onChange={handleChange}
                  className="outlined-input"
                  required
                />
              </Grid>
            </Grid>
            <Grid container xs={12}>
              <FormControlLabel
                control={<Checkbox name="saveAddress" value="yes" />}
                label={<span className="checkbox-label">Use this address for payment details</span>}
              />
            </Grid>
            <Grid item xs={12} className="button-container">
              <button onClick={movetoNext} className="button">Next</button>
            </Grid>
          </div>
        </Grid>
        <ToastContainer className="toast-container"/>
      </div>
    </div>
  );
}
