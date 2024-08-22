import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/header.css'; // Ensure correct path to your custom CSS file
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/authSlice';
import { CiUser, CiShoppingCart, CiCircleList } from "react-icons/ci";
import logo from '../assets/images/Dripz.png';
import { fetchAllCartItems } from '../redux/cartSlice';
import { debounce } from 'lodash';

const Header = () => {
  const navbarRef = useRef(null); // Create a ref for the navbar
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.token);
  const cartItems = useSelector((state) => state.cartItems.cartItems);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchAllCartItems());
    }
  }, [dispatch, isAuthenticated]);

  useEffect(() => {
    let lastScrollTop = 0;

    const handleScroll = debounce(() => {
      const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
      if (currentScroll > lastScrollTop) {
        // Scrolling down
        navbarRef.current.classList.add('hidden');
      } else {
        // Scrolling up
        navbarRef.current.classList.remove('hidden');
      }
      lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // For Mobile or negative scrolling
    }, 100);

    window.addEventListener('scroll', handleScroll);

    // Cleanup function to remove the event listener
    return () => {
      window.removeEventListener('scroll', handleScroll);
      handleScroll.cancel();
    };
  }, []); // Empty dependency array means this effect runs once when the component mounts

  const handleLogout = () => {
    dispatch(logout());
  };

  const cartItemCount = Array.isArray(cartItems)
    ? cartItems.reduce((total, item) => total + item.quantity, 0)
    : 0;

  return (
    <div className="navbar-container">
      <Navbar bg="white" variant="white"  className="header-navbar" ref={navbarRef}>
        <Nav className="mr-auto">
          <NavDropdown title={<CiCircleList size={30}/>} id="basic-nav-dropdown">
            <NavDropdown title='Men' id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to="/men">Men</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/men-eastern">Men's Eastern</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/men-casual">Men's Casual</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/men-accessories">Men's Accessories</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title='Women' id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to="/women">Women</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/women-eastern">Women's Eastern</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/women-casual">Women's Casual</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/women-accessories">Women's Accessories</NavDropdown.Item>
            </NavDropdown>
          </NavDropdown>
        </Nav>
        <Navbar.Brand as={Link} to="/" className="mx-auto">
          <img
            src={logo}
            height="60"
            className="d-inline-block align-top mr-2"
            alt="Dripz Logo"
          />
          {/* <svg width="60" height="60" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="200" height="200" rx="20" fill="#0077B6" />
  <path d="M100 50L150 150H50L100 50Z" fill="#FFFFFF" />
  <text x="50%" y="120" text-anchor="middle" fill="#FFFFFF" font-size="60" font-weight="bold">dripz</text>
</svg> */}
        </Navbar.Brand>
        <Nav className="ml-auto">
          {isAuthenticated ? (
            <NavDropdown title={<CiUser size={30}/>} id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to="/profile">My Profile</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
            </NavDropdown>
          ) : (
            <Nav.Link as={Link} to="/login">Login</Nav.Link>
          )}
        </Nav>
        <Nav className="ml-auto">
          <Nav.Link as={Link} to="/cart">
            <CiShoppingCart size={30}/>
            <span className='cart-count'>{cartItemCount}</span>
          </Nav.Link>
        </Nav>
      </Navbar>
    </div>
  );
};

export default Header;
