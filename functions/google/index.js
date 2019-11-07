'use strict';

module.exports.bookCar = (req, res) => {

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


module.exports.cancelCar = (req, res) => {
    console.log("canceled a car");    
    const responseBody = JSON.stringify({
        carCancelMessage: 'Car cancelation successful'
      });
    res.status(200).send( responseBody );
};


module.exports.bookFlight = (req, res) => {

  const body = req.body;
  
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
  res.status(200).send( responseBody );
};




module.exports.cancelFlight = (req, res) => {
    console.log("canceled a flight");    
    const responseBody = JSON.stringify({
        flightCancelMessage: 'Flight cancelation successful'
      });
    res.status(200).send( responseBody );
};



module.exports.bookHotel = (req, res) => {

  const body = req.body;
  
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
  res.status(200).send( responseBody );
};



module.exports.cancelHotel = (req, res) => {
    console.log("canceled a hotel");    
    const responseBody = JSON.stringify({
        hotelCancelMessage: 'Hotel cancelation successful'
      });
    res.status(200).send( responseBody );
};
