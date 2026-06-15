const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  employeeCode: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },

  fullName: {
    type: String,
    required: true,
    trim: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },

  password: {
    type: String,
    required: true,
  },

  role: {
    type: String,
    enum: ["admin", "employee"],
    default: "employee",
  },

  department: {
    type: String,
    required: true,
  },

  salary: {
    type: Number,
    default: 0,
  },

  status: {
    type: String,
    enum: ["Active", "Inactive"],
    default: "Active",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

profilePhoto: {
  type: String,
  default: "",
},

phoneNumber: {
  type: String,
  default: "",
},

address: {
  type: String,
  default: "",
},

emergencyContact: {
  type: String,
  default: "",
},

});

module.exports = mongoose.model("Employee", employeeSchema);