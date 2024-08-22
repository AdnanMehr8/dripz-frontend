import React, { useEffect, useState } from 'react';
import { Card, Button, Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import api from '../api/api'; // Adjust the import based on your project structure
import { useParams } from 'react-router-dom';
import '../styles/ProductDetailsPage.css';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import Slider from 'react-slick';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import { FreeMode, Pagination } from 'swiper';


const ProductDetailsPage = () => {
  const { id: productId } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [primaryImage, setPrimaryImage] = useState('');
  const [relatedProducts, setRelatedProducts] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get(`/products/${productId}`);
        setProduct(response.data);
        setPrimaryImage(response.data.image);
        await fetchRelatedProducts(response.data.gender, response.data.categories);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    const fetchRelatedProducts = async (gender, categories) => {
      try {
        const categoriesArray = categories.split(','); // Convert categories string to array
        const response = await api.get(`/products?gender=${gender}&categories=${categoriesArray.join(',')}`);
        setRelatedProducts(response.data.products || []);
      } catch (error) {
        console.error('Error fetching related products:', error);
      }
    };

    fetchProduct();
  }, [productId]);

  const onClickImageAngles = (imageUrl) => {
    const primaryImageElement = document.querySelector('.primary-image');
    primaryImageElement.style.opacity = '0';
    setTimeout(() => {
      setPrimaryImage(imageUrl);
      primaryImageElement.style.opacity = '1';
    }, 300);
  };

  const handleAddToCart = async (productId, quantity) => {
    try {
      await dispatch(addToCart({ productId, quantity })).unwrap();
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  };

  if (!product) return <p>Loading...</p>;

  return (
    <div>
      <div className="product-details-container">
        <div className="product-details-images-col">
          {product.imageAngles && product.imageAngles.length > 0 && (
            <div className="image-angles">
              {product.imageAngles.map((angle, index) => (
                <img
                  key={index}
                  src={angle}
                  alt={`Angle ${index + 1}`}
                  className="angle-image"
                  onClick={() => onClickImageAngles(angle)}
                />
              ))}
            </div>
          )}
        </div>
        <div className="product-details-card-col">
          <Card className="product-details-card">
            <Card.Img
              variant="top"
              className='primary-image'
              src={primaryImage}
              alt={product.title}
            />
            
            <Card.Body>
              <Card.Title className="product-details-title">{product.title}</Card.Title>
              <Card.Text className="product-details-price">Price: ${product.price.toFixed(2)}</Card.Text>
              <Card.Text className="product-details-description"> Description: {product.description}</Card.Text>
              <Card.Text className="product-details-description">Gender: {product.gender}</Card.Text>
              <Card.Text className="product-details-description">Category: {product.categories}</Card.Text>
              <Card.Text className="product-details-description">Sizes: {product.sizes}</Card.Text>
              <Card.Text className="product-details-description">Colors: {product.colors}</Card.Text>
              <Card.Text className="product-details-description">Inventory: {product.inventory}</Card.Text>

              <div className="product-details-quantity-container">
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

              <Button
                variant="primary"
                onClick={() => handleAddToCart(productId, quantity)}
                className="product-details-add-to-cart-button"
              >
                Add to Cart
              </Button>
            </Card.Body>
       
          </Card>
        </div>
      </div>
      <div className='seperator'></div>
       {/* <div className='recommended-container'>
        <h3>Recommended</h3>
        {relatedProducts.length > 0 ? (
          <Slider {...sliderSettings}>
            {relatedProducts.map((relatedProduct) => (
              <div key={relatedProduct._id} className="related-product-card">
                <Card>
                  <Card.Img variant="top" src={relatedProduct.image} alt={relatedProduct.title} />
                  <Card.Body>
                    <Card.Title>{relatedProduct.title}</Card.Title>
                    <Card.Text>Price: ${relatedProduct.price.toFixed(2)}</Card.Text>
                    <Button variant="primary" onClick={() => handleAddToCart(relatedProduct._id, 1)}>
                      Add to Cart
                    </Button>
                  </Card.Body>
                </Card>
              </div>
            ))}
          </Slider>
        ) : (
          <p>No related products found.</p>
        )}
      </div>
      */}
    <div className="recommended-container">
      <h3>Recommended</h3>
      {relatedProducts.length > 0 ? (
        <Swiper
          grabCursor={true}
          spaceBetween={10}
          slidesPerView={6}
          breakpoints={{
            // Adjust the number of slides per view based on screen size
            320: {
              slidesPerView: 2,
            },
            768: {
              slidesPerView: 4,
            },
            1024: {
              slidesPerView: 6,
            },
          }}
          pagination={{
            clickable: true,
          }}
          className="related-products-swiper"
        >
          {relatedProducts.map((relatedProduct) => (
            <SwiperSlide key={relatedProduct._id} className="related-product-card">
              <Card>
                <Card.Img variant="top" src={relatedProduct.image} alt={relatedProduct.title} />
                <Card.Body>
                  <Card.Title>{relatedProduct.title}</Card.Title>
                  <Card.Text>Price: ${relatedProduct.price.toFixed(2)}</Card.Text>
                  <Button variant="primary" onClick={() => handleAddToCart(relatedProduct._id, 1)}>
                    Add to Cart
                  </Button>
                </Card.Body>
              </Card>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <p>No related products found.</p>
      )}
    </div>
    </div>
  );
};

export default ProductDetailsPage;
