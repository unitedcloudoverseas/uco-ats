const Employee = require("../models/Employee");
const Leave = require("../models/Leave");
const Attendance = require("../models/Attendance");
const WhitelistIP = require("../models/WhitelistIP");
const DetectedIP = require("../models/DetectedIP");

const getDashboardStats = async (
  req,
  res
) => {
  try {

    const totalEmployees =
      await Employee.countDocuments({
        role: "employee",
      });

    const activeEmployees =
      await Employee.countDocuments({
        status: "Active",
        role: "employee",
      });

    const inactiveEmployees =
      await Employee.countDocuments({
        status: "Inactive",
        role: "employee",
      });

    const pendingLeaves =
      await Leave.countDocuments({
        status: "Pending",
      });

    const today =
      new Date()
      .toISOString()
      .split("T")[0];

    const employees =
      await Employee.find({
        role: "employee",
      }).select("_id");

    const employeeIds =
      employees.map(
        emp => emp._id
      );

    const presentToday =
      await Attendance.countDocuments({
        employeeId: {
          $in: employeeIds,
        },
        date: today,
      });

    res.status(200).json({
      totalEmployees,
      activeEmployees,
      inactiveEmployees,
      pendingLeaves,
      presentToday,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};


/* =========================
   GET RECENT EMPLOYEES
========================= */
const getRecentEmployees = async (
  req,
  res
) => {
  try {

    const employees =
      await Employee.find({
        role: "employee",
      })
      .select("-password")
      .sort({ createdAt: -1 })
      .limit(5);

    res.status(200).json(
      employees
    );

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};


/* =========================
   GET RECENT LEAVE REQUESTS
========================= */

const getPendingLeaves = async (
  req,
  res
) => {
  try {

    const leaves =
      await Leave.find({
        status: "Pending",
      })
      .populate(
        "employeeId",
        "fullName employeeCode department"
      )
      .sort({ createdAt: -1 });

    res.status(200).json(
      leaves
    );

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};


/* =========================
   TODAY ATTENDANCE
========================= */

const getTodayAttendance =
async (req, res) => {

  try {

    const today =
      new Date()
      .toISOString()
      .split("T")[0];

    const attendance =
      await Attendance.find({
        date: today,
      })
      .populate({
        path: "employeeId",
        select:
          "fullName employeeCode department role",
        match: {
          role: "employee",
        },
      })
      .sort({
        loginTime: -1,
      });

    const filteredAttendance =
      attendance.filter(
        item => item.employeeId
      );

    res.status(200).json(
      filteredAttendance
    );

  } catch (error) {

    res.status(500).json({
      message:
        error.message,
    });

  }

};
/* =========================
   GET EMPLOYEE DETAILS
========================= */

const getEmployeeDetails =
  async (req, res) => {

    try {

      const employee =
        await Employee.findById(
          req.params.id
        ).select(
          "-password"
        );

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

  /* =========================
   EMPLOYEE ATTENDANCE SUMMARY
========================= */

const getEmployeeAttendanceSummary =
  async (req, res) => {

    try {

      const employeeId =
        req.params.id;

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
   EMPLOYEE LEAVE SUMMARY
========================= */

const getEmployeeLeaveSummary =
  async (req, res) => {

    try {

      const employeeId =
        req.params.id;

      const approvedLeaves =
        await Leave.countDocuments({
          employeeId,
          status: "Approved",
        });

      const pendingLeaves =
        await Leave.countDocuments({
          employeeId,
          status: "Pending",
        });

      const rejectedLeaves =
        await Leave.countDocuments({
          employeeId,
          status: "Rejected",
        });

      res.status(200).json({
        approvedLeaves,
        pendingLeaves,
        rejectedLeaves,
      });

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });

    }

  };

  /* =========================
   EMPLOYEE ATTENDANCE HISTORY
========================= */

const getEmployeeAttendanceHistory =
  async (req, res) => {

    try {

      const attendance =
        await Attendance.find({
          employeeId:
            req.params.id,
        })
        .sort({
          date: -1,
        });

      res.status(200).json(
        attendance
      );

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });

    }

  };

  /* =========================
   EMPLOYEE LEAVE HISTORY
========================= */

const getEmployeeLeaveHistory =
  async (req, res) => {

    try {

      const leaves =
        await Leave.find({
          employeeId:
            req.params.id,
        })
        .sort({
          createdAt: -1,
        });

      res.status(200).json(
        leaves
      );

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });

    }

  };

const getAttendanceAnalytics =
async (req, res) => {

  try {

    const employees =
      await Employee.find({
        role: "employee",
      }).select("_id");

    const employeeIds =
      employees.map(
        emp => emp._id
      );

    const present =
      await Attendance.countDocuments({
        employeeId: {
          $in: employeeIds,
        },
        status: "Present",
      });

    const halfDay =
      await Attendance.countDocuments({
        employeeId: {
          $in: employeeIds,
        },
        status: "Half Day",
      });

    const absent =
      await Attendance.countDocuments({
        employeeId: {
          $in: employeeIds,
        },
        status: "Absent",
      });

    const leave =
      await Leave.countDocuments({
        status: "Approved",
      });

    res.status(200).json({
      present,
      halfDay,
      absent,
      leave,
    });

  }

  catch (error) {

    res.status(500).json({
      message:
        error.message,
    });

  }

};

const getEmployeesOnBreak =
async (req, res) => {

  try {

    const today =
      new Date()
      .toISOString()
      .split("T")[0];

    const employees =
      await Attendance.find({

        date: today,

        isOnBreak: true,

      })
      .populate({
        path: "employeeId",
        select:
          "fullName employeeCode department role",
        match: {
          role: "employee",
        },
      });

    const filteredEmployees =
      employees.filter(
        item => item.employeeId
      );

    res.status(200).json(
      filteredEmployees
    );

  }

  catch (error) {

    res.status(500).json({
      message:
        error.message,
    });

  }

};

const getAllAttendance =
async (req, res) => {

  try {

    const attendance =
      await Attendance.find()
      .populate({
        path: "employeeId",
        select:
          "fullName employeeCode department role",
        match: {
          role: "employee",
        },
      })
      .sort({
        date: -1,
      });

    const filteredAttendance =
      attendance.filter(
        item => item.employeeId
      );

    res.status(200).json(
      filteredAttendance
    );

  }

  catch (error) {

    res.status(500).json({
      message:
        error.message,
    });

  }

};

const getAttendanceOverview =
async (req, res) => {

  try {

    const today =
      new Date()
      .toISOString()
      .split("T")[0];

    const employees =
      await Employee.find({
        role: "employee",
      }).select("_id");

    const employeeIds =
      employees.map(
        emp => emp._id
      );

    const present =
      await Attendance.countDocuments({
        employeeId: {
          $in: employeeIds,
        },
        date: today,
        status: "Present",
      });

    const halfDay =
      await Attendance.countDocuments({
        employeeId: {
          $in: employeeIds,
        },
        date: today,
        status: "Half Day",
      });

    const absent =
      await Attendance.countDocuments({
        employeeId: {
          $in: employeeIds,
        },
        date: today,
        status: "Absent",
      });

    const onBreak =
      await Attendance.countDocuments({
        employeeId: {
          $in: employeeIds,
        },
        date: today,
        isOnBreak: true,
      });

    res.status(200).json({

      present,
      halfDay,
      absent,
      onBreak,

    });

  }

  catch (error) {

    res.status(500).json({
      message:
        error.message,
    });

  }

};

const getAllLeaves =
async (req, res) => {

  try {

    const leaves =
      await Leave.find()
      .populate(
        "employeeId",
        "fullName employeeCode department"
      )
      .sort({
        createdAt: -1,
      });

    res.status(200).json(
      leaves
    );

  }

  catch (error) {

    res.status(500).json({
      message:
        error.message,
    });

  }

};

const getLeaveOverview =
async (req, res) => {

  try {

    const pending =
      await Leave.countDocuments({
        status: "Pending",
      });

    const approved =
      await Leave.countDocuments({
        status: "Approved",
      });

    const rejected =
      await Leave.countDocuments({
        status: "Rejected",
      });

    res.status(200).json({

      pending,

      approved,

      rejected,

      total:
        pending +
        approved +
        rejected,

    });

  }

  catch (error) {

    res.status(500).json({
      message:
        error.message,
    });

  }

};

const getWhitelistIPs =
async (req, res) => {

  try {

    const ips =
      await WhitelistIP.find()
      .sort({
        createdAt: -1,
      });

    res.status(200).json(
      ips
    );

  }

  catch (error) {

    res.status(500).json({
      message:
        error.message,
    });

  }

};

const addWhitelistIP =
async (req, res) => {

  try {

    const ip =
      await WhitelistIP.create({

        ipAddress:
          req.body.ipAddress,

        location:
          req.body.location,

      });

    res.status(201).json(
      ip
    );

  }

  catch (error) {

    res.status(500).json({
      message:
        error.message,
    });

  }

};

const deleteWhitelistIP =
async (req, res) => {

  try {

    await WhitelistIP.findByIdAndDelete(
      req.params.id
    );

    res.status(200).json({
      message:
        "IP Deleted",
    });

  }

  catch (error) {

    res.status(500).json({
      message:
        error.message,
    });

  }

};

const updateEmployee =
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

    employee.fullName =
      req.body.fullName;

    employee.email =
      req.body.email;

    employee.department =
      req.body.department;

    employee.salary =
      req.body.salary;

    employee.phoneNumber =
      req.body.phoneNumber;

    employee.address =
      req.body.address;

    employee.emergencyContact =
      req.body.emergencyContact;

    employee.status =
      req.body.status;

    if (req.file) {

      employee.profilePhoto =
        req.file.filename;

    }

    await employee.save();

    res.status(200).json(
      employee
    );

  }

  catch (error) {

    res.status(500).json({
      message:
        error.message,
    });

  }

};

const getDetectedIPs =
async (req, res) => {

  try {

    const ips =
      await DetectedIP
      .find()
      .sort({
        lastSeen: -1,
      });

    res.status(200)
    .json(ips);

  }

  catch (error) {

    res.status(500)
    .json({
      message:
        error.message,
    });

  }

};

const addDetectedIPToWhitelist =
async (req, res) => {

  try {

    const detectedIP =
      await DetectedIP.findById(
        req.params.id
      );

    if (!detectedIP) {

      return res.status(404)
      .json({
        message:
          "IP not found",
      });

    }

    const employee =
      await Employee.findById(
        detectedIP.employeeId
      );

    if (!employee) {

      return res.status(404)
      .json({
        message:
          "Employee not found",
      });

    }

    const exists =
      await WhitelistIP.findOne({

        ipAddress:
          detectedIP.ipAddress,

      });

    if (!exists) {

      await WhitelistIP.create({

        ipAddress:
          detectedIP.ipAddress,

        location:
          "Auto Approved",

        isActive:
          true,

      });

    }

    const today =
      new Date()
        .toISOString()
        .split("T")[0];

    const existingAttendance =
      await Attendance.findOne({

        employeeId:
          detectedIP.employeeId,

        date:
          today,

      });

      console.log(
        "APPROVING:",
        employee.fullName
      );

      console.log(
        "EMPLOYEE ID:",
        detectedIP.employeeId
      );

      console.log(
        "EXISTING ATTENDANCE:",
        existingAttendance
      );

    if (!existingAttendance) {
      console.log(
        "CREATING ATTENDANCE FOR:",
        employee.fullName
      );

      await Attendance.create({

        

        employeeId:
          detectedIP.employeeId,

        date:
          today,

        loginTime:
          detectedIP.lastSeen,

        ipAddress:
          detectedIP.ipAddress,

        status:
          "Present",

      });

    }

    await DetectedIP.findByIdAndDelete(
      detectedIP._id
    );

    res.status(200)
    .json({

      message:
        "IP approved and attendance created",

    });

  }

  catch (error) {

    console.error(error);

    res.status(500)
    .json({

      message:
        error.message,

    });

  }

};



module.exports = {
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
  getDetectedIPs,
  addDetectedIPToWhitelist,

};