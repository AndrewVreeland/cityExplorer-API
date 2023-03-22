'use strict';

console.log('yay our first server!');

// *** REQUIRES ****** (like import but for backend)

const express = require('express');
require('dotenv').config();
const cors = require('cors');

//! data = require('./data/data.json');
let data = require('./data/weather.json');
// *** ONCE WE BRING IN EXPRESS WE CALL IT TO CREATE THE SERVER ***
// ** app === server
const app = express();

// *** MIDDLEWARE - CORS ****
app.use(cors());

// *** PORT THAT MY SERVER WILL RUN ON ***
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

app.get('/weather', (request, response, next) => {
  try {
    let queriedData = request.query.city_name;
    let dataToGroom = data.find(city => city.city_name === queriedData);
    let dataToSend = new Forecast(dataToGroom);
    response.status(200).send(dataToSend);
  } catch (error) {
    next(error);
  }


});

app.get('/hello', (request, response) => {

  let userFirstName = request.query.firstName;
  let userLastName = request.query.lastName;

  response.status(200).send(`Hello ${userFirstName} ${userLastName}! Welcome to my server!`);
});

// *** CLASS TO GROOM BULKY DATA ***

class Forecast {
  constructor(cityObj) {

    {
      this.city_name = cityObj.city_name;
      this.date = cityObj.valid_date;
      this.description = cityObj.weather.description;
      // this.lon = cityObj.lon;
      // this.lat = cityObj.lat;
    }


    // this.weather = cityObj.weather.description;

    // let queriedLocation = request.query.data.city_name
    // let queriedDate = request.query.valid_date
    // let queriedWeather = request.query.weather.description
  }
}


// *** CATCH ALL - BE AT THE BOTTOM AND SERVE AS A 404 ERROR MESSAGE
app.get('*', (request, response) => {
  response.status(404).send('This route does not exist');
});


// *** ERROR HANDLING - PLUG AND PLAY CODE FROM EXPRESS DOCS ****
app.use((error, request, response, next) => {
  response.status(500);
});

