const express = require("express");
const router = express.Router();
const EC = require("elliptic").ec;
const ec = new EC("secp256k1");

// create new wallet
router.get("/create", function (req, res, next) {
  const key = ec.genKeyPair();
  const privateKey = key.getPrivate("hex");
  console.log(`Private key: ${privateKey}`);

  res.json({
    status: 200,
    result: privateKey,
    message: "Create successfully",
  });
  console.log(result);
  client.close();
});

module.exports = router;
