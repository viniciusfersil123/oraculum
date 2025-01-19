const express = require('express');
const axios = require('axios');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Serve the React frontend
app.use(express.static(path.join(__dirname, 'dist')));

// Root Route to Confirm Server is Running
app.get('/api', (req, res) => {
  res.send('🚀 Astrology API Server is Running with v2!');
});

// Get Access Token
app.get('/api/token', async (req, res) => {
  try {
    const response = await axios.post('https://api.prokerala.com/token',
      new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET
      }), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });

    res.json(response.data);
  } catch (err) {
    console.error('Error fetching token:', err.response?.data || err.message);
    res.status(500).json({ error: 'Failed to retrieve token.' });
  }
});

// Fetch Horoscope (v2)
app.get('/api/horoscope', async (req, res) => {
  const { sign, datetime } = req.query;

  if (!sign || !datetime) {
    return res.status(400).json({ error: 'Zodiac sign and datetime are required.' });
  }

  try {
    const tokenResponse = await axios.post('https://api.prokerala.com/token',
      new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET
      }), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });

    const accessToken = tokenResponse.data.access_token;

    const horoscopeResponse = await axios.get('https://api.prokerala.com/v2/horoscope/daily', {
      headers: { Authorization: `Bearer ${accessToken}` },
      params: {
        sign,
        datetime
      }
    });

    res.json(horoscopeResponse.data);
  } catch (err) {
    console.error('Error fetching horoscope:', err.response?.data || err.message);
    res.status(500).json({ error: 'Failed to fetch horoscope data.' });
  }
});

// Fetch Cities based on State/Country using GeoNames API
app.get('/api/cities', async (req, res) => {
  const { countryCode, stateCode } = req.query;

  if (!countryCode || !stateCode) {
    return res.status(400).json({ error: 'Country code and state code are required.' });
  }

  try {
    const countryResponse = await axios.get('http://api.geonames.org/countryInfoJSON', {
      params: {
        username: process.env.GEONAMES_USERNAME,
      }
    });

    const country = countryResponse.data.geonames.find(c => c.countryCode === countryCode);
    const countryGeonameId = country ? country.geonameId : null;

    if (!countryGeonameId) {
      return res.status(400).json({ error: 'Invalid country code' });
    }

    const statesResponse = await axios.get('http://api.geonames.org/childrenJSON', {
      params: {
        geonameId: countryGeonameId,
        username: process.env.GEONAMES_USERNAME
      }
    });

    const state = statesResponse.data.geonames.find(s => s.geonameId === stateCode);

    if (state) {
      const citiesResponse = await axios.get('http://api.geonames.org/searchJSON', {
        params: {
          parentId: state.geonameId,
          username: process.env.GEONAMES_USERNAME
        }
      });

      res.json(citiesResponse.data);
    } else {
      res.status(400).json({ error: 'Invalid state code' });
    }
  } catch (err) {
    console.error('Error fetching cities:', err.response?.data || err.message);
    res.status(500).json({ error: 'Failed to fetch cities data.' });
  }
});

// Fetch Planet Position (v2)
app.get('/api/planet-position', async (req, res) => {
  const { lat, lon, datetime, planets, ayanamsa, coordinates } = req.query;

  if (!lat || !lon || !datetime || !planets || !ayanamsa || !coordinates) {
    return res.status(400).json({ error: 'Missing required parameters.' });
  }

  try {
    const tokenResponse = await axios.post('https://api.prokerala.com/token',
      new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET
      }), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });

    const accessToken = tokenResponse.data.access_token;

    const planetPositionResponse = await axios.get('https://api.prokerala.com/v2/astrology/planet-position', {
      headers: { Authorization: `Bearer ${accessToken}` },
      params: {
        lat,
        lon,
        datetime,
        planets,
        ayanamsa,
        coordinates
      }
    });

    res.json(planetPositionResponse.data);
  } catch (err) {
    console.error('Error fetching planet position:', err.response?.data || err.message);
    res.status(500).json({ error: 'Failed to fetch planet position data.' });
  }
});

// Fallback to serve React frontend
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
