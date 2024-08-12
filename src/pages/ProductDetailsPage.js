import React, { useEffect, useState } from 'react';
import { Container, Card, Button, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import api from '../api/api';
import { useParams } from 'react-router-dom';
import '../styles/ProductDetailsPage.css'; // Assuming you have a CSS file for custom styles

const ProductDetailsPage = () => {
  const { id: productId } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [cartStatus, setCartStatus] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get(`/products/${productId}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleAddToCart = async () => {
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

  if (!product) return <p>Loading...</p>;

  return (
    <Container className="product-details-container">
      <Card className="product-card">
        <Card.Img variant="top" src={product.image} alt={product.title} />
        <Card.Body>
          <Card.Title className="product-title">{product.title}</Card.Title>
          <Card.Text className="product-price">${product.price.toFixed(2)}</Card.Text>
          <Card.Text className="product-description">{product.description}</Card.Text>
          <div className="quantity-container">
            <label htmlFor="quantity" className="quantity-label">Quantity:</label>
            <input
              id="quantity"
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
              min="1"
              className="quantity-input"
            />
          </div>
          <Button variant="primary" onClick={handleAddToCart} className="add-to-cart-button">
            Add to Cart
          </Button>
          {cartStatus && <Alert variant={cartStatus.includes('Failed') ? 'danger' : 'success'} className="cart-status-alert">{cartStatus}</Alert>}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ProductDetailsPage;
