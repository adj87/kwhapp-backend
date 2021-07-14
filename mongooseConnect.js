"use strict";

const mongoose = require("mongoose");
const conn = mongoose.connection;
const db_url = "mongodb+srv://user:KJdd815nCXpOyiNP@cluster0.3kckz.mongodb.net/jalajala";
conn.on("error", (err) => {
  console.log("Error de conexión", err);
  process.exit(1);
});

conn.once("open", () => {
  console.log("Connected to mongodb on", mongoose.connection.name);
});

conn.once("close", () => {
  console.log("Connection closed", mongoose.connection.name);
});

mongoose.connect(db_url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = mongoose;
