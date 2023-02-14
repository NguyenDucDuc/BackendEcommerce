const {createClient} = require('redis')

const client = createClient({
    url: `redis://default:Q1FaFsXTaf5C8rLroRAo9SbMgIKoPIte@redis-17094.c292.ap-southeast-1-1.ec2.cloud.redislabs.com:17094`
})

client.connect()

client.on("error", (error) => {
    console.log("Redis connect error")
    console.log(error)
})

client.on("connect", () => {
    console.log("Redis connect with URI")
})



module.exports = {client}

