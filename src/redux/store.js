import { configureStore } from '@reduxjs/toolkit';
import categoriesReducer from './Slice/categoriesSlice';
import productsReducer from './Slice/productsSlice';

export const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    products: productsReducer,
  },
});
