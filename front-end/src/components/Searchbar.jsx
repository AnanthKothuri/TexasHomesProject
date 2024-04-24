// SearchBar.jsx
import React from "react";

function SearchBar({ searchQuery, setSearchQuery, placeholder }) {
  return (
    <div style={{ margin: 20 }}>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder={placeholder}
        style={{ width: "100%", padding: 10, borderRadius: 20, borderWidth: 1}}
      />
    </div>
  );
}

export default SearchBar;
