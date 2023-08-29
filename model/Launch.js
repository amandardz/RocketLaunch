const { Schema, model } = require("mongoose");

const launchSchema = new Schema({
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

const Launch = model("Launch", launchSchema);

module.exports = Launch;
