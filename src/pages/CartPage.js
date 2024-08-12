// import React, { useEffect, useState } from 'react';
// import { Container, Table, Button, Alert, Spinner } from 'react-bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import api from '../api/api';
// import '../styles/CartPage.css'; // Assuming you have a CSS file for custom styles

// const CartPage = () => {
//   const [cartItems, setCartItems] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchCartItems = async () => {
//       try {
//         const response = await api.get('/cart');
//         console.log('Cart items response:', response.data); // Debugging line
//         if (response.data.items) {
//           setCartItems(response.data.items);
//         } else {
//           console.error('Cart items not found in response');
//         }
//       } catch (error) {
//         setError('No user authenticated.');
//         console.error('Error fetching cart items:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCartItems();
//   }, []);

//   return (
//     <Container className="cart-page-container">
//       <h2 className="cart-heading">Your Cart</h2>
//       {loading && <Spinner animation="border" className="loading-spinner" />}
//       {error && <Alert variant="danger">{error}</Alert>}
//       <Table striped bordered hover className="cart-table">
//         <thead>
//           <tr>
//             <th>Product</th>
//             <th>Quantity</th>
//             <th>Price</th>
//             <th>Total</th>
//           </tr>
//         </thead>
//         <tbody>
//           {Array.isArray(cartItems) && cartItems.length > 0 ? (
//             cartItems.map(item => (
//               <tr key={item._id}>
//                 <td>{item.productId?.title || 'N/A'}</td>
//                 <td>{item.quantity}</td>
//                 <td>${item.productId?.price?.toFixed(2) || '0.00'}</td>
//                 <td>${(item.quantity * item.productId?.price)?.toFixed(2) || '0.00'}</td>
               
//               </tr>
             
//             ))
            
//           ) : (
//             <tr>
//               <td colSpan="4">No items in cart</td>
//             </tr>
//           )}
//         </tbody>
//       </Table>
//       <Button variant="primary" href="/checkout" className="checkout-button">
//         Proceed to Checkout
//       </Button>
//     </Container>
//   );
// };

// export default CartPage;
import React, { useEffect, useState } from 'react';
import { Container, Table, Button, Alert, Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import api from '../api/api';
import '../styles/CartPage.css'; // Assuming you have a CSS file for custom styles

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await api.get('/cart');
        console.log('Cart items response:', response.data); // Debugging line
        if (response.data.items) {
          setCartItems(response.data.items);
        } else {
          console.error('Cart items not found in response');
        }
      } catch (error) {
        setError('No user authenticated.');
        console.error('Error fetching cart items:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, []);

  return (
    <Container className="cart-page-container">
      <h2 className="cart-heading">Your Cart</h2>
      {loading && <Spinner animation="border" className="loading-spinner" />}
      {error && <Alert variant="danger">{error}</Alert>}
      <Table striped bordered hover className="cart-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Product</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(cartItems) && cartItems.length > 0 ? (
            cartItems.map(item => (
              <tr key={item._id}>
                <td>
                  {item.productId?.image ? (
                    <img
                      src={item.productId.image}
                      alt={item.productId.title || 'Product Image'}
                      className="cart-item-image"
                    />
                  ) : (
                    'No image'
                  )}
                </td>
                <td>{item.productId?.title || 'N/A'}</td>
                <td>{item.quantity}</td>
                <td>${item.productId?.price?.toFixed(2) || '0.00'}</td>
                <td>${(item.quantity * item.productId?.price)?.toFixed(2) || '0.00'}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No items in cart</td>
            </tr>
          )}
        </tbody>
      </Table>
      <Button variant="primary" href="/checkout" className="button">
        Proceed to Checkout
      </Button>
    </Container>
  );
};

export default CartPage;
