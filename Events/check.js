const client = require("../index");
const check = require("../Utilities/check");

client.on('channelDelete', async channel => {
    check()
})
client.on('roleDelete', async role => {
    check()
})