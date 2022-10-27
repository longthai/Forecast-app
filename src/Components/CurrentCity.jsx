import React, { useEffect, useState } from 'react'
import axios from 'axios';

export const CurrentCity = ({setCityData}, props) => {
    const [lat, setLat] = useState('');
    const [long, setLong] = useState('');
    const geolocationAPI = navigator.geolocation;
    
    const [cityData1, setCityData1] = useState('');
    const apiKey = "DAvbAmleM4pioYrdBjtt1hbbhPQM6kRe"

    const getUserCoordinates = () => {
        if (!geolocationAPI) {
            alert('Geolocation is not available')
        } else {
            geolocationAPI.getCurrentPosition((position) => {
                const coords = position.coords;
                setLat(coords.latitude);
                setLong(coords.longitude);
            }, (error) => {
                alert('Your position is not available!')
            })
        }
    }

    const fetchGeo = () => {
        axios.get(`https://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${apiKey}&q=${lat}%2C${long}`).then((response) => {
            setCityData1(response.data);
            setCityData(cityData1);
        }).catch((err) => console.log(err.message));
    }

    useEffect(() => {
        getUserCoordinates();
        fetchGeo();
    }, [lat,long]);


    return (
        <div class='mb-3 d-grid'>
            <button 
                class="btn btn-outline-light btn-sm"
                onClick={fetchGeo}
            >
                Current Location Forecast
            </button>
        </div>
    )
}
