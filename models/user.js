const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userScema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  image: { type: String, required: true },
  places: [{ type: mongoose.Types.ObjectId, required: true, ref: "Places" }],
  authToken: { type:String,required:false,default:null }
});

module.exports = mongoose.model("Users", userScema);
