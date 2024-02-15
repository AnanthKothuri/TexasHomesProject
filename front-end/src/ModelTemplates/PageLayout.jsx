import './PageLayout.css';
import React from 'react';
import InstanceCard from './InstanceCard.jsx';
import { Card } from 'react-bootstrap'
import { tools_used } from '../data/about.js';


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
            <span style={{ color: "#2e5e9e" }}>{value}</span>
        </>
    );

    const renderToolsUsed = (tools_used) => {
        return (
            <div className="row row-cols-auto" style={{ display: 'flex', justifyContent: 'center' }}>
              {tools_used.map((tool, index) => (
                <Card key={index} className='card-content mb-4 shadow-sm' style={{ width: 200, padding: 7.5, paddingTop: 20, marginRight: 23 }}>
                  <Card.Img variant="top" src={tool.src} style={{ height: 100, objectFit: 'contain', width: '100%', padding: 5 }} />
                  <Card.Body>
                    <Card.Title style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4em' }}>
                      <b style={{ paddingTop: 7 }}>{tool.name}</b>
                    </Card.Title>
                  </Card.Body>
                </Card>
              ))}
            </div>
          );
    }

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

            {/* Tools Used for AboutPage */}
            {pageTitle === "Meet the Team" && (
                <div className="container text-center" style={{display: 'block'}}>
                    <header className="page-header" style={{ fontSize: 30, padding: 30, paddingBottom: 15 }}>
                        Tools Used
                    </header>
                    {renderToolsUsed(tools_used)}
                </div>
            )}

            {/* Footer */}
            <div style={{padding: 30, paddingBottom: 50}}>
                {data.length} out of {data.length} • {pageTitle}
            </div>
        </div>
    );
}

export default PageLayout;
