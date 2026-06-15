import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";

import {
  CalendarCheck,
  Clock3,
  Coffee,
  FileText,
} from "lucide-react";

import KpiCard from "../components/dashboard/KpiCard";
import AttendancePieChart from "../components/dashboard/AttendancePieChart";
import LeavePieChart from "../components/dashboard/LeavePieChart";
import WorkHoursChart from "../components/dashboard/WorkHoursChart";
import InsightCard from "../components/dashboard/InsightCard";
const Home = () => {

  const employee = JSON.parse(
    localStorage.getItem("employee")
  );

  const [todayAttendance,
    setTodayAttendance] =
    useState(null);

  const [pendingLeaves,
    setPendingLeaves] =
    useState(0);

  useEffect(() => {
    fetchHomeData();
  }, []);

      const [attendanceSummary,
  setAttendanceSummary] =
  useState(null);

const [leaveBalance,
  setLeaveBalance] =
  useState(null);

const [attendanceHistory,
  setAttendanceHistory] =
  useState([]);

const [analytics,
  setAnalytics] =
  useState(null);

  const fetchHomeData =
    async () => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        const headers = {
          Authorization:
            `Bearer ${token}`,
        };

        const [
          attendanceResponse,
          leavesResponse,
          summaryResponse,
          balanceResponse,
          historyResponse,
          analyticsResponse,
        ] = await Promise.all([

          API.get(
            "/attendance/today",
            { headers }
          ),

          API.get(
            "/leaves/my-leaves",
            { headers }
          ),

          API.get(
            "/attendance/summary",
            { headers }
          ),

          API.get(
            "/leaves/balance",
            { headers }
          ),

          API.get(
            "/attendance/history",
            { headers }
          ),

          API.get(
            "/attendance/analytics",
            { headers }
          ),

        ]);
        const pending =
          leavesResponse.data.filter(
            (leave) =>
              leave.status ===
              "Pending"
          ).length;

          setTodayAttendance(
            attendanceResponse.data
          );

          setAttendanceSummary(
            summaryResponse.data
          );

          setLeaveBalance(
            balanceResponse.data
          );

          setAttendanceHistory(
            historyResponse.data
          );

          setAnalytics(
            analyticsResponse.data
          );

          setPendingLeaves(
            pending
          );


      } catch (error) {

        console.log(error);

      }

    };


    const attendancePieData = [

  {
    name: "Present",
    value:
      attendanceSummary?.presentDays || 0,
  },

  {
    name: "Half Day",
    value:
      attendanceSummary?.halfDays || 0,
  },

  {
    name: "Absent",
    value:
      attendanceSummary?.absentDays || 0,
  },

];

const leavePieData = [

  {
    name: "Casual",
    value:
      leaveBalance?.casualLeave || 0,
  },

  {
    name: "Sick",
    value:
      leaveBalance?.sickLeave || 0,
  },

  {
    name: "Earned",
    value:
      leaveBalance?.earnedLeave || 0,
  },

];

