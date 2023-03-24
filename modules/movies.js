'use strict';
const axios = require('axios');


async function getMovies(request,response, next){
  try {
    let city = request.query.searchQuery;
    let movieUrl = `https://api.themoviedb.org/3/search/movie?query=${city}&api_key=${process.env.REACT_APP_TheMoviedb_API_KEY}&language=en-US&page=1&include_adult=false`;
    let movieResults = await axios.get(movieUrl);
    let moviesToSend = movieResults.data.results.map(film => new Movie(film));
    response.status(200).send(moviesToSend);
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
