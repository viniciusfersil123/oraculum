import React, { useEffect, useState } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import config from "./finalPage.json"

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
    <div
      className="w-screen h-screen bg-gradient-to-b from-purple-100 via-white to-purple-200 p-8 overflow-y-auto"
      style={{ position: "absolute", top: 0, left: 0, boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)" }}
    >
      {loading && (
        <p className="text-center text-lg text-purple-600 mt-6">
          Loading your astrology insights...
        </p>
      )}

      {error && (
        <p className="text-center text-red-500 mt-6">Error: {error}</p>
      )}

      {astroData && (
        <div className="max-w-4xl mx-auto mt-10 space-y-10">
          {name && (
            <h1 style={{ textShadow: 'none', border: 'black' }} className="text-3xl font-semibold text-purple-800">
              {config.introText}
              <strong style={{ textShadow: '1px 1px black', border: 'black' }}>{name}?</strong>
            </h1>
          )}
          <p style={{ marginTop: "10px" }} className="text-lg text-center text-gray-700 mt-0">
            <strong>Your Sign:</strong>{" "}
            {signName.charAt(0).toUpperCase() + signName.slice(1)}
          </p>

          <div className="text-center mt-10">

            <iframe
              width="560"
              height="315"
              src={config.youtubeLink}
              title="Why You Act the Way You Act"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="mx-auto"
            ></iframe>

          </div>


          {Object.entries(astroData.planets).map(([planet, details], index) => (
            <section
              key={index}
              style={{ display: "flex", alignItems: "baseline", gap: "1rem", boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)" }}
              className="p-8 bg-white rounded-lg shadow-md border-l-4 border-purple-500"
            >
              <h2 className="text-2xl font-semibold text-purple-700">
                {planet}
              </h2>
              <p className="text-gray-600 mt-2">
                <strong>Sign:</strong> {details.sign}
              </p>
              <p className="text-gray-600">
                <strong>Degrees:</strong> {details.degrees}
              </p>
              <p className="text-gray-600">
                <strong>House:</strong> {details.house}
              </p>
              <p className="text-gray-600">
                <strong>Motion:</strong> {details.retrograde}
              </p>
              <p className="text-gray-500 mt-4">
                {config.planetTexts[planet]}
              </p>
            </section>
          ))}
        </div>
      )}


      <div className="text-center mt-10">
        <button
          onClick={handleReinit}
          className="px-8 py-3 bg-purple-600 text-white font-semibold rounded-lg shadow-lg hover:bg-purple-700 transition"
        >
          Reinit
        </button>
      </div>
    </div>
  );
}

export default FinalPage;
