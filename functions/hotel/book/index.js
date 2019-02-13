'use strict';

module.exports.handler = (input, context, callback) => {

  if (input.bookHotelFailure) {
    console.log("failed to book a hotel");
    callback("Internal Server Error");
  } else {
    console.log("booked a hotel");
    
    const response = {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Hotel booked successful'
      }),
    };

    callback(null, response);
  }
};
