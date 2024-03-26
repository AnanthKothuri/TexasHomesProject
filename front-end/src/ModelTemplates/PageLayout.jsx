import './PageLayout.css';
import React, { useState, useEffect } from 'react';
import InstanceCard from './InstanceCard.jsx';
import { PaginationControl } from 'react-bootstrap-pagination-control';
import Colors from '../assets/Colors.js';


function PageLayout({ data = [], pageTitle}) {
    const [numPerPage, setNumPerPage] = useState(15)
    const [start, setStart] = useState(0)
    const [end, setEnd] = useState(0)
    // const [displayedData, setDisplayedData] = useState([])
    const [page, setPage] = useState(1)

    const description = pageTitle == "Shelters" ? "Shelter data describes various homeless shelters and locations throughout Texas. It also includes key details such as the city, address, website, contact information, and more to assist those who need potential resources."
        : pageTitle == "Counties" ? "County data describes different Texas counties and their statistics on homelessness. This includes information such as population, housing units, descriptions, and more." :
        "Event data represents various events throughout Texas to assist homeless shelters and communities. Events contain information about locations, dates, contact information, and requirements for volunteers."

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
            {pageTitle && 
            <div style={{backgroundColor: Colors.beige, borderRadius: 20, padding: 20, margin: 20, paddingLeft: '10%', paddingRight: '10%', textAlign: 'left'}}>
                {/* <header className="page-header" style={{fontSize: 30, padding: 30}}>
                    {pageTitle}
                </header> */}
                <div style={{flexDirection: 'row', display: 'flex', marginTop: 20,}}>
                    {/* <div style={{width: 25, height: 100, backgroundColor: Colors.white, marginRight: 30}}></div> */}
                    <div>
                        <p style={{fontSize: 50, fontWeight: 'bold', fontFamily: 'NotoSans-SemiBold'}}>{pageTitle}</p>
                        <p style={{fontSize: 25, fontFamily: 'NotoSans-Light'}}>{description}</p>
                    </div>
                </div>
            </div>
            }

            {/* search bar */}
            <div style={{backgroundColor: 'lightgray', height: 40, margin: 20}}>
                <p>Put search bar here</p>
            </div>

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
