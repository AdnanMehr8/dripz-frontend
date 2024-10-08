import React, { useEffect, useState, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, incrementPage } from "../redux/productSlice";
import { Button, Col, Row, Container, Spinner, Alert } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import '../styles/Women.css';
import { addToCart, resetCartState } from "../redux/cartSlice";

function Women() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products, page, status, error, hasMore } = useSelector((state) => state.products);
  const cartStatus = useSelector((state) => state.cartItems.cartStatus);
  const [quantity] = useState(1);
  const observer = useRef();

  useEffect(() => {
    dispatch(fetchProducts({ page, limit: 9, gender: 'women', category: 'Women' }));
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

  const handleAddToCart = async (productId, quantity) => {
    try {
      await dispatch(addToCart({ productId, quantity })).unwrap();
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  };

  if (status === 'failed') {
    return <Alert variant="danger" className="text-center m-4">An error occurred while loading products. Please try again later.</Alert>;
  }

  return (
    <div className="men-page">
      <Container fluid>
        <Row>
          <h2 className="page-title">Women's Collection</h2>
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
                      // handleAddToCart(product._id);
                      handleAddToCart(product._id, quantity)
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

export default Women;