const express = require("express");

const router = express.Router();

const {
  getTodayAttendance,
  getAttendanceHistory,
  getAttendanceSummary,
  startBreak,
  endBreak,
  getAttendanceAnalytics,
} = require(
  "../controllers/attendanceController"
);

const {
  protect,
} = require("../middleware/authMiddleware");

router.get(
  "/today",
  protect,
  getTodayAttendance
);

router.get(
  "/history",
  protect,
  getAttendanceHistory
);

router.get(
  "/summary",
  protect,
  getAttendanceSummary
);

/* =========================
   BREAK MANAGEMENT
========================= */

router.post(
  "/start-break",
  protect,
  startBreak
);

router.post(
  "/end-break",
  protect,
  endBreak
);

router.get(
  "/analytics",
  protect,
  getAttendanceAnalytics
);

module.exports = router;