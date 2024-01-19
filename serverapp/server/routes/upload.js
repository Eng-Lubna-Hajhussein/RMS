const express = require("express");
const router = express.Router();
let { upload, aryResponse } = require("../middleware/uploadFiles");

router.post("/upload", upload.array('files'), function (req, res) {
  const userData = JSON.parse(req.body.userData);
  const intTotalFiles = parseInt(userData.intTotalFiles);
  aryResponse.splice(0,(aryResponse.length-intTotalFiles));
  res.json({ aryResponse });
});

module.exports = router;