"use strict";

const mongoose = require("mongoose");
const conn = mongoose.connection;

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

mongoose.connect("mongodb://localhost/prueba-fs", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = mongoose;
