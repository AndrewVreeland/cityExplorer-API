'use strict';
const axios = require('axios');
let cache = {};



//TODO: need to create a key for the data I am going to store
//TODO: if the thing exsists and within a valid timeframe ... send that data from cache
//TODO: if the thing does not exist - call my API and cache that return from the API 

async function getMovies(request, response, next) {
  try {
    let city = request.query.searchQuery;
    let movieKey = `Movie ${city}-cityName`;

    if (cache[movieKey] && (Date.now() - cache[movieKey].timestamp) < 10000) {
      console.log(' Movie cache was hit!');

      response.status(200).send(cache[movieKey].data);

    } else {
      console.log('Movie cache was empty');
      let movieUrl = `https://api.themoviedb.org/3/search/movie?query=${city}&api_key=${process.env.REACT_APP_TheMoviedb_API_KEY}&language=en-US&page=1&include_adult=false`;
      let movieResults = await axios.get(movieUrl);
      let moviesToSend = movieResults.data.results.map(film => new Movie(film));
      response.status(200).send(moviesToSend);

      cache[movieKey]={
        data: moviesToSend,
        timestamp: Date.now()
      };
    }
  }
  catch (error) {
    next(error);
  }
}

class Movie {
  constructor(movieObj) {
    this.title = movieObj.title;
    this.description = movieObj.overview;
  }
}

module.exports = getMovies;
