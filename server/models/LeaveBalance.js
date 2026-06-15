const mongoose = require("mongoose");

const leaveBalanceSchema =
  new mongoose.Schema(
    {
      employeeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee",
        required: true,
        unique: true,
      },

      casualLeave: {
        type: Number,
        default: 12,
      },

      sickLeave: {
        type: Number,
        default: 6,
      },

      earnedLeave: {
        type: Number,
        default: 12,
      },
    },
    {
      timestamps: true,
    }
  );

module.exports = mongoose.model(
  "LeaveBalance",
  leaveBalanceSchema
);