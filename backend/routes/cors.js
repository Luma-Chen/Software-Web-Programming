const cors = require("cors");
const express = require("express");

const whitelist = ["http://localhost:3000"];
var corsoptionsDelegate = (req, callback) => {
  var options;
  if (whitelist.indexOf(req.header("origin")) !== -1) {
    options = { origin: true };
  } else {
    options = { origin: false };
  }
  callback(null, options);
};
exports.cors = cors;
exports.corsWithOptions = cors(corsoptionsDelegate);
