import React, { useState, useMemo } from 'react';
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

  // Zodiac signs with their date ranges
  const zodiacDateRanges = {
    aries: { start: { month: 3, day: 21 }, end: { month: 4, day: 19 } },
    taurus: { start: { month: 4, day: 20 }, end: { month: 5, day: 20 } },
    gemini: { start: { month: 5, day: 21 }, end: { month: 6, day: 20 } },
    cancer: { start: { month: 6, day: 21 }, end: { month: 7, day: 22 } },
    leo: { start: { month: 7, day: 23 }, end: { month: 8, day: 22 } },
    virgo: { start: { month: 8, day: 23 }, end: { month: 9, day: 22 } },
    libra: { start: { month: 9, day: 23 }, end: { month: 10, day: 22 } },
    scorpio: { start: { month: 10, day: 23 }, end: { month: 11, day: 21 } },
    sagittarius: { start: { month: 11, day: 22 }, end: { month: 12, day: 21 } },
    capricorn: { start: { month: 12, day: 22 }, end: { month: 1, day: 19 } },
    aquarius: { start: { month: 1, day: 20 }, end: { month: 2, day: 18 } },
    pisces: { start: { month: 2, day: 19 }, end: { month: 3, day: 20 } },
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // Generate the correct months and days for the selected sign
  const signMonths = useMemo(() => {
    const range = zodiacDateRanges[signName.toLowerCase()];
    if (!range) return [];

    const startMonth = range.start.month - 1;
    const endMonth = range.end.month - 1;
    const months = [];

    for (let month = startMonth; month !== (endMonth + 1) % 12; month = (month + 1) % 12) {
      const isStartMonth = month === startMonth;
      const isEndMonth = month === endMonth;

      const startDay = isStartMonth ? range.start.day : 1;
      const endDay = isEndMonth ? range.end.day : new Date(2023, month + 1, 0).getDate();

      const days = Array.from({ length: endDay - startDay + 1 }, (_, i) => i + startDay);

      months.push({ month: monthNames[month], days });
      if (isEndMonth) break;
    }

    return months;
  }, [signName]);

  return (
    <div className="form-container">
      <p>Select the <strong><u>day you were born</u></strong></p>
      {signMonths.map((monthData) => (
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
