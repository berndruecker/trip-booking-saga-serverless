package io.berndruecker.serverless.aws.lambda;

import javax.inject.Inject;

import org.camunda.bpm.engine.delegate.DelegateExecution;
import org.camunda.bpm.engine.delegate.JavaDelegate;
import org.camunda.bpm.model.bpmn.instance.camunda.CamundaProperties;
import org.camunda.bpm.model.bpmn.instance.camunda.CamundaProperty;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.databind.ObjectMapper;

@Component
public class LambdaInvocationDelegate implements JavaDelegate {

  @Inject
  private LambdaInvoicationHelper lambdaInvocation;
  
  @Override
  public void execute(DelegateExecution execution) throws Exception {    
    String functionName = readCamundaProperty(execution, "functionName");

    //String payloadJson = (String) execution.getVariable("payloadJson");
    // use all variables as payload for now - in real-life you would probably use input mappings
    String payloadJson = new ObjectMapper().writeValueAsString(execution.getVariables());    
    
    try {
      Object result = lambdaInvocation.invokeFunction(functionName, payloadJson);
      execution.setVariable(functionName + "Result", result);    
    } catch (LambdaInvocationError e) {
      if ("true".equals(readCamundaProperty(execution, "invocationError"))) {
        throw e;
      }
      else {
        // wrap as normal exception to avoid it being catched by the BPMN error event
        throw new RuntimeException(e.getMessage(), e);
      }
    }
  }
  
  public String readCamundaProperty(DelegateExecution execution, String propertyName) {
    CamundaProperties camProperties = execution.getBpmnModelElementInstance().getExtensionElements().getElementsQuery().filterByType(CamundaProperties.class).singleResult();
    for (CamundaProperty camProperty : camProperties.getCamundaProperties()) {
      
      if (propertyName.equals(camProperty.getCamundaName())) {
        return camProperty.getCamundaValue();
      };
    }
    return null;
  }

}
