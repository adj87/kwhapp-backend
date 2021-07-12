var csv = require("csv-parser");
var fs = require("fs");
var Consumption = require("./models/Consumption");
const mongooseConnection = require("./mongooseConnect");

const results = [];
fs.createReadStream("consumo-2018-12.csv")
  .pipe(csv({}))
  .on("data", (data) => results.push(data))
  .on("end", () => {
    // 1. Parse data to JSON
    const consumptions = results
      .map((res) => {
        const keys = Object.keys(res);
        let date = res[keys[0]];
        if (date) date = date.trim();
        const time = Number(res[keys[1]]);
        const consumption = Number(res[keys[2]]);
        const price = Number(res[keys[3]]);
        const cost_per_hour = Number(res[keys[4]]);

        return { date, time, consumption, price, cost_per_hour };
      })

      // 2. Filter those which are not empty rows;
      .filter((el) => Boolean(el.date)); // filter

    // 3. Insert in DB
    Consumption.insertMany(consumptions)
      .then((err, response) => {
        console.log({ success: true });
      })
      .catch((err) => {
        const message = err.writeErrors[0]["errmsg"];
        console.log({ success: false, message });
      })
      // 4. Close the connection
      .finally(() => mongooseConnection.connection.close());
  });
