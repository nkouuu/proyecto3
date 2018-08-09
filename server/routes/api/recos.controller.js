require("dotenv").config();
const _ = require("lodash");

const express = require("express");
const passport = require("passport");
const router = express.Router();
const User = require("../../models/user.model");
const Reco = require("../../models/reco.model");
const multer = require("multer");
const uploadCloud = require("../../config/cloudinary.js");

router.get("/", (req, res, next) => {
  Reco.find({})
    .sort({ updated_at: -1 })
    .populate( {path:"replies",model:"Reply",populate:{path:"author",model:"User"}})
    .populate("author")
    .then(recos => {
      res.status(200).json(recos);
    });
});

router.get("/:id", (req, res, next) => {
  Reco.findById(req.params.id)
    .populate( {path:"replies",model:"Reply",populate:{path:"author",model:"User"}})
    .populate("author")
    .then(reco => {
      res.status(200).json(reco);
    });
});

router.post("/", uploadCloud.single("file"), (req, res, next) => {
  let notUsedPaths = ["_id", "updated_at", "created_at", "__v"];
  let paths = Object.keys(Reco.schema.paths).filter(
    e => !notUsedPaths.includes(e)
  );
  const object = _.pickBy(req.body, (e, k) => paths.includes(k));
  var updates = _.pickBy(object, _.identity);
  if (req.file) {
    updates.pictures = req.file.url;
  }
  updates.author=req.user._id
  Reco.create([updates])
    .then(recos => {
      console.log(recos);
      User.findByIdAndUpdate(
        req.user._id,
        { $push: { recos: recos[0]._id } },
        { new: true }
      )
        .populate("replies")
        .populate("author")
        .then(user => {
          res.status(200).json(recos[0]);
        })
        .catch(err => {
          console.log(err);
          console.log("Failed adding reco to users recos");
        });
    })
    .catch(err => {
      console.log("Failing adding reco-->"+err);
    });
});

router.patch("/", uploadCloud.single("file"), (req, res, next) => {
  let notUsedPaths = ["_id", "updated_at", "created_at", "__v"];
  let paths = Object.keys(Reco.schema.paths).filter(
    e => !notUsedPaths.includes(e)
  );
  const object = _.pickBy(req.body, (e, k) => paths.includes(k));
  var updates = _.pickBy(object, _.identity);
  const id = req.body.id;
  if (req.file) {
    updates.pictures = req.file.url;
  }
  Reco.findByIdAndUpdate(id, updates, { new: true })
    .then(reco => {
      res.status(200).json(reco);
    })
    .catch(err => {
      console.log(err);
      console.log("Failed updating reco");
    });
});

router.delete("/:id", (req, res, next) => {
  Reco.findByIdAndRemove(req.params.id).then(e => {
    res.status(200).json({ message: "Reco removed successfully!" });
  });
});

router.patch("/:id", (req, res, next) => {
  const { content, category } = req.body;
  Reco.findByIdAndUpdate(req.params.id, { content, category }, { new: true })
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
