import React, { useState, useEffect } from "react";
import { SeacrhBtn } from "../components/SearchBtn";
import { WeatherResponse } from "../types";
import axios from "axios";

export const WeatherApp = () => {
    const [city, setCity] = useState<string>("London");
    const [loading, setLoading] = useState<boolean>(false);
    const [weatherData, setWeatherData] = useState<WeatherResponse | null>(null);
    const [error, setError] = useState<string>("");

    const apiKey = 'b5843c2190b9bd7e5c53f712a972ed63';

    const fetchWeather = async (city: string) => {
        const trimmedCity = city.trim();

        if (!trimmedCity) {
            setError("Please enter a valid city name.");
            return;
        }

        try {
            setLoading(true);
            const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${trimmedCity}&appid=${apiKey}&units=metric`
            );
            setWeatherData(response.data);
            setError("");
        } catch (error: any) {
            setWeatherData(null);
            setError(`City not found: ${error.response?.data?.message || error.message}`);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchWeather(city);
    }, [city]);

    return (
        <>
            <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
                <h1 className="text-2xl font-bold mb-4">Weather App</h1>
                <SeacrhBtn 
                    value={city} 
                    onChange={(e) => setCity(e.target.value)} 
                    placeholder="Enter city name" 
                    type="text" 
                    onClick={() => fetchWeather(city)} 
                    label="City Name" 
                    id="city-name" 
                />
            </div>
            {loading && <p className="text-center">Loading...</p>}
            {error && <p className="text-red-500 text-center">{error}</p>}
            {weatherData && (
                <div className="weather-info">
                    <h2>
                        {weatherData.name}, {weatherData.sys.country}
                    </h2>
                    <div>
                        <h3>{weatherData.weather[0].description}</h3>
                        <img
                            src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
                            alt={weatherData.weather[0].description}
                        />
                    </div>
                    <p>Temperature: {weatherData.main.temp}°C</p>
                    <p>Humidity: {weatherData.main.humidity}%</p>
                    <p>Wind Speed: {weatherData.wind.speed} m/s</p>
                </div>
            )}
        </>
    );
};
