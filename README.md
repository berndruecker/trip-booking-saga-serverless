# Showcase to coordinate serverless functions

This demo implements the classical trip booking Saga example with various serverless functions and different ways of orchestrating them.

[Overview](overview.png)

I use this for certain talks:

* Serverless Hamburg 2019: https://www.slideshare.net/BerndRuecker/serverless-days-2019-lost-in-transaction
* AWS Community Summit London 2019: 
* Serverless Conference London 2019: 

***Constantly under construction!***

I use this demo for my talks. There is no gurantee on the stability of the code here - and it might be in a broken state any time.

# Get started

* Install Serverless framework and configure according to your cloud provider
* Deploy [functions](functions/) as described there
* Decide on the implementation approach you want to play around with:
  * [Zeebe](zeebe/) as managed service within [Camunda Cloud](https://camunda.com/products/cloud/)
  * [Camunda BPM](camunda/) running on EKS
  * [AWS Step Functions](step-functions/)

Deploy:

```
cd serverless-app-step-functions
serverless deploy
cd ..
```

Goto AWS Console and start instances or use REST:

```
curl -H "Content-Type: application/json" -X PUT -d  @request-step-functions.json https:/STEP_FUNCTIONS_URL/dev/trip
```


# Play with Camunda

Pre-condition: Make sure to deploy a Camunda container, see  [readme in camunda folder](camunda/) 

Todo: Use a serverless plugin

For now: Deploy the `trip.bpmn` via the [Camunda Modeler](https://camunda.com/download/modeler/) and start using [REST API](https://docs.camunda.org/manual/7.10/reference/rest/process-definition/post-start-process-instance/) or the Camunda Webapp:

```
curl -H "Content-Type: application/json" -X POST -d  @request-camunda.json http://CAMUNDA_URL:8080/rest/process-definition/key/trip/start
```
