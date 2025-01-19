import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';

function FinalPage() {
  const { signName } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [dailyPrediction, setDailyPrediction] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Retrieve parameters from the URL or set mock values
  const day = searchParams.get('day') || '26';   // Mock Day if not available
  const decade = searchParams.get('decade') || '1950s';   // Mock Decade if not available
  const year = searchParams.get('year') || '1955';   // Mock Year if not available
  const city = searchParams.get('city') || 'Unknown';
  const state = searchParams.get('state') || 'Unknown';
  const country = searchParams.get('country') || 'Unknown';

  useEffect(() => {
    const fetchAstroData = async () => {
      try {
        setLoading(true);

        // Simulate API call for daily prediction (replace with actual backend call if available)
        const mockPrediction = {
          prediction: `You will have an insightful day, ${signName}!`
        };
        setDailyPrediction(mockPrediction);

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

      {/* Displaying the URL parameters */}
      <h3>Your Sign: {signName}</h3>
      <h3>Day: {day}</h3>
      <h3>Decade: {decade}</h3>
      <h3>Year: {year}</h3>
      <h3>City: {city}</h3>
      <h3>State: {state}</h3>
      <h3>Country: {country}</h3>

      {loading && <p>Loading your astrology insights...</p>}
      {error && <p>{error}</p>}

      {/* Display the Daily Prediction */}
      {dailyPrediction && (
        <div className="daily-prediction">
          <h3>🌟 Daily Prediction for {signName} 🌟</h3>
          <p><strong>Prediction:</strong> {dailyPrediction.prediction}</p>
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
  color: "white",
  border: "none",
  borderRadius: "5px",
  fontSize: "16px",
  cursor: "pointer",
};

export default FinalPage;
