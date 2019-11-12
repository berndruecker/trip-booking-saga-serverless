'use strict';

module.exports.handler = (input, context, callback) => {

  console.log(input);
  const body = JSON.parse(input.body);
  
  let responseBody;
  
  if (body.bookHotelFailure && body.bookHotelFailure==='true') {
    console.log('simulated failure to book a hotel');
    responseBody = JSON.stringify({
      success: false,
      hotelMessage: 'Hotel booking went wrong because we wanted it to fail'
    });
  } else {
    console.log('booked a hotel');    
    responseBody = JSON.stringify({
      success: true,
      hotelMessage: 'Hotel booking successful'
    });
  }
  callback(null, {
    statusCode: 200,
    body: responseBody
  });
};
