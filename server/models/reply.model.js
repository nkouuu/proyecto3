const mongoose = require("mongoose")
const Reco = require("./reco.model")
const Schema = mongoose.Schema

const replySchema = new Schema({
    author:{type:Schema.ObjectId,required:true,ref:"User"},
    content:{type:String,required:true},
},{
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
  })
module.exports = mongoose.model("Reply",replySchema)