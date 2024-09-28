// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { setSelectedCategory, fetchCategories } from '../redux/Slice/categoriesSlice'; 
// import { fetchProducts, resetProducts } from '../redux/Slice/productsSlice';
// import { Transition } from '@headlessui/react';

// const CategorySelector = () => {
//   const dispatch = useDispatch();
//   const categories = useSelector((state) => state.categories.categories);
//   const status = useSelector((state) => state.categories.status);

//   useEffect(() => {
//     if (status === 'idle') {
//       dispatch(fetchCategories());
//       dispatch(fetchProducts({ skip: 0, limit: 10 }));
//     }
//   }, [status, dispatch]);

//   const handleCategoryChange = (event) => {
//     const selectedCategory = event.target.value;
//     dispatch(setSelectedCategory(selectedCategory));
//     dispatch(resetProducts());

//     if (!selectedCategory) {
//       dispatch(fetchProducts({ skip: 0, limit: 10 })); // Fetch all products
//     } else {
//       dispatch(fetchProducts({ category: selectedCategory, skip: 0, limit: 10 }));
//     }
//   };

//   return (
//     <div className="mb-4">
//       <label htmlFor="category" className="block text-lg font-semibold text-gray-800">Select Category</label>
//       <Transition
//         show={true}
//         enter="transition-opacity duration-300"
//         enterFrom="opacity-0"
//         enterTo="opacity-100"
//         leave="transition-opacity duration-300"
//         leaveFrom="opacity-100"
//         leaveTo="opacity-0"
//       >
//         <select
//           id="category"
//           onChange={handleCategoryChange}
//           className="mt-2 block w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300 hover:bg-indigo-100"
//         >
//           <option value="">-- Select a Category --</option>
//           {categories && categories.length > 0 ? (
//             categories.map((category) => (
//               <option key={category.slug} value={category.slug}>
//                 {category.name}
//               </option>
//             ))
//           ) : (
//             <option value="">No categories available</option>
//           )}
//         </select>
//       </Transition>
//     </div>
//   );
// };

// export default CategorySelector;

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedCategory, fetchCategories } from '../redux/Slice/categoriesSlice'; 
import { fetchProducts, resetProducts } from '../redux/Slice/productsSlice';
import { Transition } from '@headlessui/react';

const CategorySelector = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.categories);
  const status = useSelector((state) => state.categories.status);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchCategories());
      dispatch(fetchProducts({ skip: 0, limit: 10 }));
    }
  }, [status, dispatch]);

  const handleCategoryChange = (event) => {
    const selectedCategory = event.target.value;
    dispatch(setSelectedCategory(selectedCategory));
    dispatch(resetProducts());

    if (!selectedCategory) {
      dispatch(fetchProducts({ skip: 0, limit: 10 })); // Fetch all products
    } else {
      dispatch(fetchProducts({ category: selectedCategory, skip: 0, limit: 10 }));
    }
  };

  return (
    <div className="mb-4">
      <label htmlFor="category" className="block text-lg font-semibold text-gray-800">Select Category</label>
      <Transition
        show={true}
        enter="transition-opacity duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-300"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <select
          id="category"
          onChange={handleCategoryChange}
          className="mt-2 block w-full md:w-1/2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300 hover:bg-indigo-100"
        >
          <option value="">-- Select a Category --</option>
          {categories && categories.length > 0 ? (
            categories.map((category) => (
              <option key={category.slug} value={category.slug}>
                {category.name}
              </option>
            ))
          ) : (
            <option value="">No categories available</option>
          )}
        </select>
      </Transition>
    </div>
  );
};

export default CategorySelector;

