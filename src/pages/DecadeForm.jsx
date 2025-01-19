import React, { useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import './DecadeForm.css';

function DecadeForm() {
  const { signName } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const day = searchParams.get('day');
  const month = searchParams.get('month');
  const [selectedDecade, setSelectedDecade] = useState(null);

  const decades = [
    '1940s', '1950s', '1960s', '1970s',
    '1980s', '1990s', '2000s', '2010s', '2020s'
  ];

  const handleDecadeClick = (decade) => {
    setSelectedDecade(decade);
    navigate(`/sign/${signName}/year?day=${day}&month=${month}&decade=${decade}`);  // ✅ Navigate with day, month, and decade
  };
  


  return (
    <div className="decade-container">
      <p>Select the <strong><u>decade you were born</u></strong></p>
      <div className="decades-grid">
        {decades.map((decade) => (
          <button
            key={decade}
            className={`decade-button ${selectedDecade === decade ? 'selected' : ''}`}
            onClick={() => handleDecadeClick(decade)}
          >
            {decade}
          </button>
        ))}
      </div>
    </div>
  );
}

export default DecadeForm;