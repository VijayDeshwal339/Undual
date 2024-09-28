import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../redux/Slice/productsSlice';
import Loader from './Loader';

const ProductList = () => {
  const dispatch = useDispatch();
  const { products, status, totalCount } = useSelector((state) => state.products);
  const { selectedCategory } = useSelector((state) => state.categories);

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;
  const totalPages = Math.ceil(totalCount / productsPerPage);
  const skip = (currentPage - 1) * productsPerPage;

  useEffect(() => {
    const params = {
      skip,
      limit: productsPerPage,
    };

    if (selectedCategory) {
      params.category = selectedCategory; 
    }
    dispatch(fetchProducts(params));
  }, [dispatch, selectedCategory, skip]);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory]);

  const handlePageClick = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const getPaginationNumbers = () => {
    const paginationNumbers = [];
    const maxPagesToShow = 3;

    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    
    if (endPage - startPage < maxPagesToShow - 1) {
      startPage = Math.max(1, endPage - (maxPagesToShow - 1));
    }

    for (let i = startPage; i <= endPage; i++) {
      paginationNumbers.push(i);
    }

    return paginationNumbers;
  };

  if (status === 'loading' && products.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-lg p-4 hover:shadow-2xl transition-shadow duration-300 ease-in-out"
          >
            <img
              src={product.thumbnail}
              alt={product.title}
              className="w-full h-48 object-cover mb-4 rounded-md transition-transform duration-300 transform hover:scale-105"
            />
            <h2 className="text-lg font-semibold mb-2 text-gray-800">{product.title}</h2>
            <p className="text-gray-500 mb-1">
              {product.description.length > 50 ? `${product.description.slice(0, 50)}...` : product.description}
            </p>
            <div className="flex justify-between items-center mb-3">
              <span className="text-indigo-600 font-bold text-xl">${product.price}</span>
              <span
                className={`px-2 py-1 text-sm rounded-full ${
                  product.stock > 0 ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                }`}
              >
                {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination  */}
      <div className="flex flex-col items-center justify-between mt-8 sm:flex-row">
        <div>
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">{(currentPage - 1) * productsPerPage + 1}</span> to{' '}
            <span className="font-medium">{Math.min(currentPage * productsPerPage, totalCount)}</span> of{' '}
            <span className="font-medium">{totalCount}</span> results
          </p>
        </div>
        <nav className="mt-4 sm:mt-0" aria-label="Pagination">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className={`relative inline-flex items-center rounded-l-md px-3 py-2 text-gray-600 bg-white ring-1 ring-gray-300 hover:bg-gray-200 ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            Previous
          </button>
          {/* Pagination numbers */}
          {getPaginationNumbers().map((pageNumber) => (
            <button
              key={pageNumber}
              onClick={() => handlePageClick(pageNumber)}
              className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
                currentPage === pageNumber
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white text-gray-900 ring-1 ring-gray-300 hover:bg-gray-200'
              }`}
            >
              {pageNumber}
            </button>
          ))}
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className={`relative inline-flex items-center rounded-r-md px-3 py-2 text-gray-600 bg-white ring-1 ring-gray-300 hover:bg-gray-200 ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            Next
          </button>
        </nav>
      </div>
    </div>
  );
};

export default ProductList;
