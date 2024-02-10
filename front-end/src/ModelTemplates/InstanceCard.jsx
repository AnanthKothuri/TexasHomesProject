import React from 'react';
import './InstanceCard.css';
import { useNavigate } from 'react-router-dom';

function InstanceCard({item, type}) {

    const containerStyle = {
        height: '250px',
        background: `linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.8)), url(${item.image}) center/cover no-repeat`,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'flex-start', 
        paddingLeft: 20
    };

    return (
        <div className="card">
            <div style={containerStyle}>
                <h4 style={{color: 'white'}}>{item.title}</h4>
            </div>

            { type === "Shelters" ? (<ShelterInstanceCard item={item} />) : 
                type === "Counties" ? (<CountyInstanceCard item={item} />) :
                <EventInstanceCard item={item} />
            }

        </div>
     );
}

export default InstanceCard;

function ShelterInstanceCard({item}) {
    let navigate = useNavigate();
  
    function navigateToShelter() {
      navigate(`/shelters/${item.id}`);
    }
    return (
        <div className="card-content">
            <p>{item.description}</p>

            <div className='row-attribute'>
                <p style={{fontWeight: 'bold', paddingRight: 10}}>Attribute1</p>
                <p>Here is some other data that's very important</p>
            </div>

            <button className="card-button" onClick={navigateToShelter}>Learn More</button>
        </div>
    )
}

function CountyInstanceCard({ item }) {
    let history = useNavigate();
  
    function navigateToCounty() {
      history(`/counties/${item.id}`);
    }
  
    return (
      <div className="card-content">
        <p>{item.description}</p>
  
        <div className='row-attribute'>
          <p style={{fontWeight: 'bold', paddingRight: 10}}>Total Pop.</p>
          <p>{item.total_population.toLocaleString()}</p>
        </div>
        <div className='row-attribute'>
          <p style={{fontWeight: 'bold', paddingRight: 10}}>Homeless Pop.</p>
          <p>{item.homeless_population.toLocaleString()}</p>
        </div>
  
        <button className="card-button" onClick={navigateToCounty}>Explore County</button>
      </div>
    );
  }

function EventInstanceCard({item}) {
    let navigate = useNavigate();
  
    function navigateToEvent() {
      navigate(`/events/${item.id}`);
    }
    return (
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
    )
}
