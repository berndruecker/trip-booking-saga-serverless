package io.berndruecker.serverless.aws.lambda;

import java.nio.charset.StandardCharsets;
import java.util.logging.Logger;

import javax.inject.Singleton;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.lambda.AWSLambda;
import com.amazonaws.services.lambda.AWSLambdaClientBuilder;
import com.amazonaws.services.lambda.model.InvokeRequest;
import com.amazonaws.services.lambda.model.InvokeResult;

@Component
@Singleton
public class LambdaInvoicationHelper {

  private final Logger logger = Logger.getLogger(this.getClass().getName());
  
  // Simplified version for demo - just use a pre-configured access key and secret for the instance
  @Value("${aws.accessKey}")
  private String aws_access_key_id = "Your AWS ID goes here";
  
  @Value("${aws.secret}")
  private String aws_secret_access_key = "Your AWS secret key goes here";

  @Value("${aws.region}")
  private String aws_region_name;

  public Object invokeFunction(String functionName, String payloadAsJson) {
    AWSLambda lambdaClient = buildAwsLambdaClient();
    
    InvokeRequest req = new InvokeRequest() //
        .withFunctionName(functionName) //
        .withPayload(payloadAsJson);
    
    InvokeResult requestResult = lambdaClient.invoke(req);

    String result = null;
    if (requestResult.getPayload() != null) {
      result = StandardCharsets.UTF_8.decode(requestResult.getPayload()).toString();
    }
    
    if (requestResult.getFunctionError()!=null) {
      logger.severe("Failure invoking Lambda '"+functionName+"': '" + requestResult.getFunctionError()+ "': " + result);
      throw new LambdaInvocationError("Failure invoking Lambda '"+functionName+"':" + requestResult.getFunctionError()+ "': " + result);
    } else {    
      logger.info("Result of Lambda '"+functionName+"': " + result);
      return result;
    }
  }

  private AWSLambda buildAwsLambdaClient() {
    // use data from Resource String?
    // arn:aws:lambda:#{AWS::Region}:#{AWS::AccountId}:function:${self:service}-${opt:stage}-book-hotel
    
    Regions region = Regions.fromName(aws_region_name);
    BasicAWSCredentials credentials = new BasicAWSCredentials(aws_access_key_id, aws_secret_access_key);
    AWSLambdaClientBuilder builder = AWSLambdaClientBuilder.standard().withCredentials(new AWSStaticCredentialsProvider(credentials)).withRegion(region);
    AWSLambda client = builder.build();
    return client;
  }

}

//  @PreDestroy
//  public void closeSubscription() {
//    if (subscription!=null) {
//      subscription.close();
//      subscription = null;
//    }
//  }

//@PostConstruct
//public void subscribeClient() {
//// bootstrap the client
//ExternalTaskClient client = ExternalTaskClient.create().baseUrl("http://localhost:8080/engine-rest").asyncResponseTimeout(1000).build();
//
//// subscribe to the topic
//subscription = client.subscribe("aws-lambda").handler((externalTask, externalTaskService) -> {
//  
//  String functionName = externalTask.getVariable("functioName");
//  String payloadJson = externalTask.getVariable("payloadJson");
//  Object result = invokeLambdaFunction(functionName, payloadJson);
//
//  Map<String, Object> variables = new HashMap<>();
//  variables.put(functionName + "Result", result);
//  externalTaskService.complete(externalTask, variables);
//
//  logger.info("The AWS Lambda Task " + externalTask.getId() + " has been completed!");
//
//}).open();
//}