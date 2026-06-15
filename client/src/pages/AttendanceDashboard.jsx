import { useEffect, useState } from "react";
import API from "../services/api";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import {
  CheckCircle2,
  AlertTriangle,
  XCircle,
  TrendingUp,
  Clock3,
  CalendarDays,
  Coffee,
} from "lucide-react";

import toast from "react-hot-toast";

const AttendanceDashboard = () => {

  /* =========================
     STATE MANAGEMENT
  ========================= */

  const [todayAttendance,
    setTodayAttendance] =
    useState(null);

  const [attendanceSummary,
    setAttendanceSummary] =
    useState({
      presentDays: 0,
      halfDays: 0,
      absentDays: 0,
    });

  const [analytics,
    setAnalytics] =
    useState({
      attendancePercentage: 0,
      averageHours: 0,
      totalDays: 0,
      presentDays: 0,
    });

  const [attendanceHistory,
    setAttendanceHistory] =
    useState([]);

  /* =========================
     INITIAL LOAD
  ========================= */

  useEffect(() => {
    fetchDashboardData();
  }, []);

  /* =========================
     FETCH DATA
  ========================= */

  const fetchDashboardData =
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
          todayResponse,
          summaryResponse,
          analyticsResponse,
          historyResponse,
        ] = await Promise.all([

          API.get(
            "/attendance/today",
            { headers }
          ),

          API.get(
            "/attendance/summary",
            { headers }
          ),

          API.get(
            "/attendance/analytics",
            { headers }
          ),

          API.get(
            "/attendance/history",
            { headers }
          ),

        ]);

        setTodayAttendance(
          todayResponse.data
        );

        setAttendanceSummary(
          summaryResponse.data
        );

        setAnalytics(
          analyticsResponse.data
        );

        setAttendanceHistory(
          historyResponse.data
        );

      } catch (error) {

        console.log(error);

      }

    };

  /* =========================
     START BREAK
  ========================= */

  const startBreak =
    async () => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        await API.post(
          "/attendance/start-break",
          {},
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

        fetchDashboardData();

      } catch (error) {

        toast.error(
          error.response?.data?.message
        );

      }

    };

  /* =========================
     END BREAK
  ========================= */

  const endBreak =
    async () => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        await API.post(
          "/attendance/end-break",
          {},
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

        fetchDashboardData();

      } catch (error) {

        toast.error(
          error.response?.data?.message
        );

      }

    };

  const attendanceTrendData =
    attendanceHistory
      .slice(0, 10)
      .reverse()
      .map((item) => ({
        date: item.date,
        hours:
          item.effectiveHours || 0,
      }));

  const attendanceStatusData =
    attendanceHistory
      .slice(0, 10)
      .reverse()
      .map((item) => ({
        date: item.date,
        status:
          item.status === "Present"
            ? 1
            : item.status === "Half Day"
              ? 0.5
              : 0,
      }));

  return (

    <div className="space-y-8">

      {/* =========================
          PAGE HEADER
      ========================= */}

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

        <h1
          className="
    text-4xl
    font-bold
    text-slate-900
    dark:text-white
    "
        >
          Attendance Dashboard
        </h1>

        <p
          className="
    mt-2
    text-slate-500
    "
        >
          Monitor attendance, work hours and productivity
        </p>

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
  "
      >

        <div
          className="
    flex
    flex-col
    xl:flex-row
    xl:items-center
    xl:justify-between
    gap-8
    "
        >

          {/* STATUS */}

          <div>

            <p
              className="
        text-sm
        text-slate-500
        "
            >
              Current Status
            </p>

            <h2
              className="
        text-3xl
        font-bold
        mt-2
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
            </h2>

            <p
              className="
        mt-2
        text-slate-500
        "
            >
              Logged in at
              {" "}
              {
                todayAttendance?.loginTime
                  ? new Date(
                    todayAttendance.loginTime
                  ).toLocaleTimeString()
                  : "-"
              }
            </p>

          </div>

          {/* STATS */}

          <div
            className="
      grid
      grid-cols-2
      md:grid-cols-4
      gap-6
      "
          >

            <div>

              <p className="text-slate-500 text-sm">
                Login
              </p>

              <p
                className="
          font-semibold
          mt-1
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
              </p>

            </div>

            <div>

              <p className="text-slate-500 text-sm">
                Logout
              </p>

              <p
                className="
          font-semibold
          mt-1
          dark:text-white
          "
              >
                {
                  todayAttendance?.logoutTime
                    ? new Date(
                      todayAttendance.logoutTime
                    ).toLocaleTimeString()
                    : "-"
                }
              </p>

            </div>

            <div>

              <p className="text-slate-500 text-sm">
                Break
              </p>

              <p
                className="
          font-semibold
          mt-1
          dark:text-white
          "
              >
                {
                  todayAttendance?.breakMinutes || 0
                }
                {" "}
                min
              </p>

            </div>

            <div>

              <p className="text-slate-500 text-sm">
                Hours
              </p>

              <p
                className="
          font-semibold
          mt-1
          dark:text-white
          "
              >
                {
                  todayAttendance?.effectiveHours
                    ? Number(
                      todayAttendance.effectiveHours
                    ).toFixed(2)
                    : "In Progress"
                }
              </p>

            </div>

          </div>

          {/* BREAK BUTTON */}

          {
            !todayAttendance?.logoutTime && (

              todayAttendance?.isOnBreak ? (

                <button
                  onClick={endBreak}
                  className="
            px-6
            py-3
            rounded-xl
            bg-green-600
            hover:bg-green-700
            text-white
            font-medium
            transition
            "
                >
                  End Break
                </button>

              ) : (

                <button
                  onClick={startBreak}
                  className="
            px-6
            py-3
            rounded-xl
            bg-orange-500
            hover:bg-orange-600
            text-white
            font-medium
            transition
            "
                >
                  Start Break
                </button>

              )

            )
          }

        </div>

      </div>

      {/* =========================
    ATTENDANCE SUMMARY
========================= */}

      <div
        className="
  grid
  grid-cols-1
  md:grid-cols-2
  xl:grid-cols-4
  gap-6
  "
      >

        {/* PRESENT */}

        <div
          className="
    bg-white
    dark:bg-slate-900
    border
    border-slate-200
    dark:border-slate-800
    rounded-3xl
    p-6
    hover:shadow-lg
    transition-all
    duration-300
    "
        >

          <div
            className="
      flex
      items-center
      justify-between
      "
          >

            <div>

              <p className="text-slate-500">
                Present Days
              </p>

              <h2
                className="
          text-4xl
          font-bold
          text-slate-900
          dark:text-white
          mt-3
          "
              >
                {attendanceSummary.presentDays}
              </h2>

            </div>

            <div
              className="
        h-14
        w-14
        rounded-2xl
        bg-green-100
        flex
        items-center
        justify-center
        "
            >
              <CheckCircle2
                className="
          text-green-600
          "
                size={28}
              />
            </div>

          </div>

        </div>

        {/* HALF DAY */}

        <div
          className="
    bg-white
    dark:bg-slate-900
    border
    border-slate-200
    dark:border-slate-800
    rounded-3xl
    p-6
    hover:shadow-lg
    transition-all
    duration-300
    "
        >

          <div
            className="
      flex
      items-center
      justify-between
      "
          >

            <div>

              <p className="text-slate-500">
                Half Days
              </p>

              <h2
                className="
          text-4xl
          font-bold
          text-slate-900
          dark:text-white
          mt-3
          "
              >
                {attendanceSummary.halfDays}
              </h2>

            </div>

            <div
              className="
        h-14
        w-14
        rounded-2xl
        bg-amber-100
        flex
        items-center
        justify-center
        "
            >
              <AlertTriangle
                className="
          text-amber-600
          "
                size={28}
              />
            </div>

          </div>

        </div>

        {/* ABSENT */}

        <div
          className="
    bg-white
    dark:bg-slate-900
    border
    border-slate-200
    dark:border-slate-800
    rounded-3xl
    p-6
    hover:shadow-lg
    transition-all
    duration-300
    "
        >

          <div
            className="
      flex
      items-center
      justify-between
      "
          >

            <div>

              <p className="text-slate-500">
                Absent Days
              </p>

              <h2
                className="
          text-4xl
          font-bold
          text-slate-900
          dark:text-white
          mt-3
          "
              >
                {attendanceSummary.absentDays}
              </h2>

            </div>

            <div
              className="
        h-14
        w-14
        rounded-2xl
        bg-red-100
        flex
        items-center
        justify-center
        "
            >
              <XCircle
                className="
          text-red-600
          "
                size={28}
              />
            </div>

          </div>

        </div>

        {/* ATTENDANCE % */}

        <div
          className="
    bg-white
    dark:bg-slate-900
    border
    border-slate-200
    dark:border-slate-800
    rounded-3xl
    p-6
    hover:shadow-lg
    transition-all
    duration-300
    "
        >

          <div
            className="
      flex
      items-center
      justify-between
      "
          >

            <div>

              <p className="text-slate-500">
                Attendance Rate
              </p>

              <h2
                className="
          text-4xl
          font-bold
          text-slate-900
          dark:text-white
          mt-3
          "
              >
                {analytics.attendancePercentage}%
              </h2>

            </div>

            <div
              className="
        h-14
        w-14
        rounded-2xl
        bg-blue-100
        flex
        items-center
        justify-center
        "
            >
              <TrendingUp
                className="
          text-blue-600
          "
                size={28}
              />
            </div>

          </div>

        </div>

      </div>

      {/* =========================
    WORK ANALYTICS
========================= */}

      <div
        className="
  grid
  grid-cols-1
  md:grid-cols-2
  gap-6
  "
      >

        {/* AVERAGE HOURS */}

        <div
          className="
    bg-white
    dark:bg-slate-900
    border
    border-slate-200
    dark:border-slate-800
    rounded-3xl
    p-6
    hover:shadow-lg
    transition-all
    duration-300
    "
        >

          <div
            className="
      flex
      items-center
      justify-between
      "
          >

            <div>

              <p className="text-slate-500">
                Average Hours
              </p>

              <h2
                className="
          text-4xl
          font-bold
          mt-3
          text-slate-900
          dark:text-white
          "
              >
                {analytics.averageHours}
              </h2>

              <p
                className="
          text-sm
          text-slate-500
          mt-2
          "
              >
                Per Working Day
              </p>

            </div>

            <div
              className="
        h-14
        w-14
        rounded-2xl
        bg-blue-100
        flex
        items-center
        justify-center
        "
            >
              <Clock3
                size={28}
                className="
          text-blue-600
          "
              />
            </div>

          </div>

        </div>

        {/* TOTAL DAYS */}

        <div
          className="
    bg-white
    dark:bg-slate-900
    border
    border-slate-200
    dark:border-slate-800
    rounded-3xl
    p-6
    hover:shadow-lg
    transition-all
    duration-300
    "
        >

          <div
            className="
      flex
      items-center
      justify-between
      "
          >

            <div>

              <p className="text-slate-500">
                Total Attendance Days
              </p>

              <h2
                className="
          text-4xl
          font-bold
          mt-3
          text-slate-900
          dark:text-white
          "
              >
                {analytics.totalDays}
              </h2>

              <p
                className="
          text-sm
          text-slate-500
          mt-2
          "
              >
                Recorded Days
              </p>

            </div>

            <div
              className="
        h-14
        w-14
        rounded-2xl
        bg-purple-100
        flex
        items-center
        justify-center
        "
            >
              <CalendarDays
                size={28}
                className="
          text-purple-600
          "
              />
            </div>

          </div>

        </div>
      </div>

      {/* =========================
    ATTENDANCE INSIGHTS
========================= */}

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
    font-bold
    mb-8
    text-slate-900
    dark:text-white
    "
        >
          Attendance Insights
        </h2>

        <div
          className="
    grid
    grid-cols-1
    md:grid-cols-3
    gap-6
    "
        >

          {/* ATTENDANCE RATE */}

          <div
            className="
      bg-slate-50
      dark:bg-slate-800
      rounded-2xl
      p-6
      "
          >

            <div
              className="
        flex
        items-center
        justify-between
        mb-4
        "
            >

              <p className="text-slate-500">
                Attendance Rate
              </p>

              <TrendingUp
                size={22}
                className="
          text-green-600
          "
              />

            </div>

            <p
              className="
        text-2xl
        font-bold
        text-slate-900
        dark:text-white
        "
            >
              {
                analytics.attendancePercentage >= 90
                  ? "Excellent"
                  : analytics.attendancePercentage >= 75
                    ? "Good"
                    : "Needs Improvement"
              }
            </p>

            <p
              className="
        mt-2
        text-sm
        text-slate-500
        "
            >
              Based on monthly attendance percentage
            </p>

          </div>

          {/* WORK HOURS */}

          <div
            className="
      bg-slate-50
      dark:bg-slate-800
      rounded-2xl
      p-6
      "
          >

            <div
              className="
        flex
        items-center
        justify-between
        mb-4
        "
            >

              <p className="text-slate-500">
                Work Hours
              </p>

              <Clock3
                size={22}
                className="
          text-blue-600
          "
              />

            </div>

            <p
              className="
        text-2xl
        font-bold
        text-slate-900
        dark:text-white
        "
            >
              {
                analytics.averageHours >= 8
                  ? "Excellent"
                  : analytics.averageHours >= 6
                    ? "Good"
                    : "Low"
              }
            </p>

            <p
              className="
        mt-2
        text-sm
        text-slate-500
        "
            >
              Based on average daily working hours
            </p>

          </div>

          {/* BREAK USAGE */}

          <div
            className="
      bg-slate-50
      dark:bg-slate-800
      rounded-2xl
      p-6
      "
          >

            <div
              className="
        flex
        items-center
        justify-between
        mb-4
        "
            >

              <p className="text-slate-500">
                Break Usage
              </p>

              <Coffee
                size={22}
                className="
          text-orange-500
          "
              />

            </div>

            <p
              className="
        text-2xl
        font-bold
        text-slate-900
        dark:text-white
        "
            >
              Normal
            </p>

            <p
              className="
        mt-2
        text-sm
        text-slate-500
        "
            >
              Healthy break duration maintained
            </p>

          </div>

        </div>

      </div>

      {/* =========================
          ATTENDANCE ANALYTICS
      ========================= */}

      <div
        className="
        grid
        grid-cols-1
        xl:grid-cols-2
        gap-6
        "
      >

        {/* Working Hours Trend */}

        <div
          className="
          bg-white
          dark:bg-slate-900
          border
          border-slate-200
          dark:border-slate-800
          rounded-2xl
          p-6
          "
        >

          <h2
            className="
            text-xl
            font-bold
            mb-6
            text-slate-900
            dark:text-white
            "
          >
            Working Hours Trend
          </h2>

          <ResponsiveContainer
            width="100%"
            height={300}
          >

            <LineChart
              data={
                attendanceTrendData
              }
            >

              <CartesianGrid
                strokeDasharray="3 3"
              />

              <XAxis
                dataKey="date"
              />

              <YAxis />

              <Tooltip />

              <Line
                type="monotone"
                dataKey="hours"
                stroke="#2563eb"
                strokeWidth={3}
              />

            </LineChart>

          </ResponsiveContainer>

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
  "
        >

          <div
            className="
    flex
    items-center
    justify-between
    mb-8
    "
          >

            <div>

              <h2
                className="
        text-xl
        font-bold
        text-slate-900
        dark:text-white
        "
              >
                Attendance Trend
              </h2>

              <p
                className="
        text-sm
        text-slate-500
        mt-1
        "
              >
                Attendance performance over time
              </p>

            </div>

          </div>

          <ResponsiveContainer
            width="100%"
            height={320}
          >

            <BarChart
              data={
                attendanceStatusData
              }
            >

              <CartesianGrid
                vertical={false}
                stroke="#e2e8f0"
                strokeOpacity={0.4}
              />

              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tick={{
                  fill: "#64748b",
                  fontSize: 12,
                }}
              />

              <YAxis
                tickLine={false}
                axisLine={false}
                tick={{
                  fill: "#64748b",
                  fontSize: 12,
                }}
              />

              <Tooltip
                cursor={{
                  fill:
                    "rgba(148,163,184,0.08)",
                }}
                contentStyle={{
                  borderRadius: "16px",
                  border:
                    "1px solid #e2e8f0",
                  boxShadow:
                    "0 8px 30px rgba(0,0,0,0.08)",
                }}
              />

              <Bar
                dataKey="status"
                fill="#3b82f6"
                radius={[
                  8,
                  8,
                  0,
                  0,
                ]}
              />

            </BarChart>

          </ResponsiveContainer>

        </div>
      </div>
    </div>

  );

};

export default AttendanceDashboard;