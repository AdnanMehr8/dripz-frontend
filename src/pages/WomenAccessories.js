import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, incrementPage } from "../redux/productSlice";
import { Button, Col, Row, Container, Spinner } from 'react-bootstrap';
import api from "../api/api";
import '../styles/Men.css';

function WomenAccessories() {
  const dispatch = useDispatch();
  const { products, page, status, error, hasMore } = useSelector((state) => state.products);
  const [quantity, setQuantity] = useState(1);
  const [cartStatus, setCartStatus] = useState('');
  const observer = useRef();

  useEffect(() => {
    dispatch(fetchProducts({ page, limit: 9, gender: 'women', category: 'Accessories' }));
  }, [dispatch, page]);

  const lastProductElementRef = useRef();

  useEffect(() => {
    if (status === 'loading') return;
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        dispatch(incrementPage());
      }
    });

    if (lastProductElementRef.current) {
      observer.current.observe(lastProductElementRef.current);
    }
  }, [status, hasMore, dispatch]);

  // if (status === 'loading') {
  //   return <p className="text-center text-xl">Loading...</p>;
  // }

  if (status === 'failed') {
    return <p className="text-center text-xl text-red-500">Error: {error}</p>;
  }

  const handleAddToCart = async (productId) => {
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
    } catch (error) {
      console.error('Error adding item to cart:', error);
      setCartStatus('Failed to add item to cart.');
    }
  };

  return (
    <div className="mx-auto h-15 product-card-container">
      <Container fluid>
        <Row className="text">
          <h2 className="text-2xl font-bold text-center bg-men">Women's Accessories</h2>
        </Row>
        <Row>
          {products.map((product, index) => {
            if (products.length === index + 1) {
              return (
                <Col ref={lastProductElementRef} key={product._id} md={4} className="mb-4">
                  {product.image && (
                    <img src={product.image} alt={product.title} className="product-image object-cover" />
                  )}
                  <div className="p-4">
                    <h3 className="text-lg font-bold mb-2">{product.title}</h3>
                    <p className="text-gray-700 mb-4">{product.description}</p>
                    <p className="text-blue-600 font-semibold">Price: ${product.price}</p>
                    <Button variant="primary" onClick={() => handleAddToCart(product._id)}>Add to Cart</Button>
                    {cartStatus && <p>{cartStatus}</p>}
                  </div>
                </Col>
              );
            } else {
              return (
                <Col key={product._id} md={4} className="mb-4">
                  {product.image && (
                    <img src={product.image} alt={product.title} className="product-image object-cover" />
                  )}
                  <div className="p-4">
                    <h3 className="text-lg font-bold mb-2">{product.title}</h3>
                    <p className="text-gray-700 mb-4">{product.description}</p>
                    <p className="text-blue-600 font-semibold">Price: ${product.price}</p>
                    <Button variant="primary" onClick={() => handleAddToCart(product._id)}>Add to Cart</Button>
                    {cartStatus && <p>{cartStatus}</p>}
                  </div>
                </Col>
              );
            }
          })}
        </Row>
        {status === 'loading' && (
          <div className="text-center my-4">
            <Spinner animation="border" role="status" />
          </div>
        )}
      </Container>
    </div>
  );
}

export default WomenAccessories;
