const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Root Route to Confirm Server is Running
app.get('/', (req, res) => {
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

    // Fetch horoscope data
    const horoscopeResponse = await axios.get('https://api.prokerala.com/v2/horoscope/daily', {
      headers: { Authorization: `Bearer ${accessToken}` },
      params: {
        sign: sign,
        datetime: datetime // Make sure this datetime is in the correct format
      }
    });

    res.json(horoscopeResponse.data);
  } catch (err) {
    console.error('Error fetching horoscope:', err.response?.data || err.message);
    res.status(500).json({ error: 'Failed to fetch horoscope data.' });
  }
});

// Fetch Daily Prediction (v2)
// Update the API endpoint if needed

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
      }
    );

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


// Listen on port
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
