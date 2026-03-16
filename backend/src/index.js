const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const adsRoutes = require('./routes/ads');
const authRoutes = require('./routes/auth');
const favoritesRoutes = require('./routes/favorites');

const app = express();

app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());

app.use('/ads', adsRoutes);
app.use('/auth', authRoutes);
app.use('/favorites', favoritesRoutes);

app.listen(4000, () => {
  console.log('Server running on port 4000');
});
