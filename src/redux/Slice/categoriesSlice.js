import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchCategories = createAsyncThunk('categories/fetchCategories', async () => {
  const response = await axios.get('https://dummyjson.com/products/categories');
  return response.data;
});

const categoriesSlice = createSlice({
  name: 'categories',
  initialState: {
    categories: [],
    selectedCategory: '',
    status: 'idle',
  },
  reducers: {
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const { setSelectedCategory } = categoriesSlice.actions;
export default categoriesSlice.reducer;
