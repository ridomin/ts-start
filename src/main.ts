import {DTClient}  from './dtclient'
//const connectionString : string = process.env.IOTHUB_CONNECTION_STRING as string

const connectionString = process.env.IOTHUB_CONNECTION_STRING as string

const main = async () =>{
    let sc = new DTClient(connectionString)
    let twin = await sc.getDigitalTwin("rido-ppr")
    //console.log(twin)
    console.log(twin.$metadata.$model)
    
    for (var dt in twin) {
        console.log(dt)
        console.log(twin[dt])
    }
}

main().catch(e=>console.log(e))