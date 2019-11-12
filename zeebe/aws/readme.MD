# Showcase to coordinate serverless functions using Zeebe in Camunda Cloud

This demo implements the classical trip booking Saga with a managed Zeebe cluster in Camunda Cloud.

![Overview](../overview.png)

I use this for certain talks:

* AWS Community Summit London 2019: 
* Serverless Conference London 2019: 

# How-to use

This video gives a quick walk through the example:

<a href="http://www.youtube.com/watch?feature=player_embedded&v=M0tmV9fCq2U" target="_blank"><img src="http://img.youtube.com/vi/M0tmV9fCq2U/0.jpg" alt="Walkthrough" width="240" height="180" border="10" /></a>

## Create Zeebe cluster in Camunda Cloud

- Create Camunda Cloud account: https://camunda.com/products/cloud/
- Create Zeebe Cluster
- Retrieve client credentials (clusterId, clientId, clientSecret). We need that for `zbctl` and the [trip-zeebe/index.js](trip-zeebe/index.js) function

## Deploy Workflow Definition to Zeebe

Use the above credentials in that command:

```
zbctl --address 2daa1cac-f7cf-45e7-98f8-cccb474bf329.zeebe.camunda.io:443 --clientId KEFgrt9Azh07wTXbTX89sIBPgwgvzGaH --clientSecret vRfUxMcwuqYg4om6HYweR8iJdZyBl89BS9a5Bi4W7nOV5ezcvfOz4N4uO2vKAyWx deploy trip-booking.bpmn
```

## Deploy Serverless Stuff

* Deploy [functions as described](../functions/):

```
cd ../functions
serverless deploy 
```

* Capture `aws-api-key` as well as `aws-lambda-base-url` from the console
* Add them as worker variable via the Camunda Cloud console, e.g:
  * aws-api-key:  1l10cvdFgJb8nwhjI9Q95IIB2L5zWL379QTelH6c
  * aws-lambda-base-url: https://1g5n3ithxi.execute-api.eu-central-1.amazonaws.com/dev

* Adjust Zeebe client credentials in [trip-zeebe/index.js](trip-zeebe/index.js)
* Deploy coordinator function (trip booking, it will call Zeebe), making sure you include all necessary node libraries to be deployed alongside (and note that in this case AWS lambda runs on linux x64, so the grpc native lib must be adjusted accordingly):

```
cd libs/node-js
npm install --save zeebe-node
npm rebuild grpc --target=10.16.3 --target_arch=x64 --target_platform=linux --target_libc=glibc
cd ../..
serverless deploy 
```

* Capture URL for this function and call it via REST:

```
curl -H "Content-Type: application/json" -X PUT -d  @request-zeebe.json https://8rbjxgtf82.execute-api.eu-central-1.amazonaws.com/dev/trip/book
```
