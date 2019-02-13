'use strict';

module.exports.handler = (input, context, callback) => {

  if (input.cancelCarFailure) {
    console.log("failed to cancel a car");
    callback("Internal Server Error");
  } else {
    console.log("canceled a car");
    
    const response = {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Car cancelation successful'
      }),
    };

    callback(null, response);
  }
};
