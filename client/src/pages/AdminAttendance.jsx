import { useEffect, useState } from "react";
import API from "../services/api";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

import {
  CalendarCheck,
  UserX,
  Clock3,
  Coffee,
} from "lucide-react";

const AdminAttendance = () => {

  /* =========================
     STATE MANAGEMENT
  ========================= */

  const [
    attendance,
    setAttendance,
  ] = useState([]);

  const [
    overview,
    setOverview,
  ] = useState({});

  /* =========================
     INITIAL LOAD
  ========================= */

  useEffect(() => {

    fetchOverview();
    fetchAttendance();

  }, []);

  /* =========================
     FETCH OVERVIEW
  ========================= */

  const fetchOverview =
    async () => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        const response =
          await API.get(
            "/admin/attendance-overview",
            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          );

        setOverview(
          response.data
        );

      }

      catch (error) {

        console.log(error);

      }

    };

  /* =========================
     FETCH ATTENDANCE
  ========================= */

  const fetchAttendance =
    async () => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        const response =
          await API.get(
            "/admin/attendance",
            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          );

        setAttendance(
          response.data
        );

      }

      catch (error) {

        console.log(error);

      }

    };

const exportCSV = () => {

  const csvRows = [

    [
      "Employee Code",
      "Employee Name",
      "Department",
      "Date",
      "Login Time",
      "Logout Time",
      "Break Minutes",
      "Hours",
      "Status",
    ].join(","),

    ...attendance.map(
      (item) => [

        item.employeeId?.employeeCode,

        item.employeeId?.fullName,

        item.employeeId?.department,

        item.date,

        item.loginTime,

        item.logoutTime,

        item.breakMinutes,

        item.effectiveHours,

        item.status,

      ].join(",")
    ),

  ];

  const blob =
    new Blob(
      [csvRows.join("\n")],
      {
        type:
          "text/csv",
      }
    );

  const url =
    window.URL.createObjectURL(
      blob
    );

  const link =
    document.createElement("a");

  link.href = url;

  link.download =
    "attendance-report.csv";

  link.click();

};

const trendData = [

  {
    name: "Present",
    count:
      overview.present || 0,
  },

  {
    name: "Half Day",
    count:
      overview.halfDay || 0,
  },

  {
    name: "Absent",
    count:
      overview.absent || 0,
  },

  {
    name: "On Break",
    count:
      overview.onBreak || 0,
  },

];

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

      <div
        className="
        flex
        flex-col
        lg:flex-row
        lg:items-center
        lg:justify-between
        gap-6
        "
      >

        <div>

          <h1
            className="
            text-4xl
            font-bold
            text-slate-900
            dark:text-white
            "
          >
            Attendance Management
          </h1>

          <p
            className="
            mt-2
            text-slate-500
            dark:text-slate-400
            "
          >
            Monitor employee attendance, working hours and break activity
          </p>

        </div>

        <div
          className="
          px-6
          py-4
          rounded-2xl
          bg-slate-50
          dark:bg-slate-800
          border
          border-slate-200
          dark:border-slate-700
          "
        >

          <p
            className="
            text-sm
            text-slate-500
            dark:text-slate-400
            "
          >
            Total Records
          </p>

          <h3
            className="
            text-3xl
            font-bold
            text-slate-900
            dark:text-white
            "
          >
            {attendance.length}
          </h3>

        </div>

      </div>

    </div>

    {/* STAT CARDS */}

    <div
      className="
      grid
      grid-cols-1
      md:grid-cols-2
      xl:grid-cols-4
      gap-6
      mb-8
      "
    >

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6">

        <div className="flex justify-between items-center">

          <div>

            <p className="text-slate-500 dark:text-slate-400">
              Present
            </p>

            <h2 className="text-5xl font-bold mt-3 text-slate-900 dark:text-white">
              {overview.present || 0}
            </h2>

          </div>

          <CalendarCheck
            size={32}
            className="text-green-600"
          />

        </div>

      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6">

        <div className="flex justify-between items-center">

          <div>

            <p className="text-slate-500 dark:text-slate-400">
              Half Day
            </p>

            <h2 className="text-5xl font-bold mt-3 text-slate-900 dark:text-white">
              {overview.halfDay || 0}
            </h2>

          </div>

          <Clock3
            size={32}
            className="text-yellow-600"
          />

        </div>

      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6">

        <div className="flex justify-between items-center">

          <div>

            <p className="text-slate-500 dark:text-slate-400">
              Absent
            </p>

            <h2 className="text-5xl font-bold mt-3 text-slate-900 dark:text-white">
              {overview.absent || 0}
            </h2>

          </div>

          <UserX
            size={32}
            className="text-red-600"
          />

        </div>

      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6">

        <div className="flex justify-between items-center">

          <div>

            <p className="text-slate-500 dark:text-slate-400">
              On Break
            </p>

            <h2 className="text-5xl font-bold mt-3 text-slate-900 dark:text-white">
              {overview.onBreak || 0}
            </h2>

          </div>

          <Coffee
            size={32}
            className="text-orange-600"
          />

        </div>

      </div>

    </div>


    {/* ATTENDANCE TREND */}

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

  <div
    className="
    flex
    justify-between
    items-center
    mb-6
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
        Attendance Overview
      </h2>

      <p
        className="
        text-slate-500
        dark:text-slate-400
        mt-1
        "
      >
        Attendance distribution snapshot
      </p>

    </div>

    <button
      onClick={exportCSV}
      className="
      px-5
      py-2.5
      rounded-2xl
      bg-slate-900
      dark:bg-white
      text-white
      dark:text-slate-900
      font-medium
      cursor-pointer
      transition-all
      duration-200
      hover:scale-105
      hover:shadow-lg
      "
    >
      Export CSV
    </button>
    
  </div>

  <ResponsiveContainer
    width="100%"
    height={320}
  >

    <LineChart
      data={trendData}
    >

      <CartesianGrid
        strokeDasharray="3 3"
      />

      <XAxis
        dataKey="name"
      />

      <YAxis />

      <Tooltip />

      <Line
        type="monotone"
        dataKey="count"
        stroke="#3b82f6"
        strokeWidth={3}
      />

    </LineChart>

  </ResponsiveContainer>

