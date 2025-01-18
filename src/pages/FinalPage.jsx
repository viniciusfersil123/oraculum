import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function FinalPage() {
  const { signName } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [astroData, setAstroData] = useState(null);
  const [dailyPrediction, setDailyPrediction] = useState(null); // New state for daily prediction
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Retrieve parameters from the URL or set mock values
  const day = searchParams.get('day') || '26';   // Mock Day if not available
  const decade = searchParams.get('decade') || '1950s';   // Mock Decade if not available
  const year = searchParams.get('year') || '1955';   // Mock Year if not available
  const lat = 23.1765; // Mock Latitude
  const lon = 75.7885; // Mock Longitude

  useEffect(() => {
    const fetchAstroData = async () => {
      try {
        setLoading(true);

        // Fetch the daily prediction data from your backend
        const predictionResponse = await axios.get(`http://localhost:5000/api/horoscope?sign=${signName}&datetime=2025-01-17T10%3A50%3A40%2B00%3A00`);
        setDailyPrediction(predictionResponse.data.data.daily_prediction);  // Set the prediction

        // Fetch the planet position data from your backend
        const planetPositionResponse = await axios.get(`http://localhost:5000/api/planet-position?lat=${lat}&lon=${lon}&datetime=2025-01-17T10%3A50%3A40%2B00%3A00&planets=100,2,3,4,5&ayanamsa=1&coordinates=${lat},${lon}`);
        setAstroData(planetPositionResponse.data);

      } catch (err) {
        setError("Failed to fetch astrology data.");
      } finally {
        setLoading(false);
      }
    };

    fetchAstroData();
  }, [signName, lat, lon]);

  const handleReinit = () => {
    navigate("/");
  };

  return (
    <div className="final-container">
      <h2>Call Of Destiny</h2>

      {/* Displaying the URL parameters */}
      <h3>Your Sign: {signName}</h3>
      <h3>Day: {day}</h3>
      <h3>Decade: {decade}</h3>
      <h3>Year: {year}</h3>

      {loading && <p>Loading your astrology insights...</p>}
      {error && <p>{error}</p>}

      {/* Display the Daily Prediction */}
      {dailyPrediction && (
        <div className="daily-prediction">
          <h3>🌟 Daily Prediction for {signName} 🌟</h3>
          <p><strong>Prediction:</strong> {dailyPrediction.prediction}</p>
        </div>
      )}

      {astroData && (
        <div className="astro-data">
          <h3>🌟 Planet Positions 🌟</h3>

          {astroData.data.planet_position.map((planet) => (
            <div key={planet.id} style={planetStyle}>
              <h4>{planet.name}</h4>
              <p><strong>Longitude:</strong> {planet.longitude.toFixed(2)}</p>
              <p><strong>Position:</strong> {planet.position}</p>
              <p><strong>Degree:</strong> {planet.degree.toFixed(2)}</p>
              <p><strong>Retrograde:</strong> {planet.is_retrograde ? 'Yes' : 'No'}</p>
              <p><strong>Rasi:</strong> {planet.rasi.name} (Lord: {planet.rasi.lord.name})</p>
            </div>
          ))}
        </div>
      )}

      <button onClick={handleReinit} style={buttonStyle}>
        Reinit
      </button>
    </div>
  );
}

const planetStyle = {
  marginBottom: '20px',
  padding: '15px',
  border: '1px solid #ccc',
  borderRadius: '8px',
  backgroundColor: '#f9f9f9',
};

const buttonStyle = {
  marginTop: "20px",
  padding: "10px 20px",
  backgroundColor: "#9c27b0",
  color: "white",
  border: "none",
  borderRadius: "5px",
  fontSize: "16px",
  cursor: "pointer",
};

export default FinalPage;
