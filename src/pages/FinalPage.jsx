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

        // Extract Ascendant
        const asceLine = rawOutput.match(/Asce:\s+(\d+[A-Za-z]{3}\d+)/);
        console.log("Matched Asce Line:", asceLine);

        const ascendant = asceLine
          ? zodiacSigns[asceLine[1].substring(2, 5).toLowerCase()] || "Unknown"
          : "Unknown";

        console.log("Parsed Ascendant:", ascendant);

        setAstroData({
          rawOutput,
          ascendant,
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
          <p><strong>Ascendant:</strong> {astroData.ascendant}</p>
          <p><strong>Raw Output:</strong></p>
          <pre>{astroData.rawOutput}</pre>
        </div>
      )}

      <button onClick={handleReinit}>Reinit</button>
    </div>
  );
}

export default FinalPage;
