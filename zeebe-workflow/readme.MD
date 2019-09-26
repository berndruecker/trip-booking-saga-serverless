# How-to

## Create Zeebe cluster in Camunda Cloud

- Create Cluster
- Retrieve credentials and add them to 
  - zbctl deploy command
  - trip-zeebe/index.js function
- Add worker variables:
  - aws-api-key:  1l10cvdPoJb8nwhjI9Q95IIB2L5zWL379QTelH6c
  - aws-lambda-base-url: https://1g5n3ithji.execute-api.eu-central-1.amazonaws.com/dev

## Deploy Workflow Definition to Zeebe

```
cd zeebe-workflow
zbctl --audience 2daa1cac-f7cf-45e7-98f8-cccb474bf329.zeebe.ultrawombat.com --address 2daa1cac-f7cf-45e7-98f8-cccb474bf329.zeebe.ultrawombat.com:443 --clientId KEFgrt9Azh07wTXbTX89sIBPgwgvzGaH --clientSecret vRfUxMcwuqYg4om6HYweR8iJdZyBl89BS9a5Bi4W7nOV5ezcvfOz4N4uO2vKAyWx --authzUrl https://login.cloud.ultrawombat.com/oauth/token deploy trip-booking.bpmn
```

## Deploy Serverless Stuff

- Deploy functions
```
cd functions
serverless deploy 
```

Capture `aws-api-key` as well as `aws-lambda-base-url` from the console and add them as worker variable (see above)

- Deploy coordinator function (calling Zeebe)

```
cd zeebe-workflow 
cd libs/node-js
npm install --save zeebe-node
?? npm rebuild grpc --target=10.16.3 --target_arch=x64 --target_platform=linux --target_libc=glibc
cd ../..
serverless deploy 
```

Capture URL for this function, then you can call it:

```
curl -H "Content-Type: application/json" -X PUT -d  @request-zeebe.json https://8rbjxgtg82.execute-api.eu-central-1.amazonaws.com/dev/trip/book
```


