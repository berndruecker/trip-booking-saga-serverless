'use strict';

module.exports.handler = (input, context, callback) => {

  if (input.bookFlightFailure) {
    console.log("failed to book a flight");
    callback("Internal Server Error");
  } else {
    console.log("booked a flight");
    
    const response = {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Flight booked successful'
      }),
    };

    callback(null, response);
  }
};
