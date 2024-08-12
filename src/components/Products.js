
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../redux/productSlice';
import { Carousel, Container, Row, Col, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { useNavigate } from 'react-router-dom';


const Products = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { products, status, error } = useSelector((state) => state.products);
  
    useEffect(() => {
      if (status === 'idle') {
        dispatch(fetchProducts());
      }
    }, [dispatch, status]);
  
    const menProducts = products.filter(product => product.gender === 'men');
    const womenProducts = products.filter(product => product.gender === 'women');
  
    const handleOnClick = (productId) => {
      console.log("Navigating to product ID:", productId); // Log the product ID
      navigate(`/products/${productId}`);
    };
  
  return (
    <Container>
      <h2 className="my-4 text-center">Featured Products</h2>
      
      <Carousel>
      <h2 className="text-2xl font-bold mb-4">Men</h2>
      {menProducts.map((product) => (
        <Carousel.Item>
          <Row >
            <Col key={product._id} md={4}>
              <Card>
                <Card.Img variant="top" src="image1.jpg" />
                <Card.Body>
                  <Card.Title>Product 1</Card.Title>
                  <Card.Text>
                    Description of product 1.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card>
                <Card.Img variant="top" src="image2.jpg" />
                <Card.Body>
                  <Card.Title>Product 2</Card.Title>
                  <Card.Text>
                    Description of product 2.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card>
                <Card.Img variant="top" src="image3.jpg" />
                <Card.Body>
                  <Card.Title>Product 3</Card.Title>
                  <Card.Text>
                    Description of product 3.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Carousel.Item>
        {/* Add more Carousel.Items for additional slides */}
      </Carousel>
    </Container>
  );
};

export default Products;
