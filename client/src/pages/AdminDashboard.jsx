import { useEffect, useState } from "react";
import API from "../services/api";
import { Link } from "react-router-dom";

import {
  Users,
  UserCheck,
  UserX,
  CalendarCheck,
  FileClock,
} from "lucide-react";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";


const StatCard = ({
  title,
  value,
  icon,
}) => (

  <div
    className="
    bg-white
    dark:bg-slate-900
    border
    border-slate-200
    dark:border-slate-800
    rounded-3xl
    p-6
    "
  >

    <div
      className="
      flex
      justify-between
      items-start
      "
    >

      <div>

        <p
          className="
          text-slate-500
          dark:text-slate-400
          "
        >
          {title}
        </p>

        <h2
          className="
          text-5xl
          font-bold
          mt-3
          text-slate-900
          dark:text-white
          "
        >
          {value}
        </h2>

      </div>

      <div
        className="
        h-12
        w-12
        rounded-2xl
        bg-slate-100
        dark:bg-slate-800
        flex
        items-center
        justify-center
        "
      >
        {icon}
      </div>

    </div>

  </div>

);

const AdminDashboard = () => {

/* =========================
STATE MANAGEMENT
========================= */

const [stats, setStats] = useState({});

const [recentEmployees, setRecentEmployees] =
useState([]);

const [pendingLeaves,
  setPendingLeaves] =
  useState([]);

const [todayAttendance,
  setTodayAttendance] =
  useState([]);

const [
  attendanceAnalytics,
  setAttendanceAnalytics,
] = useState(null);

const [
  activeBreaks,
  setActiveBreaks,
] = useState([]);

const [
  breakAnalytics,
  setBreakAnalytics,
] = useState(null);

const [
  currentTime,
  setCurrentTime,
] = useState(
  Date.now()
);

/* =========================
   INITIAL PAGE LOAD
========================= */

useEffect(() => {

  fetchStats();
  fetchRecentEmployees();
  fetchPendingLeaves();
  fetchTodayAttendance();
  fetchAttendanceAnalytics();
  fetchActiveBreaks();

}, []);


useEffect(() => {

  const interval =
    setInterval(() => {

      setCurrentTime(
        Date.now()
      );

    }, 60000);

  return () =>
    clearInterval(
      interval
    );

}, []);
/* =========================
FETCH DASHBOARD STATISTICS
========================= */

const fetchStats = async () => {
try {


  const token =
    localStorage.getItem("token");

  const response =
    await API.get(
      "/admin/stats",
      {
        headers: {
          Authorization:
            `Bearer ${token}`,
        },
      }
    );

  setStats(response.data);

} catch (error) {

  console.log(error);

}

};

const fetchAttendanceAnalytics =
  async () => {

    try {

      const token =
        localStorage.getItem(
          "token"
        );

      const response =
        await API.get(
          "/admin/attendance-analytics",
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

      setAttendanceAnalytics(
        response.data
      );

    }

    catch (error) {

      console.log(error);

    }

};



/* =========================
FETCH RECENT EMPLOYEES
========================= */

const fetchRecentEmployees =
async () => {


  try {

    const token =
      localStorage.getItem("token");

    const response =
      await API.get(
        "/admin/recent-employees",
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

    setRecentEmployees(
      response.data
    );

  } catch (error) {

    console.log(error);

  }

};


/* =========================
   FETCH PENDING LEAVES
========================= */

const fetchPendingLeaves =
  async () => {

    try {

      const token =
        localStorage.getItem(
          "token"
        );

      const response =
        await API.get(
          "/admin/pending-leaves",
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

      setPendingLeaves(
        response.data
      );

    } catch (error) {

      console.log(error);

    }

  };

  /* =========================
   APPROVE LEAVE
========================= */

const approveLeave =
  async (id) => {

    try {

      const token =
        localStorage.getItem(
          "token"
        );

      await API.put(
        `/leaves/approve/${id}`,
        {},
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      fetchPendingLeaves();
      fetchStats();

    } catch (error) {

      console.log(error);

    }

  };

/* =========================
   REJECT LEAVE
========================= */

const rejectLeave =
  async (id) => {

    try {

      const token =
        localStorage.getItem(
          "token"
        );

      await API.put(
        `/leaves/reject/${id}`,
        {},
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      fetchPendingLeaves();
      fetchStats();

    } catch (error) {

      console.log(error);

    }

  };

  const StatCard = ({
  title,
  value,
  icon,
}) => (

  <div
    className="
    bg-white
    dark:bg-slate-900
    border
    border-slate-200
    dark:border-slate-800
    rounded-3xl
    p-6
    "
  >

    <div
      className="
      flex
      justify-between
      items-start
      "
    >

      <div>

        <p
          className="
          text-slate-500
          dark:text-slate-400
          "
        >
          {title}
        </p>

        <h2
          className="
          text-5xl
          font-bold
          mt-3
          text-slate-900
          dark:text-white
          "
        >
          {value}
        </h2>

      </div>

      <div
        className="
        h-12
        w-12
        rounded-2xl
        bg-slate-100
        dark:bg-slate-800
        flex
        items-center
        justify-center
        "
      >
        {icon}
      </div>

    </div>

  </div>

);

  /* =========================
   FETCH TODAY ATTENDANCE
========================= */

const fetchTodayAttendance =
  async () => {

    try {

      const token =
        localStorage.getItem(
          "token"
        );

      const response =
        await API.get(
          "/admin/today-attendance",
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

      setTodayAttendance(
        response.data
      );

    } catch (error) {

      console.log(error);

    }

  };

const attendanceData = attendanceAnalytics
  ? [
      {
        name: "Present",
        value:
          attendanceAnalytics.present,
      },
      {
        name: "Half Day",
        value:
          attendanceAnalytics.halfDay,
      },
      {
        name: "Absent",
        value:
          attendanceAnalytics.absent,
      },
      {
        name: "Leave",
        value:
          attendanceAnalytics.leave,
      },
    ]
  : [];

  const fetchActiveBreaks =
  async () => {

    try {

      const token =
        localStorage.getItem(
          "token"
        );

      const response =
        await API.get(
          "/admin/employees-on-break",
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

      setActiveBreaks(
        response.data
      );

    }

    catch (error) {

      console.log(error);

    }

};
const getBreakDuration =
  (startTime) => {

    const start =
      new Date(startTime);

    const now =
      new Date();

    const diff =
      Math.floor(
        (now - start) / 1000
      );

    const hours =
      Math.floor(
        diff / 3600
      );

    const minutes =
      Math.floor(
        (diff % 3600) / 60
      );

    return {

      totalMinutes:
        Math.floor(
          diff / 60
        ),

      display:
        hours > 0
          ? `${hours}h ${minutes}m`
          : `${minutes} mins`,

    };

};
const breakChartData =
  breakAnalytics
    ? [
        {
          name: "<15 Min",
          value:
            breakAnalytics.under15,
        },
        {
          name: "15-30 Min",
          value:
            breakAnalytics.under30,
        },
        {
          name: "30-60 Min",
          value:
            breakAnalytics.under60,
        },
        {
          name: "60+ Min",
          value:
            breakAnalytics.above60,
        },
      ]
    : [];


return (

  <div className="p-8">

    {/* HEADER */}

    <div
      className="
      bg-white
      dark:bg-slate-900
      border
      border-slate-200
      dark:border-slate-800
      rounded-3xl
      p-8
      mb-8
      "
    >

      <h1
        className="
        text-4xl
        font-bold
        text-slate-900
        dark:text-white
        "
      >
        Admin Dashboard
      </h1>

      <p
        className="
        mt-2
        text-slate-500
        dark:text-slate-400
        "
      >
        Overview of employees, attendance and leave requests
      </p>

    </div>

    {/* STATS */}

    <div
  className="
  grid
  grid-cols-1
  md:grid-cols-2
  xl:grid-cols-5
  gap-6
  mb-8
  "
>

  <StatCard
    title="Employees"
    value={stats.totalEmployees || 0}
    icon={<Users size={22} />}
  />

  <StatCard
    title="Active"
    value={stats.activeEmployees || 0}
    icon={<UserCheck size={22} />}
  />

  <StatCard
    title="Inactive"
    value={stats.inactiveEmployees || 0}
    icon={<UserX size={22} />}
  />

  <StatCard
    title="Present Today"
    value={stats.presentToday || 0}
    icon={<CalendarCheck size={22} />}
  />

  <StatCard
    title="Pending Leaves"
    value={stats.pendingLeaves || 0}
    icon={<FileClock size={22} />}
  />

</div>

{/* BREAK MONITORING */}

<div
  className="
  bg-white
  dark:bg-slate-900
  border
  border-slate-200
  dark:border-slate-800
  rounded-3xl
  p-8
  mb-8
  "
>

  {/* HEADER */}

  <div
    className="
    flex
    flex-col
    md:flex-row
    md:items-center
    md:justify-between
    gap-4
    mb-8
    "
  >

    <div>

      <h2
        className="
        text-xl
        font-semibold
        text-slate-900
        dark:text-white
        "
      >
        Break Monitoring
      </h2>

      <p
        className="
        mt-1
        text-slate-500
        dark:text-slate-400
        "
      >
        Employees currently on break
      </p>

    </div>

    <div
      className="
      px-4
      py-2
      rounded-2xl
      bg-orange-100
      text-orange-700
      font-semibold
      w-fit
      "
    >

      {activeBreaks.length}
      {" "}
      Active

    </div>

  </div>

  {/* TABLE */}

  {activeBreaks.length > 0 ? (

    <div
      className="
      overflow-x-auto
      "
    >

      <table
        className="
        w-full
        "
      >

        <thead>

          <tr
            className="
            border-b
            border-slate-200
            dark:border-slate-800
            "
          >

            <th
              className="
              text-left
              py-4
              text-slate-500
              dark:text-slate-400
              "
            >
              Employee
            </th>

            <th
              className="
              text-left
              py-4
              text-slate-500
              dark:text-slate-400
              "
            >
              Employee Code
            </th>

            <th
              className="
              text-left
              py-4
              text-slate-500
              dark:text-slate-400
              "
            >
              Department
            </th>

            <th
              className="
              text-left
              py-4
              text-slate-500
              dark:text-slate-400
              "
            >
              Started At
            </th>

            <th
              className="
              text-left
              py-4
              text-slate-500
              dark:text-slate-400
              "
            >
              Duration
            </th>

          </tr>

        </thead>

        <tbody>

          {activeBreaks.map(
            (item) => {

              const duration =
                getBreakDuration(
                item.breakStartTime                );

              return (

                <tr
                  key={item._id}
                  className="
                  border-b
                  border-slate-100
                  dark:border-slate-800
                  hover:bg-slate-50
                  dark:hover:bg-slate-800
                  "
                >

                  <td
                    className="
                    py-4
                    font-medium
                    text-slate-900
                    dark:text-white
                    "
                  >

                    {
                      item.employeeId
                        ?.fullName
                    }

                  </td>

                  <td
                    className="
                    py-4
                    text-slate-600
                    dark:text-slate-300
                    "
                  >

                    {
                      item.employeeId
                        ?.employeeCode
                    }

                  </td>

                  <td
                    className="
                    py-4
                    text-slate-600
                    dark:text-slate-300
                    "
                  >

                    {
                      item.employeeId
                        ?.department
                    }

                  </td>

                  <td
                    className="
                    py-4
                    text-slate-600
                    dark:text-slate-300
                    "
                  >

                    {
                      new Date(
                        item.breakStartTime
                      ).toLocaleTimeString(
                        [],
                        {
                          hour:
                            "2-digit",
                          minute:
                            "2-digit",
                        }
                      )
                    }

                  </td>

                  <td
                    className="
                    py-4
                    "
                  >

                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        duration.totalMinutes < 15
                          ? "bg-green-100 text-green-700"
                          : duration.totalMinutes < 30
                          ? "bg-amber-100 text-amber-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >

                      {
                        duration.display
                      }

                    </span>

                  </td>

                </tr>

              );

            }
          )}

        </tbody>

      </table>

    </div>

  ) : (

    <div
      className="
      py-12
      text-center
      "
    >

      <h3
        className="
        text-lg
        font-medium
        text-slate-700
        dark:text-slate-300
        "
      >
        No Active Breaks
      </h3>

      <p
        className="
        mt-2
        text-slate-500
        dark:text-slate-400
        "
      >
        All employees are currently working.
      </p>

    </div>

  )}

</div>





<div
  className="
  bg-white
  dark:bg-slate-900
  border
  border-slate-200
  dark:border-slate-800
  rounded-3xl
  p-8
  mb-8
  "
>

  <h2
    className="
    text-xl
    font-semibold
    text-slate-900
    dark:text-white
    mb-6
    "
  >
    Attendance Distribution
  </h2>

  <ResponsiveContainer
    width="100%"
    height={340}
  >

    <PieChart>

      <Pie
        data={attendanceData}
        dataKey="value"
        nameKey="name"
        innerRadius={70}
        outerRadius={110}
        paddingAngle={4}
      >

        <Cell fill="#22c55e" />
        <Cell fill="#f59e0b" />
        <Cell fill="#ef4444" />
        <Cell fill="#3b82f6" />

      </Pie>

      <Tooltip />

      <Legend />

    </PieChart>

  </ResponsiveContainer>

</div>

    {/* QUICK ACTIONS */}

<div
  className="
  bg-white
  dark:bg-slate-900
  border
  border-slate-200
  dark:border-slate-800
  rounded-3xl
  p-8
  mb-8
  "
>

  <div className="mb-6">

    <h2
      className="
      text-xl
      font-semibold
      text-slate-900
      dark:text-white
      "
    >
      Quick Actions
    </h2>

    <p
      className="
      text-slate-500
      dark:text-slate-400
      mt-1
      "
    >
      Frequently used administrative actions
    </p>

  </div>

  <div
    className="
    grid
    grid-cols-1
    md:grid-cols-2
    xl:grid-cols-4
    gap-4
    "
  >

    {/* EMPLOYEES */}

    <Link
      to="/employees"
      className="
      block
      bg-slate-50
      dark:bg-slate-800
      border
      border-slate-200
      dark:border-slate-700
      rounded-2xl
      p-6
      transition-all
      duration-200
      hover:-translate-y-1
      hover:shadow-lg
      hover:border-blue-400
      "
    >

      <h3
        className="
        font-semibold
        text-slate-900
        dark:text-white
        "
      >
        Employees
      </h3>

      <p
        className="
        text-sm
        text-slate-500
        dark:text-slate-400
        mt-2
        "
      >
        Manage employee records
      </p>

    </Link>

    {/* ATTENDANCE */}

    <Link
      to="/admin/attendance"
      className="
      block
      bg-slate-50
      dark:bg-slate-800
      border
      border-slate-200
      dark:border-slate-700
      rounded-2xl
      p-6
      transition-all
      duration-200
      hover:-translate-y-1
      hover:shadow-lg
      hover:border-green-400
      "
    >

      <h3
        className="
        font-semibold
        text-slate-900
        dark:text-white
        "
      >
        Attendance
      </h3>

      <p
        className="
        text-sm
        text-slate-500
        dark:text-slate-400
        mt-2
        "
      >
        Track attendance activity
      </p>

    </Link>


    {/* LEAVES */}

    <Link
      to="/admin/leaves"
      className="
      block
      bg-slate-50
      dark:bg-slate-800
      border
      border-slate-200
      dark:border-slate-700
      rounded-2xl
      p-6
      transition-all
      duration-200
      hover:-translate-y-1
      hover:shadow-lg
      hover:border-amber-400
      "
    >

      <h3
        className="
        font-semibold
        text-slate-900
        dark:text-white
        "
      >
        Leave Requests
      </h3>

      <p
        className="
        text-sm
        text-slate-500
        dark:text-slate-400
        mt-2
        "
      >
        Review pending requests
      </p>

    </Link>

    {/* REPORTS */}

    <Link
      to="/admin/reports"
      className="
      block
      bg-slate-50
      dark:bg-slate-800
      border
      border-slate-200
      dark:border-slate-700
      rounded-2xl
      p-6
      transition-all
      duration-200
      hover:-translate-y-1
      hover:shadow-lg
      hover:border-purple-400
      "
    >

      <h3
        className="
        font-semibold
        text-slate-900
        dark:text-white
        "
      >
        Reports
      </h3>

      <p
        className="
        text-sm
        text-slate-500
        dark:text-slate-400
        mt-2
        "
      >
        View organization insights
      </p>

    </Link>

  </div>

</div>

    {/* PENDING LEAVES */}

    <div
      className="
      bg-white
      dark:bg-slate-900
      border
      border-slate-200
      dark:border-slate-800
      rounded-3xl
      p-8
      mb-8
      "
    >

      <h2
        className="
        text-xl
        font-semibold
        text-slate-900
        dark:text-white
        mb-6
        "
      >
        Pending Leave Requests
      </h2>

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead>

            <tr className="border-b border-slate-200 dark:border-slate-800">

              <th className="p-4 text-left">Employee</th>
              <th className="p-4 text-left">Leave Type</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Action</th>

            </tr>

          </thead>

          <tbody>

            {pendingLeaves.map((leave) => (

              <tr
                key={leave._id}
                className="border-b border-slate-100 dark:border-slate-800"
              >

                <td className="p-4">
                  {leave.employeeId?.fullName}
                </td>

                <td className="p-4">
                  {leave.leaveType}
                </td>

                <td className="p-4">
                  {leave.status}
                </td>

                <td className="p-4 flex gap-2">

                  <button
                    onClick={() =>
                      approveLeave(
                        leave._id
                      )
                    }
                    className="
                    px-4
                    py-2
                    rounded-xl
                    bg-green-600
                    text-white
                    "
                  >
                    Approve
                  </button>

                  <button
                    onClick={() =>
                      rejectLeave(
                        leave._id
                      )
                    }
                    className="
                    px-4
                    py-2
                    rounded-xl
                    bg-red-600
                    text-white
                    "
                  >
                    Reject
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

    {/* TODAY ATTENDANCE */}

    <div
      className="
      bg-white
      dark:bg-slate-900
      border
      border-slate-200
      dark:border-slate-800
      rounded-3xl
      p-8
      mb-8
      "
    >

      <h2
        className="
        text-xl
        font-semibold
        text-slate-900
        dark:text-white
        mb-6
        "
      >
        Today's Attendance
      </h2>

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead>

            <tr className="border-b border-slate-200 dark:border-slate-800">

              <th className="p-4 text-left">Code</th>
              <th className="p-4 text-left">Employee</th>
              <th className="p-4 text-left">Department</th>
              <th className="p-4 text-left">Login</th>
              <th className="p-4 text-left">Status</th>

            </tr>

          </thead>

          <tbody>

            {todayAttendance.map((attendance) => (

              <tr
                key={attendance._id}
                className="border-b border-slate-100 dark:border-slate-800"
              >

                <td className="p-4">
                  {attendance.employeeId?.employeeCode}
                </td>

                <td className="p-4">
                  {attendance.employeeId?.fullName}
                </td>

                <td className="p-4">
                  {attendance.employeeId?.department}
                </td>

                <td className="p-4">
                  {new Date(
                    attendance.loginTime
                  ).toLocaleTimeString()}
                </td>

                <td className="p-4">
                  {attendance.status}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

    {/* RECENT EMPLOYEES */}

    <div
      className="
      bg-white
      dark:bg-slate-900
      border
      border-slate-200
      dark:border-slate-800
      rounded-3xl
      p-8
      "
    >

      <h2
        className="
        text-xl
        font-semibold
        text-slate-900
        dark:text-white
        mb-6
        "
      >
        Recent Employees
      </h2>

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead>

            <tr className="border-b border-slate-200 dark:border-slate-800">

              <th className="p-4 text-left">Code</th>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Department</th>
              <th className="p-4 text-left">Status</th>

            </tr>

          </thead>

          <tbody>

            {recentEmployees.map((employee) => (

              <tr
                key={employee._id}
                className="border-b border-slate-100 dark:border-slate-800"
              >

                <td className="p-4">
                  {employee.employeeCode}
                </td>

                <td className="p-4">
                  {employee.fullName}
                </td>

                <td className="p-4">
                  {employee.department}
                </td>

                <td className="p-4">
                  {employee.status}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  </div>

);
};

export default AdminDashboard;