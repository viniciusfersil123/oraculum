import React, { useEffect, useState } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import "./FinalPage.css";

// Map zodiac abbreviations to full names (case-insensitive)
const zodiacSigns = {
  ari: "Aries",
  tau: "Taurus",
  gem: "Gemini",
  can: "Cancer",
  leo: "Leo",
  vir: "Virgo",
  lib: "Libra",
  sco: "Scorpio",
  sag: "Sagittarius",
  cap: "Capricorn",
  aqu: "Aquarius",
  pis: "Pisces",
};

// Map planet abbreviations to full names
const planetNames = {
  Sun: "Sun",
  Moon: "Moon",
  Merc: "Mercury",
  Venu: "Venus",
  Mars: "Mars",
  Jupi: "Jupiter",
  Satu: "Saturn",
  Uran: "Uranus",
  Nept: "Neptune",
  Plut: "Pluto",
  Nort: "North Node",
  Asce: "Ascendant",
  Midh: "Midheaven", // Added Midheaven (Midh)
};

function FinalPage() {
  const { signName } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [astroData, setAstroData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAstroData = async () => {
      try {
        setLoading(true);

        // Extract parameters from URL
        const day = searchParams.get("day");
        const month = searchParams.get("month");
        const year = searchParams.get("year");
        const hour = searchParams.get("hour");
        const minute = searchParams.get("minute");
        const period = searchParams.get("period");
        const latitude = searchParams.get("latitude");
        const longitude = searchParams.get("longitude");

        // Convert to 24-hour format
        const isPM = period && period.toLowerCase() === "pm";
        const hour24 = isPM && hour !== "12" ? parseInt(hour, 10) + 12 : hour;

        const requestData = {
          day,
          month,
          year,
          hour: hour24,
          minute,
          latitude,
          longitude,
        };

        console.log("Request Data:", requestData);

        // Fetch astrolog output
        const response = await fetch("http://localhost:5000/api/astrolog", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(requestData),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch astrolog data.");
        }

        const data = await response.json();
        const rawOutput = data.rawOutput;

        console.log("Raw Output from Astrolog:", rawOutput);

        // Extract Planets, Ascendant, and Midheaven
        const planetMatches = rawOutput.match(/(Sun\s+:|Moon|Merc|Venu|Mars|Jupi|Satu|Uran|Nept|Plut|Nort|Asce|Midh):\s+([A-Za-z0-9]+)/g);
        const planets = {};

        if (planetMatches) {
          planetMatches.forEach((match) => {
            const [_, planet, location] = match.match(/(Sun\s+:|Moon|Merc|Venu|Mars|Jupi|Satu|Uran|Nept|Plut|Nort|Asce|Midh):\s+([A-Za-z0-9]+)/);
            const trimmedPlanet = planet.trim().replace(/\s+:$/, ""); // Handle extra space and colon
            const fullPlanetName = planetNames[trimmedPlanet] || trimmedPlanet;
            planets[fullPlanetName] = zodiacSigns[location.replace(/\d+/g, "").toLowerCase()] || "Unknown";

            // Debugging specific to Sun and Midheaven
            if (trimmedPlanet === "Sun" || trimmedPlanet === "Midh") {
              console.log(`Debug ${trimmedPlanet}:`, { trimmedPlanet, location, sign: planets[fullPlanetName] });
            }
          });
        }

        console.log("Parsed Planets:", planets);

        setAstroData({
          rawOutput,
          planets,
        });
      } catch (err) {
        console.error("Error fetching astrolog data:", err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAstroData();
  }, [searchParams]);

  const handleReinit = () => {
    navigate("/");
  };

  return (
    <div className="final-container">
      <h2>🌟 Astrology Insights 🌟</h2>

      {loading && <p>Loading your astrology insights...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {astroData && (
        <div className="astro-results">
          <p><strong>Your Sign:</strong> {signName.charAt(0).toUpperCase() + signName.slice(1)}</p>
          <p><strong>Planets, Ascendant, and Midheaven:</strong></p>
          <ul>
            {Object.entries(astroData.planets).map(([planet, sign], index) => (
              <li key={index}><strong>{planet}:</strong> {sign}</li>
            ))}
          </ul>
        </div>
      )}

      <button onClick={handleReinit}>Reinit</button>
    </div>
  );
}

export default FinalPage;
