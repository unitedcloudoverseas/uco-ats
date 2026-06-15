const express = require("express");

const router = express.Router();

const {
  registerEmployee,
  loginEmployee,
  logoutEmployee,
  getAllEmployees,
  updateEmployeeStatus,
  getMyProfile,
  changePassword,
  uploadProfilePhoto,
  updateProfile,
  
} = require("../controllers/employeeController");

const {
  protect,
  authorizeRoles,
} = require("../middleware/authMiddleware");

const upload =
require("../middleware/uploadProfile");

router.post("/register", registerEmployee);

router.post("/login", loginEmployee);

router.post(
  "/logout",
  protect,
  logoutEmployee
);

router.get("/profile", protect, (req, res) => {
  res.json(req.employee);
});

router.get(
  "/admin-dashboard",
  protect,
  authorizeRoles("admin"),
  (req, res) => {
    res.json({
      message: "Welcome Admin",
    });
  }
);

router.get(
  "/all",
  protect,
  authorizeRoles("admin"),
  getAllEmployees
);

router.put(
  "/status/:id",
  protect,
  authorizeRoles("admin"),
  updateEmployeeStatus
);

router.get(
  "/profile",
  protect,
  getMyProfile
);

router.put(
  "/change-password",
  protect,
  changePassword
);

router.post(
  "/upload-photo",
  protect,
  upload.single(
    "profilePhoto"
  ),
  uploadProfilePhoto
);

router.put(
  "/update-profile",
  protect,
  updateProfile
);

module.exports = router;