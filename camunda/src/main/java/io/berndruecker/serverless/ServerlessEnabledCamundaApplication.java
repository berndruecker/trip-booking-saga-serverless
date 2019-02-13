package io.berndruecker.serverless;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@EnableAutoConfiguration
public class ServerlessEnabledCamundaApplication {

    public static void main(String[] args) {
      SpringApplication.run(ServerlessEnabledCamundaApplication.class, args);
    } 

}
