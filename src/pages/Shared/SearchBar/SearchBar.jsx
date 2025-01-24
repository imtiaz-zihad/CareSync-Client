/* eslint-disable react/prop-types */
import  { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  return (
    <input
      type="text"
      placeholder="Search camps..."
      value={query}
      onChange={handleSearch}
      className="w-1/5 p-4 mb-4 border-sky-500  border-2 rounded-lg "
 
    />
  );
};

export default SearchBar;
