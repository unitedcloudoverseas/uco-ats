const express = require("express");

const router = express.Router();

const upload =
require("../middleware/uploadProfile");

const {
  getDashboardStats,
  getRecentEmployees,
  getPendingLeaves,
  getTodayAttendance,
  getEmployeeDetails,
  getEmployeeAttendanceSummary,
  getEmployeeLeaveSummary,
  getEmployeeAttendanceHistory,
  getEmployeeLeaveHistory,
  getAttendanceAnalytics,
  getEmployeesOnBreak,
  getAllAttendance,
  getAttendanceOverview,
  getAllLeaves,
  getLeaveOverview,
  updateEmployee,
  getWhitelistIPs,
  addWhitelistIP,
  deleteWhitelistIP,
} = require(
  "../controllers/adminController"
);

const {
  protect,
  authorizeRoles,
} = require(
  "../middleware/authMiddleware"
);

/* =========================
   DASHBOARD
========================= */

router.get(
  "/stats",
  protect,
  authorizeRoles("admin"),
  getDashboardStats
);

router.get(
  "/recent-employees",
  protect,
  authorizeRoles("admin"),
  getRecentEmployees
);

router.get(
  "/pending-leaves",
  protect,
  authorizeRoles("admin"),
  getPendingLeaves
);

router.get(
  "/today-attendance",
  protect,
  authorizeRoles("admin"),
  getTodayAttendance
);

/* =========================
   EMPLOYEE DETAILS
========================= */

router.get(
  "/employee/:id",
  protect,
  authorizeRoles("admin"),
  getEmployeeDetails
);

router.put(
  "/employee/:id",
  protect,
  authorizeRoles("admin"),
  upload.single(
    "profilePhoto"
  ),
  updateEmployee
);

/* =========================
   EMPLOYEE ATTENDANCE
========================= */

router.get(
  "/employee/:id/attendance-summary",
  protect,
  authorizeRoles("admin"),
  getEmployeeAttendanceSummary
);

router.get(
  "/employee/:id/attendance-history",
  protect,
  authorizeRoles("admin"),
  getEmployeeAttendanceHistory
);

/* =========================
   EMPLOYEE LEAVES
========================= */

router.get(
  "/employee/:id/leave-summary",
  protect,
  authorizeRoles("admin"),
  getEmployeeLeaveSummary
);

router.get(
  "/employee/:id/leave-history",
  protect,
  authorizeRoles("admin"),
  getEmployeeLeaveHistory
);

/* =========================
   ATTENDANCE MANAGEMENT
========================= */

router.get(
  "/attendance",
  protect,
  authorizeRoles("admin"),
  getAllAttendance
);

router.get(
  "/attendance-overview",
  protect,
  authorizeRoles("admin"),
  getAttendanceOverview
);

router.get(
  "/attendance-analytics",
  protect,
  authorizeRoles("admin"),
  getAttendanceAnalytics
);

router.get(
  "/employees-on-break",
  protect,
  authorizeRoles("admin"),
  getEmployeesOnBreak
);

/* =========================
   LEAVE MANAGEMENT
========================= */

router.get(
  "/leaves",
  protect,
  authorizeRoles("admin"),
  getAllLeaves
);

router.get(
  "/leave-overview",
  protect,
  authorizeRoles("admin"),
  getLeaveOverview
);

router.get(
  "/whitelist-ip",
  protect,
  authorizeRoles("admin"),
  getWhitelistIPs
);

router.post(
  "/whitelist-ip",
  protect,
  authorizeRoles("admin"),
  addWhitelistIP
);

router.delete(
  "/whitelist-ip/:id",
  protect,
  authorizeRoles("admin"),
  deleteWhitelistIP
);

module.exports = router;