import React, { useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import './YearForm.css';
import config from './yearForm.json';

function YearForm() {
  const { signName } = useParams();
  const [searchParams] = useSearchParams();
  const day = searchParams.get('day');
  const month = searchParams.get('month');
  const decade = searchParams.get('decade');
  const navigate = useNavigate();
  const [selectedYear, setSelectedYear] = useState(null);

  const years = Array.from({ length: 10 }, (_, i) => `${decade.slice(0, 3)}${i}`);

  const handleYearClick = (year) => {
    setSelectedYear(year);
    //add month
    navigate(`/sign/${signName}/time?day=${day}&month=${month}&decade=${decade}&year=${year}`);  // ✅ Navigate with day, month, decade, and year
  };

  return (
    <div className="year-container">
      <h1>{config.title}</h1>
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
