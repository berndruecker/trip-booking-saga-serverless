# Required functions for demo

This folder contains all necessary functions that need to be coordinated for a trip booking according to the classical example.

![Overview](../../overview.png)

# How to use

* Install Serverless framework and configure the connection to AWS
* Deploy the functions using the serverless framework.

```
serverless deploy
```

You should see something like this:

```
Serverless: Packaging service...
Serverless: Excluding development dependencies...
Serverless: Uploading CloudFormation file to S3...
Serverless: Uploading artifacts...
Serverless: Uploading service trip-booking-functions.zip file to S3 (2.36 KB)...
Serverless: Validating template...
Serverless: Updating Stack...
Serverless: Checking Stack update progress...
............................................
Serverless: Stack update finished...
Service Information
service: trip-booking-functions
stage: dev
region: eu-central-1
stack: trip-booking-functions-dev
resources: 43
api keys:
  workflow-engine: 1l10cvdFgJb8nwhjI9Q95IIB2L5zWL379QTelH6c
endpoints:
  PUT - https://1g5n3ithxi.execute-api.eu-central-1.amazonaws.com/dev/car/book
  DELETE - https://1g5n3ithxi.execute-api.eu-central-1.amazonaws.com/dev/car/book
  PUT - https://1g5n3ithxi.execute-api.eu-central-1.amazonaws.com/dev/hotel/book
  DELETE - https://1g5n3ithxi.execute-api.eu-central-1.amazonaws.com/dev/hotel/book
  PUT - https://1g5n3ithxi.execute-api.eu-central-1.amazonaws.com/dev/flight/book
  DELETE - https://1g5n3ithxi.execute-api.eu-central-1.amazonaws.com/dev/flight/book
functions:
  book-car: trip-booking-functions-dev-book-car
  cancel-car: trip-booking-functions-dev-cancel-car
  book-hotel: trip-booking-functions-dev-book-hotel
  cancel-hotel: trip-booking-functions-dev-cancel-hotel
  book-flight: trip-booking-functions-dev-book-flight
  cancel-flight: trip-booking-functions-dev-cancel-flight
layers:
  None
Serverless: Removing old service artifacts from S3...
Serverless: Run the "serverless" command to setup monitoring, troubleshooting and testing.
```