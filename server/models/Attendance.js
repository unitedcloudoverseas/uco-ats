const mongoose = require("mongoose");

const attendanceSchema =
new mongoose.Schema(
{
  /* =========================
     EMPLOYEE
  ========================= */

  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    required: true,
  },

  /* =========================
     ATTENDANCE DATE
  ========================= */

  date: {
    type: String,
    required: true,
  },

  /* =========================
     LOGIN / LOGOUT
  ========================= */

  loginTime: {
    type: Date,
    default: Date.now,
  },

  logoutTime: {
    type: Date,
  },

  /* =========================
     BREAK MANAGEMENT
  ========================= */

  breakStartTime: {
    type: Date,
  },

  breakMinutes: {
    type: Number,
    default: 0,
  },

  isOnBreak: {
    type: Boolean,
    default: false,
  },

  /* =========================
     WORK HOURS
  ========================= */

  totalHours: {
    type: Number,
    default: 0,
  },

  effectiveHours: {
    type: Number,
    default: 0,
  },

  /* =========================
     NETWORK
  ========================= */

  ipAddress: {
    type: String,
    required: true,
  },

  /* =========================
     ATTENDANCE STATUS
  ========================= */

  status: {
    type: String,
    enum: [
      "Present",
      "Half Day",
      "Absent",
    ],
    default: "Present",
  },

},
{
  timestamps: true,
}
);

module.exports =
mongoose.model(
  "Attendance",
  attendanceSchema
);