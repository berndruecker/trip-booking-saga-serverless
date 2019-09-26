# Showcase to coordinate serverless functions using Camunda BPM

This demo implements the classical trip booking Saga example on Camunda BPM run as container.

[Overview](../overview.png)

I used this for certain talks:

* Serverless Hamburg 2019: https://www.slideshare.net/BerndRuecker/serverless-days-2019-lost-in-transaction

***Constantly under construction!***

I use this demo for my talks. There is no gurantee on the stability of the code here - and it might be in a broken state any time.

# Get started

* Install Serverless framework and configure according to your cloud provider
* Deploy [functions](../functions/) as described there

* Deploy a Camunda container, see  [readme in container folder](container/) 
* Deploy the `trip.bpmn` via the [Camunda Modeler](https://camunda.com/download/modeler/) using the right endpoint for your container
** Or use the Serverless plugin in [workflow/](workflow/):

```
cd serverless-plugin-camunda
npm link
cd ../
npm link serverless-plugin-camunda
serverless deploy
```

* Start new instances using [REST API](https://docs.camunda.org/manual/7.10/reference/rest/process-definition/post-start-process-instance/):

```
curl -H "Content-Type: application/json" -X POST -d  @request-camunda.json http://CAMUNDA_URL:8080/rest/process-definition/key/trip/start
```