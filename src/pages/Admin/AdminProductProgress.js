


// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchAllOrders, updateOrderStatus } from "../../redux/orderSlice";
// import { Alert, Spinner, Table, Button } from "react-bootstrap";
// import { Select } from "antd";

// const { Option } = Select;

// const AdminProductProgress = () => {
//   const dispatch = useDispatch();
//   const { orders, orderStatus, orderError } = useSelector((state) => state.orders);

//   useEffect(() => {
//     dispatch(fetchAllOrders(orders._id));
//   }, [dispatch]);

//   const handleStatusUpdate = (orderId, status) => {
//     dispatch(updateOrderStatus({ orderId, status }))
//       .then(() => dispatch(fetchAllOrders())) // Refresh orders after update
//       .catch((error) => console.error('Failed to update status:', error));
//   };

//   const handleSelectChange = (orderId, status) => {
//     handleStatusUpdate(orderId, status);
//   };

//   const calculateOrderTotal = (order) => {
//     if (!order.items || order.items.length === 0) return 0;
//     return order.items.reduce((total, item) => total + (item.productId.price * item.quantity), 0);
//   };

//   return (
//     <div>
//       {orderStatus === 'loading' && <Spinner animation="border" className="loading-spinner" />}
//       {orderStatus === 'failed' && <Alert variant="danger">Error: {orderError}</Alert>}
//       {orderStatus === 'succeeded' && orders && orders.length > 0 ? (
//         <div className='table-container'>
//           <h2 className='order-title'>Your orders</h2>
//           <Table striped bordered hover className="orders-table mt-3">
//             <thead>
//               <tr>
//                 <th>Order ID</th>
//                 <th>Product Name</th>
//                 <th>Quantity</th>
//                 <th>Product Image</th>
//                 <th>Date</th>
//                 <th>Total Price</th>
//                 <th>Status</th>
//                 <th>Actions</th> {/* New column for actions */}
//               </tr>
//             </thead>
//             <tbody>
//               {orders.flatMap((order) =>
//                 order.items.map((item) => (
//                   <tr className='table-contents' key={item._id}>
//                     <td>{order._id}</td>
//                     <td>{item.productId.title}</td>
//                     <td>{item.quantity}</td>
//                     <td>
//                       <img
//                         src={item.productId.image}
//                         alt={item.productId.title}
//                         className="order-product-image"
//                         width="100"
//                       />
//                     </td>
//                     <td>{new Date(order.createdAt).toLocaleDateString()}</td>
//                     <td>${calculateOrderTotal(order).toFixed(2)}</td>
//                     <td>
//                       {/* Display current status here if needed */}
//                       {order.status}
//                     </td>
//                     <td>
//                       {/* Use Select for status updates */}
//                       <Select
//                         defaultValue={order.status}
//                         style={{ width: 120 }}
//                         onChange={(value) => handleSelectChange(order._id, value)}
//                       >
//                         <Option value="pending">Pending</Option>
//                         <Option value="completed">Completed</Option>
//                         <Option value="canceled">Canceled</Option>
//                       </Select>
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </Table>
//         </div>
//       ) : (
//         orderStatus === 'succeeded' && <p>No orders found.</p>
//       )}
//     </div>
//   );
// };

// export default AdminProductProgress;

import React, { useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllOrders, incrementOrderPage, updateOrderStatus } from "../../redux/orderSlice";
import { Alert, Spinner, Table } from "react-bootstrap";
import { Select } from "antd";

const { Option } = Select;

const AdminProductProgress = () => {
  const dispatch = useDispatch();
  const { orders, status, error, page, hasMore } = useSelector((state) => state.orders);
  const observer = useRef();

  useEffect(() => {
    dispatch(fetchAllOrders({ page, limit: 9 }));
  }, [dispatch, page]);

  const lastProductElementRef = useCallback(node => {
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        dispatch(incrementOrderPage());
      }
    });
    if (node) observer.current.observe(node);
  }, [hasMore, dispatch]);

  const handleStatusUpdate = (orderId, status) => {
    dispatch(updateOrderStatus({ orderId, status }))
      .then(() => dispatch(fetchAllOrders({ page, limit: 9 }))) // Refresh orders after update
      .catch((error) => {
        console.error('Failed to update status:', error);
        alert('Failed to update status. Please try again.');
      });
  };

  const calculateOrderTotal = (order) => {
    if (!order.items || order.items.length === 0) return 0;
    return order.items.reduce((total, item) => {
      const price = item.productId?.price || 0; // Default to 0 if price is not defined
      return total + (price * item.quantity);
    }, 0);
  };

  return (
    <div>
      {status === 'loading' && <Spinner animation="border" className="loading-spinner" />}
      {status === 'failed' && <Alert variant="danger">Error: {error}</Alert>}
      {status === 'succeeded' && orders.length > 0 ? (
        <div className='table-container'>
          <h2 className='order-title'>Your orders</h2>
          <Table striped bordered hover className="orders-table mt-3">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Product Name</th>
                <th>Quantity</th>
                <th>Product Image</th>
                <th>Date</th>
                <th>Total Price</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.flatMap((order, index) =>
                order.items.map((item, i) => (
                  <tr className='table-contents' key={item._id} ref={orders.length === index + 1 && i === 0 ? lastProductElementRef : null}>
                    <td>{order._id}</td>
                    <td>{item.productId.title}</td>
                    <td>{item.quantity}</td>
                    <td>
                      <img
                        src={item.productId.image}
                        alt={item.productId.title}
                        className="order-product-image"
                        width="100"
                      />
                    </td>
                    <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                    <td>${calculateOrderTotal(order).toFixed(2)}</td>
                    <td>{order.status}</td>
                    <td>
                      <Select
                        defaultValue={order.status}
                        style={{ width: 120 }}
                        onChange={(value) => handleStatusUpdate(order._id, value)}
                      >
                        <Option value="pending">Pending</Option>
                        <Option value="completed">Completed</Option>
                        <Option value="canceled">Canceled</Option>
                      </Select>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        </div>
      ) : (
        status === 'succeeded' && <p>No orders found.</p>
      )}
    </div>
  );
};

export default AdminProductProgress;
