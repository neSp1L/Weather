import { useEffect, useState } from "react";
import Loading from "../components/Loading";
import WeatherForm from "../components/WeatherForm";
import WeatherDetails from "../components/WeatherDetails";
import WeatherMap from "../components/WeatherMap";

export default function WeatherApp() {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    loadInfo();
  }, []);

  useEffect(() => {
    document.title = `Погода | ${weather?.location.country}`;
  }, [weather]);

    function loadInfo(city = "Киев") {
        fetch(`http://localhost:3001/getWeather?q=${city}`)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error();
                }
            })
            .then(data => {
                setWeather(data);
            })
            .catch(error => {
                console.error(error);
                alert('Город с таким названием не найден. \nНажмите Ок, чтобы установить город Киев по умолчанию');
                loadInfo('Киев');
            });
    }


    function handleChangeCity(city) {
        setWeather(null);
        loadInfo(city);
      }

  return (
    <div className="weather-app">
      <WeatherForm onChangeCity={handleChangeCity} />
        <div className="weather-app-container">
            {weather ? (
                <>
                    <WeatherDetails weather={weather} /> <WeatherMap weather={weather} />
                </>
            ) : (
                <Loading />
            )}
        </div>
    </div>
  );
}
