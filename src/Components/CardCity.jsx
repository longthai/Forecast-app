import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { PushSpinner } from 'react-spinners-kit';

export const CardCity = ({ cityData }) => {
    //console.log(cityData);
    const [data, setData] = useState();
    const [loading, setLoading] = useState(false);
    const apiKey = 'gZkkY819wTBdnM6NAyJy8VcAkCx5M1ro'

    const fetchCityData = () => {
        setLoading(true);
        axios.get(`http://dataservice.accuweather.com/forecasts/v1/daily/1day/${cityData.Key}?apikey=${apiKey}`).then((response) => {
            setData(response.data.DailyForecasts[0]);
            setLoading(false);
        }).catch((err) => console.log(err.message));
    }

    useEffect(() => {
       fetchCityData();
    }, [cityData.Key]);

    //Converting temp
    let tempMin = ((data?.Temperature?.Minimum?.Value - 32) / 1.8).toFixed(0);
    let tempMax = ((data?.Temperature?.Maximum?.Value - 32) / 1.8).toFixed(0); 

    //Converting date
    let d = new Date(data?.Date);
    let date = d.getDate();
    let month = d.toLocaleString('default', { month: 'long' });
    let year = d.getFullYear();
    let day = d.toLocaleString('default', { weekday: 'long' });

    return (
        <div>
            {data&&(
                <div className='bg-dark bg-opacity-60 p-5 rounded'>
                    <h2 class="card-title mb-3">{cityData.EnglishName}, {cityData.AdministrativeArea.EnglishName}, {cityData.Country.ID}</h2>
                    <p class="card-text lead">{day}, {month} {date}, {year}</p>
                    <hr />
                    <p class="card-text lead">Lowest: {tempMin}&deg;C | Highest: {tempMax}&deg;C</p>
                    <div className='row'>
                        <div className='col'>
                            <p class="card-text lead fw-bolder">Day</p>
                            <i className='fas fa-4x'><img src={`./icon/${data.Day.Icon}.png`} class="card-img" alt="..." /></i>
                            <p className='lead mb-0'>{data.Day.IconPhrase}</p>
                        </div>
                        <div className='col'>
                            <p class="card-text lead fw-bolder">Night</p>
                            <i className='fas fa-4x'><img src={`./icon/${data.Night.Icon}.png`} class="card-img" alt="..." /></i>
                            <p className='lead mb-0'>{data.Night.IconPhrase}</p>
                        </div>
                    </div>
                </div>
            )}
            {!data&& (
                <div className='justify-content-center align-items-center'>
                    <PushSpinner loading={loading} color='#fff' size={30}/>
                </div>
            )}
        </div>
    )
}
