import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import './FinalPage.css';

function FinalPage() {
  const { signName } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [dailyPrediction, setDailyPrediction] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Month names array
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // Retrieve parameters from the URL
  const day = searchParams.get('day') || '26';
  const year = searchParams.get('year') || '1955';
  const month = monthNames[parseInt(searchParams.get('month') || '3', 10) - 1]; // Map month number to name
  const hour = searchParams.get('hour');
  const minute = searchParams.get('minute');
  const period = searchParams.get('period');

  const city = searchParams.get('city') || 'Unknown';
  const state = searchParams.get('state') || 'Unknown';
  const country = searchParams.get('country') || 'Unknown';

  // Format time if valid
  const formattedTime =
    hour && minute && period
      ? `${hour.padStart(2, '0')}:${minute.padStart(2, '0')} ${period}`
      : 'Unknown';

  useEffect(() => {
    const fetchAstroData = async () => {
      try {
        setLoading(true);

        // Simulate API call for daily prediction
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
      {/* Display YouTube Video */}
      <div className="youtube-video">
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/USMohM34iMM?controls=0&modestbranding=1&showinfo=0"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>

      {/* Displaying the URL parameters */}
      <h3>Your Sign: {signName}</h3>
      <h3>Date of Birth: {day} {month}, {year}</h3> {/* Month as a name */}
      {hour && minute && period ? (
        <h3>Time of Birth: {formattedTime}</h3> /* Display time only if valid */
      ) : (
        <h3>Time of Birth: Unknown</h3> /* Default to Unknown */
      )}
      <h3>City: {decodeURIComponent(city)}</h3>
      <h3>State: {decodeURIComponent(state)}</h3>
      <h3>Country: {decodeURIComponent(country)}</h3>

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
