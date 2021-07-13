var express = require("express");
var router = express.Router();
var csv = require("csv-parser");
var fs = require("fs");
var path = require("path");
var Consumption = require("../models/Consumption");

router.get("/", async function (req, res, next) {
  const docs = await Consumption.find({});
  res.json(docs);
});

router.post("/import-data", function (req, res, next) {
  const { base64, format } = req.body;

  const fileName = path.join(__dirname, "..", `file-${new Date().getTime()}.csv`);

  fs.writeFile(fileName, base64, "base64", function (err) {
    const results = [];
    fs.createReadStream(fileName)
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

        console.log("consumptions", consumptions);
        Consumption.insertMany(consumptions)
          .then((err, response) => {
            res.json({ success: true });
          })
          .catch((err) => {
            const message = err.writeErrors[0]["errmsg"];
            res.status(400).json({ success: false, message });
          });
      });
  });
});

module.exports = router;
