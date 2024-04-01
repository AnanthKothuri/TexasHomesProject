import './PageLayout.css';
import React, { useState, useEffect } from 'react';
import InstanceCard from './InstanceCard.jsx';
import { PaginationControl } from 'react-bootstrap-pagination-control';
import Colors from '../assets/Colors.js';
import SearchBar from '../components/Searchbar.jsx';

function PageLayout({ data = [], pageTitle }) {
    const [numPerPage, setNumPerPage] = useState(15);
    const [start, setStart] = useState(0);
    const [end, setEnd] = useState(15); // Default to numPerPage
    const [page, setPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState(''); // Added for search functionality

    const description = pageTitle === "Shelters" ? "Shelter data describes various homeless shelters and locations throughout Texas. It also includes key details such as the city, address, website, contact information, and more to assist those who need potential resources."
        : pageTitle === "Counties" ? "County data describes different Texas counties and their statistics on homelessness. This includes information such as population, housing units, descriptions, and more." 
        : pageTitle === "Events" ? "Event data represents various events throughout Texas to assist homeless shelters and communities. Events contain information about locations, dates, contact information, and requirements for volunteers."
        : "";

    useEffect(() => {
        const newEnd = page * numPerPage > data.length ? data.length : page * numPerPage;
        setStart((page - 1) * numPerPage);
        setEnd(newEnd);
    }, [page, data.length, numPerPage]);


    const filteredData = searchQuery ? data.filter(item => {
        const searchLower = searchQuery.toLowerCase();
        return Object.values(item).some(value => 
            typeof value === 'string' && value.toLowerCase().includes(searchLower)
        );
    }) : data;

    return (
        <div className="container text-center">
            {pageTitle && (
                <div style={{ backgroundColor: Colors.beige, borderRadius: 20, padding: 20, margin: 20, paddingLeft: '10%', paddingRight: '10%', textAlign: 'left' }}>
                    <div style={{ flexDirection: 'row', display: 'flex', marginTop: 20 }}>
                        <div>
                            <p style={{ fontSize: 50, fontWeight: 'bold', fontFamily: 'NotoSans-SemiBold' }}>{pageTitle}</p>
                            <p style={{ fontSize: 25, fontFamily: 'NotoSans-Light' }}>{description}</p>
                        </div>
                    </div>
                </div>
            )}

            {/* From Searchbar.jsx*/}
            <SearchBar
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                placeholder={`Search ${pageTitle}`}
            />

            <div className="row row-cols-auto" style={{ justifyContent: 'center' }}>
                {filteredData.slice(start, end).map((item, index) => (
                    <div className="col" key={index}> {/* Changed to use index as key to avoid potential key duplication */}
                        <InstanceCard item={item} type={pageTitle} />
                    </div>
                ))}
            </div>

            <PaginationControl
                page={page}
                between={4}
                total={filteredData.length}
                limit={numPerPage}
                changePage={(newPage) => setPage(newPage)}
                ellipsis={1}
            />

            <div style={{ padding: 30, paddingBottom: 50 }}>
                {start + 1} - {end} of {filteredData.length} • {pageTitle}
            </div>
        </div>
    );
}

export default PageLayout;
