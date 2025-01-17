import React, { useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import './DecadeForm.css';

function DecadeForm() {
  const { signName } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const day = searchParams.get('day');
  const [selectedDecade, setSelectedDecade] = useState(null);

  const decades = [
    '1900s', '1910s', '1920s', '1930s',
    '1940s', '1950s', '1960s', '1970s',
    '1980s', '1990s', '2000s', '2010s'
  ];

  const handleDecadeClick = (decade) => {
    setSelectedDecade(decade);
    navigate(`/sign/${signName}/year?day=${day}&decade=${decade}`);  // ✅ Navigate to YearForm
  };


  return (
    <div className="decade-container">
      <h2>Call Of Destiny</h2>
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