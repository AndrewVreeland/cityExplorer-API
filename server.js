'use strict';

const express = require('express');
require('dotenv').config();
const cors = require('cors');
const getMovies = require('./modules/movies.js');
const getWeather = require('./modules/weather');
const welcome = require('./modules/welcome');




const app = express();

app.use(cors());

const PORT = process.env.PORT || 3002;

app.listen(PORT, () => console.log(`we are running on port ${PORT}!`));

// *** ENDPOINTS ****

// *** BASE ENDPOINT - PROOF OF LIFE - ORDER MATTERS PUT CATCH ALL AT THE BOTTOM
// ** 1st arg - string url in quotes
// ** 2nd arg - callback that will execute when that endpoint is hit
// ** Call back - takes two arguments


app.get('/', welcome);
app.get('/movie', getMovies);
app.get('/weather', getWeather);




// *** ERROR HANDLING - PLUG AND PLAY CODE FROM EXPRESS DOCS ****
app.use((error, request, response, next) => {
  response.status(500).send(error.message);
});

// *** CATCH ALL - BE AT THE BOTTOM AND SERVE AS A 404 ERROR MESSAGE
app.get('*', (request, response) => {
  response.status(404).send('This route does not exist');
});


