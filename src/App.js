import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import UserProfilePage from './pages/UserProfilePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import EditProfilePage from './pages/EditProfilePage';
import Men from './pages/Men';
import Women from './pages/Women';
import ProductGrid from './components/ProductGrid';
import MenEastern from './pages/MenEastern';
import MenCasual from './pages/MenCasual';
import MenAccessories from './pages/MenAccessories';
import WomenEastern from './pages/WomenEastern';
import WomenCasual from './pages/WomenCasual';
import WomenAccessories from './pages/WomenAccessories';
import Loader from './components/Loader';
import Contact from './components/Contact';
import Login from './pages/Admin/Login';
import Admin from './pages/Admin';
import Protected from './components/PrivateRoute';
import PaymentForm from './components/checkout/Payment';
import Review from './components/checkout/Review';
import PlaceOrder from './components/checkout/placeOrder';
import AddressForm from './components/checkout/SAddress';
import Payment from './components/checkout/Payment';


const AppContent = () => {
  const location = useLocation();
  const {token, user} = useSelector((state) => state.auth);
  const productStatus = useSelector((state) => state.products.status);
  // const token = useSelector((state) => state.auth.token);

  const isLoading = token === 'loading' || productStatus === 'loading';

  return (
    <>
      <Header />
      {/* <Container fluid className='p-0'> */}
        {isLoading && <Loader />}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products/:id" element={<ProductDetailsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/product-grid" element={<ProductGrid />} />
          <Route path="/men" element={<Men />} />
          <Route path="/men-eastern" element={<MenEastern />} />
          <Route path="/men-casual" element={<MenCasual />} />
          <Route path="/men-accessories" element={<MenAccessories />} />
          <Route path="/women" element={<Women />} />
          <Route path="/women-eastern" element={<WomenEastern />} />
          <Route path="/women-casual" element={<WomenCasual />} />
          <Route path="/women-accessories" element={<WomenAccessories />} />
          <Route path="/cart" element={
          <Protected isAuth={token}>
             <CartPage />
          </Protected>
        } />
{/* 
<Route path="/admin" element={
          <Protected isAuth={user}>
             <Admin />
          </Protected>
        } /> */}
        
          {/* <Route path="/cart" element={<CartPage />} /> */}
          <Route path="/edit-profile" element={<EditProfilePage />} />
          <Route path="/profile" element={<UserProfilePage />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin-login" element={<Login />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/checkout/shipping-address" element={<AddressForm />} />
          <Route path="/payment" element={<Payment /> } />
          <Route path="/checkout/review-order" element={<Review />} />
          <Route path="/success" element={<PlaceOrder />} />
        </Routes>

        {/* <Contact /> */}
      {/* </Container> */}
      {/* {location.pathname !== '/checkout' && <Footer />} */}
      <Footer />
    </>
  );
};

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
