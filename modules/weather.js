'use strict';
const axios = require('axios');
let cache = {};

//TODO: need to create a key for the data I am going to store
//TODO: if the thing exsists and within a valid timeframe ... send that data from cache
//TODO: if the thing does not exist - call my API and cache that return from the API 
async function getWeather(request, response, next) {
  try {
    let lat = request.query.lat;
    let lon = request.query.lon;
    let key = `Weather ${lat}-latitude ${lon}-longitude`; // key = Weather latitude-lattitude




    if (cache[key] && (Date.now() - cache[key].timestamp) < 8.64e+7) {
      console.log('cache was hit!');

      response.status(200).send(cache[key].data);
    } else {
      let url = `http://api.weatherbit.io/v2.0/forecast/daily/?key=${process.env.REACT_APP_weatherBit_API_KEY}&lat=${lat}&lon=${lon}&untis=I&days=5`;
      let weatherResults = await axios.get(url);
      let weatherToSend = weatherResults.data.data.map(day => new Forecast(day));
      // *** BUILD IT INTO CACHE ***

      cache[key] = {
        data: weatherToSend,
        timestamp: Date.now()
      };
      response.status(200).send(weatherToSend);
    }
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
