import React, { useState } from 'react'
import axios from 'axios';
import { CardCity } from './CardCity'
import { CurrentCity } from './CurrentCity';

export const SearchCity = () => {
    const [citySearch, setCitySearch] = useState('');
    const [cityData, setCityData] = useState('')
    const apiKey = "kAzWetgS4cFcNeMtKYzuQl4VaPcvJuEj"

    //City Search function
    const fetchCity = (e) => {
        e.preventDefault();
        axios.get(`https://dataservice.accuweather.com/locations/v1/cities/search?apikey=${apiKey}&q=${citySearch}`).then((response) => {
            if (response.data.length == 0) {
                setCitySearch('');
                alert('City not found!');
                throw Error('City not found!')
            } else {
                setCityData(response.data[0]);
                setCitySearch('');
            }
        }).catch((err) => console.log(err.message));
    }

    return (
        <div>
            <div className='container'>
                <div class="card text-bg-dark text-center border-0">
                    <div class="card-img-overlay m-0 p-0">
                        <div className='row justify-content-center align-items-center vh-100'>
                            <div className='col-md-4'>
                                <h1 class="card-title display-4 fw-bold text-center mb-4">Forecast App</h1>
                                <form onSubmit={fetchCity}>
                                    <div class="input-group mb-4 mx-auto">
                                        <input
                                            type="search"
                                            class="form-control"
                                            placeholder="Find city ..."
                                            aria-label="Find city ..."
                                            aria-describedby="basic-addon2"
                                            value={citySearch}
                                            onChange={(e) => setCitySearch(e.target.value)}
                                            required
                                        />
                                        <button
                                            type="submit"
                                            class="input-group-text"
                                            id="basic-addon2"
                                        >
                                            <i className='fas fa-search'></i>
                                        </button>
                                    </div>
                                </form>
                                <CurrentCity setCityData={setCityData} />
                                {cityData && (
                                    <div><CardCity cityData={cityData} /></div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
