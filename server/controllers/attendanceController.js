const Attendance = require("../models/Attendance");

const getTodayAttendance = async (req, res) => {
  try {
    const today = new Date()
      .toISOString()
      .split("T")[0];

    const attendance = await Attendance.findOne({
      employeeId: req.employee._id,
      date: today,
    });

    res.status(200).json(attendance);
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};

const getAttendanceHistory = async (
  req,
  res
) => {
  try {
    const attendance = await Attendance.find({
      employeeId: req.employee._id,
    }).sort({ createdAt: -1 });

    res.status(200).json(attendance);
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};

/* =========================
   ATTENDANCE SUMMARY
========================= */

const getAttendanceSummary =
  async (req, res) => {

    try {

      const employeeId =
        req.employee._id;

      const presentDays =
        await Attendance.countDocuments({
          employeeId,
          status: "Present",
        });

      const halfDays =
        await Attendance.countDocuments({
          employeeId,
          status: "Half Day",
        });

      const absentDays =
        await Attendance.countDocuments({
          employeeId,
          status: "Absent",
        });

      res.status(200).json({
        presentDays,
        halfDays,
        absentDays,
      });

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });

    }

  };

  /* =========================
   START BREAK
========================= */

const startBreak =
  async (req, res) => {

    try {

      const today =
        new Date()
        .toISOString()
        .split("T")[0];

      const attendance =
        await Attendance.findOne({
          employeeId:
            req.employee._id,
          date: today,
        });

      if (!attendance) {

        return res.status(404).json({
          message:
            "Attendance not found",
        });

      }

      if (
        attendance.isOnBreak
      ) {

        return res.status(400).json({
          message:
            "Break already started",
        });

      }

      attendance.breakStartTime =
        new Date();

      attendance.isOnBreak =
        true;

      await attendance.save();

      res.status(200).json({
        message:
          "Break Started",
        attendance,
      });

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });

    }

  };

  /* =========================
   END BREAK
========================= */

const endBreak =
  async (req, res) => {

    try {

      const today =
        new Date()
        .toISOString()
        .split("T")[0];

      const attendance =
        await Attendance.findOne({
          employeeId:
            req.employee._id,
          date: today,
        });

      if (!attendance) {

        return res.status(404).json({
          message:
            "Attendance not found",
        });

      }

      if (
        !attendance.isOnBreak
      ) {

        return res.status(400).json({
          message:
            "No active break found",
        });

      }

      const breakMinutes =
        (
          new Date() -
          attendance.breakStartTime
        ) /
        (
          1000 *
          60
        );

      attendance.breakMinutes +=
        Math.round(
          breakMinutes
        );

      attendance.breakStartTime =
        null;

      attendance.isOnBreak =
        false;

      await attendance.save();

      res.status(200).json({
        message:
          "Break Ended",
        attendance,
      });

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });

    }

  };

  /* =========================
   ATTENDANCE ANALYTICS
========================= */

const getAttendanceAnalytics =
  async (req, res) => {

    try {

      const employeeId =
        req.employee._id;

      const attendance =
        await Attendance.find({
          employeeId,
        });

      const totalDays =
        attendance.length;

      const presentDays =
        attendance.filter(
          (a) =>
            a.status ===
            "Present"
        ).length;

      const attendancePercentage =
        totalDays > 0
          ? (
              (
                presentDays /
                totalDays
              ) * 100
            ).toFixed(1)
          : 0;

      const totalHours =
        attendance.reduce(
          (sum, day) =>
            sum +
            (
              day.effectiveHours ||
              0
            ),
          0
        );

      const averageHours =
        totalDays > 0
          ? (
              totalHours /
              totalDays
            ).toFixed(2)
          : 0;

      res.status(200).json({

        attendancePercentage,

        averageHours,

        totalDays,

        presentDays,

      });

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });

    }

  };

module.exports = {
  getTodayAttendance,
  getAttendanceHistory,
  getAttendanceSummary,
  startBreak,
  endBreak,
  getAttendanceAnalytics,
};