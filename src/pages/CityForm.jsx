import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import axios from "axios";
import debounce from "lodash/debounce";
import "./CityForm.css";

function CityForm() {
  const navigate = useNavigate();
  const { signName } = useParams();
  const [searchParams] = useSearchParams();

  const day = searchParams.get("day");
  const decade = searchParams.get("decade");
  const year = searchParams.get("year");
  const month = searchParams.get("month");
  const hour = searchParams.get("hour");
  const minute = searchParams.get("minute");
  const period = searchParams.get("period");

  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);

  const [countryOptions, setCountryOptions] = useState([]);
  const [stateOptions, setStateOptions] = useState([]);
  const [cityOptions, setCityOptions] = useState([]);

  const [countrySearch, setCountrySearch] = useState("");
  const [stateSearch, setStateSearch] = useState("");
  const [citySearch, setCitySearch] = useState("");

  const [error, setError] = useState("");

  const GEO_USERNAME = import.meta.env.VITE_GEONAMES_USERNAME;

  const fetchCountries = (searchQuery = "") => {
    if (!searchQuery) return;

    axios
      .get(
        `https://secure.geonames.org/searchJSON?featureClass=A&featureCode=PCLI&name_startsWith=${searchQuery}&username=${GEO_USERNAME}`
      )
      .then((response) => {
        const countries = response.data.geonames.map((country) => ({
          value: country.countryCode,
          label: country.name,
          geonameId: country.geonameId,
        }));
        setCountryOptions(countries);
      })
      .catch((err) => console.error("Failed to fetch countries:", err));
  };

  const fetchStates = (countryId, searchQuery = "") => {
    if (!searchQuery) return;

    axios
      .get(
        `https://secure.geonames.org/childrenJSON?geonameId=${countryId}&username=${GEO_USERNAME}`
      )
      .then((response) => {
        const states = response.data.geonames.filter((state) =>
          state.name.toLowerCase().startsWith(searchQuery.toLowerCase())
        ).map((state) => ({
          value: state.adminCode1,
          label: state.name,
          geonameId: state.geonameId,
        }));
        setStateOptions(states);
      })
      .catch((err) => console.error("Failed to fetch states:", err));
  };

  const fetchCities = (countryCode, stateCode, searchQuery = "") => {
    if (!searchQuery) return;

    axios
      .get(
        `https://secure.geonames.org/searchJSON?country=${countryCode}&adminCode1=${stateCode}&featureClass=P&name_startsWith=${searchQuery}&username=${GEO_USERNAME}`
      )
      .then((response) => {
        const cities = response.data.geonames.map((city) => ({
          value: city.geonameId,
          label: city.name,
          geonameId: city.geonameId,
          latitude: city.lat,
          longitude: city.lng,
        }));
        setCityOptions(cities);
      })
      .catch((err) => console.error("Failed to fetch cities:", err));
  };

  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
    setCountrySearch(country.label);
    setSelectedState(null);
    setSelectedCity(null);
    setStateOptions([]);
    setCityOptions([]);
  };

  const handleStateSelect = (state) => {
    setSelectedState(state);
    setStateSearch(state.label);
    setSelectedCity(null);
    setCityOptions([]);
  };

  const handleCitySelect = (city) => {
    setSelectedCity(city);
    setCitySearch(city.label);
  };

  const handleContinue = () => {
    if (!selectedCountry || !selectedState || !selectedCity) {
      setError("Please select a country, state, and city.");
      return;
    }

    const { latitude, longitude } = selectedCity;

    navigate(
      `/sign/${signName}/name?day=${day}&month=${month}&decade=${decade}&year=${year}&hour=${hour}&minute=${minute}&period=${period}&latitude=${latitude}&longitude=${longitude}`
    );
  };

  const debouncedFetchCountries = useCallback(debounce(fetchCountries, 500), []);
  const debouncedFetchStates = useCallback(
    debounce((searchQuery) => {
      if (selectedCountry) {
        fetchStates(selectedCountry.geonameId, searchQuery);
      }
    }, 500),
    [selectedCountry]
  );

  const debouncedFetchCities = useCallback(
    debounce((searchQuery) => {
      if (selectedCountry && selectedState) {
        fetchCities(selectedCountry.value, selectedState.value, searchQuery);
      }
    }, 500),
    [selectedCountry, selectedState]
  );

  useEffect(() => {
    if (countrySearch.length > 0) {
      debouncedFetchCountries(countrySearch);
    } else {
      setCountryOptions([]);
    }
  }, [countrySearch, debouncedFetchCountries]);

  useEffect(() => {
    if (stateSearch.length > 0) {
      debouncedFetchStates(stateSearch);
    } else {
      setStateOptions([]);
    }
  }, [stateSearch, debouncedFetchStates]);

  useEffect(() => {
    if (citySearch.length > 0) {
      debouncedFetchCities(citySearch);
    } else {
      setCityOptions([]);
    }
  }, [citySearch, debouncedFetchCities]);

  return (
    <div className="city-container">
      <p>
        Enter the <strong><u>place you were born</u></strong> or select the closest bigger city.
      </p>

      <label htmlFor="country-select">Country</label>
      <input
        id="country-select"
        type="text"
        value={countrySearch}
        onChange={(e) => setCountrySearch(e.target.value)}
        placeholder="Type to search for a country"
      />
      {countryOptions.length > 0 && countrySearch !== selectedCountry?.label && (
        <ul className="dropdown">
          {countryOptions.map((country) => (
            <li
              key={country.value}
              onClick={() => handleCountrySelect(country)}
              className="dropdown-item"
            >
              {country.label}
            </li>
          ))}
        </ul>
      )}

      {selectedCountry && (
        <>
          <label htmlFor="state-select">State</label>
          <input
            id="state-select"
            type="text"
            value={stateSearch}
            onChange={(e) => setStateSearch(e.target.value)}
            placeholder="Type to search for a state"
          />
          {stateOptions.length > 0 && stateSearch !== selectedState?.label && (
            <ul className="dropdown">
              {stateOptions.map((state) => (
                <li
                  key={state.value}
                  onClick={() => handleStateSelect(state)}
                  className="dropdown-item"
                >
                  {state.label}
                </li>
              ))}
            </ul>
          )}
        </>
      )}

      {selectedState && (
        <>
          <label htmlFor="city-select">City</label>
          <input
            id="city-select"
            type="text"
            value={citySearch}
            onChange={(e) => setCitySearch(e.target.value)}
            placeholder="Type to search for a city"
          />
          {cityOptions.length > 0 && citySearch !== selectedCity?.label && (
            <ul className="dropdown">
              {cityOptions.map((city) => (
                <li
                  key={city.value}
                  onClick={() => handleCitySelect(city)}
                  className="dropdown-item"
                >
                  {city.label}
                </li>
              ))}
            </ul>
          )}
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
