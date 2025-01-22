import React from 'react';
import './ZodiacGrid.css';

const zodiacSigns = [
  'Aries', 'Taurus', 'Gemini', 'Cancer',
  'Leo', 'Virgo', 'Libra', 'Scorpio',
  'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
];

function ZodiacGrid() {
  return (
    <section id="zodiac-grid" className="grid">
      {zodiacSigns.map((sign) => (
        <a 
          key={sign} 
          href={`/sign/${sign.toLowerCase()}/day`} 
          className="zodiac-sign"
        >
          <img src={`/assets/${sign.toLowerCase()}.png`} alt={sign} />
          <p>{sign}</p>
        </a>
      ))}
    </section>
  );
}

export default ZodiacGrid;
