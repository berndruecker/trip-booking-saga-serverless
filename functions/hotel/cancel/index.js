'use strict';

module.exports.handler = (input, context, callback) => {

  if (input.cancelHotelFailure) {
    console.log("failed to cancel a hotel");
    callback("Internal Server Error");
  } else {
    console.log("canceled a hotel");
    
    const response = {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Hotel cancelation successful'
      }),
    };

    callback(null, response);
  }
};
