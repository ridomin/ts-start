import { reverseString as rev } from './my-lib'
import * as msRest  from '@azure/ms-rest-js'
import * as Mappers from './mappers'

console.log(rev('rido'))

declare type TripleValueCallback<TResult1, TResult2> = (error?: Error, result1?: TResult1, result2?: TResult2) => void
declare function tripleValueCallbackToPromise<TResult1, TResult2, TPromiseResult>(callbackOperation: (callback: TripleValueCallback<TResult1, TResult2>) => void, packResults: (result1: TResult1, result2: TResult2) => TPromiseResult, userCallback: TripleValueCallback<TResult1, TResult2>): void;
declare function tripleValueCallbackToPromise<TResult1, TResult2, TPromiseResult>(callbackOperation: (callback: TripleValueCallback<TResult1, TResult2>) => void, packResults: (result1: TResult1, result2: TResult2) => TPromiseResult): Promise<TPromiseResult>;

type DigitalTwinGetResponse = {
  /**
   * The parsed response body.
   */
  body: any;

  /**
   * The underlying HTTP response.
   */
  _response: msRest.HttpResponse & {
      /**
       * The response body as text (string format)
       */
      bodyAsText: string;

      /**
       * The response body as parsed JSON or XML
       */
      parsedBody: any;
    };
};

const baseUri: string = "http://rido.dev"

const digitalTwinId: msRest.OperationURLParameter = {
  parameterPath: "digitalTwinId",
  mapper: {
    required: true,
    serializedName: "digitalTwinId",
    type: {
      name: "String"
    }
  }
}

const serializer = new msRest.Serializer(Mappers);
const getDigitalTwinOperationSpec: msRest.OperationSpec = {
  baseUrl : "https://azure.com",
  httpMethod: "GET",
  path: "digitaltwins/{digitalTwinId}",
  urlParameters: [
//    Parameters.digitalTwinId
  ],
  queryParameters: [
  //  Parameters.apiVersion
  ],
  responses: {
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
};


class TestClient extends msRest.ServiceClient {
  baseUri : string  = 'https://azure.com'
  constructor(creds: msRest.ServiceClientCredentials, options: msRest.ServiceClientOptions) {
      super(creds, options)
    }
   /**
   * @summary Gets the digital twin.
   * @param digitalTwinId Digital Twin ID. Format of digitalTwinId is DeviceId[~ModuleId]. ModuleId
   * is optional.
   * @param [options] The optional parameters
   * @returns Promise<Models.DigitalTwinGetDigitalTwinResponse>
   */
  getDigitalTwin(digitalTwinId: string, options?: msRest.RequestOptionsBase): Promise<DigitalTwinGetResponse>;
  /**
   * @param digitalTwinId Digital Twin ID. Format of digitalTwinId is DeviceId[~ModuleId]. ModuleId
   * is optional.
   * @param callback The callback
   */
  getDigitalTwin(digitalTwinId: string, callback: msRest.ServiceCallback<any>): void;
  /**
   * @param digitalTwinId Digital Twin ID. Format of digitalTwinId is DeviceId[~ModuleId]. ModuleId
   * is optional.
   * @param options The optional parameters
   * @param callback The callback
   */
  getDigitalTwin(digitalTwinId: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<any>): void;
  getDigitalTwin(digitalTwinId: string, options?: msRest.RequestOptionsBase | msRest.ServiceCallback<any>, callback?: msRest.ServiceCallback<any>): Promise<DigitalTwinGetResponse> {
        return this.sendOperationRequest({digitalTwinId, options},getDigitalTwinOperationSpec, callback) as Promise<DigitalTwinGetResponse>
  }
}

async function main() {
    const scOps : msRest.ServiceClientOptions = {
     
    }

    const creds: any = null

    const reqOps : msRest.RequestOptionsBase = {
      
    }

    let tc = new TestClient(creds, scOps)
    let res = await tc.getDigitalTwin("aa", reqOps)
    console.log("res")
}
main().catch(e=>console.log(e))