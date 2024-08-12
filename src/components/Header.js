import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/header.css'; // Ensure correct path to your custom CSS file
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/authSlice';
import { CiUser, CiShoppingCart, CiCircleList } from "react-icons/ci";
import logo from '../assets/images/Dripz.png';

const Header = () => {
  const navbarRef = useRef(null); // Create a ref for the navbar

  useEffect(() => {
    let lastScrollTop = 0;

    const handleScroll = () => {
      const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
      if (currentScroll > lastScrollTop) {
        // Scrolling down
        navbarRef.current.classList.add('hidden');
      } else {
        // Scrolling up
        navbarRef.current.classList.remove('hidden');
      }
      lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // For Mobile or negative scrolling
    };

    window.addEventListener('scroll', handleScroll);

    // Cleanup function to remove the event listener
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []); // Empty dependency array means this effect runs once when the component mounts

  const isAuthenticated = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Container className="navbar-container">
    <Navbar bg="white" variant="white" expand="lg" className="header-navbar" ref={navbarRef}>
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
        <Nav.Link as={Link} to="/cart"><CiShoppingCart size={30}/></Nav.Link>
      </Nav>
    </Navbar>
    </Container>
  );
};

export default Header;
