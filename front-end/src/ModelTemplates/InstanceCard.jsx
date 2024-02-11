import React from 'react';
import { useNavigate } from 'react-router-dom';
import './InstanceCard.css'; // Make sure to create a corresponding CSS file for styling
import { useNavigate } from 'react-router-dom';

function InstanceCard({item, type}) {

    return (
        <div>
            { type === "Shelters" ? (<ShelterInstanceCard item={item} />) : 
                type === "Counties" ? (<CountyInstanceCard item={item} />) :
                <EventInstanceCard item={item} />
            }
        </div>
     );
}

export default InstanceCard;

let navigate = useNavigate()

function ShelterInstanceCard({item}) {
    const containerStyle = {
        height: '250px',
        background: `linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.8)), url(${item.photo_urls.length !== 0 ? item.photo_urls[0] : ""}) center/cover no-repeat`,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'flex-start', 
        paddingLeft: 20
    };

    function navigateToShelter() {
        navigate(`/shelters/${item.id}`);
      }
  

    return (
        <div className="card">
            <div style={containerStyle}>
                <h4 style={{color: 'white'}}>{item.name}</h4>
            </div>

            <div className="card-content">

                <div className='description-text'>
                    {item.description !== "" ? item.description : "This is " + item.name + ", a homeless shelter located in " + item.city + ", TX."}
                </div>

                <div style={{paddingTop: 20}}>
                    <div className='row-attribute'>
                        <p style={{fontWeight: 'bold', paddingRight: 10}}>City</p>
                        <p>{item.city}</p>
                    </div>
                    <div className='row-attribute'>
                        <p style={{fontWeight: 'bold', paddingRight: 10}}>Address</p>
                        <p>{item.address}</p>
                    </div>
                    <div className='row-attribute'>
                        <p style={{fontWeight: 'bold', paddingRight: 10}}>Website</p>
                        <p>{item.official_website}</p>
                    </div>          
                </div>

                <button className="card-button" onClick={navigateToShelter}>Learn More</button>
            </div>

        </div>
    )
}

function CountyInstanceCard({item}) {
    const containerStyle = {
        height: '250px',
        background: `linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.8)), url(${item.image_url}) center/cover no-repeat`,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'flex-start', 
        paddingLeft: 20
    };

    function navigateToCounty() {
        navigate(`/counties/${item.id}`);
      }
  

    return (
        <div className="card">
            <div style={containerStyle}>
                <h4 style={{color: 'white'}}>{item.name}</h4>
            </div>

            <div className="card-content">
                <p style={{paddingBottom: 20}}>{item.short_description}</p>

                <div className='description-text'>
                    {item.long_description}
                </div>

                <div style={{paddingTop: 20}}>
                    <div className='row-attribute'>
                        <p style={{fontWeight: 'bold', paddingRight: 10}}>Population</p>
                        <p>{item.population}</p>
                    </div>
                    <div className='row-attribute'>
                        <p style={{fontWeight: 'bold', paddingRight: 10}}>Housing Units</p>
                        <p>{item.housing}</p>
                    </div>
                    <div className='row-attribute'>
                        <p style={{fontWeight: 'bold', paddingRight: 10}}>Website</p>
                        <div className='description-text'>{item.website_url}</div>
                    </div>
                </div>

                <button className="card-button" onClick={navigateToCounty}>Explore County</button>
            </div>
        </div>
    )
}

function EventInstanceCard({item}) {
    const containerStyle = {
        height: '250px',
        background: `linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.8)), url(${item.image}) center/cover no-repeat`,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'flex-start', 
        paddingLeft: 20
    };

    function navigateToEvent() {
        navigate(`/events/${item.id}`);
      }
  

    return (
        <div className="card">
            <div style={containerStyle}>
                <h4 style={{color: 'white'}}>{item.title}</h4>
            </div>

            <div className="card-content">
                <p>{item.description}</p>

                <div className='row-attribute'>
                    <p style={{fontWeight: 'bold', paddingRight: 10}}>Date</p>
                    <p>{item.date}</p>
                </div>
                <div className='row-attribute'>
                    <p style={{fontWeight: 'bold', paddingRight: 10}}>Time</p>
                    <p>{item.time}</p>
                </div>

                <button className="card-button" onClick={navigateToEvent}>View Event</button>
            </div>

        </div>
    )
}
