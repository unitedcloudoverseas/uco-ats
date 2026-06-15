import { useEffect, useState } from "react";
import API from "../services/api";

import {
  Calendar,
  Clock,
  Timer,
  BadgeCheck,
} from "lucide-react";
const AttendanceHistory = () => {

  /* =========================
     STATE MANAGEMENT
  ========================= */

  const [attendanceHistory,
    setAttendanceHistory] =
    useState([]);

  /* =========================
     INITIAL PAGE LOAD
  ========================= */

  useEffect(() => {
    fetchAttendanceHistory();
  }, []);

  /* =========================
     FETCH ATTENDANCE HISTORY
  ========================= */

  const fetchAttendanceHistory =
    async () => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        const response =
          await API.get(
            "/attendance/history",
            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          );

        setAttendanceHistory(
          response.data
        );

      } catch (error) {

        console.log(error);

      }

    };

  return (

  <div className="max-w-7xl mx-auto">

    {/* HEADER */}

    <div className="mb-8">

      <h1
        className="
        text-4xl
        font-bold
        text-slate-900
        dark:text-white
        "
      >
        Attendance History
      </h1>

      <p
        className="
        mt-2
        text-slate-500
        dark:text-slate-400
        "
      >
        View all attendance records
      </p>

    </div>

    {/* TABLE CARD */}

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

      {/* TABLE HEADER */}

      <div
        className="
        px-8
        py-6
        border-b
        border-slate-200
        dark:border-slate-800
        "
      >

        <h2
          className="
          text-xl
          font-bold
          text-slate-900
          dark:text-white
          "
        >
          Attendance Records
        </h2>

      </div>

      {/* TABLE */}

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead>

            <tr
              className="
              bg-slate-50
              dark:bg-slate-800
              "
            >

              <th className="px-6 py-4 text-left">
                Date
              </th>

              <th className="px-6 py-4 text-left">
                Status
              </th>

              <th className="px-6 py-4 text-left">
                Login
              </th>

              <th className="px-6 py-4 text-left">
                Logout
              </th>

              <th className="px-6 py-4 text-left">
                Break
              </th>

              <th className="px-6 py-4 text-left">
                Hours
              </th>

            </tr>

          </thead>

          <tbody>

            {attendanceHistory.length > 0 ? (

              attendanceHistory.map(
                (attendance) => (

                  <tr
                    key={attendance._id}
                    className="
                    border-t
                    border-slate-200
                    dark:border-slate-800
                    hover:bg-slate-50
                    dark:hover:bg-slate-800/50
                    transition
                    "
                  >

                    {/* DATE */}

                    <td className="px-6 py-5">

                      <div
                        className="
                        flex
                        items-center
                        gap-2
                        "
                      >

                        <Calendar size={16} />

                        {attendance.date}

                      </div>

                    </td>

                    {/* STATUS */}

                    <td className="px-6 py-5">

                      <span
                        className={`
                          px-3
                          py-1
                          rounded-full
                          text-xs
                          font-medium

                          ${
                            attendance.status ===
                            "Present"
                              ? "bg-green-100 text-green-700"
                              : attendance.status ===
                                "Half Day"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-red-100 text-red-700"
                          }
                        `}
                      >
                        {attendance.status}
                      </span>

                    </td>

                    {/* LOGIN */}

                    <td className="px-6 py-5">

                      <div
                        className="
                        flex
                        items-center
                        gap-2
                        "
                      >

                        <Clock size={16} />

                        {attendance.loginTime
                          ? new Date(
                              attendance.loginTime
                            ).toLocaleTimeString()
                          : "-"}

                      </div>

                    </td>

                    {/* LOGOUT */}

                    <td className="px-6 py-5">

                      <div
                        className="
                        flex
                        items-center
                        gap-2
                        "
                      >

                        <Clock size={16} />

                        {attendance.logoutTime
                          ? new Date(
                              attendance.logoutTime
                            ).toLocaleTimeString()
                          : "-"}

                      </div>

                    </td>

                    {/* BREAK */}

                    <td className="px-6 py-5">

                      <div
                        className="
                        flex
                        items-center
                        gap-2
                        "
                      >

                        <Timer size={16} />

                        {attendance.breakMinutes || 0}
                        min

                      </div>

                    </td>

                    {/* HOURS */}

                    <td className="px-6 py-5">

                      <div
                        className="
                        flex
                        items-center
                        gap-2
                        font-semibold
                        "
                      >

                        <BadgeCheck size={16} />

                        {attendance.effectiveHours
                          ? Number(
                              attendance.effectiveHours
                            ).toFixed(2)
                          : "-"}

                      </div>

                    </td>

                  </tr>

                )
              )

            ) : (

              <tr>

                <td
                  colSpan="6"
                  className="
                  text-center
                  py-12
                  text-slate-500
                  "
                >
                  No attendance records found
                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>

    </div>

  </div>

);

};

export default AttendanceHistory;