import React from 'react';
import InstanceCard from './InstanceCard.jsx';
import './PageLayout.css';

function PageLayout({ data = [], pageTitle}) {
    let totalCommits = 0;
    let totalIssues = 0;
    if (pageTitle === "Meet the Team") {
        for (const entry of data) {
            totalCommits += entry.num_commits;
            totalIssues += entry.num_issues;
        }
    }
    // useful for rending totalCommits + totalIssues for AboutPage
    const renderStat = (label, value) => (
        <>
            <b>{label}: </b>
            <span style={{ color: "#7c94b4" }}>{value}</span>
        </>
    );

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

            {/* Stats for AboutPage */}
            {pageTitle === "Meet the Team" && (
                <div className="container text-center" style={{display: 'block'}}>
                <header className="page-header" style={{ fontSize: 30, padding: 30, paddingBottom: 15 }}>
                    Total Stats
                </header>
                <p style={{ fontSize: '1.2em', paddingLeft: 120, paddingRight: 120, fontFamily: 'monospace' }}>
                    {renderStat("Total commits", totalCommits)}
                    <br/>
                    {renderStat("Total issues", totalIssues)}
                </p>
                </div>
            )}
            <div style={{padding: 30, paddingBottom: 50}}>
                {data.length} out of {data.length} • {pageTitle}
            </div>
        </div>
    );
}

export default PageLayout;
