var express = require("express");
var router = express.Router();
var csv = require("csv-parser");
var fs = require("fs");
var Consumption = require("../models/Consumption");

router.get("/", async function (req, res, next) {
  const docs = await Consumption.find({});
  res.json(docs);
});

router.post("/import-data", function (req, res, next) {
  const { base64 } = req.body;

  const fileName = `file-${new Date().getTime()}`;
  fs.writeFile(fileName, base64, "base64", function (err) {
    console.log(err);
    return res.json({ success: true });
  });
  /*   fs.createReadStream("consumo-2018-12.csv")
    .pipe(csv({}))
    .on("data", (data) => results.push(data))
    .on("end", () => {
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
        .filter((el) => Boolean(el.date)); // filter those which are not empty rows;

      Consumption.insertMany(consumptions)
        .then((err, response) => {
          console.log(response);
          res.json({ success: true });
        })
        .catch((err) => {
          const message = err.writeErrors[0]["errmsg"];
          res.status(400).json({ success: false, message });
        });
    }); */
});

module.exports = router;
