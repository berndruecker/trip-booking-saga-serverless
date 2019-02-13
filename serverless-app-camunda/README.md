

1.  Serverless framework incl. the connection to AWS

2. Build Zeebe plugin

```
cd serverless-plugin-camunda
npm link
cd ../
npm link serverless-plugin-camunda
```

3. Deploy via serverless framework

```
serverless deploy
```

The workflow is deployed to the configured Camunda instance