const express = require('express');
const { exec } = require('child_process');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Path to the Astrolog executable
const astrologPath = './astrolog/astrolog';

app.use(cors());
app.use(express.json());

// API Endpoint for Astrolog
app.post('/api/astrolog', (req, res) => {
  const { day, month, year, hour, minute, latitude, longitude } = req.body;

  if (!day || !month || !year || !hour || !minute || !latitude || !longitude) {
    return res.status(400).json({ error: 'All parameters are required.' });
  }

  const timezone = '0'; // Adjust timezone if necessary

  const command = `${astrologPath} -qa ${month} ${day} ${year} ${hour}:${minute} ${timezone} ${longitude} ${latitude}`;

  console.log(`Executing Command: ${command}`);

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error('Astrolog Execution Error:', stderr);
      return res.status(500).json({
        error: 'Failed to execute astrolog command.',
        details: stderr.trim(),
      });
    }

    console.log('Astrolog Output:', stdout);

    res.json({
      rawOutput: stdout.trim(),
    });
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
