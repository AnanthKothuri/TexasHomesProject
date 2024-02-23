import './PageLayout.css';
import React from 'react';
import InstanceCard from './InstanceCard.jsx';

function PageLayout({ data = [], pageTitle}) {
    return (
        <div className="container text-center">

            {/* title */}
            {pageTitle && <header className="page-header" style={{fontSize: 30, padding: 30}}>
                {pageTitle}
            </header>}

            {/* search bar */}

            {/* grid */}
            <div className="row row-cols-auto" style={{justifyContent: 'center'}}>
                {data.length === 0 ? (
                <div>No items found.</div>
                ) : (
                    data.map((item, index) => (
                        <div className="col" key={item.name}>
                            <InstanceCard item={item} type={pageTitle} />
                        </div>
                    ))
                )}
            </div>

            {/* Footer */}
            <div style={{padding: 30, paddingBottom: 50}}>
                {data.length} out of {data.length} • {pageTitle}
            </div>
        </div>
    );
}

export default PageLayout;
