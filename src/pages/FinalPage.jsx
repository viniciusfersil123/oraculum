import React from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';

function FinalPage() {
  const { signName } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const handleReinit = () => {
    navigate("/");  // ✅ Navigates back to the home page without query params
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
