= Showcase to coordinate serverless functions

***Under construction!***

Using the classical trip booking Saga example. 

- Using a call-chain (todo)
- Using AWS Step Functions
- Using Camunda as workflow engine

= Get started

* Install Serverless framework and configure the connection to AWS

* Deploy the functions using the serverless framework.

```
cd functions
serverless deploy
cd ..
```

* Play with Step Functions

Deploy:

```
cd serverless-app-step-functions
serverless deploy
cd ..
```

Goto AWS Console and start instances or use REST:

````
curl -H "Content-Type: application/json" -X PUT -d '{"bookCarFailure":true}' https://xndjvrnxih.execute-api.eu-central-1.amazonaws.com/dev/trip
```

````
curl -H "Content-Type: application/json" -X PUT -d  @request-step-functions.json https://xndjvrnxih.execute-api.eu-central-1.amazonaws.com/dev/trip
```


* Play with Camunda

Pre-condition: Make sure to deploy a Camunda container, see (camunda/)

Todo: Use a serverless plugin

For now: Deploy the `trip.bpmn` via the [Camunda Modeler](https://camunda.com/download/modeler/) and start using [REST API](https://docs.camunda.org/manual/7.10/reference/rest/process-definition/post-start-process-instance/) or the Camunda Webapp:

````
curl -H "Content-Type: application/json" -X POST -d  @request-camunda.json http://localhost:8080/rest/process-definition/key/trip/start
```

````
curl -H "Content-Type: application/json" -X POST -d '{"variables":{"bookCarFailure":{"value":"false","type":"boolean"}}}' http://localhost:8080/rest/process-definition/key/trip/start
```


