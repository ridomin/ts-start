import {DTClient}  from './dtclient'
const connectionString : string = process.env.IOTHUB_CONNECTION_STRING as string

async function main(){
    let sc = new DTClient(connectionString)
    let twinResponse = await sc.getDigitalTwin("rido-ppr-node")
    let twin = twinResponse._response.parsedBody
    console.log(twin)
    console.log(twin.$metadata.$model)
}

main().catch(e=>console.log(e))