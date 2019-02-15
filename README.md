# Showcase to coordinate serverless functions

Accompanying slides from my talk at Serverless Hamburg can be found here: https://www.slideshare.net/BerndRuecker/serverless-days-2019-lost-in-transaction

***Under construction!***

Using the classical trip booking Saga example. 

- Using a call-chain (todo)
- Using AWS Step Functions
- Using Camunda as workflow engine

# Get started

* Install Serverless framework and configure the connection to AWS

* Deploy the functions using the serverless framework.

```
cd functions
serverless deploy
cd ..
```

# Play with Step Functions

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

Pre-condition: Make sure to deploy a Camunda container, see (camunda/)

Todo: Use a serverless plugin

For now: Deploy the `trip.bpmn` via the [Camunda Modeler](https://camunda.com/download/modeler/) and start using [REST API](https://docs.camunda.org/manual/7.10/reference/rest/process-definition/post-start-process-instance/) or the Camunda Webapp:

```
curl -H "Content-Type: application/json" -X POST -d  @request-camunda.json http://CAMUNDA_URL:8080/rest/process-definition/key/trip/start
```
