import { useState } from 'react';
import {styles} from "../../styles/styleClasses"
import { FaSearch } from 'react-icons/fa';
import Link from 'next/link';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()){
      setShowResults(false);
      setResults([]);
      return;
    }
    setIsSearching(true);
    try{
      const res = await fetch(`/api/products/search?q=${query}`);
      const data = await res.json();
      console.log('Search results:', data);
      setResults(data);
      setShowResults(true);
    } catch (error) {
      console.error('Error fetching search results:', error);
      setResults([]);
      setShowResults(false); // Hide on error too
    } finally {
      setIsSearching(false);
    }
  };

  // Hide results when input changes to empty
  const handleInputChange = (e) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    
    if (!newQuery.trim()) {
      setShowResults(false);
      setResults([]);
    }
  };

  return (
    <div className='relative'>
      <form onSubmit={handleSearch} className="flex items-center border border-gray-300 rounded-lg bg-white overflow-hidden ">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSearch(e); // Handle Enter key
            }
          }}
          className="flex-1 px-3 py-2 border-none outline-none text-black placeholder:text-gray-500 focus:ring-0"
          placeholder="Buscar productos..."
        >
        </input>
        <button 
        type="submit"
        className="px-3 py-2 hover:bg-gray-100 transition-colors">
          <FaSearch className="text-gray-600 w-4 h-4"/>
        </button>
      </form>

      {/* Conditional rendering for search results */}
      {showResults && (
        <div className="absolute mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
          {isSearching ? (
            <p className="p-4 text-gray-600">Buscando...</p>
          ) : (
            results.map((product) => (
              <div key={product._id} className="p-4 border-b border-gray-300">
                <h3 className="font-semibold text-sm text-gray-800">{product.name}</h3>
                <img src={product.imageUrl}
                 alt={product.name} 
                 className="w-16 h-16 object-fit my-2"
                 />
                <p className="text-sm text-gray-800">${product.price}</p>
                <Link href={`/products/${product._id}`} className="text-blue-500 hover:underline">Ver producto</Link>
              </div>
            ))
          )}
        </div>  
      )}
    </div>
  );
};

export default SearchBar;
