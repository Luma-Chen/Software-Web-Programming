const { response } = require("express");
var express = require("express");
const Booking = require("../models/Booking");
var router = express.Router();
var authenticate = require("../auth");
const { corsWithOptions } = require("./cors");
//TODO: Verificar as regras de negocio

router
  .route("/")
  .get(corsWithOptions, authenticate.verifyUser, async (req, res, next) => {
    try {
      console.log("oi")
      const bookingBuyer = await Booking.find({ idBuyer: req.user._id })
        .populate("idBuyer")
        .populate("idSeller")
        .populate("idProduct");
      console.log({ user: req.user, bookingBuyer })
      res.setHeader("Content-Type", "application/json");
      if (bookingBuyer != null) {
        res.statusCode = 200;
        res.json(bookingBuyer);
      } else {
        res.statusCode = 200;
        res.json({});
      }
    } catch (err) {
      res.statusCode = 404;
      res.json({ err });
    }
  });

router.route("/:id").get(corsWithOptions, async (req, res, next) => {
  let id = req.params.id;
  res.setHeader("Content-Type", "application/json");
  try {
    let booking = await Booking.findById(id)
      .populate("idBuyer")
      .populate("idProduct")
      .populate("idSeller")
      .maxTimeMS(5000);
    if (booking != null) {
      res.statusCode = 200;
      res.json(booking);
    } else {
      res.statusCode = 404;
      res.json({});
    }
  } catch (error) {
    res.statusCode = 404;
    res.json({});
  }
});
router
  .route("/:id")
  .delete(corsWithOptions, authenticate.verifyUser, (req, res) => {
    let id = req.params.id;
    Booking.findByIdAndRemove(id)
      .maxTimeMS(5000)
      .then((response) => {
        res.setHeader("Content-type", "application/json");
        res.json(response.id).status(200);
      })
      .catch((err) => {
        res.status(404).json();
      });
  });

router
  .route("/:id")
  .put(corsWithOptions, authenticate.verifyUser, async (req, res) => {
    let id = parseInt(req.params.id);
    await Booking.findByIdAndUpdate(id, { $set: { messages: req.body.messages } }, { new: true });
    const booking = await Booking.findOne({ _id: req.params.id }).populate("idSeller").populate("idProduct").populate("idBuyer")
    res.setHeader("Content-Type", "application/json");
    res.json(req.body).status(200);
  });
router.route("/").post(corsWithOptions, authenticate.verifyUser, (req, res) => {
  console.log(req.body)
  Booking.create(req.body)
    .then((booking) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(booking);
    })
    .catch((err) => {
      res.status(404).json({});
    });
});
module.exports = router;
