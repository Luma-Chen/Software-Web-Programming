const normalize = require("normalize-mongoose");
const mongoose = require("mongoose");
const messageSchema = require("./message");
const schema = mongoose.Schema;

const BookingSchema = new schema({
  idProduct: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  idBuyer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  idSeller:{
    type:mongoose.Schema.Types.ObjectId,
    ref: "Seller",
    required:true,
  },
  date: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  messages: {
    type: [messageSchema],
  },
});
BookingSchema.plugin(normalize);
var booking = mongoose.model("Booking", BookingSchema);
module.exports = booking;
