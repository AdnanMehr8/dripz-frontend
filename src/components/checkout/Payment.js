// import * as React from 'react';
// import Alert from '@mui/material/Alert';
// import Box from '@mui/material/Box';
// import Card from '@mui/material/Card';
// import CardActionArea from '@mui/material/CardActionArea';
// import CardContent from '@mui/material/CardContent';
// import Checkbox from '@mui/material/Checkbox';
// import FormControl from '@mui/material/FormControl';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import FormLabel from '@mui/material/FormLabel';
// import OutlinedInput from '@mui/material/OutlinedInput';
// import RadioGroup from '@mui/material/RadioGroup';
// import Stack from '@mui/material/Stack';
// import Typography from '@mui/material/Typography';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import AccountBalanceRoundedIcon from '@mui/icons-material/AccountBalanceRounded';
// import CreditCardRoundedIcon from '@mui/icons-material/CreditCardRounded';
// import SimCardRoundedIcon from '@mui/icons-material/SimCardRounded';
// import WarningRoundedIcon from '@mui/icons-material/WarningRounded';

// import { styled } from '@mui/system';
// import { useNavigate } from 'react-router-dom';
// import '../../styles/payment.css';
// import { Grid } from '@mui/material';
// import Checkout from './Check';

// const FormGrid = styled('div')(() => ({
//   display: 'flex',
//   flexDirection: 'column',
// }));

// export default function PaymentForm() {
//   const navigate = useNavigate();
//   const [paymentType, setPaymentType] = React.useState('creditCard');
//   const [cardNumber, setCardNumber] = React.useState('');
//   const [cvv, setCvv] = React.useState('');
//   const [expirationDate, setExpirationDate] = React.useState('');
//   const [cardName, setCardName] = React.useState('');

//   const handlePaymentTypeChange = (event) => {
//     setPaymentType(event.target.value);
//   };

//   const handleCardNumberChange = (event) => {
//     const value = event.target.value.replace(/\D/g, '');
//     const formattedValue = value.replace(/(\d{4})(?=\d)/g, '$1 ');
//     if (value.length <= 16) {
//       setCardNumber(formattedValue);
//     }
//   };

//   const handleCvvChange = (event) => {
//     const value = event.target.value.replace(/\D/g, '');
//     if (value.length <= 3) {
//       setCvv(value);
//     }
//   };

//   const handleExpirationDateChange = (event) => {
//     const value = event.target.value.replace(/\D/g, '');
//     const formattedValue = value.replace(/(\d{2})(?=\d{2})/, '$1/');
//     if (value.length <= 4) {
//       setExpirationDate(formattedValue);
//     }
//   };

//   const handleCardNameChange = (event) => {
//     setCardName(event.target.value);
//   };

//   const validateCardNumber = (number) => {
//     const cleanNumber = number.replace(/\s+/g, '');
//     return /^\d{16}$/.test(cleanNumber);
//   };

//   const validateCvv = (cvv) => {
//     return /^\d{3}$/.test(cvv);
//   };

//   const validateExpirationDate = (date) => {
//     return /^(0[1-9]|1[0-2])\/\d{2}$/.test(date);
//   };

//   const validateCardName = (name) => {
//     return name.trim() !== '';
//   };

//   const movetoNext = () => {
//     if (paymentType === 'creditCard') {
//       if (
//         validateCardNumber(cardNumber) &&
//         validateCvv(cvv) &&
//         validateExpirationDate(expirationDate) &&
//         validateCardName(cardName)
//       ) {
//         toast.success('Proceeding to place your order');
//         navigate('/checkout/review-order');
//       } else {
//         toast.error('Please fill out all credit card fields correctly');
//       }
//     } else if (paymentType === 'bankTransfer') {
//       toast.success('Proceeding to place your order');
//       navigate('/checkout/review-order');
//     } else {
//       toast.error('Please select a payment method');
//     }
//   };

//   const moveToPreviousPage = () => {
//     navigate('/checkout');
//     toast.success('Proceeding to checkout');
//   };

//   return (
//     <div className="">
//       <Checkout />
//       <div className='p-container'>
//         <Stack spacing={{ xs: 3, sm: 6 }} useFlexGap>
//           <Typography component='h1' variant='h6' fontWeight='bold' align='center' className='check-out-text'>
//             Payment Form
//           </Typography>

