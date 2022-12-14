const express = require("express");
const router = express.Router();
const User = require("../models/userSchema");
const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");

router.get("/", async (req, res) => {
  const filter = {};
    if (req.query.spotifyUsername) filter.spotifyUsername = req.query.spotifyUsername;
    if (req.query.id) filter._id = req.query.id;
    await User.find(filter)
    .exec()
    .then((doc) => {
      console.log("doc:")
      console.log(doc)
      res.status(200).json(doc);
    })
    .catch((err) => {
    res.status(500).json({ error: err });
  // User.find()
  //   .exec()
  //   .then((docs) => {
  //     res.status(200).json(docs);
  //   })
  //   .catch((err) => {
  //     res.status(500).json({ error: err });
  //   });
})
});

router.post("/", async (req, res, next) => {
  console.log("inside post"); 
  console.log(req.body.name); 
  console.log("friends:")
  console.log(req.body.friends);
  console.log(req.body.friends[0])
  // find friends
  var friends = new Set();
  // console.log(mongoose.Types.ObjectId.isValid(req.body.friends))
  // if(req.body.friends.length > 0) {
  //   await User.find({
  //     _id: { $in: req.body.friends },
  //   })
  //     .exec()
  //     .then((doc) => {
  //       console.log("doc:")
  //       console.log(doc)
  //       for (const entry of doc) {
  //         console.log("entry:")
  //         console.log(entry)
  //         friends.add(entry._id)
  //       }
  //     })
  //     .catch((err) => console.log(err))
  // }
  console.log(friends);

  const user = new User({
    name: req.body.name, 
    spotifyUsername: req.body.spotifyUsername, 
    friends: [],
  }); 

  user
    .save()
    .then((doc2) => {
      console.log("doc2:")
      console.log(doc2)
      res.status(201).json({
        message: 'User created',
        createdUser: doc2,
      })
    })
    .catch((err) => res.status(500).json(err));
}); 

router.patch('/:_id', (req, res, next) => {
  const id = req.params._id;
  console.log(req.query.friendId);
  const filter = { _id: new ObjectId(id)};
  const friend = new ObjectId(req.query.friendId);
  console.log("new friend:")
  console.log(friend)
  User.updateOne(
    { _id: id }, 
    { $push: { 
      friends: friend
      },
    },
  )
    .exec()
    .then((doc) => {
      console.log("updated:")
      console.log(doc)
      res.status(200).json(doc)
    })
    .catch((err) => res.status(500).json(err))
});

module.exports = router;