</div>

    {/* ATTENDANCE TABLE */}

    <div
      className="
      bg-white
      dark:bg-slate-900
      border
      border-slate-200
      dark:border-slate-800
      rounded-3xl
      overflow-hidden
      "
    >

      <div className="p-8 border-b border-slate-200 dark:border-slate-800">

        <h2
          className="
          text-xl
          font-semibold
          text-slate-900
          dark:text-white
          "
        >
          Attendance Records
        </h2>

      </div>

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead className="bg-slate-50 dark:bg-slate-800">

            <tr>

              <th className="p-4 text-left">Code</th>
              <th className="p-4 text-left">Employee</th>
              <th className="p-4 text-left">Department</th>
              <th className="p-4 text-left">Date</th>
              <th className="p-4 text-left">Login</th>
              <th className="p-4 text-left">Logout</th>
              <th className="p-4 text-left">Break</th>
              <th className="p-4 text-left">Hours</th>
              <th className="p-4 text-left">Status</th>

            </tr>

          </thead>

          <tbody>

            {attendance.map((item) => (

              <tr
                key={item._id}
                className="
                border-t
                border-slate-100
                dark:border-slate-800
                hover:bg-slate-50
                dark:hover:bg-slate-800
                transition
                "
              >

                <td className="p-4 font-medium">
                  {item.employeeId?.employeeCode}
                </td>

                <td className="p-4">
                  {item.employeeId?.fullName}
                </td>

                <td className="p-4">
                  {item.employeeId?.department}
                </td>

                <td className="p-4">
                  {item.date}
                </td>

                <td className="p-4">
                  {
                    item.loginTime
                    ? new Date(item.loginTime)
                        .toLocaleTimeString()
                    : "-"
                  }
                </td>

                <td className="p-4">
                  {
                    item.logoutTime
                    ? new Date(item.logoutTime)
                        .toLocaleTimeString()
                    : "-"
                  }
                </td>

                <td className="p-4">
                  {item.breakMinutes || 0} mins
                </td>

                <td className="p-4">
                  {item.effectiveHours || 0}
                </td>

                <td className="p-4">

                  <span
                    className={`
                      px-3
                      py-1
                      rounded-full
                      text-xs
                      font-semibold
                      ${
                        item.status === "Present"
                          ? "bg-green-100 text-green-700"
                          : item.status === "Half Day"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }
                    `}
                  >
                    {item.status}
                  </span>

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

export default AdminAttendance;