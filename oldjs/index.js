const DTClient = require('../dist/dtclient.js').DTClient

const connectionString = process.env.IOTHUB_CONNECTION_STRING

async function main () {
  const dtClient = new DTClient(connectionString)
  const twinResponse = await dtClient.getDigitalTwin('rido-ppr-node')
  const twin = twinResponse._response.parsedBody
  console.log(twin)
  console.log(twin.$metadata.$model)
}
main().catch(e => console.log(e))
