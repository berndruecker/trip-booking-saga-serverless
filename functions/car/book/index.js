'use strict';

module.exports.handler = (input, context, callback) => {

  console.log(input);

  if (input.bookCarFailure) {
    console.log("failed to book a car");
    callback("Internal Server Error");
  } else {
    console.log("booked a car");
    
    const response = {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Car booking successful'
      }),
    };

    callback(null, response);
  }
};
