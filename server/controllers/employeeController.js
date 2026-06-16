const Employee = require("../models/Employee");
const Attendance = require("../models/Attendance");

const bcrypt = require("bcryptjs");

const WhitelistIP =
require(
  "../models/WhitelistIP"
);

const registerEmployee = async (req, res) => {
  try {
    const {
      employeeCode,
      fullName,
      email,
      password,
      role,
      department,
      salary,
    } = req.body;

    const existingEmployee = await Employee.findOne({
      $or: [{ email }, { employeeCode }],
    });

    if (existingEmployee) {
      return res.status(400).json({
        message: "Employee already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const employee = await Employee.create({
      employeeCode,
      fullName,
      email,
      password: hashedPassword,
      role,
      department,
      salary,
    });
    await LeaveBalance.create({
      employeeId: employee._id,
    });

    res.status(201).json({
      message: "Employee registered successfully",
      employee,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

const jwt = require("jsonwebtoken");


const loginEmployee = async (req, res) => {

  try {

    const {
      employeeCode,
      password,
    } = req.body;

    const employee =
      await Employee.findOne({
        employeeCode,
      });

    if (!employee) {

      return res.status(400).json({
        message:
          "Invalid Employee Code",
      });

    }

    if (
      employee.status ===
      "Inactive"
    ) {

      return res.status(403).json({
        message:
          "Account Disabled",
      });

    }

    const isMatch =
      await bcrypt.compare(
        password,
        employee.password
      );

    if (!isMatch) {

      return res.status(400).json({
        message:
          "Invalid Password",
      });

    }

    const today =
      new Date()
      .toISOString()
      .split("T")[0];

    const existingAttendance =
      await Attendance.findOne({

        employeeId:
          employee._id,

        date: today,

      });

    const userIP =
      req.headers[
        "x-forwarded-for"
      ] ||
      req.socket.remoteAddress ||
      "Unknown";

    const allowedIP =
      await WhitelistIP.findOne({

        ipAddress:
          userIP,

        isActive: true,

      });

    let attendanceMarked =
      false;

    if (

      !existingAttendance &&

      allowedIP &&

      employee.role ===
      "employee"

    ) {

      await Attendance.create({

        employeeId:
          employee._id,

        date: today,

        loginTime:
          new Date(),

        ipAddress:
          userIP,

        status:
          "Present",

      });

      attendanceMarked =
        true;

    }

    const token =
      jwt.sign(

        {
          id:
            employee._id,

          role:
            employee.role,
        },

        process.env.JWT_SECRET,

        {
          expiresIn:
            "1d",
        }

      );

    res.status(200).json({

      message:
        "Login Successful",

      attendanceMarked,

      officeIP:
        !!allowedIP,

      token,

      employee: {

        id:
          employee._id,

        fullName:
          employee.fullName,

        employeeCode:
          employee.employeeCode,

        role:
          employee.role,

        profilePhoto:
          employee.profilePhoto,

      },

    });

  }

  catch (error) {

    console.error(
      "LOGIN ERROR:"
    );

    console.error(
      error
    );

    res.status(500).json({

      message:
        error.message,

      stack:
        error.stack,

    });

  }

};

const userIP =
  req.headers["x-forwarded-for"]?.split(",")[0].trim() ||
  req.socket.remoteAddress ||
  "Unknown";

console.log("LOGIN IP:", userIP);



    /* =========================
   GET MY PROFILE
========================= */

const getMyProfile =
async (req, res) => {

  try {

    const employee =
      await Employee.findById(
        req.employee._id
      ).select("-password");

    if (!employee) {

      return res.status(404).json({
        message:
          "Employee not found",
      });

    }

    res.status(200).json(
      employee
    );

  } catch (error) {

    res.status(500).json({
      message:
        error.message,
    });

  }

};

const logoutEmployee = async (
  req,
  res
) => {
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

    /* =========================
      BREAK VALIDATION
    ========================= */

    if (
      attendance.isOnBreak
    ) {

      return res.status(400).json({
        message:
          "End break before logout",
      });

    }

    /* =========================
      LOGOUT TIME
    ========================= */

    attendance.logoutTime =
      new Date();

      /* =========================
        TOTAL HOURS
      ========================= */

      const totalHours =
      (
        attendance.logoutTime -
        attendance.loginTime
      ) /
      (
        1000 * 60 * 60
      );

      attendance.totalHours =
        totalHours;

      /* =========================
        EFFECTIVE HOURS
      ========================= */

      const effectiveHours =
        totalHours -
        (
          attendance.breakMinutes /
          60
        );

      attendance.effectiveHours =
        effectiveHours;

    if (
          effectiveHours >= 8
        ) {
      attendance.status =
        "Present";
    } else if (
      effectiveHours >= 4
    ) {
      attendance.status =
        "Half Day";
    } else {
      attendance.status =
        "Absent";
    }

    await attendance.save();

    res.status(200).json({
      message:
        "Logout Successful",
      attendance,
    });

  } catch (error) {

    res.status(500).json({
      message:
        "Server Error",
      error:
        error.message,
    });

  }
};

const getAllEmployees = async (
  req,
  res
) => {
  try {

    const employees =
      await Employee.find()
      .select("-password");

    res.status(200).json(
      employees
    );

  } catch (error) {

    res.status(500).json({
      message:
        error.message,
    });

  }
};

const updateEmployeeStatus =
async (req, res) => {

  try {

    const employee =
      await Employee.findById(
        req.params.id
      );

    if (!employee) {

      return res.status(404).json({
        message:
          "Employee not found",
      });

    }

    employee.status =
      employee.status === "Active"
        ? "Inactive"
        : "Active";

    await employee.save();

    res.status(200).json({
      message:
        "Status Updated",
      employee,
    });

  } catch (error) {

    res.status(500).json({
      message:
        error.message,
    });

  }
};

/* =========================
   CHANGE PASSWORD
========================= */

const changePassword =
async (req, res) => {

  try {

    const {
      currentPassword,
      newPassword,
    } = req.body;

    const employee =
      await Employee.findById(
        req.employee._id
      );

    if (!employee) {

      return res.status(404).json({
        message:
          "Employee not found",
      });

    }

    const isMatch =
      await bcrypt.compare(
        currentPassword,
        employee.password
      );

    if (!isMatch) {

      return res.status(400).json({
        message:
          "Current password is incorrect",
      });

    }

    const hashedPassword =
      await bcrypt.hash(
        newPassword,
        10
      );

    employee.password =
      hashedPassword;

    await employee.save();

    res.status(200).json({
      message:
        "Password changed successfully",
    });

  } catch (error) {

    res.status(500).json({
      message:
        error.message,
    });

  }

};


const uploadProfilePhoto =
async (req, res) => {

  try {

    const employee =
      await Employee.findById(
        req.employee._id
      );

    employee.profilePhoto =
      req.file.filename;

    await employee.save();

    res.status(200).json({
      message:
        "Profile photo uploaded",
      profilePhoto:
        employee.profilePhoto,
    });

  } catch (error) {

    res.status(500).json({
      message:
        error.message,
    });

  }

};

const updateProfile =
async (req, res) => {

  try {

    const employee =
      await Employee.findById(
        req.employee._id
      );

    if (!employee) {

      return res.status(404).json({
        message: "Employee not found",
      });

    }

    employee.fullName =
      req.body.fullName ||
      employee.fullName;

    employee.email =
      req.body.email ||
      employee.email;

    employee.phoneNumber =
      req.body.phoneNumber ||
      employee.phoneNumber;

    employee.address =
      req.body.address ||
      employee.address;

    employee.emergencyContact =
      req.body.emergencyContact ||
      employee.emergencyContact;

    await employee.save();

    res.status(200).json({
      message:
        "Profile updated successfully",
      employee,
    });

  } catch (error) {

    res.status(500).json({
      message:
        error.message,
    });

  }

};

const LeaveBalance = require("../models/LeaveBalance");

module.exports = {
  registerEmployee,
  loginEmployee,
  logoutEmployee,
  getAllEmployees,
  updateEmployeeStatus,
  getMyProfile,
  changePassword,
  uploadProfilePhoto,
  updateProfile,

};


