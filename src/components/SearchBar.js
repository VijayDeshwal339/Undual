import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchProducts, resetProducts } from '../redux/Slice/productsSlice';
import { HiSearch } from 'react-icons/hi'; 

const SearchBar = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(resetProducts());
    dispatch(fetchProducts({ search, skip: 0, limit: 10 }));
  };

  return (
    <form onSubmit={handleSearch} className="mb-4 flex flex-col md:flex-row justify-center items-center">
      <div className="relative w-full md:w-2/3 lg:w-1/2">
        <HiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search for products..."
          className="border border-gray-300 rounded-md px-10 py-2 shadow-lg focus:outline-none focus:ring focus:ring-indigo-300 transition-all duration-300 focus:bg-indigo-50 w-full" // Full width input
        />
      </div>
      <button
        type="submit"
        className="mt-2 md:mt-0 md:ml-4 bg-indigo-600 text-white px-4 py-2 rounded-md shadow-md transition-transform duration-300 hover:bg-indigo-700 transform hover:scale-105"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;
