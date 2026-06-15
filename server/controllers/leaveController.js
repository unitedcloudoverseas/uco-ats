const Leave = require("../models/Leave");
const LeaveBalance =
require("../models/LeaveBalance");

const applyLeave = async (req, res) => {

  try {

    const {
      leaveType,
      startDate,
      endDate,
      reason,
    } = req.body;

    /* =========================
       BASIC VALIDATION
    ========================= */

    if (
      !leaveType ||
      !startDate ||
      !endDate ||
      !reason
    ) {

      return res.status(400).json({
        message:
          "All fields are required",
      });

    }

    /* =========================
       DATE VALIDATION
    ========================= */

    if (
      new Date(endDate) <
      new Date(startDate)
    ) {

      return res.status(400).json({
        message:
          "End date cannot be before start date",
      });

    }

    /* =========================
       OVERLAPPING LEAVE CHECK
    ========================= */

    const existingLeave =
      await Leave.findOne({

        employeeId:
          req.employee._id,

        status: {
          $in: [
            "Pending",
            "Approved",
          ],
        },

        startDate: {
          $lte: endDate,
        },

        endDate: {
          $gte: startDate,
        },

      });

    if (existingLeave) {

      return res.status(400).json({
        message:
          "Leave already exists for selected dates",
      });

    }

    /* =========================
       CREATE LEAVE REQUEST
    ========================= */

    const leave =
      await Leave.create({

        employeeId:
          req.employee._id,

        leaveType,
        startDate,
        endDate,
        reason,

      });

    res.status(201).json({

      message:
        "Leave Applied Successfully",

      leave,

    });

  } catch (error) {

    res.status(500).json({
      message:
        error.message,
    });

  }

};

const getMyLeaves = async (req, res) => {
  try {
    const leaves = await Leave.find({
      employeeId: req.employee._id,
    }).sort({ createdAt: -1 });

    res.status(200).json(leaves);
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};

/* =========================
   GET LEAVE BALANCE
========================= */

const getLeaveBalance =
  async (req, res) => {

    try {

      const balance =
        await LeaveBalance.findOne({
          employeeId:
            req.employee._id,
        });

      if (!balance) {

        return res.status(404).json({
          message:
            "Leave balance not found",
        });

      }

      res.status(200).json(
        balance
      );

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });

    }

  };

const getAllLeaves = async (req, res) => {
  try {
    const leaves = await Leave.find()
      .populate(
        "employeeId",
        "fullName employeeCode department"
      )
      .sort({ createdAt: -1 });

    res.status(200).json(leaves);
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};

/* =========================
   APPROVE LEAVE
========================= */

const approveLeave =
  async (req, res) => {

    try {

      const leave =
        await Leave.findById(
          req.params.id
        );

      if (!leave) {

        return res.status(404).json({
          message:
            "Leave request not found",
        });

      }

      /* =========================
         PREVENT DOUBLE APPROVAL
      ========================= */

      if (
        leave.status ===
        "Approved"
      ) {

        return res.status(400).json({
          message:
            "Leave already approved",
        });

      }

      /* =========================
         CALCULATE LEAVE DAYS
      ========================= */

      const leaveDays =
        Math.ceil(
          (
            new Date(
              leave.endDate
            ) -
            new Date(
              leave.startDate
            )
          ) /
          (
            1000 *
            60 *
            60 *
            24
          )
        ) + 1;

      /* =========================
         GET LEAVE BALANCE
      ========================= */

      const balance =
        await LeaveBalance.findOne({
          employeeId:
            leave.employeeId,
        });

      if (!balance) {

        return res.status(404).json({
          message:
            "Leave balance not found",
        });

      }

      if (
          leave.leaveType ===
          "Casual Leave" &&
          balance.casualLeave <
          leaveDays
        ) {

          return res.status(400).json({
            message:
              "Insufficient Casual Leave Balance",
          });

        }

      /* =========================
         DEDUCT LEAVE BALANCE
      ========================= */

      if (
        leave.leaveType ===
        "Casual Leave"
      ) {

        balance.casualLeave -=
          leaveDays;

      }

      else if (
        leave.leaveType ===
        "Sick Leave"
      ) {

        balance.sickLeave -=
          leaveDays;

      }

      else if (
        leave.leaveType ===
        "Earned Leave"
      ) {

        balance.earnedLeave -=
          leaveDays;

      }

      await balance.save();

      /* =========================
         UPDATE LEAVE STATUS
      ========================= */

      leave.status =
        "Approved";

      await leave.save();

      res.status(200).json({
        message:
          "Leave Approved",
        leave,
        balance,
      });

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });

    }

  };

const rejectLeave = async (req, res) => {
  try {
    const leave = await Leave.findById(
      req.params.id
    );

    if (!leave) {
      return res.status(404).json({
        message: "Leave request not found",
      });
    }

    leave.status = "Rejected";

    await leave.save();

    res.status(200).json({
      message: "Leave Rejected",
      leave,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};

const getLeaveAnalytics =
  async (req, res) => {

    try {

      const leaves =
        await Leave.find({

          employeeId:
            req.employee._id,

          status:
            "Approved",

        });

      const monthlyUsage = {};

      leaves.forEach(
        (leave) => {

          const month =
            new Date(
              leave.startDate
            ).toLocaleString(
              "default",
              {
                month: "short",
              }
            );


          const days =
            Math.ceil(
              (
                new Date(
                  leave.endDate
                ) -
                new Date(
                  leave.startDate
                )
              ) /
              (
                1000 *
                60 *
                60 *
                24
              )
            ) + 1;

          monthlyUsage[
            month
          ] =
            (
              monthlyUsage[
                month
              ] || 0
            ) + days;

        }
      );


const pendingCount =
  await Leave.countDocuments({
    employeeId:
      req.employee._id,
    status:
      "Pending",
  });

return res.status(200).json({

  monthlyUsage,
  pendingCount,

});

    }

    catch (error) {

      console.log(error);

      res.status(500).json({

        message:
          "Failed to fetch analytics",

      });

    }

};

module.exports = {
  applyLeave,
  getMyLeaves,
  getLeaveBalance,
  getAllLeaves,
  approveLeave,
  rejectLeave,
  getLeaveAnalytics,
};