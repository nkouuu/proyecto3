const express = require("express");
const passport = require("passport");
const router = express.Router();
const User = require("../../models/user.model");
const Reco = require("../../models/reco.model");
const Reply = require("../../models/reply.model");



router.get("/:id", (req, res, next) => {
    const id = req.params.id

    User.findById(id)
    .populate("recos")
    .populate("likes")
    .then(user=>{
        res.status(200).json(user)
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({message:"Couldn get user"})
    })
});



/*router.delete("/:id", (req, res, next) => {
  
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
});*/

module.exports = router;
