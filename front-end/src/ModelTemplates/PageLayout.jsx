import "./PageLayout.css";
import React, { useState, useEffect } from "react";
import InstanceCard from "./InstanceCard.jsx";
import { PaginationControl } from "react-bootstrap-pagination-control";
import Colors from "../assets/Colors.js";
import SearchBar from "../components/Searchbar.jsx";
import useFetchAll from '../hooks/usefetchAll';

function PageLayout({ pageTitle }) {
  const [numPerPage, setNumPerPage] = useState(15);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(15); // Default to numPerPage
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState(""); // Added for search functionality
  const [sortCriterion, setSortCriterion] = useState('');

  const { data, loading, error } = useFetchAll('https://api.texashomesproject.me/' + pageTitle.toLowerCase() + '/', { sort_by: sortCriterion });
  
  const description =
    pageTitle === "Shelters"
      ? "Shelter data describes various homeless shelters and locations throughout Texas. It also includes key details such as the city, address, website, contact information, and more to assist those who need potential resources."
      : pageTitle === "Counties"
      ? "County data describes different Texas counties and their statistics on homelessness. This includes information such as population, housing units, descriptions, and more."
      : pageTitle === "Events"
      ? "Event data represents various events throughout Texas to assist homeless shelters and communities. Events contain information about locations, dates, contact information, and requirements for volunteers."
      : "";

  useEffect(() => {
    const newEnd =
      page * numPerPage > (data?.length || 0) ? data?.length : page * numPerPage;
    setStart((page - 1) * numPerPage);
    setEnd(newEnd);
  }, [page, data, numPerPage]);
  if (loading) return <div>Loading...</div>;
if (error) return <div>Error: {error}</div>;
if (!data) return <div>No data available</div>;

// Continue with rendering using `data`

  const filteredData = searchQuery
    ? data.filter((item) => {
        const searchLower = searchQuery.toLowerCase();
        return Object.values(item).some(
          (value) =>
            typeof value === "string" &&
            value.toLowerCase().includes(searchLower)
        );
      })
    : data;

  return (
    <div className="container text-center">
      {pageTitle && (
        <div
          style={{
            backgroundColor: Colors.beige,
            borderRadius: 20,
            padding: 20,
            margin: 20,
            paddingLeft: "10%",
            paddingRight: "10%",
            textAlign: "left",
          }}
        >
          <div
            style={{
              flexDirection: "row",
              display: "flex",
              marginTop: 20,
              marginBottom: 20,
            }}
          >
            <div>
              <p
                style={{
                  fontSize: 50,
                  fontWeight: "bold",
                  fontFamily: "NotoSans-SemiBold",
                  fontStyle: "italic",
                }}
              >
                {pageTitle}
              </p>
              <p style={{ fontSize: 25, fontFamily: "NotoSans-Light" }}>
                {description}
              </p>
            </div>
          </div>
        </div>
      )}
      <div style={{ marginBottom: 20 }}>
    {/* THESE ARE FOR COUNTIES */}

  <button onClick={() => { setSortCriterion('name');}}>Sort Name</button>
  <button onClick={() => { setSortCriterion('housing_units');}}>Sort Housing Units</button>
  <button onClick={() => { setSortCriterion('population');}}>Sort Population</button>

      {/* THESE ARE FOR EVENTS */}
  <button onClick={() => { setSortCriterion('title');}}>Sort Title</button>
  <button onClick={() => { setSortCriterion('organization');}}>Sort Organization</button>
  <button onClick={() => { setSortCriterion('date_posted');}}>Sort Day Posted</button>
  <button onClick={() => { setSortCriterion('address');}}>Sort Address</button>

      {/* THESE ARE FOR SHELTERS */}
  <button onClick={() => { setSortCriterion('city');}}>Sort City</button>
  <button onClick={() => { setSortCriterion('name');}}>Sort Name</button>
  <button onClick={() => { setSortCriterion('address');}}>Sort Address</button>
  {/* Repeat for other sort criteria */}
</div>
      {/* From Searchbar.jsx*/}
      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        placeholder={`Search ${pageTitle}`}
      />
      
      <div className="row row-cols-auto" style={{ justifyContent: "center" }}>
        {filteredData.slice(start, end).map((item, index) => (
          <div className="col" key={index}>
            {" "}
            {/* Changed to use index as key to avoid potential key duplication */}
            <InstanceCard item={item} type={pageTitle} searchQuery={searchQuery}/>
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
