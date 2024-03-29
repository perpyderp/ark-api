/*
    Author: Jacob Cuison
    Entry point for the ARK API, and sets up the middleware, routes, and error handling

*/


const express = require('express');
const cors = require('cors');

const creatureRoutes = require('./routes/creatureRoutes');
const armorRoutes = require('./routes/armorRoutes');
const eggTypeRoutes = require('./routes/eggTypeRoutes');
const resourceRoutes = require('./routes/resourceRoutes');
const statusRoutes = require('./routes/statusRoutes');
const eventRoutes = require('./routes/eventRoutes');
const db = require('./db');

require('dotenv').config({ path: './env' });

const app = express()
const port = process.env.PORT || 3001;
app.use(cors({
  origin: ['https://ark-api.vercel.app',
  'http://localhost:3000',
  'https://ark-api-perpyderp.vercel.app/'
  ],
  allowedHeaders: ['Content-Type', 'Authorization'],
}
));
app.use('/api', creatureRoutes);
app.use('/api', armorRoutes);
app.use('/api', eggTypeRoutes);
app.use('/api', resourceRoutes);
app.use('/api', eventRoutes);
app.use('/api', statusRoutes);
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to the ARK API');
});

console.log("Connecting to database...");
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('MongoDB connection established');
  // Start server once connected to database
  app.listen(port, () => {
    console.log(`ARK API listening on port ${port}`);
  })
});