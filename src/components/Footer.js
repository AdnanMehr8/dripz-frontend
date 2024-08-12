import React from 'react';
import { Container, Col, Row, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Contact from './Contact';
import logo from '../assets/images/Dripz (1).png';
import '../styles/Footer.css';
import { MdEmail } from "react-icons/md";
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    
<Container fluid className=' mrg '>
    <Row>
      <Col>
      <div>
      <img
          src= {logo}
          height="90"
          className="d-inline-block align-top mr-2 mb-4 "
          alt="Dripz Logo"
        />
      <p> <MdEmail /> customercare@dripzstores.com</p>
      <p>Call: 042-xxxxxxxxx</p>
      <p>Call: 042-xxxxxxxxx</p>
      <p className='mb-5'><FaFacebookF /> <FaInstagram /></p>
      
 
      </div>
     
      </Col>
      <Col>
      <div >
      <p className='text mt-4'>Guidelines</p>
      <p>Store Locator</p>
      <p>Track Your Order</p>
      <p>Shipping</p>
      <p >Replacement Policy</p>
      
 
      </div>
     
      </Col>
      <Col>
      <div>
      <p className='text mt-4'>About Us</p>
      <p>About US</p>
      </div>
      </Col>
      <Col>
      <div>
      <p className='text mt-4'>Newsletter Signup</p>
      <p>Subscribe to our newsletters now and stay up-to-date with new collections, the latest lookbooks and exclusive offers</p>
      <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>
      </Form>
      </div>
      </Col>
    </Row>
   
 
     
    <Row>
      <footer className='bg-white text-black text-center  '>
    <p className='pt-3'>&copy; 2024 Dripz. All Rights Reserved.</p>
   
    </footer>
    </Row>
    </Container>
    
  );
};

export default Footer;
