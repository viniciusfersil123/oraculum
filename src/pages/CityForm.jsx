// src/pages/CityForm.jsx
import React, { useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import "./CityForm.css";

function CityForm() {
  const navigate = useNavigate();
  const { signName } = useParams();
  const [searchParams] = useSearchParams();

  const day = searchParams.get("day");
  const decade = searchParams.get("decade");
  const year = searchParams.get("year");
  const hour = searchParams.get("hour");
  const minute = searchParams.get("minute");
  const period = searchParams.get("period");

  const [city, setCity] = useState("");
  const [error, setError] = useState("");

  const handleContinue = () => {
    if (city.trim() === "") {
      setError("Fill in your place of birth.");
      return;
    }
    navigate(`/sign/${signName}/final?day=${day}&decade=${decade}&year=${year}&hour=${hour}&minute=${minute}&period=${period}&city=${city}`);
  };

  return (
    <div className="city-container">
      <h2>Call Of Destiny</h2>
      <p>
        Enter the <strong><u>place you were born</u></strong> or select the closest bigger city. <br />
        I will use this information to calculate your ascendent and tell you how to thrive in life:
      </p>

      <label htmlFor="city-input">My place of birth</label>
      <input
        id="city-input"
        type="text"
        placeholder="City, State"
        value={city}
        onChange={(e) => {
          setCity(e.target.value);
          setError("");
        }}
      />
      {error && <p className="error-text">{error}</p>}

      <button
        className="continue-button"
        onClick={handleContinue}
        disabled={!city.trim()}
      >
        Continue
      </button>
    </div>
  );
}

export default CityForm;
