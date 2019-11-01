'use strict';

const ZB = require('zeebe-node')

module.exports.bookTrip = (req, res) => {
  const body = req.body;

  const zbc = new ZB.ZBClient({
    camundaCloud: {
      clientId: "fZXkyHi4SmhmTnICtQ62Kg1EnUQLxX25",
      clientSecret:
      "QI5eNU0NPzLjd27E4I1S4J6o6sbDhQ7VdpaaybiQYTwOkk_u1Ap0N-S694QtpmS5",
      clusterId: "818e68a2-fe65-4874-856d-50c60ebb50d2",
      cacheOnDisk: false      
    }
  })

  zbc.createWorkflowInstance('trip-booking', body)

  const responseBody = JSON.stringify({
      message: 'Trip booking started'
    });

  res.status(200).send( responseBody );
};
