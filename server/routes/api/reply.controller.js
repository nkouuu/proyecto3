const express = require("express");
const passport = require("passport");
const router = express.Router();
const User = require("../../models/user.model");
const Reco = require("../../models/reco.model");
const Reply = require("../../models/reply.model");



router.post("/:id", (req, res, next) => {
    const reply = new Reply({content:req.body.content,author:req.user._id})

    reply.save().then(r=>{
        Reco.findByIdAndUpdate(req.params.id,{$push:{replies:r._id}},{new:true}).then(reco => {
            res.status(200).json(reco);
          });
    })
  
});

router.post("/:id", (req, res, next) => {
  const { content } = req.body;
  const newReco = new Reco({
    author: req.user._id,
    content,
    category
  });

  newReco.save().then(reco => {
    res.status(200).json(reco);
  });
});

router.delete("/:id", (req, res, next) => {
  
  Reco.findByIdAndRemove(req.params.id)
  .then(e=>{
    res.status(200).json({message:"Reco removed successfully!"})
  })
});

router.patch("/:id", (req, res, next) => {
  const {content,category} = req.body
  Reco.findByIdAndUpdate(req.params.id,{content,category},{new:true})
  .then(reco=>{
    res.status(200).json(reco)
  })
});

module.exports = router;
