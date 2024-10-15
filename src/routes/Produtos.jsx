import filter from '../assets/filter.png';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Produtos = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(16);
  const [sortOption, setSortOption] = useState('Default');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/posts');
        setProducts(response.data);
        setFilteredProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    let sortedProducts = [...products];
    
    if (sortOption === 'A to Z') {
      sortedProducts.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortOption === 'Z to A') {
      sortedProducts.sort((a, b) => b.title.localeCompare(a.title));
    } else if (sortOption === 'Default') {
      sortedProducts = [...products];
    }

    setFilteredProducts(sortedProducts);
    setCurrentPage(1);
  }, [sortOption, products]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filteredProducts, itemsPerPage]);

  const getPaginatedProducts = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredProducts.slice(startIndex, endIndex);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleFilterChange = (category) => {
    if (category === 'All') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(product => product.category.includes(category)));
    }
    setIsFilterOpen(false);
  };

  const handleSortChange = (value) => {
    setSortOption(value);
  };

  return (
    <div className='mt-20'>
      <div className="w-full px-4 py-8 bg-secondary flex justify-between">
        <div className="flex max-w-[1536px] mx-auto">
          <ul>
            <li>
              <div className="flex items-center gap-5 cursor-pointer" onClick={() => setIsFilterOpen(!isFilterOpen)}>
                <img src={filter} alt="filtro" />
                <span>Filtro</span>
              </div>
            </li>
            {isFilterOpen && (
              <div className="absolute w-48 bg-white border border-gray-300 shadow-md z-50 rounded-lg">
                <ul>
                  <li className="cursor-pointer p-2 hover:bg-gray-200" onClick={() => handleFilterChange('All')}>Todos</li>
                  <li className="cursor-pointer p-2 hover:bg-gray-200" onClick={() => handleFilterChange('Suporte-para-tv')}>Suporte para TV</li>
                </ul>
              </div>
            )}
          </ul>
        </div>
        <div className='max-w-[1536px] mx-auto'>
          <span>Ordenar por: </span>
          <select onChange={(e) => handleSortChange(e.target.value)} className="border border-gray-300 rounded">
            <option value="Default">Default</option>
            <option value="A to Z">A to Z</option>
            <option value="Z to A">Z to A</option>
          </select>
        </div>
      </div>
      <div className="flex justify-center xl:justify-center items-center max-w-[1536px] mx-auto mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-4">
          {getPaginatedProducts().map(product => (
            <div key={product.id} className="w-[285px] h-[350px] m-4 relative group bg-secondary rounded-lg">
              <Link to={`/produtos/${product.id}`}>
              <img src={`${product.image}`} alt={product.title} className="w-full h-[250px] object-cover mb-4" />
              <div className='flex flex-col items-center'>
                <h3 className="text-2xl font-semibold">{product.title}</h3>
                <p className="text-base text-tertiary">{product.text}</p>
              </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
      {filteredProducts.length > itemsPerPage && (
        <div className="flex justify-center mt-10 gap-[38px]">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`mx-1 px-3 py-2 w-[100px] h-[60px] rounded-[10px] ${currentPage === 1 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-subheader'}`}
          >
            Prev
          </button>
          {Array.from({ length: Math.ceil(filteredProducts.length / itemsPerPage) }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={`mx-1 px-3 py-2 w-[60px] h-[60px] rounded-[10px] ${currentPage === index + 1 ? 'bg-button text-white' : 'bg-subheader'}`}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage >= Math.ceil(filteredProducts.length / itemsPerPage)}
            className={`mx-1 px-3 py-2 w-[100px] h-[60px] rounded-[10px] ${currentPage >= Math.ceil(filteredProducts.length / itemsPerPage) ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-subheader'}`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Produtos;
