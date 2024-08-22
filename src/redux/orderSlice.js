// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import api from "../api/api";

// const initialState = {
//     orders: []
// };

// // Async thunk for creating a new order
// export const createOrder = createAsyncThunk('order/createOrder', async (orderData) => {
//     const response = await api.post('/order', orderData); 
//     return response.data;
//   });

//   export const fetchAllOrders = createAsyncThunk('order/fetchAllOrders', async ({page, limit,}) => {
//     const response = await api.get('/admin-orders', {
//       params: { _limit: limit, _page: page }
//     }); 
//     console.log('Admin Dashboard orders: ', response);
//     return response.data;
//     console.log(response.data.orders)
//   });

  
//   export const updateOrderStatus = createAsyncThunk('order/updateStatus', async ({ orderId, status }) => {
//     const response = await api.patch(`/order/${orderId}`, { status });
//     return response.data;
//   });

//   const orderSlice = createSlice({
//     name: 'orders',
//     initialState: {
//       orders: [],
//       status: 'idle',
//       error: null,
//       page: 1,
//       hasMore: true
//     },
//     reducers: {
//         resetOrderState: (state) => {
//             state.orders = [];
//         },
//         incrementOrderPage(state){
//           state.page += 1;
//         }
//     },
//     extraReducers: (builder) => {
//         builder
//         .addCase(createOrder.pending, (state) => {
//             state.status = 'loading';
//           })
//           .addCase(createOrder.fulfilled, (state, action) => {
//             state.status = 'succeeded';
//             state.orders.push(action.payload); // Add the new order to the orders array
//           })
//           .addCase(createOrder.rejected, (state, action) => {
//             state.status = 'failed';
//             state.error = action.error.message;
//           })
//           .addCase(fetchAllOrders.pending, (state) => {
//             state.orderStatus = 'loading';
//           })
//           .addCase(fetchAllOrders.fulfilled, (state, action) => {
//             state.orderStatus = 'succeeded';
//             // state.orders = action.payload;
//         const { orders, totalOrders, totalPages, currentPage } = action.payload;

//             if (currentPage === 1) {
//               state.orders = orders;
//             } else {
//               state.orders = [...state.orders, ...orders];
//             }
//             state.hasMore = currentPage < totalPages;
//           })
//           .addCase(fetchAllOrders.rejected, (state, action) => {
//             state.orderStatus = 'failed';
//             state.orderError = action.error.message;
//           })
//           .addCase(updateOrderStatus.fulfilled, (state, action) => {
//             state.orders = state.orders.map((order) =>
//               order._id === action.payload._id ? action.payload : order
//             );
//           });
//     }
// });

// export const { resetOrderState, incrementOrderPage } = orderSlice.actions;

// export default orderSlice.reducer;
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/api";

const initialState = {
    orders: [],
    lastCreatedOrder: null,
    status: 'idle',
    error: null,
    page: 1,
    hasMore: true
};

// Async thunk for creating a new order
export const createOrder = createAsyncThunk('order/createOrder', async (orderData) => {
    const response = await api.post('/order', orderData); 
    return response.data;
});

export const fetchAllOrders = createAsyncThunk('order/fetchAllOrders', async ({ page, limit }) => {
    const response = await api.get('/admin-orders', {
      params: { _limit: limit, _page: page }
    }); 
    return response.data;
});

export const updateOrderStatus = createAsyncThunk('order/updateStatus', async ({ orderId, status }) => {
    const response = await api.patch(`/order/${orderId}`, { status });
    return response.data;
});

const orderSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        resetOrderState: (state) => {
            state.orders = [];
            state.page = 1;
            state.hasMore = true;
        },
        incrementOrderPage: (state) => {
            state.page += 1;
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(createOrder.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(createOrder.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.orders.push(action.payload);
            state.lastCreatedOrder = action.payload;
        })
        .addCase(createOrder.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        })
        .addCase(fetchAllOrders.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(fetchAllOrders.fulfilled, (state, action) => {
            state.status = 'succeeded';
            const { orders, totalOrders, totalPages, currentPage } = action.payload;

            if (currentPage === 1) {
                state.orders = orders;
            } else {
                state.orders = [...state.orders, ...orders];
            }
            state.hasMore = currentPage < totalPages;
        })
        .addCase(fetchAllOrders.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        })
        .addCase(updateOrderStatus.fulfilled, (state, action) => {
            state.orders = state.orders.map((order) =>
              order._id === action.payload._id ? action.payload : order
            );
        });
    }
});

export const { resetOrderState, incrementOrderPage } = orderSlice.actions;

export default orderSlice.reducer;
