const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, "Must use a valid email address"],
  },
  password: {
    type: String,
    required: true,
  },
  savedLaunches: [{
    type: Schema.Types.ObjectId, 
    ref: 'Launch'
  }]
});

const User = model("User", userSchema);

module.exports = User;
