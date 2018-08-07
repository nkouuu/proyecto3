const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const Reco = require("./reco.model")

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"]
    },
    email: {
      type: String,
      required: [true, "Email is required"]
    },
    password: {
      type: String,
      required: [true, "Password is required"]
    },
    name: {
      type: String,
      required: [true, "Name is required"]
    },
    picture:{type:String,default:"https://static.thenounproject.com/png/17241-200.png"},
    recos: [{ type: Schema.Types.ObjectId, ref: "Reco" }],

    likes: [{ type: Schema.Types.ObjectId, ref: "Reco" }],
    followers:[{ type: Schema.Types.ObjectId, ref: "User" }],
    following:[{ type: Schema.Types.ObjectId, ref: "User" }],
    notifications:[{notificationType:String,userId:{type:Schema.Types.ObjectId,ref:"User"},recoId:{type:Schema.Types.ObjectId,ref:"Reco"}}]
  },
  {
    usePushEach: true
  }
);

UserSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

UserSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

const User = mongoose.model("User", UserSchema);
module.exports = User;
