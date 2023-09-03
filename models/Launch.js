const { Schema, model } = require("mongoose");

const launchSchema = new Schema({
  //save launch id from API
  launchId: {
    type: String, 
    required: true
  },
  launch_name: {
    type: String,
    required: true,
  },
  start_date: {
    type: Date,
    required: true,
  },
  end_date: {
    type: Date,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  videos: [
    {
      type: String,
    },
  ],
});

module.exports = launchSchema;
