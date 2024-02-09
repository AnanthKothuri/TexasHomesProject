import React from 'react';
import InstanceCard from './InstanceCard.jsx';
import './PageLayout.css';

function PageLayout({ data = [], pageTitle}) {

  return (
    <div className="container text-center">

        {/* title */}
        {pageTitle && <header className="page-header" style={{fontSize: 30, padding: 30}}>
            {pageTitle}
        </header>}

        {/* search bar */}

        {/* grid */}
        <div class="row row-cols-3">
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
