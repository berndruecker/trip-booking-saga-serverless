'use strict';

module.exports.handler = (input, context, callback) => {

  console.log(input);
  const body = JSON.parse(input.body);

  if (body.bookCarFailure) {
    console.log("simulated failure to book a car");

    const response = {
      statusCode: 200,
      body: JSON.stringify({
        success: false,
        message: 'Car booking went wrong because we wanted it to fail'
      }),
  } else {
    console.log("booked a car");
    
    const response = {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        message: 'Car booking successful'
      }),
    };
  }
  callback(null, response);
};
