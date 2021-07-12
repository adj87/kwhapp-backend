const mongoose = require("mongoose");

const consumptionSchema = mongoose.Schema({
  date: String,
  time: Number,
  consumption: Number,
  price: Number,
  cost_per_hour: Number,
});

// prettier-ignore
consumptionSchema.index({date: 1, time: 1}, { unique: true });

const Consumption = mongoose.model(
  "Consumption",
  consumptionSchema,
  "consumptions"
);

module.exports = Consumption;
