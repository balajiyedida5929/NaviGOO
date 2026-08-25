const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', require('./routes/rentals'));
app.use('/api', require('./routes/roadside'));
app.use('/api', require('./routes/delivery'));
app.use('/api', require('./routes/sos'));
app.use('/api', require('./routes/bookings'));

app.get('/api/health', (req, res) => res.json({ ok: true, service: 'navigoo-backend' }));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`NaviGoo backend running on http://localhost:${PORT}`));
