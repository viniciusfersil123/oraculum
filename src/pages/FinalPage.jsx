import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function FinalPage() {
  const { signName } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [astroData, setAstroData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAstroData = async () => {
      try {
        setLoading(true);

        // 🌐 Call your backend to get horoscope data
        const response = await axios.get(`http://localhost:5000/api/horoscope?sign=${signName}`);
        setAstroData(response.data);
      } catch (err) {
        setError("Failed to fetch astrology data.");
      } finally {
        setLoading(false);
      }
    };

    fetchAstroData();
  }, [signName]);

  const handleReinit = () => {
    navigate("/");
  };

  return (
    <div className="final-container">
      <h2>Call Of Destiny</h2>
      <h3>Your Sign: {signName}</h3>

      {Array.from(searchParams.entries()).map(([key, value]) => (
        <h3 key={key}>
          {key.charAt(0).toUpperCase() + key.slice(1)}: {value}
        </h3>
      ))}

      {loading && <p>Loading your astrology insights...</p>}
      {error && <p>{error}</p>}

      {astroData && (
        <div className="astro-data">
          <h3>✨ Horoscope for Today ✨</h3>
          <p><strong>Prediction:</strong> {astroData.data.prediction}</p>
          <p><strong>Lucky Number:</strong> {astroData.data.lucky_number}</p>
          <p><strong>Lucky Color:</strong> {astroData.data.lucky_color}</p>
        </div>
      )}

      <button onClick={handleReinit} style={buttonStyle}>
        Reinit
      </button>
    </div>
  );
}

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
