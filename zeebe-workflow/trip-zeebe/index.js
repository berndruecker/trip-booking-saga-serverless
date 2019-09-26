'use strict';

const ZB = require('zeebe-node')

module.exports.handler = (input, context, callback) => {
  const body = JSON.parse(input.body);

  const zbc = new ZB.ZBClient({
//    camundaCloud: {
//      clientId: "KEFgrt9Azh07wTXbTX89sIBPgwgvzGaH",
//      clientSecret:
//      "vRfUxMcwuqYg4om6HYweR8iJdZyBl89BS9a5Bi4W7nOV5ezcvfOz4N4uO2vKAyWx",
//      clusterId: "2daa1cac-f7cf-45e7-98f8-cccb474bf329",
//      cacheOnDisk: false      
//    },
    hostname: "2daa1cac-f7cf-45e7-98f8-cccb474bf329.zeebe.ultrawombat.com",
    port: "443",
    oAuth: {
        url: "https://login.cloud.ultrawombat.com/oauth/token",
        audience: "2daa1cac-f7cf-45e7-98f8-cccb474bf329.zeebe.ultrawombat.com",
        clientId: "KEFgrt9Azh07wTXbTX89sIBPgwgvzGaH",
        clientSecret: "vRfUxMcwuqYg4om6HYweR8iJdZyBl89BS9a5Bi4W7nOV5ezcvfOz4N4uO2vKAyWx",
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