//           <FormControl component="fieldset" fullWidth>
//             <RadioGroup
//               aria-label="Payment options"
//               name="paymentType"
//               value={paymentType}
//               onChange={handlePaymentTypeChange}
//               sx={{
//                 flexDirection: { sm: 'column', md: 'row' },
//                 gap: 2,
//               }}
//             >
//               <Card
//                 raised={paymentType === 'creditCard'}
//                 sx={{
//                   maxWidth: { sm: '100%', md: '50%' },
//                   flexGrow: 1,
//                   outline: '1px solid',
//                   outlineColor:
//                     paymentType === 'creditCard' ? 'primary.main' : 'divider',
//                   backgroundColor:
//                     paymentType === 'creditCard' ? 'background.default' : '',
//                 }}
//               >
//                 <CardActionArea onClick={() => setPaymentType('creditCard')}>
//                   <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//                     <CreditCardRoundedIcon color="primary" fontSize="small" />
//                     <Typography fontWeight="medium">Card</Typography>
//                   </CardContent>
//                 </CardActionArea>
//               </Card>
//               <Card
//                 raised={paymentType === 'bankTransfer'}
//                 sx={{
//                   maxWidth: { sm: '100%', md: '50%' },
//                   flexGrow: 1,
//                   outline: '1px solid',
//                   outlineColor:
//                     paymentType === 'bankTransfer' ? 'primary.main' : 'divider',
//                   backgroundColor:
//                     paymentType === 'bankTransfer' ? 'background.default' : '',
//                 }}
//               >
//                 <CardActionArea onClick={() => setPaymentType('bankTransfer')}>
//                   <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//                     <AccountBalanceRoundedIcon color="primary" fontSize="small" />
//                     <Typography fontWeight="medium">Bank account</Typography>
//                   </CardContent>
//                 </CardActionArea>
//               </Card>
//             </RadioGroup>
//           </FormControl>
//           {paymentType === 'creditCard' && (
//             <Box
//               sx={{
//                 display: 'flex',
//                 flexDirection: 'column',
//                 gap: 2,
//               }}
//             >
//               <Box
//                 sx={{
//                   display: 'flex',
//                   flexDirection: 'column',
//                   justifyContent: 'space-between',
//                   p: 3,
//                   height: { xs: 300, sm: 350, md: 375 },
//                   width: '100%',
//                   borderRadius: '20px',
//                   border: '1px solid',
//                   borderColor: 'divider',
//                   backgroundColor: 'background.paper',
//                   boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.05)',
//                 }}
//               >
//                 <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
//                   <Typography variant="subtitle2">Credit card</Typography>
//                   <CreditCardRoundedIcon sx={{ color: 'text.secondary' }} />
//                 </Box>
//                 <SimCardRoundedIcon
//                   sx={{
//                     fontSize: { xs: 48, sm: 56 },
//                     transform: 'rotate(90deg)',
//                     color: 'text.secondary',
//                   }}
//                 />
//                 <Box
//                   sx={{
//                     display: 'flex',
//                     justifyContent: 'space-between',
//                     width: '100%',
//                     gap: 2,
//                   }}
//                 >
//                   <FormGrid sx={{ flexGrow: 1 }}>
//                     <FormLabel htmlFor="card-number" required>
//                       Card number
//                     </FormLabel>
//                     <OutlinedInput
//                       id="card-number"
//                       autoComplete="card-number"
//                       placeholder="0000 0000 0000 0000"
//                       required
//                       value={cardNumber}
//                       onChange={handleCardNumberChange}
//                     />
//                   </FormGrid>
//                   <FormGrid sx={{ maxWidth: '20%' }}>
//                     <FormLabel htmlFor="cvv" required>
//                       CVV
//                     </FormLabel>
//                     <OutlinedInput
//                       id="cvv"
//                       autoComplete="CVV"
//                       placeholder="123"
//                       required
//                       value={cvv}
//                       onChange={handleCvvChange}
//                     />
//                   </FormGrid>
//                 </Box>
//                 <Box sx={{ display: 'flex', gap: 2 }}>
//                   <FormGrid sx={{ flexGrow: 1 }}>
//                     <FormLabel htmlFor="card-name" required>
//                       Name
//                     </FormLabel>
//                     <OutlinedInput
//                       id="card-name"
//                       autoComplete="card-name"
//                       placeholder="John Smith"
//                       required
//                       value={cardName}
//                       onChange={handleCardNameChange}
//                     />
//                   </FormGrid>
//                   <FormGrid sx={{ flexGrow: 1 }}>
//                     <FormLabel htmlFor="card-expiration" required>
//                       Expiration date
//                     </FormLabel>
//                     <OutlinedInput
//                       id="card-expiration"
//                       autoComplete="card-expiration"
//                       placeholder="MM/YY"
//                       required
//                       value={expirationDate}
//                       onChange={handleExpirationDateChange}
//                     />
//                   </FormGrid>
//                 </Box>
//                 <FormControlLabel
//                   control={<Checkbox name="saveCard" />}
//                   label="Remember credit card details for next time"
//                 />
//                 <Stack direction="row" spacing={2} justifyContent="space-between">
//                   <button onClick={moveToPreviousPage} className='button'>Back</button>
//                   <button onClick={movetoNext} className='button'>Next</button>
//                 </Stack>
//               </Box>
//             </Box>
//           )}

