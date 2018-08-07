require("dotenv").config();
const _ = require('lodash');

const express = require("express");
const passport = require("passport");
const router = express.Router();
const User = require("../../models/user.model");
const Reco = require("../../models/reco.model");
const multer = require("multer");
const uploadCloud = require('../../config/cloudinary.js');

router.get("/", (req, res, next) => {
  Reco.find({}).sort({updatedAt:-1})
    .populate("replies")
    .populate("author")
    .then(recos => {
      res.status(200).json(recos);
    });
});

router.get("/:id", (req, res, next) => {
  Reco.findById(req.params.id)
    .populate("replies")
    .populate("author")
    .then(reco => {
      res.status(200).json(reco);
    });
});

router.post("/", uploadCloud.single('file'),(req, res, next) => {
  const { content, category,video } = req.body;
  const newReco = new Reco({
    author: req.user._id,
    content,
    category,
    pictures:req.file.url,
    video
  });

  newReco.save()
  .then(reco => {
    User.findByIdAndUpdate(
      req.user._id,
      { $push: { recos:   reco._id } },
      { new: true }
    )
    .populate("replies")
    .populate("author")
    .then(user => {
      res.status(200).json(reco);
    })
    .catch(err=>{
      console.log(err)
      console.log("Failed adding reco to users recos")
    })
  })
  .catch(err=>{
    console.log("Failing adding reco")
  })
});

router.patch("/:id", uploadCloud.fields([{name:'file'},{name:'video'}]),(req, res, next) => {
  console.log(req.files)
  res.status(200).json({})
  /*const { content, category } = req.body;
  const newReco = new Reco({
    author: req.user._id,
    content,
    category
  });

  newReco.save()
  .then(reco => {
    User.findByIdAndUpdate(
      req.user._id,
      { $push: { recos:   reco._id } },
      { new: true }
    )
    .populate("replies")
    .populate("author")
    .then(user => {
      res.status(200).json(reco);
    })
    .catch(err=>{
      console.log(err)
      console.log("Failed adding reco to users recos")
    })
  })
  .catch(err=>{
    console.log("Failing adding reco")
  })*/
});

router.delete("/:id", (req, res, next) => {
  Reco.findByIdAndRemove(req.params.id).then(e => {
    res.status(200).json({ message: "Reco removed successfully!" });
  });
});

router.patch("/:id", (req, res, next) => {
  const { content, category } = req.body;
  Reco.findByIdAndUpdate(
    req.params.id,
    { content, category },
    { new: true }
  )
  .populate("replies")
  .populate("author")
  .then(reco => {
    res.status(200).json(reco);
  });
});

router.get("/:id/like", (req, res, next) => {
  Reco.findByIdAndUpdate(
    req.params.id,
    { $push: { likes: req.user._id } },
    { new: true }
  )
  .populate("replies")
  .populate("author")
  .then(reco => {
    User.findByIdAndUpdate(
      req.user._id,
      { $push: { likes: reco._id } },
      { new: true }
    ).then(user => {
      res.status(200).json(reco);
    });
  });
});

router.get("/:id/unlike", (req, res, next) => {
  Reco.findByIdAndUpdate(
    req.params.id,
    { $pull: { likes: { $in: [req.user._id] } } },
    { new: true }
  )
  .populate("replies")
  .populate("author")
  .then(reco => {
    User.findByIdAndUpdate(
      req.user._id,
      { $pull: { likes: reco._id } },
      { new: true }
    ).then(user => {
      res.status(200).json(reco);
    });
  });
});

module.exports = router;
