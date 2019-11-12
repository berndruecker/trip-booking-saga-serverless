'use strict';

module.exports.handler = (input, context, callback) => {
    console.log("canceled a hotel");    
    const response = {
      statusCode: 200,
      body: JSON.stringify({
        hotelCancelMessage: 'Hotel cancelation successful'
      }),
    };
    callback(null, response);
};
