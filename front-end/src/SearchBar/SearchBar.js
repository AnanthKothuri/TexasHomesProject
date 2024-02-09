import React from 'react';
import './SearchBar.css'; // Make sure to create a corresponding CSS file for styling

function SearchBar() {
  return (
    <div className="search-bar">
      <input type="text" placeholder="Search" />
      {/* Add filter dropdowns here when you're ready to implement filtering */}
    </div>
  );
}

export default SearchBar;
