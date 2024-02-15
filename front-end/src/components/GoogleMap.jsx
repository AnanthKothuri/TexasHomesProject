import React from 'react'
import GoogleMapReact from 'google-map-react'
import { Icon } from '@iconify/react'
import './GoogleMap.css'
// import locationIcon from '@iconify/icons-mdi/map-marker'

const google_maps_api_key = "AIzaSyBq8FPWJxKm3odyidqfXyHrUP3qRwx4c3s"

const LocationPin = ({ text }) => (
    <div className="pin">
        <Icon icon='map-marker' className="pin-icon" />
        <p className="pin-text">{text}</p>
    </div>
)

function GoogleMap({ address, lat, lng, zoomLevel, text}) {
    const location = {
        address: address,
        latitude: lat,
        longitude: lng,
    }
    return (
        <div className="map">
            <h2 className="map-h2">{text}</h2>

            <div className="google-map">
            <GoogleMapReact
                bootstrapURLKeys={{ key: google_maps_api_key }}
                defaultCenter={location}
                defaultZoom={zoomLevel}
            >
                <LocationPin
                lat={location.latitude}
                lng={location.longitude}
                text={location.address}
                />
            </GoogleMapReact>
            </div>
        </div>
    )
}

export default GoogleMap