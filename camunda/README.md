# Run Camunda as Docker Container

You can simply run this pre-build container:  ``berndruecker/serverless-enabled-camunda```

For example on Amazon ECS or any other environment that can run containers.

It contains

* Camunda
* Using a local H2 database (not meant for production)

In order to access Lambda functions from this container you need toet environment variables:

```
AWS_ACCESSKEY
AWS_SECRET
AWS_REGION
```

Make sure Port 8080 is reachable.

# Change the code and build your own container

Do whatever you want to do :-)

Build via Maven

```
mvn install
```

Build Docker Image (of course you need to use your own tag :-))

```
docker build . -t berndruecker/serverless-enabled-camunda
docker push berndruecker/serverless-enabled-camunda
```
