const normalize = require("normalize-mongoose");
const mongoose = require("mongoose");
const schema = mongoose.Schema;

const SellerSchema = new schema({
  ddd: {
    type: Number,
    required: true,
  },
  street: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  district: {
    type: String,
    required: true,
  },
  number: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  document: {
    type: String,
    required: true,
  },
});

SellerSchema.plugin(normalize);
var seller = mongoose.model("Seller", SellerSchema);
module.exports = seller;
