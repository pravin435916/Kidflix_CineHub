import { createSlice } from '@reduxjs/toolkit';

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
  },
  reducers: {
    addItem: (state, action) => {
      const itemToAdd = action.payload;
      if (!state.items.some(item => item.imdbID === itemToAdd.imdbID)) {
        state.items.push(itemToAdd);
      }
    },
    removeItem: (state, action) => {
      state.items = state.items.filter(item => item.imdbID !== action.payload);
    },    
  },
});

export const { addItem , removeItem } = cartSlice.actions;

export const selectCartItems = (state) => state.cart.items;

export default cartSlice.reducer;
