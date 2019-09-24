'use strict';

const ZB = require('zeebe-node')

module.exports.handler = (input, context, callback) => {
  const body = JSON.parse(input.body);

  const zbc = new ZB.ZBClient({
    camundaCloud: {
      clientId: "W11N78GY9KJTafp3regiyfKE2bRqaueZ",
      clientSecret:
      "OjqCUjxVzNPs-14LbTqTNlUMgpZPADvJ2zpgnRwk7V0EAltr5plo2ynIlu_L9GDh",
      clusterId: "a17f3184-2130-4d77-a1a5-e9fc2300ff56",
      cacheOnDisk: false      
    },
  })

  zbc.createWorkflowInstance('trip-booking', body); 

  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Trip booking started'
    }),
  };

  callback(null, response);
};