//           {paymentType === 'bankTransfer' && (
//             <Box
//               sx={{
//                 display: 'flex',
//                 flexDirection: 'column',
//                 gap: 2,
//               }}
//             >
//               <Alert severity="warning" icon={<WarningRoundedIcon />}>
//                 Your order will be processed once we receive the funds.
//               </Alert>
//               <Typography variant="subtitle1" fontWeight="medium">
//                 Bank account
//               </Typography>
//               <Typography variant="body1" gutterBottom>
//                 Please transfer the payment to the bank account details shown below.
//               </Typography>
//               <Box sx={{ display: 'flex', gap: 1 }}>
//                 <Typography variant="body1" color="text.secondary">
//                   Bank:
//                 </Typography>
//                 <Typography variant="body1" fontWeight="medium">
//                   Mastercredit
//                 </Typography>
//               </Box>
//               <Box sx={{ display: 'flex', gap: 1 }}>
//                 <Typography variant="body1" color="text.secondary">
//                   Account number:
//                 </Typography>
//                 <Typography variant="body1" fontWeight="medium">
//                   123456789
//                 </Typography>
//               </Box>
//               <Box sx={{ display: 'flex', gap: 1 }}>
//                 <Typography variant="body1" color="text.secondary">
//                   Routing number:
//                 </Typography>
//                 <Typography variant="body1" fontWeight="medium">
//                   987654321
//                 </Typography>
//               </Box>
//             </Box>
//           )}
//         </Stack>
//         <ToastContainer className="toast-container" />
//       </div>
//     </div>
//   );
// }

// // import * as React from 'react';
// // import Alert from '@mui/material/Alert';
// // import Box from '@mui/material/Box';
// // import Card from '@mui/material/Card';
// // import CardActionArea from '@mui/material/CardActionArea';
// // import CardContent from '@mui/material/CardContent';
// // import Checkbox from '@mui/material/Checkbox';
// // import FormControl from '@mui/material/FormControl';
// // import FormControlLabel from '@mui/material/FormControlLabel';
// // import FormLabel from '@mui/material/FormLabel';
// // import OutlinedInput from '@mui/material/OutlinedInput';
// // import RadioGroup from '@mui/material/RadioGroup';
// // import Stack from '@mui/material/Stack';
// // import Typography from '@mui/material/Typography';
// // import { ToastContainer, toast } from 'react-toastify';
// // import 'react-toastify/dist/ReactToastify.css';
// // import AccountBalanceRoundedIcon from '@mui/icons-material/AccountBalanceRounded';
// // import CreditCardRoundedIcon from '@mui/icons-material/CreditCardRounded';
// // import SimCardRoundedIcon from '@mui/icons-material/SimCardRounded';
// // import WarningRoundedIcon from '@mui/icons-material/WarningRounded';

// // import { styled } from '@mui/system';
// // import { useNavigate } from 'react-router-dom';
// // import '../../styles/payment.css';
// // import { Grid } from '@mui/material';
// // import Checkout from './Check';

// // const FormGrid = styled('div')(() => ({
// //   display: 'flex',
// //   flexDirection: 'column',
// // }));

// // export default function PaymentForm() {
// //   const navigate = useNavigate();
// //   const [paymentType, setPaymentType] = React.useState('creditCard');
// //   const [cardNumber, setCardNumber] = React.useState('');
// //   const [cvv, setCvv] = React.useState('');
// //   const [expirationDate, setExpirationDate] = React.useState('');
// //   const [cardName, setCardName] = React.useState('');

