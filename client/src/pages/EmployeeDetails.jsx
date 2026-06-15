import {
    useEffect,
    useState,
} from "react";

import {
    useParams,
} from "react-router-dom";

import API from "../services/api";

const EmployeeDetails = () => {

    /* =========================
       ROUTE PARAMETERS
    ========================= */

    const { id } = useParams();

    /* =========================
       STATE MANAGEMENT
    ========================= */

    const [employee,
        setEmployee] =
        useState(null);


    /* =========================
    ATTENDANCE SUMMARY STATE
    ========================= */

    const [attendanceSummary,
        setAttendanceSummary] =
        useState({
            presentDays: 0,
            halfDays: 0,
            absentDays: 0,
        });

    /* =========================
     LEAVE SUMMARY STATE
      ========================= */

    const [leaveSummary,
        setLeaveSummary] =
        useState({
            approvedLeaves: 0,
            pendingLeaves: 0,
            rejectedLeaves: 0,
        });

    /* =========================
        ATTENDANCE HISTORY STATE
    ========================= */

    const [showAttendanceHistory,
        setShowAttendanceHistory] =
        useState(false);

    const [attendanceHistory,
        setAttendanceHistory] =
        useState([]);

    /* =========================
   LEAVE HISTORY STATE
    ========================= */

    const [showLeaveHistory,
    setShowLeaveHistory] =
    useState(false);

    const [leaveHistory,
    setLeaveHistory] =
    useState([]);

    /* =========================
       INITIAL PAGE LOAD
    ========================= */

    useEffect(() => {
        fetchEmployee();
        fetchAttendanceSummary();
        fetchLeaveSummary();
    }, []);

    /* =========================
       FETCH EMPLOYEE DETAILS
    ========================= */

    const fetchEmployee =
        async () => {

            try {

                const token =
                    localStorage.getItem(
                        "token"
                    );

                const response =
                    await API.get(
                        `/admin/employee/${id}`,
                        {
                            headers: {
                                Authorization:
                                    `Bearer ${token}`,
                            },
                        }
                    );

                setEmployee(
                    response.data
                );

            } catch (error) {

                console.log(error);

            }

        };

    /* =========================
        FETCH ATTENDANCE SUMMARY
        ========================= */

    const fetchAttendanceSummary =
        async () => {

            try {

                const token =
                    localStorage.getItem(
                        "token"
                    );

                const response =
                    await API.get(
                        `/admin/employee/${id}/attendance-summary`,
                        {
                            headers: {
                                Authorization:
                                    `Bearer ${token}`,
                            },
                        }
                    );

                setAttendanceSummary(
                    response.data
                );

            } catch (error) {

                console.log(error);

            }

        };

    /* =========================
    FETCH LEAVE SUMMARY
    ========================= */

    const fetchLeaveSummary =
        async () => {

            try {

                const token =
                    localStorage.getItem(
                        "token"
                    );

                const response =
                    await API.get(
                        `/admin/employee/${id}/leave-summary`,
                        {
                            headers: {
                                Authorization:
                                    `Bearer ${token}`,
                            },
                        }
                    );

                setLeaveSummary(
                    response.data
                );

            } catch (error) {

                console.log(error);

            }

        };

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
                        `/admin/employee/${id}/attendance-history`,
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

    /* =========================
    TOGGLE ATTENDANCE HISTORY
    ========================= */

    const toggleAttendanceHistory =
        async () => {

            if (
                !showAttendanceHistory
            ) {

                await fetchAttendanceHistory();

            }

            setShowAttendanceHistory(
                !showAttendanceHistory
            );

        };

        /* =========================
        FETCH LEAVE HISTORY
        ========================= */

        const fetchLeaveHistory =
        async () => {

            try {

            const token =
                localStorage.getItem(
                "token"
                );

            const response =
                await API.get(
                `/admin/employee/${id}/leave-history`,
                {
                    headers: {
                    Authorization:
                        `Bearer ${token}`,
                    },
                }
                );

            setLeaveHistory(
                response.data
            );

            } catch (error) {

            console.log(error);

            }

        };

        /* =========================
        TOGGLE LEAVE HISTORY
        ========================= */

        const toggleLeaveHistory =
        async () => {

            if (
            !showLeaveHistory
            ) {

            await fetchLeaveHistory();

            }

            setShowLeaveHistory(
            !showLeaveHistory
            );

        };

    if (!employee) {
        return (
            <div className="p-6">
                Loading...
            </div>
        );
    }

    return (
        <div className="p-6">

            {/* =========================
          PAGE HEADER
      ========================= */}

            <h1 className="text-3xl font-bold mb-8">
                Employee Details
            </h1>

            {/* =========================
          EMPLOYEE PROFILE CARD
      ========================= */}

            <div className="bg-white shadow rounded-xl p-6">

                <h2 className="text-xl font-bold mb-4">
                    Employee Profile
                </h2>

                <div className="grid grid-cols-2 gap-4">

                    <div>
                        <strong>
                            Employee Code:
                        </strong>
                    </div>

                    <div>
                        {
                            employee.employeeCode
                        }
                    </div>

                    <div>
                        <strong>
                            Full Name:
                        </strong>
                    </div>

                    <div>
                        {
                            employee.fullName
                        }
                    </div>

                    <div>
                        <strong>
                            Email:
                        </strong>
                    </div>

                    <div>
                        {employee.email}
                    </div>

                    <div>
                        <strong>
                            Department:
                        </strong>
                    </div>

                    <div>
                        {
                            employee.department
                        }
                    </div>

                    <div>
                        <strong>
                            Status:
                        </strong>
                    </div>

                    <div>
                        {
                            employee.status
                        }
                    </div>

                </div>

            </div>


            {/* =========================
                ATTENDANCE SUMMARY
            ========================= */}

            <div className="bg-white shadow rounded-xl p-6 mt-8">

                <h2 className="text-xl font-bold mb-4">
                    Attendance Summary
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                    {/* Present Days */}

                    <div className="bg-green-50 p-5 rounded-lg">

                        <h3 className="text-sm text-gray-600">
                            Present Days
                        </h3>

                        <p className="text-3xl font-bold mt-2">
                            {
                                attendanceSummary.presentDays
                            }
                        </p>

                    </div>

                    {/* Half Days */}

                    <div className="bg-yellow-50 p-5 rounded-lg">

                        <h3 className="text-sm text-gray-600">
                            Half Days
                        </h3>

                        <p className="text-3xl font-bold mt-2">
                            {
                                attendanceSummary.halfDays
                            }
                        </p>

                    </div>

                    {/* Absent Days */}

                    <div className="bg-red-50 p-5 rounded-lg">

                        <h3 className="text-sm text-gray-600">
                            Absent Days
                        </h3>

                        <p className="text-3xl font-bold mt-2">
                            {
                                attendanceSummary.absentDays
                            }
                        </p>

                    </div>

                </div>

            </div>

            {/* =========================
                LEAVE SUMMARY
            ========================= */}

            <div className="bg-white shadow rounded-xl p-6 mt-8">

                <h2 className="text-xl font-bold mb-4">
                    Leave Summary
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                    {/* Approved Leaves */}

                    <div className="bg-green-50 p-5 rounded-lg">

                        <h3 className="text-sm text-gray-600">
                            Approved Leaves
                        </h3>

                        <p className="text-3xl font-bold mt-2">
                            {
                                leaveSummary.approvedLeaves
                            }
                        </p>

                    </div>

                    {/* Pending Leaves */}

                    <div className="bg-yellow-50 p-5 rounded-lg">

                        <h3 className="text-sm text-gray-600">
                            Pending Leaves
                        </h3>

                        <p className="text-3xl font-bold mt-2">
                            {
                                leaveSummary.pendingLeaves
                            }
                        </p>

                    </div>

                    {/* Rejected Leaves */}

                    <div className="bg-red-50 p-5 rounded-lg">

                        <h3 className="text-sm text-gray-600">
                            Rejected Leaves
                        </h3>

                        <p className="text-3xl font-bold mt-2">
                            {
                                leaveSummary.rejectedLeaves
                            }
                        </p>

                    </div>

                </div>

            </div>

            {/* =========================
                ATTENDANCE HISTORY BUTTON
            ========================= */}

            <div className="mt-8">

                <button
                    onClick={
                        toggleAttendanceHistory
                    }
                    className="bg-blue-600 text-white px-5 py-2 rounded-lg"
                >

                    {showAttendanceHistory
                        ? "Close Attendance History"
                        : "View Attendance History"}

                </button>

            </div>

            {/* =========================
                ATTENDANCE HISTORY TABLE
            ========================= */}

            {showAttendanceHistory && (

                <div className="bg-white shadow rounded-xl p-6 mt-6">

                    <h2 className="text-xl font-bold mb-4">
                        Attendance History
                    </h2>

                    <table className="w-full">

                        <thead>

                            <tr>

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

                            </tr>

                        </thead>

                        <tbody>

                            {attendanceHistory.map(
                                (attendance) => (

                                    <tr
                                        key={attendance._id}
                                        className="border-t"
                                    >

                                        <td className="p-3">
                                            {attendance.date}
                                        </td>

                                        <td className="p-3">
                                            {attendance.status}
                                        </td>

                                        <td className="p-3">
                                            {attendance.loginTime
                                                ? new Date(
                                                    attendance.loginTime
                                                ).toLocaleTimeString()
                                                : "-"}
                                        </td>

                                        <td className="p-3">
                                            {attendance.logoutTime
                                                ? new Date(
                                                    attendance.logoutTime
                                                ).toLocaleTimeString()
                                                : "-"}
                                        </td>

                                    </tr>

                                )
                            )}

                        </tbody>

                    </table>

                </div>

            )}

            {/* =========================
                LEAVE HISTORY BUTTON
            ========================= */}

            <div className="mt-6">

            <button
                onClick={
                toggleLeaveHistory
                }
                className="bg-purple-600 text-white px-5 py-2 rounded-lg"
            >

                {showLeaveHistory
                ? "Close Leave History"
                : "View Leave History"}

            </button>

            </div>

            {/* =========================
                LEAVE HISTORY TABLE
            ========================= */}

            {showLeaveHistory && (

            <div className="bg-white shadow rounded-xl p-6 mt-6">

                <h2 className="text-xl font-bold mb-4">
                Leave History
                </h2>

                <table className="w-full">

                <thead>

                    <tr>

                    <th className="p-3 text-left">
                        Leave Type
                    </th>

                    <th className="p-3 text-left">
                        Reason
                    </th>

                    <th className="p-3 text-left">
                        Status
                    </th>

                    <th className="p-3 text-left">
                        Applied On
                    </th>

                    </tr>

                </thead>

                <tbody>

                    {leaveHistory.map(
                    (leave) => (

                        <tr
                        key={leave._id}
                        className="border-t"
                        >

                        <td className="p-3">
                            {leave.leaveType}
                        </td>

                        <td className="p-3">
                            {leave.reason}
                        </td>

                        <td className="p-3">
                            {leave.status}
                        </td>

                        <td className="p-3">
                            {new Date(
                            leave.createdAt
                            ).toLocaleDateString()}
                        </td>

                        </tr>

                    )
                    )}

                </tbody>

                </table>

            </div>

            )}

        </div>
    );
};

export default EmployeeDetails;