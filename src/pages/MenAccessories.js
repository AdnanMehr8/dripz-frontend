import React, { useEffect, useState, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, incrementPage } from "../redux/productSlice";
import { Button, Col, Row, Container, Spinner, Alert } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import '../styles/Men.css';

function MenAccessories() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products, page, status, error, hasMore } = useSelector((state) => state.products);
  const [quantity] = useState(1);
  const [cartStatus, setCartStatus] = useState('');
  const observer = useRef();

  useEffect(() => {
    dispatch(fetchProducts({ page, limit: 9, gender: 'men', category: 'Accessories' }));
  }, [dispatch, page]);

  const lastProductElementRef = useCallback(node => {
    if (status === 'loading') return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        dispatch(incrementPage());
      }
    });
    if (node) observer.current.observe(node);
  }, [status, hasMore, dispatch]);

  const handleAddToCart = useCallback(async (productId) => {
    try {
      const response = await api.post(
        '/cart/add',
        { productId, quantity },
        {
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );
      setCartStatus('Item added to cart!');
      console.log('Cart response:', response.data);
      setTimeout(() => setCartStatus(''), 3000);
    } catch (error) {
      console.error('Error adding item to cart:', error);
      setCartStatus('Failed to add item to cart.');
      setTimeout(() => setCartStatus(''), 3000);
    }
  }, [quantity]);

  if (status === 'failed') {
    return <Alert variant="danger" className="text-center m-4">An error occurred while loading products. Please try again later.</Alert>;
  }

  return (
    <div className="men-page">
      <Container fluid>
        <Row>
          <h2 className="page-title">Men's Accessories Collection</h2>
        </Row>
        <Row className="product-grid">
          {products.map((product, index) => (
            <Col key={product._id} md={4} className="product-col">
              <div 
                className="product-card" 
                ref={products.length === index + 1 ? lastProductElementRef : null}
                onClick={() => navigate(`/products/${product._id}`)}
              >
                {product.image && (
                  <img src={product.image} alt={product.title} className="product-image" />
                )}
                <div className="product-info">
                  <h3 className="product-title">{product.title}</h3>
                  <p className="product-description">{product.description}</p>
                  <p className="product-price">${product.price}</p>
                  <Button 
                    variant="primary" 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddToCart(product._id);
                    }}
                    aria-label={`Add ${product.title} to cart`}
                  >
                    Add to Cart
                  </Button>
                </div>
              </div>
            </Col>
          ))}
        </Row>
        {status === 'loading' && (
          <div className="spinner-container">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        )}
        {cartStatus && (
          <Alert variant="info" className="cart-status">
            {cartStatus}
          </Alert>
        )}
      </Container>
    </div>
  );
}

export default MenAccessories;