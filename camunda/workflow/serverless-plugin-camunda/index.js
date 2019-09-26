'use strict';

const axios = require('axios');
const fs = require('fs');

class ServerlessPlugin {
  constructor(serverless, options) {
    this.serverless = serverless;
    this.options = options;

    this.commands = {
      camunda: {
        usage: 'Deploys a workflow definition to Camunda',
        lifecycleEvents: [
          'deploy',
          'list'
        ],
        options: {},
          /*
          model: {
            usage:
              'Specificy the workflow model you want to deploy '
              + '(e.g. "--model \'someFile.bpmn\'" or "-m \'someFile.bpmn\'")',
            required: true,
            shortcut: 'm',
          },*/
        },
    };

    this.hooks = {
      'camunda:list': this.listModelsInCamunda.bind(this),
      'camunda:deploy': this.deployModelToCamunda.bind(this),
      'deploy:deploy': this.deployModelToCamunda.bind(this) //,
      //'after:aws:package:finalize:mergeCustomProviderResources': this.addParameters.bind(this)
    };
  }

  init() {
    if (this.serverless.service.custom && this.serverless.service.custom.camunda && this.serverless.service.custom.camunda.endpoint) {
      this.camundaEndpoint = this.serverless.service.custom.camunda.endpoint;
      this.serverless.cli.log("Using Camunda endpoint " + this.camundaEndpoint);      
    } else {
      throw new Error("Must include 'endpoint' parameter in 'camunda' section of 'custom' block.")
    }
    if (this.serverless.service.custom && this.serverless.service.custom.camunda && this.serverless.service.custom.camunda.workflows) {
      this.camundaModels = this.serverless.service.custom.camunda.workflows;
    } else {
      this.serverless.cli.log("No workflow models defined - add 'workflows' parameter in 'camunda' section of 'custom' block");      
      this.camundaModels = [];
    }
    
  }

  deployModelToCamunda() {
    this.init();

    if (this.camundaModels.length > 0) {
      this.deployUrl = this.camundaEndpoint + '/deploy/aws';
      var myPlugin = this;
      
      fs.readFile(this.camundaModels[0], "utf8", function(err, data) {        
        myPlugin.serverless.cli.log('Now we are deploying to ' + myPlugin.deployUrl);

        // Replace #{} stuff
        myPlugin.serverless.cli.log('Replaced: ' + replacePseudoParameters(data));
        

        axios({
            method: 'post',
            url: myPlugin.deployUrl,
            data: {
              process: data
            }
          }).then((response) => {
            this.serverless.cli.log('Deployed :-)');
          });
      });
    }


    // this.serverless.cli.log('Now we are deploying :' + `${this.options.model}`);

  }

  listModelsInCamunda() {
    //this.serverless.cli.log('Now we are deploying :' + `${this.options.model}`);
  }



  /////// From https://github.com/svdgraaf/serverless-pseudo-parameters/blob/develop/lib/index.js

  replacePseudoParameters(value) {

    //const template = this.serverless.service.provider.compiledCloudFormationTemplate;
    //const skipRegionReplace = this.skipRegionReplace;
    //const allowReferences = this.allowReferences;
    //const colors = this.colors;
    const debug = this.debug;
    const consoleLog = this.serverless.cli.consoleLog;

    if (debug) consoleLog(yellow(underline('AWS Pseudo Parameters')));

    function regions() {
      return [
        'ap-northeast-1',
        'ap-northeast-2',
        'ap-south-1',
        'ap-southeast-1',
        'ap-southeast-2',
        'ca-central-1',
        'eu-central-1',
        'eu-west-1',
        'eu-west-2',
        'eu-west-3',
        'sa-east-1',
        'us-east-1',
        'us-east-2',
        'us-west-1',
        'us-west-2'
      ];
    }

    function containsRegion(v) {
      return new RegExp(regions().join('|')).test(v);
    }


        // if a region name is mentioned, replace it with a reference (unless we are skipping automatic replacements)
        if (typeof value === 'string' && !skipRegionReplace && containsRegion(value)) {
          const regionFinder = new RegExp(regions().join('|'));
          value = value.replace(regionFinder, '#{AWS::Region}');
        }

        var aws_regex;
        if (allowReferences) {
          aws_regex = /#{([^}]+)}/g;
        } else {
          aws_regex = /#{(AWS::[a-zA-Z]+)}/g;
        }

        // we only want to possibly replace strings with an Fn::Sub
        if (typeof value === 'string' && value.search(aws_regex) >= 0) {

          let replacedString = value.replace(aws_regex, '${$1}');

          if (key === 'Fn::Sub') {
            dictionary[key] = replacedString;
          } else {
            dictionary[key] = {
              'Fn::Sub': replacedString
            };
          }

          if (debug) {
            // do some fancy logging
            let m = aws_regex.exec(value);
            while (m) {
              consoleLog('AWS Pseudo Parameter: ' + name + '::' + key + ' Replaced ' + yellow(m[1]) + ' with ' + yellow(
                '${' + m[1] + '}'));
              m = aws_regex.exec(value);
            }
          }
        }

        // dicts and arrays need to be looped through
        if (isDict(value) || isArray(value)) {
          dictionary[key] = replaceChildNodes(value, name + '::' + key);
        }


        return value;    
  }

  /////////////// 
}


function yellow(str) {
  if (colors) return '\u001B[33m' + str + '\u001B[39m';
  return str;
}

function underline(str) {
  if (colors) return '\u001B[4m' + str + '\u001B[24m';
  return str;
}


module.exports = ServerlessPlugin;
