'use strict';

module.exports.handler = (input, context, callback) => {

  console.log(input);
  const body = JSON.parse(input.body);
  
  let responseBody;
  
  if (body.bookFlightFailure && body.bookFlightFailure==='true') {
    console.log('simulated failure to book a flight');
    responseBody = JSON.stringify({
      success: false,
      flightMessage: 'Flight booking went wrong because we wanted it to fail'
    });
  } else {
    console.log('booked a flight');    
    responseBody = JSON.stringify({
      success: true,
      flightMessage: 'Flight booking successful'
    });
  }
  callback(null, {
    statusCode: 200,
    body: responseBody
  });
};