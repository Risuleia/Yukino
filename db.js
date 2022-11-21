const { reconDB } = require("reconlx")

const db = new reconDB(process.env.MONGOOSECONNECTIONSTRING);

module.exports = db