# Showcase to coordinate serverless functions

This demo implements the classical trip booking Saga with Step Functions.

[Overview](../overview.png)

I used this for certain talks:

* Serverless Hamburg 2019: https://www.slideshare.net/BerndRuecker/serverless-days-2019-lost-in-transaction

***Constantly under construction!***

I use this demo for my talks. There is no gurantee on the stability of the code here - and it might be in a broken state any time.

# Get started

* Install Serverless framework and configure according to your cloud provider
* Deploy [functions](../functions/) as described there
* Deploy Step Functions

```
cd serverless-app-step-functions
serverless deploy
cd ..
```

* Goto AWS Console and start instances or use REST:

```
curl -H "Content-Type: application/json" -X PUT -d  @request-step-functions.json https:/STEP_FUNCTIONS_URL/dev/trip
```
