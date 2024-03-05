import './PageLayout.css';
import React, { useState, useEffect } from 'react';
import InstanceCard from './InstanceCard.jsx';
import { PaginationControl } from 'react-bootstrap-pagination-control';


function PageLayout({ data = [], pageTitle}) {
    const [numPerPage, setNumPerPage] = useState(15)
    const [start, setStart] = useState(0)
    const [end, setEnd] = useState(0)
    // const [displayedData, setDisplayedData] = useState([])
    const [page, setPage] = useState(1)

    function updateDisplayedData(page) {
        console.log(page)
        var start = (page - 1) * numPerPage
        var end = page * numPerPage
        if (end > data.length) {
            end = data.length
        }
        setStart(start)
        setEnd(end)
        // setDisplayedData(data.slice(start, end))
    }

    useEffect(() => {
        updateDisplayedData(page);
      }, []);

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
                    data.slice(start, end).map((item, index) => (
                        <div className="col" key={item.name}>
                            <InstanceCard item={item} type={pageTitle} />
                        </div>
                    ))
                )}
            </div>

            {/* pagination */}
            <PaginationControl
                page={page}
                between={4}
                total={data.length}
                limit={numPerPage}
                changePage={(newPage) => {
                    setPage(newPage)
                    updateDisplayedData(newPage)
                }}
                ellipsis={1}
            />

            {/* Footer */}
            <div style={{padding: 30, paddingBottom: 50}}>
                {start+1} - {end} out of {data.length} • {pageTitle}
            </div>
        </div>
    );
}

export default PageLayout;
