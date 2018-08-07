require("dotenv").config();
const _ = require('lodash');

const express = require("express");
const passport = require("passport");
const router = express.Router();
const User = require("../../models/user.model");
const Reco = require("../../models/reco.model");
const Reply = require("../../models/reply.model");
const multer = require("multer");
const uploadCloud = require('../../config/cloudinary.js');
const bcrypt =require("bcrypt")
const hashSalt =10

router.get("/:id", (req, res, next) => {
  const id = req.params.id;

  User.findById(id)
    .populate("recos")
    .populate("likes")
    .populate("following")
    .populate("notifications.userId")
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "Couldn get user" });
    });
});


router.post("/", uploadCloud.single('file'),(req, res, next) => {
    console.log("Editing user");
    let notUsedPaths = ['_id','updated_at','created_at','__v'];
    let paths = Object.keys(User.schema.paths).filter(e => !notUsedPaths.includes(e));
    const object = _.pickBy(req.body, (e,k) => paths.includes(k));
    var updates = _.pickBy(object, _.identity);
    const id = req.user._id;
     updates.picture = req.file.url
    
    if(updates.password){
        const salt = bcrypt.genSaltSync(hashSalt)
        const hashPass = bcrypt(updates.password,salt)
        updates.password=hashPass
    }
    

    User.findByIdAndUpdate(id,updates,{new:true})
      .populate("recos")
      .populate("likes")
      .populate("following")
      .populate("notifications.userId")
      .then(user => {
        res.status(200).json(user);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ message: "Couldn get user" });
      });
  });
  


router.post("/follow/:followerId/:followedId", (req, res, next) => {
  const { followerId, followedId } = req.params;

  User.findByIdAndUpdate(
    followerId,
    { $push: { following: followedId } },
    { new: true }
  )
    .then(user => {
      User.findByIdAndUpdate(
        followedId,
        { $push: { followers: followerId } },
        { new: true }
      ).then(user2 => {
        res.status(200).json(user);
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "Couldn follow user" });
    });
});
router.post("/unfollow/:followerId/:followedId", (req, res, next) => {
    const { followerId, followedId } = req.params;
  
    User.findByIdAndUpdate(
      followerId,
      { $pull: { following: followedId } },
      { new: true }
    )
      .then(user => {
        User.findByIdAndUpdate(
          followedId,
          { $pull: { followers: followerId } },
          { new: true }
        ).then(user2 => {
          res.status(200).json(user);
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ message: "Couldn follow user" });
      });
  });

  router.patch("/cleanNotifications/:userId/:notificationId",(req,res,next)=>{
      console.log("entra en clean 1 notification")
      User.findById(req.params.userId)
      .then(user=>{
          var notifications = user.notifications.filter(e=>e._id!=req.params.notificationId)
          User.findByIdAndUpdate(user._id,{notifications},{new:true})
          .then(u=>res.status(200).json(u))
          .catch(err=>console.log(err))
          
      })
  })
  router.patch("/cleanNotifications/:id",(req,res,next)=>{
    User.findByIdAndUpdate(req.params.id,{notifications:[]},{new:true})
    .then(user=>{
        res.status(200).json(user)
    })
})

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
