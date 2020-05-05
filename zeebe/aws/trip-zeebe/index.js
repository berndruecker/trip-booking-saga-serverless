'use strict';

const ZB = require('zeebe-node')

module.exports.handler = (input, context, callback) => {
  const body = JSON.parse(input.body);

  const zbc = new ZB.ZBClient({
    camundaCloud: {
      clientId: process.env.ZEEBE_CLIENT_ID,
      clientSecret: process.env.ZEEBE_CLIENT_SECRET,
      clusterId: process.env.ZEEBE_CLUSTER_ID,
      cacheOnDisk: false      
    }
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
