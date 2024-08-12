import React from "react";
import { Container, Col, Row } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../assets/images/Dripz (1).png';
import '../styles/Footer.css';
import { MdEmail } from "react-icons/md";
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";

const Contact =  () => {
     
      <Container  className=' mrg mb-4'>
    <Row>
      <Col>
      <div>
      <img
          src= {logo}
          height="90"
          className="d-inline-block align-top mr-2 mb-4 "
          alt="Dripz Logo"
        />
      <p><a href="adnanhaider4878@gmail.com"> <MdEmail /> customercare@dripzstores.com</a></p>
      <p>Call: 042-35950470</p>
      <p>Call: 042-35950470</p>
      <p className='mb-4'><FaFacebookF /> <FaInstagram /></p>
      
 
      </div>
     
      </Col>
    </Row>
   
  </Container>
}

export default Contact;