import React from 'react'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';

const api_key = "AIzaSyBq8FPWJxKm3odyidqfXyHrUP3qRwx4c3s"
const containerStyle = {
  width: '400px',
  height: '400px'
};


function CustomGoogleMap({latitude, longitude}) {

    const center = {
        lat: latitude,
        lng: longitude
        };
    const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: api_key
    })

    const [map, setMap] = React.useState(null)

    const onLoad = React.useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds(center);
        // map.fitBounds(bounds);

        setMap(map)
    }, [])

    const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
    }, [])

    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={15}
            onLoad={onLoad}
            onUnmount={onUnmount}
            >
            <></>
        </GoogleMap>
    ) : <></>
}

export default React.memo(CustomGoogleMap)
