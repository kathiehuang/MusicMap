const express = require("express");
const router = express.Router();
const Roadtrip = require("../models/roadtripSchema");
const mongoose = require("mongoose");

router.get("/", (req, res) => {
  console.log("Router working");
  Roadtrip.find()
    .exec()
    .then((docs) => {
      res.status(200).json(docs);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

router.post("/create-roadtrip", async (req, res, next) => {
  console.log("Posting roadtrip");
  console.log(req.body.name);
  const roadtrip = new Roadtrip({
    name: req.body.name,
    startLocation: req.body.startLocation,
    destination: req.body.destination,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
  });

  roadtrip
    .save()
    .then((doc) => {
      res.status(201).json({
        message: 'Roadtrip created',
        createdReview: doc,
      })
    })
    .catch((err) => res.status(500).json(err));
});


router.patch("/update-roadtrip/:id", (req, res) => {
  console.log("Updating roadtrip");
  Roadtrip.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
    startLocation: req.body.startLocation,
    destination: req.body.destination,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
  }).then((doc) => {
    res.status(200).json(doc);
  }).catch((err) => {
    res.status(500).json({ error: err });
  })
});

router.delete("/delete-roadtrip/:id", (req, res) => {
  console.log("Delete roadtrip");
  Roadtrip.findByIdAndDelete(req.params.id).then((doc) => {
    res.status(200).json(doc);
  }).catch((err) => {
    res.status(500).json({ error: err });
  })
});

module.exports = router;