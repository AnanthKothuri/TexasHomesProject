import React from 'react';
import SearchBar from '../../SearchBar/SearchBar.js';
import Card from '../Card/Card.js';
import './PageLayout.css';

function PageLayout({ data = [], pageTitle }) { // Accept pageTitle as a prop
  console.log('Rendering PageLayout with data:', data);

  return (
    <div>
      {/* Add a header element to display the page title */}
      {pageTitle && <header className="page-header">{pageTitle}</header>}
      <SearchBar />
      <div className="cards-container">
        {data.length === 0 ? (
          <div>No items found.</div> // Or some other placeholder content
        ) : (
          data.map((item, index) => (
            <Card
              key={item.id || index} // Fallback to index if id is not present
              image={item.image}
              title={item.title}
              description={item.description}
              buttonText="Learn More"
            />
          ))
        )}
      </div>
    </div>
  );
}

export default PageLayout;
