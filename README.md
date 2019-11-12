# Showcase to coordinate serverless functions

This demo implements the classical trip booking Saga example with various serverless functions and different ways of orchestrating them.

![Overview](overview.png)

I use this for certain talks:

* Serverless Days Hamburg 2019: https://www.slideshare.net/BerndRuecker/serverless-days-2019-lost-in-transaction
* AWS Community Summit London 2019: https://www.slideshare.net/BerndRuecker/aws-community-summit-london-2019-lost-in-transaction
* [Serverless Conference London 2019](https://serverlesscomputing.london/sessions/coordination-of-serverless-functions/): https://www.slideshare.net/BerndRuecker/serverless-london-2019-coordination-of-serverless-functions

***Constantly under construction!***

I use this demo for my talks. There is no gurantee on the stability of the code here - and it might be in a broken state any time.

# Get started

## AWS (Lambdas)

* Install Serverless framework and configure according to your AWS account
* Deploy [lambdas](functions/aws)
* Decide on the implementation approach you want to play around with:
  * Use [Zeebe](zeebe/aws) as managed service from [Camunda Cloud](https://camunda.com/products/cloud/) and deploy your a function triggering the workflow
  * Use [AWS Step Functions](step-functions/) as managed service from AWS

## GCP (Google Functions)

* Install Serverless framework and configure according to your GCP account
* Deploy [Google Functions](functions/gcp)
* Use [Zeebe](zeebe/aws) as managed service from [Camunda Cloud](https://camunda.com/products/cloud/) and deploy your a function triggering the workflow
