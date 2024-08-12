import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  checkOutShippingData: []
};

const checkoutSlice = createSlice({
  name: 'checkout',
  initialState,
  reducers: {
    addShippingData: (state, action) => {
      // Replace the entire array with the new data
      state.checkOutShippingData = [action.payload];
    },
    // If you need to append data instead of replacing it, keep this method
    appendShippingData: (state, action) => {
      state.checkOutShippingData.push(action.payload);
    }
  },
});

export const { addShippingData, appendShippingData } = checkoutSlice.actions;
export default checkoutSlice.reducer;
