import * as msRest  from '@azure/ms-rest-js'
import {IoTHubTokenCredentials} from './iothub_token_credentials'

import * as Mappers from "./mappers";

const connectionString : string = process.env.IOTHUB_CONNECTION_STRING as string

type DigitalTwinGetResponse = {
    body: any;
    _response: msRest.HttpResponse & {
        bodyAsText: string;
        parsedBody: any;
      };
  };

class DTClient extends msRest.ServiceClient {
    apiVersion?: string;
    credentials: msRest.ServiceClientCredentials
    constructor(creds: IoTHubTokenCredentials, options?: msRest.ServiceClientOptions) {
        super(creds, options)
        this.apiVersion = '2020-05-31-preview'
        this.credentials = creds
        this.baseUri = 'https://' + creds.getHubName()
    }
    getDigitalTwin(digitalTwinId: string) : Promise<DigitalTwinGetResponse> {
        let digitalTwinIdParam: msRest.OperationURLParameter = {
            parameterPath: "digitalTwinId",
            mapper: {
              required: true,
              serializedName: "digitalTwinId",
              type: {
                name: "String"
              }
            }
        }

        let apiVersion: msRest.OperationQueryParameter = {
            parameterPath: "apiVersion",
            mapper: {
              required: true,
              serializedName: "api-version",
              defaultValue: '2020-05-31-preview',
              type: {
                name: "String"
              }
            }
          };


        let serializer : msRest.Serializer = new msRest.Serializer(Mappers)
        let getDTOpSpec: msRest.OperationSpec = {
            httpMethod : "GET",
            path: '/digitalTwins/{digitalTwinId}',
            urlParameters: [digitalTwinIdParam],
            queryParameters: [apiVersion],
            responses : {
                200: {
                  bodyMapper: {
                    serializedName: "parsedResponse",
                    type: {
                      name: "Object"
                    }
                  }
                },
                default: {}
            },
            serializer
        }
        return this.sendOperationRequest({digitalTwinId}, getDTOpSpec) as Promise<DigitalTwinGetResponse>             
    }
}


async function main(){
    let iotHubCreds = new IoTHubTokenCredentials(connectionString)
    let sc : DTClient = new DTClient(iotHubCreds, {
        deserializationContentTypes: { // application/ld+json isn't supported by autorest by default, which is why we need these options
            json: [
            'application/ld+json',
            'application/json',
            'text/json'
            ]
        }
    })
    let twin = await sc.getDigitalTwin("rido-ppr-node")
    console.log(twin)
}
main().catch(e=>console.log(e))