// //   const handlePaymentTypeChange = (event) => {
// //     setPaymentType(event.target.value);
// //   };

// //   const handleCardNumberChange = (event) => {
// //     const value = event.target.value.replace(/\D/g, '');
// //     const formattedValue = value.replace(/(\d{4})(?=\d)/g, '$1 ');
// //     if (value.length <= 16) {
// //       setCardNumber(formattedValue);
// //     }
// //   };

// //   const handleCvvChange = (event) => {
// //     const value = event.target.value.replace(/\D/g, '');
// //     if (value.length <= 3) {
// //       setCvv(value);
// //     }
// //   };

// //   const handleExpirationDateChange = (event) => {
// //     const value = event.target.value.replace(/\D/g, '');
// //     const formattedValue = value.replace(/(\d{2})(?=\d{2})/, '$1/');
// //     if (value.length <= 4) {
// //       setExpirationDate(formattedValue);
// //     }
// //   };

// //   const handleCardNameChange = (event) => {
// //     setCardName(event.target.value);
// //   };

// //   const validateCardNumber = (number) => {
// //     const cleanNumber = number.replace(/\s+/g, '');
// //     return /^\d{16}$/.test(cleanNumber);
// //   };

// //   const validateCvv = (cvv) => {
// //     return /^\d{3}$/.test(cvv);
// //   };

// //   const validateExpirationDate = (date) => {
// //     return /^(0[1-9]|1[0-2])\/\d{2}$/.test(date);
// //   };

// //   const validateCardName = (name) => {
// //     return name.trim() !== '';
// //   };

// //   const luhnCheck = (value) => {
// //     let sum = 0;
// //     let shouldDouble = false;
// //     for (let i = value.length - 1; i >= 0; i--) {
// //       let digit = parseInt(value.charAt(i), 10);
// //       if (shouldDouble) {
// //         digit *= 2;
// //         if (digit > 9) {
// //           digit -= 9;
// //         }
// //       }
// //       sum += digit;
// //       shouldDouble = !shouldDouble;
// //     }
// //     return (sum % 10 === 0);
// //   };

// //   const isExpirationDateValid = (date) => {
// //     const [month, year] = date.split('/').map(num => parseInt(num, 10));
// //     const now = new Date();
// //     const currentMonth = now.getMonth() + 1;
// //     const currentYear = now.getFullYear() % 100;

// //     if (month < 1 || month > 12 || year < currentYear || (year === currentYear && month < currentMonth)) {
// //       return false;
// //     }
// //     return true;
// //   };

// //   const movetoNext = () => {
// //     if (paymentType === 'creditCard') {
// //       const cleanCardNumber = cardNumber.replace(/\s+/g, '');

// //       if (
// //         validateCardNumber(cardNumber) &&
// //         luhnCheck(cleanCardNumber) &&
// //         validateCvv(cvv) &&
// //         isExpirationDateValid(expirationDate) &&
// //         validateCardName(cardName)
// //       ) {
// //         toast.success('Proceeding to place your order');
// //         navigate('/checkout/review-order');
// //       } else {
// //         toast.error('Please ensure all credit card details are valid');
// //       }
// //     } else if (paymentType === 'bankTransfer') {
// //       toast.success('Proceeding to place your order');
// //       navigate('/checkout/review-order');
// //     } else {
// //       toast.error('Please select a payment method');
// //     }
// //   };

// //   const moveToPreviousPage = () => {
// //     navigate('/checkout');
// //     toast.success('Proceeding to checkout');
// //   };

// //   return (
// //     <div className="">
// //       <Checkout />
// //       <div className='p-container'>
// //         <Stack spacing={{ xs: 3, sm: 6 }} useFlexGap>
// //           <Typography component='h1' variant='h6' fontWeight='bold' align='center' className='check-out-text'>
// //             Payment Form
// //           </Typography>

