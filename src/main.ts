import { reverseString as rev } from './my-lib'
import * as msRest  from 'ms-rest'

console.log(rev('rido'))

const baseUri: string = "http://rido.dev"

class TestClient extends msRest.ServiceClient {
    baseUri: string
    constructor(baseUri: string, options: any) {
      if (!options) options = {};
  
      super(undefined, options);
      this.baseUri = baseUri;
      if (!this.baseUri) {
        this.baseUri = 'https://management.azure.com';
      }
    }
}

const ops: msRest.PathTemplateBasedRequestPrepareOptions = {
    method: "GET",
    pathTemplate : '.',
    serializationMapper: {
        required:false,
        serializedName: 'name',
        name: msRest.MapperType.Sequence,
        type: {
            name: msRest.MapperType.Sequence
        }

    },
    deserializationMapper: {
        required:false,
        serializedName: 'name',
        name: msRest.MapperType.Sequence,
        type: {
            name: msRest.MapperType.Sequence
        }
    }
}

async function main() {
    let tc = new TestClient(baseUri, undefined)
    let res = await tc.sendRequest(ops)
    console.log(res)
}
//main().then().catch(e=>console.log(e))