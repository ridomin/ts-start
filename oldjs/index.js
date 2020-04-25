const DTClient = require('../dist/dtclient.js').DTClient

const connectionString = process.env.IOTHUB_CONNECTION_STRING

async function main () {
  const dtClient = new DTClient(connectionString)
  const twinResponse = await dtClient.getDigitalTwin('rido-ppr')
  const twin = twinResponse._response.parsedBody
  console.log(twin.$metadata.$model)
  for (t in twin){
    console.log(t)
    console.log(twin[t])
  }
}
main().catch(e => console.log(e))
