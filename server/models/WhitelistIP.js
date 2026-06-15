const mongoose = require("mongoose");

const whitelistIPSchema =
new mongoose.Schema({

  ipAddress: {
    type: String,
    required: true,
    unique: true,
  },

  location: {
    type: String,
    default: "",
  },

  isActive: {
    type: Boolean,
    default: true,
  },

});

module.exports =
mongoose.model(
  "WhitelistIP",
  whitelistIPSchema
);