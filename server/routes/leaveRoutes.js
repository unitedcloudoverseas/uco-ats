const express = require("express");

const router = express.Router();

const {
  applyLeave,
  getMyLeaves,
  getAllLeaves,
  approveLeave,
  rejectLeave,
  getLeaveBalance,
  getLeaveAnalytics,
} = require("../controllers/leaveController");

const {
  protect,
  authorizeRoles,
} = require("../middleware/authMiddleware");

router.post(
  "/apply",
  protect,
  applyLeave
);

router.get(
  "/my-leaves",
  protect,
  getMyLeaves
);

/* =========================
   LEAVE BALANCE
========================= */

router.get(
  "/balance",
  protect,
  getLeaveBalance
);

router.get(
  "/analytics",
  protect,
  getLeaveAnalytics
);

router.get(
  "/all",
  protect,
  authorizeRoles("admin"),
  getAllLeaves
);

router.put(
  "/approve/:id",
  protect,
  authorizeRoles("admin"),
  approveLeave
);

router.put(
  "/reject/:id",
  protect,
  authorizeRoles("admin"),
  rejectLeave
);

module.exports = router;