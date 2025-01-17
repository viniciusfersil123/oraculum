const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Root Route
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
      }
    );

    res.json(response.data);
  } catch (err) {
    console.error('Error fetching token:', err.response?.data || err.message);
    res.status(500).json({ error: 'Failed to retrieve token.' });
  }
});

// Fetch Horoscope (v2)
app.get('/api/horoscope', async (req, res) => {
  const { sign } = req.query;

  if (!sign) {
    return res.status(400).json({ error: 'Zodiac sign is required.' });
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

    const horoscopeResponse = await axios.get(`https://api.prokerala.com/v2/astrology/daily-horoscope`, {
      headers: { Authorization: `Bearer ${accessToken}` },
      params: { sign: sign }
    });

    res.json(horoscopeResponse.data);

  } catch (err) {
    console.error('Error fetching horoscope:', err.response?.data || err.message);
    res.status(500).json({ error: 'Failed to fetch horoscope data.' });
  }
});

// Fetch Kundli (v2)
app.get('/api/kundli', async (req, res) => {
  const { lat, lon, datetime } = req.query;

  if (!lat || !lon || !datetime) {
    return res.status(400).json({ error: 'Latitude, longitude, and datetime are required.' });
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

    const kundliResponse = await axios.get(`https://api.prokerala.com/v2/astrology/kundli`, {
      headers: { Authorization: `Bearer ${accessToken}` },
      params: {
        ayanamsa: 1,
        coordinates: `${lat},${lon}`,
        datetime: datetime // Do not encode this string
      }
    });

    res.json(kundliResponse.data);

  } catch (err) {
    console.error('Error fetching Kundli:', err.response?.data || err.message);
    res.status(500).json({ error: 'Failed to fetch Kundli data.' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
