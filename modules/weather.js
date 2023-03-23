'use strict';
const axios = require('axios');

async function getWeather(request, response, next){
  try {

    let lat = request.query.lat;
    let lon = request.query.lon;

    console.log(request.query);

    // https://api.weatherbit.io/v2.0/forecast/daily/?key=8e5566baca0d4701850857ca9f194d31&lat=47.6062&lon=-122.3321&untis=I&days=5
    let url = `http://api.weatherbit.io/v2.0/forecast/daily/?key=${process.env.REACT_APP_weatherBit_API_KEY}&lat=${lat}&lon=${lon}&untis=I&days=5`;
    console.log(url);

    let weatherResults = await axios.get(url);
    console.log(weatherResults.data.data);


    let weatherToSend = weatherResults.data.data.map(day => new Forecast(day));

    response.status(200).send(weatherToSend);
  } catch (error) {
    next(error);
  }
}

class Forecast {
  constructor(dayObj) {
    this.date = dayObj.valid_date;
    this.description = dayObj.weather.description;
  }
}


module.exports = getWeather;
