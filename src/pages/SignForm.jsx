// SignForm.jsx
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './SignForm.css';

function SignForm() {
  const { signName } = useParams();
  const navigate = useNavigate();
  const [selectedDay, setSelectedDay] = useState(null);

  const handleDayClick = (day) => {
    setSelectedDay(day);
    navigate(`/sign/${signName}/decade?day=${day}`);
  };

  const mockMonths = [
    { month: 'October', days: [22, 23, 24, 25, 26, 27, 28, 29, 30, 31] },
    { month: 'November', days: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23] }
  ];

  return (
    <div className="form-container">
      <p>Select the <strong><u>day you were born</u></strong></p>
      {mockMonths.map((monthData) => (
        <div key={monthData.month} className="month-section">
          <h3>{monthData.month}</h3>
          <div className="days-grid">
            {monthData.days.map((day) => (
              <button
                key={day}
                className={`day-button ${selectedDay === day ? 'selected' : ''}`}
                onClick={() => handleDayClick(day)}
              >
                {day}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default SignForm;