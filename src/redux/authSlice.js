import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api/api';

const initialState = {
  token: localStorage.getItem('token') || null,
  user: JSON.parse(localStorage.getItem('user')) || null,
  orders: [],
  status: 'idle',
  error: null
};

// Thunks

export const login = createAsyncThunk('auth/login', async (credentials, { rejectWithValue }) => {
  try {
    const response = await api.post('/login', credentials);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      // Handle token expiration or invalid token scenario
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
    return rejectWithValue(error.response.data);
  }
});

export const adminLogin = createAsyncThunk('auth/adminLogin', async (admin) => {
  try {
    const response = await api.post('/admin-login', admin);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      // Handle token expiration or invalid token scenario
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
    return (error.response.data);
  }
});


export const register = createAsyncThunk('auth/register', async (userData) => {
  const response = await api.post('/register', userData);
  return response.data;
});

// New thunk for fetching user profile
export const fetchUserProfile = createAsyncThunk('auth/fetchUserProfile', async (profileId) => {
  const response = await api.get(`/profiles/${profileId}`);
  return response.data;
});

export const fetchUserOrders = createAsyncThunk('auth/fetchUserOrders', async (userId) => {
  const response = await api.get(`/orders/${userId}`);
  console.log('User ORders', response)
  return response.data; 
});

// New thunk for editing user profile
export const editUserProfile = createAsyncThunk('auth/editUserProfile', async ({profileId, profileData}) => {
  const response = await api.put(`/profiles/${profileId}`, profileData);
  return response.data;
});



// New thunk for logout
// export const logout = createAsyncThunk('auth/logout', async () => {
//   const response = await api.post('/logout');
//   return response.data;
// });
export const logout = createAsyncThunk('auth/logout', async (_, { rejectWithValue }) => {
  try {
    const response = await api.post('/logout');
    localStorage.removeItem('token'); // Remove token from localStorage
    localStorage.removeItem('user');  // Remove user data from localStorage
    return response.data;
  } catch (error) {
    console.error('Logout error:', error);
    return rejectWithValue(error.response ? error.response.data : 'Logout failed');
  }
});


const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetAuthState: (state) => {
      state.user = null;
      state.token = null;
      state.status = 'idle';
      state.error = null;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
        state.token = action.payload.successToken;
        localStorage.setItem('token', action.payload.successToken);
        localStorage.setItem('user', JSON.stringify(action.payload.user));
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(adminLogin.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(adminLogin.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
        // state.token = action.payload.successToken;
        // localStorage.setItem('token', action.payload.successToken);
        // localStorage.setItem('user', JSON.stringify(action.payload.user));
      })
      .addCase(adminLogin.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(register.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(register.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
        state.token = action.payload.successToken;
        localStorage.setItem('token', action.payload.successToken);
        localStorage.setItem('user', JSON.stringify(action.payload.user));
      })
      .addCase(register.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchUserProfile.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.status = 'succeeded';
        if (state.user) {
          state.user.profile = action.payload;
          localStorage.setItem('user', JSON.stringify(state.user));
        }
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchUserOrders.pending, (state) => {
        state.orderStatus = 'loading';
      })
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.orderStatus = 'succeeded';
        state.orders = action.payload;
      })
      .addCase(fetchUserOrders.rejected, (state, action) => {
        state.orderStatus = 'failed';
        state.orderError = action.error.message;
      })
      .addCase(editUserProfile.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(editUserProfile.fulfilled, (state, action) => {
        state.status = 'succeeded';
        if(state.user) {
          state.user.profile = action.payload;
          localStorage.setItem('user', JSON.stringify(state.user));
        }
      })
      .addCase(editUserProfile.rejected, (state, action) => {
        state.status ='failed';
        state.error = action.error.message;
      })
      .addCase(logout.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(logout.fulfilled, (state) => {
        state.status = 'succeeded';
        state.user = null;
        state.token = null;
        localStorage.removeItem('token');
        localStorage.removeItem('user');

      })
      .addCase(logout.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export const { resetAuthState } = authSlice.actions;

export default authSlice.reducer;
