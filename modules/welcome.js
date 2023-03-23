'use strict';


function welcome (request, response) {
  response.status(200).send('welcome to my server');
}


module.exports = welcome;
