import React, { useEffect, useState } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";

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
  Midh: "Midheaven",
};

function FinalPage() {
  const { signName } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [astroData, setAstroData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const name = searchParams.get("name");

  useEffect(() => {
    const fetchAstroData = async () => {
      try {
        setLoading(true);

        const requestData = {
          day: searchParams.get("day"),
          month: searchParams.get("month"),
          year: searchParams.get("year"),
          hour: searchParams.get("hour"),
          minute: searchParams.get("minute"),
          latitude: searchParams.get("latitude"),
          longitude: searchParams.get("longitude"),
        };

        const response = await fetch("/api/astrolog", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(requestData),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch astrolog data.");
        }

        const data = await response.json();
        const planets = {};
        data.rawOutput.split("\n").forEach((line) => {
          const match = line.match(
            /^(Sun\s|Moon|Merc|Venu|Mars|Jupi|Satu|Uran|Nept|Plut|Asce|Midh):\s+(\d+)([A-Za-z]{3})(\d+)\s+.*?(R)?\s+.*?\[\s*([^\]]+?)\s*\]/
          );
          if (match) {
            const [_, planet, degrees, signAbbr, minutes, retrograde, house] = match;
            planets[planetNames[planet] || planet] = {
              sign: zodiacSigns[signAbbr.toLowerCase()] || "Unknown",
              degrees: `${degrees}°${minutes}'`,
              house: house.trim(),
              retrograde: retrograde ? "Retrograde" : "Direct",
            };
          }
        });

        setAstroData({ planets });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAstroData();
  }, [searchParams]);

  const handleReinit = () => navigate("/");

  return (
    <div style={{ background: "white", width: "100vw", height: "100vh", position: "absolute" }}>

      <h1 className="text-3xl font-bold text-purple-800 mb-4 text-center">
        Astrology Insights
      </h1>

      {loading && (
        <p className="text-center text-lg text-purple-600">
          Loading your astrology insights...
        </p>
      )}

      {error && (
        <p className="text-center text-red-500">
          Error: {error}
        </p>
      )}

      {astroData && (
        <div>
          {name && (
            <p className="text-xl text-gray-800 mb-4 text-center">
              Welcome, <strong className="text-purple-800">{name}</strong>!
            </p>
          )}
          <p className="text-lg text-gray-700 mb-6 text-center">
            <strong>Your Sign:</strong>{" "}
            {signName.charAt(0).toUpperCase() + signName.slice(1)}
          </p>

          <h2 className="text-2xl font-semibold text-purple-800 mb-4">
            Planetary Details
          </h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            {Object.entries(astroData.planets).map(([planet, details], index) => (
              <li key={index}>
                <strong className="text-purple-800">{planet}</strong>: {details.sign},{" "}
                {details.degrees}, House {details.house},{" "}
                {details.retrograde}
              </li>
            ))}
          </ul>
        </div>
      )}

      <button
        onClick={handleReinit}
        className="mt-6 px-6 py-3 bg-purple-600 text-white rounded-lg shadow hover:bg-purple-700 transition"
      >
        Reinit
      </button>

    </div>
  );
}

export default FinalPage;