const workHoursData =
  attendanceHistory
    .slice(0, 10)
    .reverse()
    .map((item) => ({
      date: item.date.slice(5),
      hours:
        item.effectiveHours || 0,
    }));


  return (

    <div className="space-y-8">

  {/* HERO SECTION */}

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

  <div
    className="
    flex
    flex-col
    lg:flex-row
    lg:items-center
    lg:justify-between
    gap-8
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
        Welcome Back,
        {" "}
        {employee?.fullName}
      </h1>

      <p
        className="
        mt-3
        text-slate-500
        "
      >
        {new Date().toLocaleDateString(
          "en-US",
          {
            weekday: "long",
            month: "long",
            day: "numeric",
            year: "numeric",
          }
        )}
      </p>

    </div>

    <div
      className="
      grid
      grid-cols-3
      gap-8
      "
    >

      <div>

        <p className="text-sm text-slate-500">
          Status
        </p>

        <h3
          className="
          mt-2
          font-semibold
          text-slate-900
          dark:text-white
          "
        >
          {
            todayAttendance?.logoutTime
              ? "Logged Out"
              : todayAttendance?.isOnBreak
              ? "On Break"
              : "Working"
          }
        </h3>

      </div>

      <div>

        <p className="text-sm text-slate-500">
          Login
        </p>

        <h3
          className="
          mt-2
          font-semibold
          text-slate-900
          dark:text-white
          "
        >
          {
            todayAttendance?.loginTime
              ? new Date(
                  todayAttendance.loginTime
                ).toLocaleTimeString()
              : "-"
          }
        </h3>

      </div>

      <div>

        <p className="text-sm text-slate-500">
          Attendance
        </p>

        <h3
          className="
          mt-2
          font-semibold
          text-slate-900
          dark:text-white
          "
        >
          {analytics?.attendancePercentage || 0}%
        </h3>

      </div>

    </div>

  </div>

</div>

  {/* KPI CARDS */}

  <div
    className="
    grid
    grid-cols-1
    md:grid-cols-2
    xl:grid-cols-4
    gap-6
    "
  >

    <KpiCard
      title="Attendance %"
      value={`${analytics?.attendancePercentage || 0}%`}
      color="text-blue-600"
      icon={
        <CalendarCheck
          size={22}
          className="text-blue-600"
        />
      }
    />

    <KpiCard
      title="Average Hours"
      value={analytics?.averageHours || 0}
      color="text-green-600"
      icon={
        <Clock3
          size={22}
          className="text-green-600"
        />
      }
    />

    <KpiCard
      title="Pending Leaves"
      value={pendingLeaves}
      color="text-orange-500"
      icon={
        <FileText
          size={22}
          className="text-orange-500"
        />
      }
    />

    <KpiCard
      title="Break Minutes"
      value={
        todayAttendance?.breakMinutes || 0
      }
      color="text-purple-600"
      icon={
        <Coffee
          size={22}
          className="text-purple-600"
        />
      }
    />

  </div>

  {/* PIE CHARTS */}

<div className="space-y-6">

  <div>

    <h2
      className="
      text-2xl
      font-bold
      text-slate-900
      dark:text-white
      "
    >
      Analytics Overview
    </h2>

    <p
      className="
      mt-1
      text-slate-500
      "
    >
      Attendance and leave statistics
    </p>
  </div>
    
      <div
    className="
    grid
    grid-cols-1
    xl:grid-cols-2
    gap-6
    "
  >

    <AttendancePieChart
      data={attendancePieData}
    />

    <LeavePieChart
      data={leavePieData}
    />

    </div>


  </div>

  {/* WORK HOURS GRAPH */}

  <WorkHoursChart
    data={workHoursData}
  />

  {/* INSIGHTS */}

  <div
    className="
    grid
    grid-cols-1
    md:grid-cols-2
    xl:grid-cols-4
    gap-6
    "
  >

    <InsightCard
      title="Attendance"
      value={
        analytics?.attendancePercentage >= 90
          ? "Excellent"
          : analytics?.attendancePercentage >= 75
          ? "Good"
          : "Needs Improvement"
      }
      color="text-green-600"
    />

    <InsightCard
      title="Working Hours"
      value={
        analytics?.averageHours >= 8
          ? "Excellent"
          : analytics?.averageHours >= 6
          ? "Good"
          : "Low"
      }
      color="text-blue-600"
    />

    <InsightCard
      title="Break Usage"
      value="Normal"
      color="text-orange-500"
    />

    <InsightCard
      title="Leave Utilization"
      value="Healthy"
      color="text-purple-600"
    />

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
    p-6
    "
  >

    <h2
      className="
      text-2xl
      font-bold
      mb-6
      text-slate-900
      dark:text-white
      "
    >
      Quick Actions
    </h2>

    <div
      className="
      grid
      grid-cols-1
      md:grid-cols-2
      xl:grid-cols-4
      gap-4
      "
    >

      <Link
        to="/attendance/dashboard"
        className="
        p-5
        rounded-2xl
        bg-blue-50
        dark:bg-slate-800
        hover:scale-105
        transition
        "
      >
        <h3 className="font-semibold">
          Attendance Dashboard
        </h3>
      </Link>

      <Link
        to="/leaves/apply"
        className="
        p-5
        rounded-2xl
        bg-green-50
        dark:bg-slate-800
        hover:scale-105
        transition
        "
      >
        <h3 className="font-semibold">
          Apply Leave
        </h3>
      </Link>

      <Link
        to="/leaves/history"
        className="
        p-5
        rounded-2xl
        bg-orange-50
        dark:bg-slate-800
        hover:scale-105
        transition
        "
      >
        <h3 className="font-semibold">
          Leave History
        </h3>
      </Link>

      <Link
        to="/profile"
        className="
        p-5
        rounded-2xl
        bg-purple-50
        dark:bg-slate-800
        hover:scale-105
        transition
        "
      >
        <h3 className="font-semibold">
          My Profile
        </h3>
      </Link>

    </div>

  </div>

</div>

  );

};

export default Home;