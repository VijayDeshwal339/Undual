import React from 'react';
import CategorySelector from './components/CategorySelector';
import ProductList from './components/ProductList';
import SearchBar from './components/SearchBar';

const App = () => {
  return (
    <div className="bg-gradient-to-r from-blue-200 to-blue-500 min-h-screen p-4">
      <div className="container mx-auto bg-white rounded-lg shadow-lg p-6">
      <h1 className="text-4xl font-bold mb-6 text-center text-indigo-600">Product List</h1>
        <SearchBar />
        <CategorySelector />
        <ProductList />
      </div>
    </div>
  );
};

export default App;
