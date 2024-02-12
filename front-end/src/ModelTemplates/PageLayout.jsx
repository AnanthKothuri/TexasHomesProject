import React from 'react';
import InstanceCard from './InstanceCard.jsx';
import './PageLayout.css';

function PageLayout({ data = [], pageTitle}) {
  // organize cards on about page in sets of 4 columns rather than 3
  let gridClass = pageTitle == "About Us" ? "row row-cols-4" : "row row-cols-3";

  return (
    <div className="container text-center">

        {/* title */}
        {pageTitle && <header className="page-header" style={{fontSize: 30, padding: 30}}>
            {pageTitle}
        </header>}

        {/* search bar */}

        {/* grid */}
        <div class={gridClass}>
            {data.length === 0 ? (
            <div>No items found.</div>
            ) : (
            data.map((item, index) => (
                <div class="col">
                    <InstanceCard item={item} type={pageTitle} />
                </div>
            ))
            )}
        </div>
    </div>
  );
}

export default PageLayout;
