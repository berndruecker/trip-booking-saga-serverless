'use strict';

module.exports.handler = (input, context, callback) => {

  if (input.cancelFlightFailure) {
    console.log("failed to cancel a flight");
    callback("Internal Server Error");
  } else {
    console.log("canceled a flight");
    
    const response = {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Flight cancelation successful'
      }),
    };

    callback(null, response);
  }
};
