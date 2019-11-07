'use strict';

module.exports.handler = (req, res) => {

  console.log(req);
  console.log(req.body);
  const body = req.body;
  
  let responseBody;
  
  if (body.bookCarFailure && body.bookCarFailure==='true') {
    console.log('simulated failure to book a car');
    responseBody = JSON.stringify({
      success: false,
      carMessage: 'Car booking went wrong because we wanted it to fail'
    });
  } else {
    console.log('booked a car');    
    responseBody = JSON.stringify({
      success: true,
      carMessage: 'Car booking successful'
    });
  }
  res.status(200).send( responseBody );
};
