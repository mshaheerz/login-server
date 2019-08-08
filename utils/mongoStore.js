/**
 * Exports a MongoStore instance that is used to persist sessions.
 */

// const config = require("../config")
const db = require("./db")
const session = require("express-session")
const MongoStore = require("connect-mongo")(session)
const mongoStore = new MongoStore({
  mongooseConnection: db,
  stringify: false,
})

// Workaround for connection failures in the mongoose connection.
// Without this, the MongoStore will not work even if the mongoose connection is reconnected.
db.on("connected", () => {
  mongoStore.handleNewConnectionAsync(db)
})

module.exports = mongoStore
