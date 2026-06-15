import { useEffect, useState } from "react";
import API from "../services/api";
import toast from "react-hot-toast";

const Dashboard = () => {

  /* =========================
     EMPLOYEE DATA
  ========================= */

  const employee = JSON.parse(
    localStorage.getItem("employee")
  );

  /* =========================
     STATE MANAGEMENT
  ========================= */

  const [todayAttendance,
    setTodayAttendance] =
    useState(null);

  const [attendanceHistory,
    setAttendanceHistory] =
    useState([]);

  const [attendanceSummary,
    setAttendanceSummary] =
    useState({
      presentDays: 0,
      halfDays: 0,
      absentDays: 0,
    });

  /* =========================
     INITIAL PAGE LOAD
  ========================= */

  useEffect(() => {
    fetchDashboardData();
  }, []);

  /* =========================
     FETCH DASHBOARD DATA
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
          historyResponse,
          summaryResponse,
        ] = await Promise.all([
          API.get(
            "/attendance/today",
            { headers }
          ),
          API.get(
            "/attendance/history",
            { headers }
          ),
          API.get(
            "/attendance/summary",
            { headers }
          ),
        ]);

        setTodayAttendance(
          todayResponse.data
        );

        setAttendanceHistory(
          historyResponse.data
        );

        setAttendanceSummary(
          summaryResponse.data
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

  /* =========================
     EMPLOYEE LOGOUT
  ========================= */
  const handleLogout =
    async () => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        await API.post(
          "/employees/logout",
          {},
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

        localStorage.removeItem(
          "token"
        );

        localStorage.removeItem(
          "employee"
        );

        toast.success(
          "Logout Successful"
        );

        window.location.href =
          "/";

      } catch (error) {

        console.log(error);

        toast.error(
          error.response?.data?.message ||
          "Logout Failed"
        );

      }

    };

  return (

    <div className="p-8">

      {/* =========================
          PAGE HEADER
      ========================= */}

      <div className="flex justify-between items-center mb-8">

        <div>

          <h1 className="text-3xl font-bold">
            Welcome,
            {" "}
            {employee?.fullName}
          </h1>

          <p className="text-gray-500 mt-1">
            Employee Dashboard
          </p>

        </div>

        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-5 py-2 rounded-lg"
        >
          Logout
        </button>

      </div>

      {/* =========================
          EMPLOYEE PROFILE
      ========================= */}

      <div className="bg-white shadow rounded-xl p-6 mb-8">

        <h2 className="text-xl font-bold mb-5">
          Employee Profile
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4">

          <div>
            <span className="font-semibold">
              Employee Code:
            </span>
            {" "}
            {employee?.employeeCode}
          </div>

          <div>
            <span className="font-semibold">
              Name:
            </span>
            {" "}
            {employee?.fullName}
          </div>

          <div>
            <span className="font-semibold">
              Department:
            </span>
            {" "}
            {employee?.department || "-"}
          </div>

          <div>
            <span className="font-semibold">
              Status:
            </span>

            <span className="ml-2 px-2 py-1 rounded bg-green-100 text-green-700 text-sm font-medium">
              Active
            </span>

          </div>

        </div>

      </div>

      {/* =========================
          ATTENDANCE SUMMARY
      ========================= */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

        <div className="bg-green-50 p-6 rounded-xl shadow">

          <h3 className="text-gray-600">
            Present Days
          </h3>

          <p className="text-3xl font-bold mt-2">
            {
              attendanceSummary.presentDays
            }
          </p>

        </div>

        <div className="bg-yellow-50 p-6 rounded-xl shadow">

          <h3 className="text-gray-600">
            Half Days
          </h3>

          <p className="text-3xl font-bold mt-2">
            {
              attendanceSummary.halfDays
            }
          </p>

        </div>

        <div className="bg-red-50 p-6 rounded-xl shadow">

          <h3 className="text-gray-600">
            Absent Days
          </h3>

          <p className="text-3xl font-bold mt-2">
            {
              attendanceSummary.absentDays
            }
          </p>

        </div>

      </div>

      {/* =========================
          TODAY ATTENDANCE
      ========================= */}

      <div className="bg-white shadow rounded-xl p-6 mb-8">


        {/* =========================
            BREAK BUTTONS
        ========================= */}

        <div className="mt-4">

          {todayAttendance?.isOnBreak ? (

            <button
              onClick={endBreak}
              className="
              bg-green-600
              text-white
              px-4
              py-2
              rounded-lg
              "
            >

              End Break

            </button>

          ) : (

            <button
              onClick={startBreak}
              className="
              bg-orange-500
              text-white
              px-4
              py-2
              rounded-lg
              "
            >
              Start Break

            </button>

          )}

        </div>

        <h2 className="text-xl font-bold mb-5">
          Today's Attendance
        </h2>

        {todayAttendance ? (

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            <div>

              <p className="text-gray-500 text-sm">
                Status
              </p>

              <p className="font-bold text-lg mt-1">

                <span
                  className={`px-3 py-1 rounded text-white ${todayAttendance.status === "Present"
                      ? "bg-green-500"
                      : todayAttendance.status === "Half Day"
                        ? "bg-yellow-500"
                        : "bg-red-500"
                    }`}
                >
                  {todayAttendance.status}
                </span>

              </p>

            </div>

            <div>

              <p className="text-gray-500 text-sm">
                Login Time
              </p>

              <p className="font-semibold mt-1">
                {new Date(
                  todayAttendance.loginTime
                ).toLocaleTimeString()}
              </p>

            </div>

            <div>

              <p className="text-gray-500 text-sm">
                Break Minutes
              </p>

              <p className="font-semibold mt-1">
                {todayAttendance?.breakMinutes || 0}
              </p>

            </div>

            <div>

              <p className="text-gray-500 text-sm">
                Effective Hours
              </p>

              <p className="font-semibold mt-1">

                {todayAttendance?.logoutTime
                  ? Number(
                    todayAttendance.effectiveHours
                  ).toFixed(2)
                  : "In Progress"}

              </p>

            </div>

            <div>

              <p className="text-gray-500 text-sm">
                Logout Time
              </p>

              <p className="font-semibold mt-1">

                {todayAttendance.logoutTime
                  ? new Date(
                    todayAttendance.logoutTime
                  ).toLocaleTimeString()
                  : "-"}

              </p>

            </div>

          </div>

        ) : (

          <p>
            No attendance marked today
          </p>

        )}

      </div>

      {/* =========================
          ATTENDANCE HISTORY
      ========================= */}

      <div className="bg-white shadow rounded-xl p-6">

        <h2 className="text-xl font-bold mb-4">
          Attendance History
        </h2>

        <table className="w-full">

          <thead>

            <tr className="bg-gray-100">

              <th className="p-3 text-left">
                Date
              </th>

              <th className="p-3 text-left">
                Status
              </th>

              <th className="p-3 text-left">
                Login Time
              </th>

              <th className="p-3 text-left">
                Logout Time
              </th>

              <th className="p-3 text-left">
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
                    className="border-t hover:bg-gray-50"
                  >

                    <td className="p-3">
                      {attendance.date}
                    </td>

                    <td className="p-3">

                      <span
                        className={`px-3 py-1 rounded text-white text-sm ${attendance.status === "Present"
                            ? "bg-green-500"
                            : attendance.status === "Half Day"
                              ? "bg-yellow-500"
                              : "bg-red-500"
                          }`}
                      >
                        {attendance.status}
                      </span>

                    </td>

                    <td className="p-3">
                      {new Date(
                        attendance.loginTime
                      ).toLocaleTimeString()}
                    </td>

                    <td className="p-3">

                      {attendance.logoutTime
                        ? new Date(
                          attendance.logoutTime
                        ).toLocaleTimeString()
                        : "-"}

                    </td>

                    <td className="p-3">

                      {attendance.totalHours
                        ? attendance.totalHours.toFixed(2)
                        : "-"}

                    </td>

                  </tr>

                )
              )

            ) : (

              <tr>

                <td
                  colSpan="5"
                  className="p-5 text-center text-gray-500"
                >
                  No attendance records found
                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>

    </div>

  );

};

export default Dashboard;