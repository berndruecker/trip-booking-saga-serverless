'use strict';

module.exports.handler = (input, context, callback) => {
    console.log("canceled a car");    
    const response = {
      statusCode: 200,
      body: JSON.stringify({
        carCancelMessage: 'Car cancelation successful'
      }),
    };
    callback(null, response);
};
