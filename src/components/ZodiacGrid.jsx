// src/components/ZodiacGrid.jsx
import React from 'react';
import '../App.css';

const zodiacSigns = [
  'Aries', 'Taurus', 'Gemini', 'Cancer',
  'Leo', 'Virgo', 'Libra', 'Scorpio',
  'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
];

function ZodiacGrid() {
  return (
    <section id="zodiac-grid" className="grid">
      {zodiacSigns.map((sign) => (
        <div key={sign} className="zodiac-sign">
          <a href={`/sign/${sign.toLowerCase()}`}>
            <img src={`/assets/${sign.toLowerCase()}.png`} alt={sign} />
            <p>{sign}</p>
          </a>
        </div>
      ))}
    </section>
  );
}

export default ZodiacGrid;