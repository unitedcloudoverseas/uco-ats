const mongoose =
require("mongoose");

const detectedIPSchema =
new mongoose.Schema({

  ipAddress: {
    type: String,
    required: true,
  },

  employeeId: {
    type:
      mongoose.Schema.Types.ObjectId,
    ref: "Employee",
  },

  employeeName: {
    type: String,
  },

  lastSeen: {
    type: Date,
    default: Date.now,
  },

});

module.exports =
mongoose.model(
  "DetectedIP",
  detectedIPSchema
);