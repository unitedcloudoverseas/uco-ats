const Employee = require("../models/Employee");
const Attendance = require("../models/Attendance");

const bcrypt = require("bcryptjs");

const WhitelistIP = require("../models/WhitelistIP");

const DetectedIP =
require("../models/DetectedIP");

const LeaveBalance = require("../models/LeaveBalance");

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
    const { employeeCode, password } = req.body;

    const employee = await Employee.findOne({
      employeeCode,
    });

    if (!employee) {
      return res.status(400).json({
        message: "Invalid Employee Code",
      });
    }

    if (employee.status === "Inactive") {
      return res.status(403).json({
        message: "Account Disabled",
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      employee.password
    );

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid Password",
      });
    }

    const today =
      new Date()
        .toISOString()
        .split("T")[0];

    let userIP =
      req.headers["x-forwarded-for"]
        ?.split(",")[0]
        .trim() ||
      req.socket.remoteAddress ||
      "Unknown";

    // Convert IPv6 format to IPv4
    if (
      userIP &&
      userIP.startsWith("::ffff:")
    ) {
      userIP = userIP.replace(
        "::ffff:",
        ""
      );
    }

    console.log(
      "================================"
    );
    console.log(
      "LOGIN ATTEMPT"
    );
    console.log(
      "EMPLOYEE:",
      employee.fullName
    );
    console.log(
      "IP:",
      userIP
    );
    console.log(
      "================================"
    );

    // Save detected IP
    const savedIP =
      await DetectedIP.findOneAndUpdate(
        {
          ipAddress: userIP,
          employeeId:
            employee._id,
        },
        {
          ipAddress: userIP,
          employeeId:
            employee._id,
          employeeName:
            employee.fullName,
          lastSeen:
            new Date(),
        },
        {
          upsert: true,
          new: true,
        }
      );

    console.log(
      "DETECTED IP SAVED:",
      savedIP.ipAddress
    );

    const existingAttendance =
      await Attendance.findOne({
        employeeId:
          employee._id,
        date: today,
      });

    const allowedIP =
      await WhitelistIP.findOne({
        ipAddress: userIP,
        isActive: true,
      });

    console.log(
      "WHITELIST FOUND:",
      !!allowedIP
    );

    console.log(
      "EXISTING ATTENDANCE:",
      !!existingAttendance
    );

    console.log("========== DEBUG ==========");
    console.log("Employee:", employee.fullName);
    console.log("Role:", employee.role);
    console.log("IP:", userIP);
    console.log("Allowed IP:", allowedIP);
    console.log("Existing Attendance:", existingAttendance);
    console.log("===========================");

    let attendanceMarked = false;

if (
  !existingAttendance &&
  allowedIP &&
  employee.role === "employee"
) {

  console.log(
    "INSIDE ATTENDANCE BLOCK"
  );

  try {

    const attendance =
      await Attendance.create({

        employeeId:
          employee._id,

        date:
          today,

        loginTime:
          new Date(),

        ipAddress:
          userIP,

        status:
          "Present",

      });

    console.log(
      "ATTENDANCE CREATED:",
      attendance._id
    );

    attendanceMarked = true;

  }

  catch (err) {

    console.log(
      "ATTENDANCE CREATE ERROR:"
    );

    console.log(err);

  }

}

if (
  existingAttendance &&
  !existingAttendance.loginTime &&
  allowedIP
) {

  existingAttendance.loginTime =
    new Date();

  existingAttendance.ipAddress =
    userIP;

  await existingAttendance.save();

  console.log(
    "UPDATED EXISTING ATTENDANCE LOGIN TIME"
  );

  attendanceMarked = true;

}

    const token = jwt.sign(
      {
        id: employee._id,
        role: employee.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    console.log(
      "LOGIN SUCCESS"
    );

    res.status(200).json({
      message:
        "Login Successful",

      attendanceMarked,

      officeIP:
        !!allowedIP,

      token,

      employee: {
        id: employee._id,
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
  } catch (error) {
    console.error(
      "LOGIN ERROR:"
    );

    console.error(error);

    res.status(500).json({
      message:
        error.message,
      stack:
        error.stack,
    });
  }
};

/* =========================
 GET MY PROFILE
=========================== */

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

  
  const logoutEmployee = async (req, res) => {
  try {

    console.log("========== LOGOUT API HIT ==========");

    const today =
      new Date()
        .toISOString()
        .split("T")[0];

    console.log("Employee:", req.employee._id);
    console.log("Today:", today);

    const attendance =
      await Attendance.findOne({
        employeeId: req.employee._id,
        date: today,
      });

    console.log(
      "Attendance Found:",
      attendance
    );

    if (!attendance) {
      console.log(
        "NO ATTENDANCE FOUND"
      );

      return res.status(404).json({
        message: "Attendance not found",
      });
    }

    console.log(
      "Break Status:",
      attendance.isOnBreak
    );

    if (attendance.isOnBreak) {

      console.log(
        "EMPLOYEE STILL ON BREAK"
      );

      return res.status(400).json({
        message:
          "End break before logout",
      });
    }

    console.log(
      "SETTING LOGOUT TIME"
    );

    attendance.logoutTime =
      new Date();

    const totalHours =
      (
        attendance.logoutTime -
        attendance.loginTime
      ) /
      (1000 * 60 * 60);

    console.log(
      "Total Hours:",
      totalHours
    );

    attendance.totalHours =
      totalHours;

    const effectiveHours =
      totalHours -
      (
        attendance.breakMinutes /
        60
      );

    console.log(
      "Effective Hours:",
      effectiveHours
    );

    attendance.effectiveHours =
      effectiveHours;

    if (effectiveHours >= 6) {
      attendance.status = "Present";
    }
    else if (effectiveHours >= 4) {
      attendance.status = "Half Day";
    }
    else {
      attendance.status = "Absent";
    }

    console.log(
      "Saving Attendance..."
    );

    await attendance.save();

    console.log(
      "ATTENDANCE SAVED SUCCESSFULLY"
    );

    res.status(200).json({
      message:
        "Logout Successful",
      attendance,
    });

  } catch (error) {

    console.log(
      "LOGOUT ERROR:"
    );

    console.log(error);

    res.status(500).json({
      message:
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