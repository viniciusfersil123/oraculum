import React, { useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import './YearForm.css';

function YearForm() {
  const { signName } = useParams();
  const [searchParams] = useSearchParams();
  const day = searchParams.get('day');
  const decade = searchParams.get('decade');
  const navigate = useNavigate();
  const [selectedYear, setSelectedYear] = useState(null);

  const years = Array.from({ length: 10 }, (_, i) => `${decade.slice(0, 3)}${i}`);

  const handleYearClick = (year) => {
    setSelectedYear(year);
    navigate(`/sign/${signName}/time?day=${day}&decade=${decade}&year=${year}`);
  };

  return (
    <div className="year-container">
      <p>Select the <strong><u>year you were born</u></strong></p>
      <div className="years-grid">
        {years.map((year) => (
          <button
            key={year}
            className={`year-button ${selectedYear === year ? 'selected' : ''}`}
            onClick={() => handleYearClick(year)}
          >
            {year}
          </button>
        ))}
      </div>
    </div>
  );
}

// ✅ Default export
export default YearForm;
