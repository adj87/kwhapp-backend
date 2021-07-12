const mongoose = require("mongoose");

const anuncioSchema = mongoose.Schema({
  date: String,
  time: Number,
  consumption: Number,
  price: Number,
  cost_per_hour: Number,
});

const Anuncio = mongoose.model("Anuncio", anuncioSchema);

module.exports = Anuncio;
