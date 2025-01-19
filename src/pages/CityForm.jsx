import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import Select from "react-select";
import axios from "axios";
import "./CityForm.css";

function CityForm() {
  const navigate = useNavigate();
  const { signName } = useParams();
  const [searchParams] = useSearchParams();

  const day = searchParams.get("day");
  const decade = searchParams.get("decade");
  const year = searchParams.get("year");
  const hour = searchParams.get("hour");
  const minute = searchParams.get("minute");
  const period = searchParams.get("period");

  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [countryOptions, setCountryOptions] = useState([]);
  const [stateOptions, setStateOptions] = useState([]);
  const [cityOptions, setCityOptions] = useState([]);
  const [error, setError] = useState("");

  const GEO_USERNAME = import.meta.env.VITE_GEONAMES_USERNAME;

  // Fetch country information
  useEffect(() => {
    axios
      .get(`http://api.geonames.org/countryInfoJSON?username=${GEO_USERNAME}`)
      .then((response) => {
        const countries = response.data.geonames.map((country) => ({
          value: country.countryCode, // Use ISO country code
          label: country.countryName,
          geonameId: country.geonameId, // Keep geonameId for fetching states
        }));
        setCountryOptions(countries);
      })
      .catch((err) => console.error("Failed to fetch countries:", err));
  }, []);

  const handleCountryChange = (country) => {
    setSelectedCountry(country);
    setSelectedState(null);
    setSelectedCity(null);
    setCityOptions([]); // Clear previous city options
    fetchStates(country.geonameId); // Pass geonameId to fetch states
  };

  const handleStateChange = (state) => {
    setSelectedState(state);
    setSelectedCity(null);
    setCityOptions([]); // Clear previous city options
    fetchCities(selectedCountry?.value, state?.value); // Use ISO country code and adminCode1
  };

  const handleCityChange = (city) => {
    setSelectedCity(city);
  };

  const fetchStates = (countryId) => {
    if (!countryId) return;

    axios
      .get(`http://api.geonames.org/childrenJSON?geonameId=${countryId}&username=${GEO_USERNAME}`)
      .then((response) => {
        const states = response.data.geonames.map((state) => ({
          value: state.adminCode1, // Use adminCode1 for state code
          label: state.name,
        }));
        setStateOptions(states);
      })
      .catch((err) => console.error("Failed to fetch states:", err));
  };

  const fetchCities = (countryCode, stateCode) => {
    if (!countryCode || !stateCode) {
      console.warn("Invalid countryCode or stateCode:", { countryCode, stateCode });
      return;
    }

    const url = `http://api.geonames.org/searchJSON?country=${countryCode}&adminCode1=${stateCode}&featureClass=P&maxRows=10&username=${GEO_USERNAME}`;
    console.log("Fetching cities with URL:", url); // Debugging URL

    axios
      .get(url)
      .then((response) => {
        console.log("Cities response:", response.data); // Debugging response
        const cities = response.data.geonames.map((city) => ({
          value: city.geonameId,
          label: city.name,
        }));
        setCityOptions(cities);
      })
      .catch((err) => console.error("Failed to fetch cities:", err));
  };

  const handleContinue = () => {
    if (!selectedCountry || !selectedState || !selectedCity) {
      setError("Please select a country, state, and city.");
      return;
    }

    navigate(
      `/sign/${signName}/final?day=${day}&decade=${decade}&year=${year}&hour=${hour}&minute=${minute}&period=${period}&city=${selectedCity.label}&stateId=${selectedState.value}&countryId=${selectedCountry.value}`
    );
  };

  return (
    <div className="city-container">
      <p>
        Enter the <strong><u>place you were born</u></strong> or select the closest bigger city. <br />
        I will use this information to calculate your ascendent and tell you how to thrive in life:
      </p>

      <label htmlFor="country-select">Country</label>
      <Select
        id="country-select"
        options={countryOptions}
        onChange={handleCountryChange}
        value={selectedCountry}
        placeholder="Select Country"
      />

      {selectedCountry && (
        <>
          <label htmlFor="state-select">State</label>
          <Select
            id="state-select"
            options={stateOptions}
            onChange={handleStateChange}
            value={selectedState}
            placeholder="Select State"
          />
        </>
      )}

      {selectedState && cityOptions.length > 0 && (
        <>
          <label htmlFor="city-select">City</label>
          <Select
            id="city-select"
            options={cityOptions}
            onChange={handleCityChange}
            value={selectedCity}
            placeholder="Select City"
          />
        </>
      )}

      {error && <p className="error-text">{error}</p>}

      <button
        className="continue-button"
        onClick={handleContinue}
        disabled={!selectedCity}
      >
        Continue
      </button>
    </div>
  );
}

export default CityForm;
