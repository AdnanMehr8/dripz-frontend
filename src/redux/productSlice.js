import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api/api';


const initialState = {
  product: null,
  products: [],
  page: 1,
  status: 'idle',
  error: null,
  hasMore: true
};


// Thunks
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async ({ page, limit, gender, category }) => {
    const response = await api.get(`/products`, {
      params: { _limit: limit, _page: page, gender, categories_like: category }
    });
    return response.data;
  }
);
export const fetchAllProducts = createAsyncThunk('products/fetchAllProducts', async () => {
  const response = await api.get(`/all-products`)
  return response.data;
});
// productSlice.js
// export const fetchProducts = createAsyncThunk('products/fetchProducts', async ({ page, limit }) => {
//   const response = await api.get(`/products?page=${page}&limit=${limit}`);
//   return response.data;
// });


export const fetchProduct = createAsyncThunk('products/fetchProduct', async (id) => {
  const response = await api.get(`/products/${id}`);
  return response.data;
});

export const updateProduct = createAsyncThunk('products/updateProduct', async (id) => {
  const response = await api.put(`/products/${id}`);
  return response.data;
});

export const deleteProduct = createAsyncThunk('products/deleteProduct', async (id) => {
  const response = await api.delete(`/products/${id}`);
  return response.data;
});

export const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    incrementPage(state){
      state.page += 1;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      // .addCase(fetchProducts.fulfilled, (state, action) => {
      //   state.status = 'succeeded';
      //   // state.products = action.payload;
      //   state.products = [...state.products, ...action.payload];
      //   // state.page += 1;
      //   // state.hasMore = action.payload.length > 0;
      // })
      // .addCase(fetchProducts.fulfilled, (state, action) => {
      //   state.status = 'succeeded';
      //   state.products = [...state.products, ...action.payload];
      //   state.hasMore = action.payload.length > 0;
      // })
      // .addCase(fetchProducts.fulfilled, (state, action) => {
      //   state.status = 'succeeded';
      //   state.products = [...state.products, ...action.payload];
      //   state.totalPages = action.payload.totalPages;
      // })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const { products, totalProducts, totalPages, currentPage } = action.payload;
        if (currentPage === 1) {
          state.products = products;
        } else {
          state.products = [...state.products, ...products];
        }
        state.hasMore = currentPage < totalPages;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchProduct.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload;
      })
      .addCase(fetchProduct.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchAllProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload;
        // console.log('Products fetched:', action.payload);
        // // state.products = Array.isArray(action.payload) ? action.payload : [];
        // state.products = [...state.products, ...action.payload.products];
        // state.hasMore = action.payload.currentPage < action.payload.totalPages;
      })
      
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(updateProduct.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = [...state.products, ...action.payload]
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.status ='failed';
        state.error = action.error.message;
      })
      .addCase(deleteProduct.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export const { incrementPage } = productSlice.actions;

export default productSlice.reducer;
