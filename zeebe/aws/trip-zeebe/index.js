'use strict';

const ZB = require('zeebe-node')

module.exports.handler = (input, context, callback) => {
  const body = JSON.parse(input.body);

  const zbc = new ZB.ZBClient({
    camundaCloud: {
      clientId: "3mRSYYwed2lq21gO55emxpCnW7Rr9Zn1",
      clientSecret:
      "F7dHPVZa-X9CRDBZPB9SHV2WTRHuHXWjr2-MsJn-QhN5eQlcn2jUEipHNmXQWsgP",
      clusterId: "b7ba92c4-5a6d-496a-af3f-027a447483e9",
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
