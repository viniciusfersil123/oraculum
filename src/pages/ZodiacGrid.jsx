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
          {/* Corrected URL to include '/day' */}
          <a href={`/sign/${sign.toLowerCase()}/day`}>
            <img src={`/assets/${sign.toLowerCase()}.png`} alt={sign} />
            <p>{sign}</p>
          </a>
        </div>
      ))}
    </section>
  );
}

export default ZodiacGrid;
