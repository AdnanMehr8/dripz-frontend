import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api/api';

const initialState = {
  cartItems: [],
  status: 'idle',
  error: null,
  cartStatus: '', // New state for tracking add-to-cart status
};

// Thunks

// Fetch all items in the cart
export const fetchAllCartItems = createAsyncThunk('cartitems/fetchAllCartItems', async () => {
  const response = await api.get('/cart');
  console.log(response);
  return response.data;
});

// Add an item to the cart
export const addToCart = createAsyncThunk('cartitems/addToCart', async ({ productId, quantity }) => {
  const response = await api.post(
    '/cart/add',
    { productId, quantity },
    { headers: { 'Content-Type': 'application/json' } }
  );
  console.log(response);
  return response.data;
});

// Update an item in the cart
export const updateCartItem = createAsyncThunk('cartitems/updateCartItem', async ({ productId, quantity }) => {
  const response = await api.put(
    `/cart/update/${productId}`,
    { quantity },
    { headers: { 'Content-Type': 'application/json' } }
  );
  console.log(response);
  return response.data;
});

export const cartSlice = createSlice({
  name: 'cartitems',
  initialState,
  reducers: {
    resetCartState: (state) => {
      state.cartItems = [];
      state.status = 'idle';
      state.error = null;
      state.cartStatus = ''; // Reset cartStatus when resetting the state
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllCartItems.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllCartItems.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.cartItems = action.payload.items;
      })
      .addCase(fetchAllCartItems.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addToCart.pending, (state) => {
        state.cartStatus = 'Adding item to cart...';
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.cartStatus = 'Item added to cart!';
        // Update cartItems with the new state after adding an item
        state.cartItems = action.payload.items;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.cartStatus = 'Failed to add item to cart.';
        state.error = action.error.message;
      })
      .addCase(updateCartItem.pending, (state) => {
        state.cartStatus = 'Updating item quantity...';
      })
      .addCase(updateCartItem.fulfilled, (state, action) => {
        state.cartStatus = 'Item quantity updated!';
        if (action.payload && Array.isArray(action.payload.items)) {
          state.cartItems = action.payload.items.map(item => ({
            ...item,
            productId: item.productId || {}  // Ensure productId is always an object
          }));
        } else {
          console.error('Unexpected payload structure:', action.payload);
        }
      })
      .addCase(updateCartItem.rejected, (state, action) => {
        state.cartStatus = 'Failed to update item quantity.';
        state.error = action.error.message;
      })
      builder.addCase('cartitems/optimisticUpdate', (state, action) => {
        state.cartItems = action.payload;
      });
  },
});

export const { resetCartState } = cartSlice.actions;


export default cartSlice.reducer;

export const selectCartItemCount = (state) => 
    state.cartItems.cartItems.reduce((total, item) => total + item.quantity, 0);