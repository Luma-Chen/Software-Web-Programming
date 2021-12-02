const normalize = require("normalize-mongoose");
const mongoose = require("mongoose");
const schema = mongoose.Schema;

const message = new schema({
  date: {
    type: String,
    required: true,
  },
  userType: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
});

module.exports = message;