// //           <FormControl component="fieldset" fullWidth>
// //             <RadioGroup
// //               aria-label="Payment options"
// //               name="paymentType"
// //               value={paymentType}
// //               onChange={handlePaymentTypeChange}
// //               sx={{
// //                 flexDirection: { sm: 'column', md: 'row' },
// //                 gap: 2,
// //               }}
// //             >
// //               <Card
// //                 raised={paymentType === 'creditCard'}
// //                 sx={{
// //                   maxWidth: { sm: '100%', md: '50%' },
// //                   flexGrow: 1,
// //                   outline: '1px solid',
// //                   outlineColor:
// //                     paymentType === 'creditCard' ? 'primary.main' : 'divider',
// //                   backgroundColor:
// //                     paymentType === 'creditCard' ? 'background.default' : '',
// //                 }}
// //               >
// //                 <CardActionArea onClick={() => setPaymentType('creditCard')}>
// //                   <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
// //                     <CreditCardRoundedIcon color="primary" fontSize="small" />
// //                     <Typography fontWeight="medium">Card</Typography>
// //                   </CardContent>
// //                 </CardActionArea>
// //               </Card>
// //               <Card
// //                 raised={paymentType === 'bankTransfer'}
// //                 sx={{
// //                   maxWidth: { sm: '100%', md: '50%' },
// //                   flexGrow: 1,
// //                   outline: '1px solid',
// //                   outlineColor:
// //                     paymentType === 'bankTransfer' ? 'primary.main' : 'divider',
// //                   backgroundColor:
// //                     paymentType === 'bankTransfer' ? 'background.default' : '',
// //                 }}
// //               >
// //                 <CardActionArea onClick={() => setPaymentType('bankTransfer')}>
// //                   <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
// //                     <AccountBalanceRoundedIcon color="primary" fontSize="small" />
// //                     <Typography fontWeight="medium">Bank account</Typography>
// //                   </CardContent>
// //                 </CardActionArea>
// //               </Card>
// //             </RadioGroup>
// //           </FormControl>
// //           {paymentType === 'creditCard' && (
// //             <Box
// //               sx={{
// //                 display: 'flex',
// //                 flexDirection: 'column',
// //                 gap: 2,
// //               }}
// //             >
// //               <Box
// //                 sx={{
// //                   display: 'flex',
// //                   flexDirection: 'column',
// //                   justifyContent: 'space-between',
// //                   p: 3,
// //                   height: { xs: 300, sm: 350, md: 375 },
// //                   width: '100%',
// //                   borderRadius: '20px',
// //                   border: '1px solid',
// //                   borderColor: 'divider',
// //                   backgroundColor: 'background.paper',
// //                   boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.05)',
// //                 }}
// //               >
// //                 <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
// //                   <Typography variant="subtitle2">Credit card</Typography>
// //                   <CreditCardRoundedIcon sx={{ color: 'text.secondary' }} />
// //                 </Box>
// //                 <SimCardRoundedIcon
// //                   sx={{
// //                     fontSize: { xs: 48, sm: 56 },
// //                     transform: 'rotate(90deg)',
// //                     color: 'text.secondary',
// //                   }}
// //                 />
// //                 <Box
// //                   sx={{
// //                     display: 'flex',
// //                     justifyContent: 'space-between',
// //                     width: '100%',
// //                     gap: 2,
// //                   }}
// //                 >
// //                   <FormGrid sx={{ flexGrow: 1 }}>
// //                     <FormLabel htmlFor="card-number" required>
// //                       Card number
// //                     </FormLabel>
// //                     <OutlinedInput
// //                       id="card-number"
// //                       autoComplete="card-number"
// //                       placeholder="0000 0000 0000 0000"
// //                       required
// //                       value={cardNumber}
// //                       onChange={handleCardNumberChange}
// //                     />
// //                   </FormGrid>
// //                   <FormGrid sx={{ maxWidth: '20%' }}>
// //                     <FormLabel htmlFor="cvv" required>
// //                       CVV
// //                     </FormLabel>
// //                     <OutlinedInput
// //                       id="cvv"
// //                       autoComplete="CVV"
// //                       placeholder="123"
// //                       required
// //                       value={cvv}
// //                       onChange={handleCvvChange}
// //                     />
// //                   </FormGrid>
// //                 </Box>
// //                 <Box sx={{ display: 'flex', gap: 2 }}>
// //                   <FormGrid sx={{ flexGrow: 1 }}>
// //                     <FormLabel htmlFor="card-name" required>
// //                       Name
// //                     </FormLabel>
// //                     <OutlinedInput
// //                       id="card-name"
// //                       autoComplete="card-name"
// //                       placeholder="John Smith"
// //                       required
// //                       value={cardName}
// //                       onChange={handleCardNameChange}
// //                     />
// //                   </FormGrid>
// //                   <FormGrid sx={{ flexGrow: 1 }}>
// //                     <FormLabel htmlFor="card-expiration" required>
// //                       Expiration date
// //                     </FormLabel>
// //                     <OutlinedInput
// //                       id="card-expiration"
// //                       autoComplete="card-expiration"
// //                       placeholder="MM/YY"
// //                       required
// //                       value={expirationDate}
// //                       onChange={handleExpirationDateChange}
// //                     />
// //                   </FormGrid>
// //                 </Box>
// //                 <FormControlLabel
// //                   control={<Checkbox name="saveCard" />}
// //                   label="Remember credit card details for next time"
// //                 />
// //                 <Stack direction="row" spacing={2} justifyContent="space-between">
// //                   <button onClick={moveToPreviousPage} className='button'>Back</button>
// //                   <button onClick={movetoNext} className='button'>Next</button>
// //                 </Stack>
// //               </Box>
// //             </Box>
// //           )}

