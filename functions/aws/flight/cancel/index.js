'use strict';

module.exports.handler = (input, context, callback) => {
    console.log("canceled a flight");    
    const response = {
      statusCode: 200,
      body: JSON.stringify({
        flightCancelMessage: 'Flight cancelation successful'
      }),
    };
    callback(null, response);
};
