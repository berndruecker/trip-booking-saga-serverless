

1. Build via Maven

```
mvn install
```


2. Build Docker Image

```
docker build . -t berndruecker/serverless-enabled-camunda
docker push berndruecker/serverless-enabled-camunda
```

3. Deploy as ECS container

Don't forget to set environment variables to be able to call your Lambda functions:

```
AWS_ACCESSKEY
AWS_SECRET
AWS_REGION
```

Make sure Port 8080 is reachable.