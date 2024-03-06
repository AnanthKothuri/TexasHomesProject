import React from 'react';
import './InstanceCard.css'; // Make sure to create a corresponding CSS file for styling
import { useNavigate } from 'react-router-dom';
import {Card, Button} from 'react-bootstrap'

const date_params = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
}

function InstanceCard({item, type}) {
    return (
        <div>
            { type === "Shelters" ? (<ShelterInstanceCard item={item} />) : 
                type === "Counties" ? (<CountyInstanceCard item={item} />) :
                type === "Meet the Team" ? (<DeveloperInstanceCard item={item} />) :
                <EventInstanceCard item={item} />
            }
        </div>
     );
}

export default InstanceCard;

function DeveloperInstanceCard({item}) {

    const roleStyle = {
        fontSize: '0.7em',
        backgroundColor: '#e0edff',
        borderRadius: '7px',
        padding: '2px 6px',
        marginLeft: '10px',
    };

    const statStyle = {
        backgroundColor: '#f2f2f2',
        borderRadius: '7px',
        padding: '4px 8px',
        margin: '0px 2px',
    }

    const renderStat = (label, value) => (
        <span style={statStyle}>
            <b>{label}: </b>
            <span style={{ color: "#6b6b6b" }}>{value}</span>
        </span>
    );

    return (
        <Card className='card-content mb-4 shadow' style={{ width: 400 }}>
            <Card.Img variant="top" src={item.img_src} style={{height: 300, objectFit: 'cover'}} />
            <Card.Body>
                <Card.Title style={{ display: 'flex', alignItems: 'center', justifyContent: 'center'  }}>
                    <b>{item.name}</b>  
                    <span style={roleStyle}>{item.role}</span>
                </Card.Title>
                <Card.Text className='description-text'>{item.description}</Card.Text>
                <Card.Text className='row-attribute' style={{ fontFamily: 'monospace', display: 'flex', justifyContent: 'center' }}>
                    <Card.Text style={{ textAlign: 'center' }}>
                        {renderStat('commits', item.num_commits)} {renderStat('issues', item.num_issues)} {renderStat('tests', item.num_tests)}
                    </Card.Text>
                </Card.Text>
            </Card.Body>
        </Card>
      );
}

function ShelterInstanceCard({item}) {
    let navigate = useNavigate()

    function navigateToShelter() {
        navigate(`/shelters/${item.id}`);
      }
    return (
        <Card className='card-content mb-4' style={{ width: 400 }}>
            <Card.Header>Shelter</Card.Header>
            <Card.Img variant="top" src={item.photo_urls.length !== 0 ? item.photo_urls[0] : ""} style={{height: 250, objectFit: 'cover'}} />
            <Card.Body>
                <Card.Title>{item.name}</Card.Title>
                <Card.Text className='description-text'>{item.description}</Card.Text>
                <Card.Text className='row-attribute'>
                    <p style={{fontWeight: 'bold', paddingRight: 10}}>City</p>
                    <p>{item.city}</p>
                </Card.Text>
                <Card.Text className='row-attribute'>
                    <p style={{fontWeight: 'bold', paddingRight: 10}}>Address</p>
                    <p>{item.address}</p>
                </Card.Text>
                <Card.Text className='row-attribute'>
                    <p style={{fontWeight: 'bold', paddingRight: 10}}>Website</p>
                    <p>{item.official_website}</p>
                </Card.Text>
                <Button variant="primary" className="card-button" onClick={navigateToShelter}>Learn More</Button>
            </Card.Body>
        </Card>
    )
}

function CountyInstanceCard({item}) {
    let navigate = useNavigate()

    function navigateToCounty() {
        navigate(`/counties/${item.id}`);
      }
    return (
        <Card className='card-content mb-4' style={{ width: 400 }}>
            <Card.Header>County</Card.Header>
            <Card.Img variant="top" src={'http://' + item.image_url} style={{height: 250, objectFit: 'cover'}} />
            <Card.Body>
                <Card.Title>{item.name}</Card.Title>
                <Card.Text className='description-text'>{item.description}</Card.Text>
                <Card.Text className='row-attribute'>
                    <p style={{fontWeight: 'bold', paddingRight: 10}}>Population</p>
                    <p>{item.population.toLocaleString()}</p>
                </Card.Text>
                <Card.Text className='row-attribute'>
                    <p style={{fontWeight: 'bold', paddingRight: 10}}>Housing Units</p>
                    <p>{item.housing_units.toLocaleString()}</p>
                </Card.Text>
                <Card.Text className='row-attribute'>
                    <p style={{fontWeight: 'bold', paddingRight: 10}}>Website</p>
                    <a className='description-text' href={item.website_url} target='_blank' rel='noopener noreferrer'>
                        {item.website_url}
                    </a>
                </Card.Text>
                <Card.Text className='row-attribute'>
                    <p style={{fontWeight: 'bold', paddingRight: 10}}>Lat</p>
                    <p>{item.lat}</p>
                    <p style={{fontWeight: 'bold', paddingRight: 10, paddingLeft: 20}}>Long</p>
                    <p>{item.long}</p>
                </Card.Text>
                <Button variant="primary" className="card-button" onClick={navigateToCounty}>Explore County</Button>
            </Card.Body>
        </Card>
    )
}

function EventInstanceCard({item}) {
    let navigate = useNavigate()

    function navigateToEvent() {
        navigate(`/events/${item.id}`);
      }

    return (
        <Card className='card-content mb-4' style={{ width: 400 }}>
            <Card.Header>Event</Card.Header>
            <Card.Img variant="top" src={item.image_url} style={{height: 250, objectFit: 'cover'}} />
            <Card.Body>
                <Card.Title>{item.title}</Card.Title>
                <Card.Text className='description-text'>{item.description}</Card.Text>
                <Card.Text className='row-attribute'>
                    <p style={{fontWeight: 'bold', paddingRight: 10}}>Organization</p>
                    <p>{item.organization}</p>
                </Card.Text>
                <Card.Text className='row-attribute'>
                    <p style={{fontWeight: 'bold', paddingRight: 10}}>Date Posted</p>
                    <p>{new Date(item.date_posted).toLocaleString('en-US', date_params)}</p>
                </Card.Text>
                <Card.Text className='row-attribute'>
                    <p style={{fontWeight: 'bold', paddingRight: 10}}>Location</p>
                    <p className='description-text'>{item.address}</p>
                </Card.Text>
                <Card.Text className='row-attribute'>
                    <p style={{fontWeight: 'bold', paddingRight: 10}}>Lat</p>
                    <p>{item.lat}</p>
                    <p style={{fontWeight: 'bold', paddingRight: 10, paddingLeft: 20}}>Long</p>
                    <p>{item.long}</p>
                </Card.Text>
                {/* <Card.Text className='row-attribute'>
                    <p style={{fontWeight: 'bold', paddingRight: 10}}>Causes</p>
                    <div className="row row-cols-auto">
                        {item.cause_areas.length === 0 ? (
                        <div>No items found.</div>
                        ) : (
                            item.cause_areas.map((item, index) => (
                                <p className="cause-item">{item}</p>
                            ))
                        )}
                    </div>
                </Card.Text> */}
                <Button variant="primary" className="card-button" onClick={navigateToEvent}>View Event</Button>
            </Card.Body>
        </Card>
    )
}
