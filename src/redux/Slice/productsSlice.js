import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async ({ category, skip, limit, search }) => {
    let url = `https://dummyjson.com/products?skip=${skip}&limit=${limit}`;
    if (category) url = `https://dummyjson.com/products/category/${category}?skip=${skip}&limit=${limit}`;
    if (search) url = `https://dummyjson.com/products/search?q=${search}&skip=${skip}&limit=${limit}`;

    const response = await axios.get(url);
    return response.data;
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    status: 'idle',
    totalCount: 0,
  },
  reducers: {
    resetProducts(state) {
      state.products = [];
      state.totalCount = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload.products;
        state.totalCount = action.payload.total;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.status = 'error';
      });
  },
});

export const { resetProducts } = productsSlice.actions;
export default productsSlice.reducer;
