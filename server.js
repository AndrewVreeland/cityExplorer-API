'use strict';

console.log('yay our first server!');

// *** REQUIRES ****** (like import but for backend)

const express = require('express');
require('dotenv').config();
const cors = require('cors');
const axios = require('axios');

let weather = require('./data/weather.json');
// *** ONCE WE BRING IN EXPRESS WE CALL IT TO CREATE THE SERVER ***
// ** app === server
const app = express();

// *** MIDDLEWARE - CORS ****
app.use(cors());

// *** PORT THAT MY SERVER WILL RUN ON - will fall back of 3002***
const PORT = process.env.PORT || 3002;

app.listen(PORT, () => console.log(`we are running on port ${PORT}!`));

// *** ENDPOINTS ****

// *** BASE ENDPOINT - PROOF OF LIFE - ORDER MATTERS PUT CATCH ALL AT THE BOTTOM
// ** 1st arg - string url in quotes
// ** 2nd arg - callback that will execute when that endpoint is hit
// ** Call back - takes two arguments 

app.get('/', (request, response) => {
  response.status(200).send('welcome to my server');
});

app.get('/movie', async (request, response, next) => {
  try {
    //TODO: accept my queries -> /movie?
    let city = request.query.searchQuery;
    let movieResults = await axios.get(movieUrl);
    //TODO: build my url for axios
    let movieUrl = `https://api.themoviedb.org/3/search/movie?query=${city}&api_key=${process.env.REACT_APP_REACT_APP_weatherBit_API_KEY}&language=en-US&page=1&include_adult=false`
    response.status(200).send();

    // TODO: groom that data and send it to the frontend
    let moviesToSend = movieResults.results.data.map(film => new Movie(film));



    response.status(200).send(moviesToSend);
  }
  catch (error) {
    next(error);
  }
});

class Movie {
  constructor(movieObj) {
    this.title = movieObj.title;
    this.description = movieObj.overview;
  }
}


app.get('/weather', async (request, response, next) => {
  try {


    //TODO: accept quries - lat. lon, searchQuery
    let lat = request.query.lat;
    let lon = request.query.lon;
    let city = request.query.searchQuery;

    console.log(request.query);

    //TODO: find that city based on CITYNAME - json
    // https://api.weatherbit.io/v2.0/forecast/daily/?key=8e5566baca0d4701850857ca9f194d31&lat=47.6062&lon=-122.3321&untis=I&days=5
    let url = `http://api.weatherbit.io/v2.0/forecast/daily/?key=${process.env.REACT_APP_weatherBit_API_KEY}&lat=${lat}&lon=${lon}&untis=I&days=5`;
    console.log(url);

    let weatherResults = await axios.get(url);
    console.log(weatherResults.data.data); 
    // TODO: senc city into this class to be groomed

    
    let weatherToSend = weatherResults.data.data.map(day => new Forecast(day));

    response.status(200).send(weatherToSend);
  } catch (error) {
    next(error);
  }
});

// TODO: Update class with weather API info
// *** CLASS TO GROOM BULKY DATA ***
class Forecast {
  constructor(dayObj) {
    this.date = dayObj.valid_date;
    this.description = dayObj.weather.description;
  }
}



// *** ERROR HANDLING - PLUG AND PLAY CODE FROM EXPRESS DOCS ****
app.use((error, request, response, next) => {
  response.status(500);
});

// *** CATCH ALL - BE AT THE BOTTOM AND SERVE AS A 404 ERROR MESSAGE
app.get('*', (request, response) => {
  response.status(404).send('This route does not exist');
});


