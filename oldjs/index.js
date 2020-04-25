const DTClient = require('../dist/dtclient.js').DTClient

const connectionString = process.env.IOTHUB_CONNECTION_STRING

const main = async () => {
  const dtClient = new DTClient(connectionString)
  const twin = await dtClient.getDigitalTwin('rido-ppr')

  console.log(twin.$metadata.$model)

  for (const t in twin) {
    console.log(t)
    console.log(twin[t])
    console.log('------------------')
  }
}

main().catch(e => console.log(e))