// //           {paymentType === 'bankTransfer' && (
// //             <Box
// //               sx={{
// //                 display: 'flex',
// //                 flexDirection: 'column',
// //                 gap: 2,
// //               }}
// //             >
// //               <Alert severity="warning" icon={<WarningRoundedIcon />}>
// //                 Your order will be processed once we receive the funds.
// //               </Alert>
// //               <Typography variant="subtitle1" fontWeight="medium">
// //                 Bank account
// //               </Typography>
// //               <Typography variant="body1" gutterBottom>
// //                 Please transfer the payment to the bank account details shown below.
// //               </Typography>
// //               <Box sx={{ display: 'flex', gap: 1 }}>
// //                 <Typography variant="body1" color="text.secondary">
// //                   Bank:
// //                 </Typography>
// //                 <Typography variant="body1" fontWeight="medium">
// //                   Mastercredit
// //                 </Typography>
// //               </Box>
// //               <Box sx={{ display: 'flex', gap: 1 }}>
// //                 <Typography variant="body1" color="text.secondary">
// //                   Account number:
// //                 </Typography>
// //                 <Typography variant="body1" fontWeight="medium">
// //                   123456789
// //                 </Typography>
// //               </Box>
// //               <Box sx={{ display: 'flex', gap: 1 }}>
// //                 <Typography variant="body1" color="text.secondary">
// //                   Routing number:
// //                 </Typography>
// //                 <Typography variant="body1" fontWeight="medium">
// //                   987654321
// //                 </Typography>
// //               </Box>
// //             </Box>
// //           )}
// //         </Stack>
// //         <ToastContainer className="toast-container" />
// //       </div>
// //     </div>
// //   );
// // }
import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { styled } from '@mui/system';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import api from '../../api/api';
import '../../styles/payment.css';
import Checkout from './Check';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY); // Replace with your Stripe public key


const FormGrid = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

const PaymentForm = () => {
  const navigate = useNavigate();
  const [paymentType, setPaymentType] = React.useState('creditCard');
  const [amount, setAmount] = React.useState(5000); // Amount in cents (e.g., 50.00 USD)
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const {token, error} = await stripe.createToken(cardElement);

    if (error) {
      toast.error(error.message);
      return;
    }

    try {
      const response = await api.post('/checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount,
          currency: 'usd',
          source: token.id,
          description: 'Payment description',
        }),
      });

      const result = await response.json();

      if (result.success) {
        toast.success('Payment successful');
        navigate('/checkout/review-order');
      } else {
        toast.error(result.error);
      }
    } catch (error) {
      toast.error('An error occurred');
    }
  };

  return (
    <div>
      <Checkout />
      <div className="box-container">
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 600, margin: 'auto' }}>
      <Typography variant="h6" align='center' fontWeight='bold' marginTop='10px' gutterBottom>
        Payment Form
      </Typography>
      <FormGrid>
        <CardElement />
        <Button type="submit" variant="contained" className='button' disabled={!stripe}>
          Pay
        </Button>
      </FormGrid>
      <ToastContainer />
    </Box>
    </div>
    </div>
  );
};

const PaymentWrapper = () => (
  <Elements stripe={stripePromise}>
    <PaymentForm />
  </Elements>
);

export default PaymentWrapper;