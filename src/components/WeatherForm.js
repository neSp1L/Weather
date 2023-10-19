import { useState } from "react";
import { HiLocationMarker } from "react-icons/hi";
import "./WeatherForm.css";

export default function WeatherForm({ onChangeCity }) {
  const [city, setCity] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    onChangeCity(city);
  }

  function onChange(e) {
    const value = e.target.value;
    if (value === " ") {
      alert("Укажите город");
    } else {
      setCity(value);
    }
  }

  return (
    <form className="container-form" onSubmit={handleSubmit} action="">
      <input
        className="weatherSearch input "
        onChange={onChange}
        type="text"
        placeholder="Введите название города"
      />
      <HiLocationMarker className="weatherIcon input" />
    </form>
  );
}
