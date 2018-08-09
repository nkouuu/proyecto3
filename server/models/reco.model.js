const mongoose = require("mongoose");
const Reply = require("./reply.model");
const Schema = mongoose.Schema;
const User = require("./user.model");


const recoSchema = new Schema({
  author: { type: Schema.ObjectId, required: true, ref: "User" },
  content: { type: String, required: true },
  category: { type: String,enum:["Movie","Music","Anime","Travel","Util"], required: true },
  replies: {type:[{ type: Schema.ObjectId, ref: "Reply" }],default:[]},
  likes: {type:[{ type: Schema.ObjectId, ref: "User" }],default:[]},
  pictures:String,
  video:String
},{
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
},{
    usePushEach:true
  });
module.exports = mongoose.model("Reco",recoSchema)