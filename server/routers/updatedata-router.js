const { json } = require("express");
const express = require("express");
const router = express.Router();
const fs = require("fs");
router.get("/", function (req, res, next) {
  const path = "../data.json";
  try {
    if (fs.existsSync(path)) {
      try {
        const data = fs.readFileSync(path, "utf8");
        console.log(data);
        res.json({
          status: 200,
          result: JSON.parse(data),
          message: "Get local data successfully",
        });
        console.log(data);
      } catch (err) {
        console.error(err);
      }
    } else {
      const myObject = {
        blockchain: [],
        pendingTransactions: [],
      };
      fs.writeFile(path, JSON.stringify(myObject), function (err) {
        if (err) return console.log(err);
        res.json({
          status: 200,
          result: myObject,
          message: "Get local data successfully",
        });
        console.log(JSON.stringify(myObject));
      });
    }
  } catch (err) {
    console.log("hihi");
    console.error(err);
  }
});

router.post("/", function (req, res, next) {
  const path = "../data.json";
  data = JSON.stringify(req.body);

  try {
    fs.writeFile(path, data, function (err) {
      if (err) return console.log(err);
      res.json({
        status: 200,
        message: "Update data successfully",
      });
    });
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
