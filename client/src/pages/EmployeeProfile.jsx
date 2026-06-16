import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
} from "react-router-dom";

import API from "../services/api";

import {
  User,
  Mail,
  Phone,
  MapPin,
  Shield,
  Building2,
  BadgeCheck,
} from "lucide-react";

const EmployeeProfile = () => {
    const { id } = useParams();

    const [
  employee,
  setEmployee,
] = useState(null);

const [
  attendanceSummary,
  setAttendanceSummary,
] = useState({});

const [
  leaveSummary,
  setLeaveSummary,
] = useState({});

const [
  attendanceHistory,
  setAttendanceHistory,
] = useState([]);

const [
  leaveHistory,
  setLeaveHistory,
] = useState([]);

const [
  isEditing,
  setIsEditing,
] = useState(false);

const [
  profilePhoto,
  setProfilePhoto,
] = useState(null);

const [
  selectedMonth,
  setSelectedMonth,
] = useState(
  new Date()
);

const [
  formData,
  setFormData,
] = useState({

  fullName: "",

  email: "",

  department: "",

  salary: "",

  phoneNumber: "",

  address: "",

  emergencyContact: "",

  status: "",

});

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

    setFormData({

      fullName:
        response.data.fullName || "",

      email:
        response.data.email || "",

      department:
        response.data.department || "",

      salary:
        response.data.salary || "",

      phoneNumber:
        response.data.phoneNumber || "",

      address:
        response.data.address || "",

      emergencyContact:
        response.data.emergencyContact || "",

      status:
        response.data.status || "",

    });

  }

  catch (error) {

    console.log(error);

  }

};

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

  }

  catch (error) {

    console.log(error);

  }

};

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

  }

  catch (error) {

    console.log(error);

  }

};

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

  }

  catch (error) {

    console.log(error);

  }

};

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

  }

  catch (error) {

    console.log(error);

  }

};

useEffect(() => {

  fetchEmployee();

  fetchAttendanceSummary();

  fetchLeaveSummary();

  fetchAttendanceHistory();

  fetchLeaveHistory();

}, [id]);

const updateEmployee =
async () => {

  try {

    const token =
      localStorage.getItem(
        "token"
      );

    const data =
      new FormData();

    Object.keys(
      formData
    ).forEach(
      (key) => {

        data.append(
          key,
          formData[key]
        );

      }
    );

    if (profilePhoto) {

      data.append(
        "profilePhoto",
        profilePhoto
      );

    }

    await API.put(
      `/admin/employee/${id}`,
      data,
      {
        headers: {
          Authorization:
            `Bearer ${token}`,
          "Content-Type":
            "multipart/form-data",
        },
      }
    );

    setIsEditing(false);

    fetchEmployee();

  }

  catch (error) {

    console.log(error);

  }

};

const currentMonth =
  selectedMonth.getMonth();

const currentYear =
  selectedMonth.getFullYear();

const currentMonthName =
  selectedMonth.toLocaleString(
    "default",
    {
      month: "long",
      year: "numeric",
    }
  );

const daysInMonth =
  new Date(
    currentYear,
    currentMonth + 1,
    0
  ).getDate();

const calendarDays =
  Array.from(
    {
      length:
        daysInMonth,
    },
    (_, i) => {

      const day =
        String(i + 1)
        .padStart(2, "0");

      const month =
        String(currentMonth + 1)
        .padStart(2, "0");

      return `${currentYear}-${month}-${day}`;

    }
  );

const previousMonth =
() => {

  setSelectedMonth(

    new Date(
      currentYear,
      currentMonth - 1,
      1
    )

  );

};

const nextMonth =
() => {

  setSelectedMonth(

    new Date(
      currentYear,
      currentMonth + 1,
      1
    )

  );

};

const getStatusForDate =
(dateString) => {

  const record =
    attendanceHistory.find(
      item =>
        item.date ===
        dateString
    );

  return (
    record?.status || ""
  );

};

  return (

  <div className="p-8">

    {/* PROFILE HEADER */}

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
        md:flex-row
        items-center
        gap-8
        "
      >

        {/* PHOTO */}

        <div
          className="
          h-32
          w-32
          rounded-full
          overflow-hidden
          border-4
          border-slate-200
          dark:border-slate-700
          "
        >

          {employee?.profilePhoto ? (

        <img
        src={`https://uco-ats.onrender.com/uploads/profile/${employee.profilePhoto}`}
        alt="Profile"
        className="
        h-full
        w-full
        object-cover
        "
        />
          ) : (

            <div
              className="
              h-full
              w-full
              flex
              items-center
              justify-center
              bg-slate-100
              dark:bg-slate-800
              "
            >

              <User size={50} />

            </div>

          )}

        </div>

        {/* DETAILS */}

        <div className="flex-1">

          <h1
            className="
            text-4xl
            font-bold
            text-slate-900
            dark:text-white
            "
          >
            {employee?.fullName}
          </h1>

          <p
            className="
            text-slate-500
            dark:text-slate-400
            mt-2
            "
          >
            {employee?.employeeCode}
          </p>

          <div
            className="
            flex
            flex-wrap
            gap-3
            mt-4
            "
          >

            <span
              className="
              px-4
              py-2
              rounded-full
              bg-blue-100
              text-blue-700
              "
            >
              {employee?.department}
            </span>

            <span
              className={`
              px-4
              py-2
              rounded-full
              ${
                employee?.status === "Active"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
              }
              `}
            >
              {employee?.status}
            </span>

          </div>

        </div>

        <div className="flex items-center gap-3">

        <button
            onClick={() =>
            setIsEditing(true)
            }
            className="
            px-5
            py-2.5
            rounded-2xl
            bg-slate-900
            text-white
            font-medium
            cursor-pointer
            hover:opacity-90
            transition
            "
        >
            Edit Profile
        </button>

        </div>

      </div>

    </div>

    

    {
  isEditing && (

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
        text-2xl
        font-semibold
        text-slate-900
        dark:text-white
        mb-6
        "
      >
        Edit Employee Profile
      </h2>

        <div>

        <label
            className="
            block
            mb-2
            text-sm
            font-medium
            "
        >
            Profile Photo
        </label>

        <label
            className="
            inline-flex
            items-center
            justify-center
            px-5
            py-3
            rounded-2xl
            bg-slate-900
            text-white
            cursor-pointer
            hover:opacity-90
            transition
            "
        >
            Choose Photo

            <input
            type="file"
            accept="image/*"
            onChange={(e) =>
                setProfilePhoto(
                e.target.files[0]
                )
            }
            className="hidden"
            />
        </label>

        {profilePhoto && (

            <img
            src={URL.createObjectURL(
                profilePhoto
            )}
            alt="Preview"
            className="
            h-24
            w-24
            rounded-full
            object-cover
            mt-4
            border-4
            border-slate-200
            "
            />

        )}

        </div>

      <div
        className="
        grid
        grid-cols-1
        md:grid-cols-2
        gap-6
        "
      >

        {/* FULL NAME */}

        <div>

          <label
            className="
            block
            mb-2
            text-sm
            font-medium
            "
          >
            Full Name
          </label>

          <input
            type="text"
            value={formData.fullName}
            onChange={(e) =>
              setFormData({
                ...formData,
                fullName:
                  e.target.value,
              })
            }
            className="
            w-full
            p-3
            rounded-2xl
            border
            border-slate-300
            dark:border-slate-700
            dark:bg-slate-800
            "
          />

        </div>

        {/* EMAIL */}

        <div>

          <label
            className="
            block
            mb-2
            text-sm
            font-medium
            "
          >
            Email
          </label>

          <input
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({
                ...formData,
                email:
                  e.target.value,
              })
            }
            className="
            w-full
            p-3
            rounded-2xl
            border
            border-slate-300
            dark:border-slate-700
            dark:bg-slate-800
            "
          />

        </div>

        {/* DEPARTMENT */}

        <div>

          <label
            className="
            block
            mb-2
            text-sm
            font-medium
            "
          >
            Department
          </label>

          <input
            type="text"
            value={formData.department}
            onChange={(e) =>
              setFormData({
                ...formData,
                department:
                  e.target.value,
              })
            }
            className="
            w-full
            p-3
            rounded-2xl
            border
            border-slate-300
            dark:border-slate-700
            dark:bg-slate-800
            "
          />

        </div>

        {/* SALARY */}

        <div>

          <label
            className="
            block
            mb-2
            text-sm
            font-medium
            "
          >
            Salary
          </label>

          <input
            type="number"
            value={formData.salary}
            onChange={(e) =>
              setFormData({
                ...formData,
                salary:
                  e.target.value,
              })
            }
            className="
            w-full
            p-3
            rounded-2xl
            border
            border-slate-300
            dark:border-slate-700
            dark:bg-slate-800
            "
          />

        </div>

        {/* PHONE */}

        <div>

          <label
            className="
            block
            mb-2
            text-sm
            font-medium
            "
          >
            Phone Number
          </label>

          <input
            type="text"
            value={
              formData.phoneNumber
            }
            onChange={(e) =>
              setFormData({
                ...formData,
                phoneNumber:
                  e.target.value,
              })
            }
            className="
            w-full
            p-3
            rounded-2xl
            border
            border-slate-300
            dark:border-slate-700
            dark:bg-slate-800
            "
          />

        </div>

        {/* EMERGENCY CONTACT */}

        <div>

          <label
            className="
            block
            mb-2
            text-sm
            font-medium
            "
          >
            Emergency Contact
          </label>

          <input
            type="text"
            value={
              formData.emergencyContact
            }
            onChange={(e) =>
              setFormData({
                ...formData,
                emergencyContact:
                  e.target.value,
              })
            }
            className="
            w-full
            p-3
            rounded-2xl
            border
            border-slate-300
            dark:border-slate-700
            dark:bg-slate-800
            "
          />

        </div>

      </div>

      {/* ADDRESS */}

      <div className="mt-6">

        <label
          className="
          block
          mb-2
          text-sm
          font-medium
          "
        >
          Address
        </label>

        <textarea
          rows="4"
          value={formData.address}
          onChange={(e) =>
            setFormData({
              ...formData,
              address:
                e.target.value,
            })
          }
          className="
          w-full
          p-3
          rounded-2xl
          border
          border-slate-300
          dark:border-slate-700
          dark:bg-slate-800
          "
        />

      </div>

      {/* STATUS */}

      <div className="mt-6">

        <label
          className="
          block
          mb-2
          text-sm
          font-medium
          "
        >
          Status
        </label>

        <select
          value={formData.status}
          onChange={(e) =>
            setFormData({
              ...formData,
              status:
                e.target.value,
            })
          }
          className="
          w-full
          p-3
          rounded-2xl
          border
          border-slate-300
          dark:border-slate-700
          dark:bg-slate-800
          "
        >

          <option value="Active">
            Active
          </option>

          <option value="Inactive">
            Inactive
          </option>

        </select>

      </div>

      {/* ACTION BUTTONS */}

      <div
        className="
        flex
        justify-end
        gap-3
        mt-8
        "
      >

        <button
          onClick={() =>
            setIsEditing(false)
          }
          className="
          px-6
          py-3
          rounded-2xl
          border
          border-slate-300
          dark:border-slate-700
          cursor-pointer
          "
        >
          Cancel
        </button>

        <button
          onClick={updateEmployee}
          className="
          px-6
          py-3
          rounded-2xl
          bg-slate-900
          text-white
          dark:bg-white
          dark:text-slate-900
          font-medium
          cursor-pointer
          "
        >
          Save Changes
        </button>

      </div>

    </div>

  )
}

    {/* PERSONAL INFO */}

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
        mb-6
        "
      >
        Personal Information
      </h2>

      <div
        className="
        grid
        md:grid-cols-2
        gap-6
        "
      >

        <div className="flex items-center gap-3">
          <Mail size={18} />
          <span>{employee?.email}</span>
        </div>

        <div className="flex items-center gap-3">
          <Phone size={18} />
          <span>{employee?.phoneNumber || "-"}</span>
        </div>

        <div className="flex items-center gap-3">
          <MapPin size={18} />
          <span>{employee?.address || "-"}</span>
        </div>

        <div className="flex items-center gap-3">
          <Shield size={18} />
          <span>{employee?.emergencyContact || "-"}</span>
        </div>

      </div>

    </div>


    {/* SUMMARY CARDS */}

    <div
      className="
      grid
      grid-cols-1
      md:grid-cols-3
      gap-6
      mb-8
      "
    >

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6">
        <p className="text-slate-500">Present Days</p>
        <h2 className="text-5xl font-bold mt-3">
          {attendanceSummary.presentDays || 0}
        </h2>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6">
        <p className="text-slate-500">Half Days</p>
        <h2 className="text-5xl font-bold mt-3">
          {attendanceSummary.halfDays || 0}
        </h2>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6">
        <p className="text-slate-500">Absent Days</p>
        <h2 className="text-5xl font-bold mt-3">
          {attendanceSummary.absentDays || 0}
        </h2>
      </div>

    </div>

    {/* LEAVE SUMMARY */}

    <div
      className="
      grid
      grid-cols-1
      md:grid-cols-3
      gap-6
      mb-8
      "
    >

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6">
        <p className="text-slate-500">Approved Leaves</p>
        <h2 className="text-5xl font-bold mt-3">
          {leaveSummary.approvedLeaves || 0}
        </h2>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6">
        <p className="text-slate-500">Pending Leaves</p>
        <h2 className="text-5xl font-bold mt-3">
          {leaveSummary.pendingLeaves || 0}
        </h2>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6">
        <p className="text-slate-500">Rejected Leaves</p>
        <h2 className="text-5xl font-bold mt-3">
          {leaveSummary.rejectedLeaves || 0}
        </h2>
      </div>

    </div>

    
    {/* ATTENDANCE CALENDAR */}

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
        text-2xl
        font-semibold
        text-slate-900
        dark:text-white
        "
      >
        Attendance Calendar
      </h2>

      <p
        className="
        text-slate-500
        dark:text-slate-400
        mt-1
        "
      >
        {currentMonthName}
      </p>

    </div>

    <div
      className="
      flex
      items-center
      gap-3
      "
    >

      <button
        onClick={
          previousMonth
        }
        className="
        px-4
        py-2
        rounded-xl
        border
        border-slate-200
        dark:border-slate-700
        hover:bg-slate-100
        dark:hover:bg-slate-800
        cursor-pointer
        "
      >
        ←
      </button>

      <button
        onClick={() =>
          setSelectedMonth(
            new Date()
          )
        }
        className="
        px-4
        py-2
        rounded-xl
        bg-slate-900
        text-white
        cursor-pointer
        hover:opacity-90
        "
      >
        Today
      </button>

      <button
        onClick={
          nextMonth
        }
        className="
        px-4
        py-2
        rounded-xl
        border
        border-slate-200
        dark:border-slate-700
        hover:bg-slate-100
        dark:hover:bg-slate-800
        cursor-pointer
        "
      >
        →
      </button>

    </div>

  </div>

  {/* LEGEND */}

  <div
    className="
    flex
    flex-wrap
    gap-4
    mb-8
    text-sm
    "
  >

    <div
      className="
      flex
      items-center
      gap-2
      "
    >
      <div
        className="
        w-3
        h-3
        rounded-full
        bg-green-500
        "
      />
      Present
    </div>

    <div
      className="
      flex
      items-center
      gap-2
      "
    >
      <div
        className="
        w-3
        h-3
        rounded-full
        bg-yellow-500
        "
      />
      Half Day
    </div>

    <div
      className="
      flex
      items-center
      gap-2
      "
    >
      <div
        className="
        w-3
        h-3
        rounded-full
        bg-red-500
        "
      />
      Absent
    </div>

    <div
      className="
      flex
      items-center
      gap-2
      "
    >
      <div
        className="
        w-3
        h-3
        rounded-full
        bg-slate-300
        "
      />
      No Record
    </div>

  </div>

  {/* CALENDAR GRID */}

  <div
    className="
    grid
    grid-cols-2
    sm:grid-cols-3
    md:grid-cols-5
    lg:grid-cols-7
    gap-4
    "
  >

    {calendarDays.map(
      (date) => {

        const status =
          getStatusForDate(
            date
          );

        return (

          <div
            key={date}
            className={`
              p-4
              rounded-2xl
              border
              transition-all
              hover:shadow-md

              ${
                status === "Present"
                ? "bg-green-50 border-green-200"
                : status === "Half Day"
                ? "bg-yellow-50 border-yellow-200"
                : status === "Absent"
                ? "bg-red-50 border-red-200"
                : "bg-slate-50 border-slate-200"
              }
            `}
          >

            <p
              className="
              text-sm
              text-slate-500
              mb-3
              "
            >
              {date}
            </p>

            <span
              className={`
                inline-flex
                px-3
                py-1
                rounded-full
                text-xs
                font-medium

                ${
                  status === "Present"
                  ? "bg-green-100 text-green-700"
                  : status === "Half Day"
                  ? "bg-yellow-100 text-yellow-700"
                  : status === "Absent"
                  ? "bg-red-100 text-red-700"
                  : "bg-slate-100 text-slate-500"
                }
              `}
            >

              {
                status ||
                "No Record"
              }

            </span>

          </div>

        );

      }
    )}

  </div>

</div>
    {/* ATTENDANCE HISTORY */}

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

      <h2 className="text-xl font-semibold mb-6">
        Attendance History
      </h2>

      <div className="overflow-x-auto">

        <table className="w-full text-sm">

          <thead>

            <tr className="bg-slate-50 dark:bg-slate-800">

              <th className="p-4 text-left">Date</th>
              <th className="p-4 text-left">Login</th>
              <th className="p-4 text-left">Logout</th>
              <th className="p-4 text-left">Status</th>

            </tr>

          </thead>

          <tbody>

            {attendanceHistory.map((item) => (

              <tr
                key={item._id}
                className="
                border-b
                border-slate-200
                dark:border-slate-800
                hover:bg-slate-50
                dark:hover:bg-slate-800
                transition-colors
                "
                >
                <td className="p-4">
                  {item.date}
                </td>

                <td className="p-4">
                  {
                    item.loginTime
                    ? new Date(
                        item.loginTime
                      ).toLocaleTimeString()
                    : "-"
                  }
                </td>

                <td className="p-4">
                  {
                    item.logoutTime
                    ? new Date(
                        item.logoutTime
                      ).toLocaleTimeString()
                    : "-"
                  }
                </td>

                <td className="p-4">

                <span
                    className={`
                    px-3
                    py-1
                    rounded-full
                    text-sm
                    font-medium

                    ${
                        item.status === "Approved"
                        ? "bg-green-100 text-green-700"
                        : item.status === "Rejected"
                        ? "bg-red-100 text-red-700"
                        : "bg-amber-100 text-amber-700"
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

    {/* LEAVE HISTORY */}

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

      <h2 className="text-xl font-semibold mb-6">
        Leave History
      </h2>

      <div className="overflow-x-auto">

        <table className="w-full text-sm">

          <thead>

            <tr className="bg-slate-50 dark:bg-slate-800">

              <th className="p-4 text-left">
                Leave Type
              </th>

              <th className="p-4 text-left">
                From
              </th>

              <th className="p-4 text-left">
                To
              </th>

              <th className="p-4 text-left">
                Status
              </th>

            </tr>
                
            </thead>
            

          <tbody>

            {leaveHistory.map((item) => (

              <tr
                key={item._id}
                className="
                border-b
                border-slate-200
                dark:border-slate-800
                hover:bg-slate-50
                dark:hover:bg-slate-800
                transition-colors
                "
                >

                <td className="p-4">
                  {item.leaveType}
                </td>

                <td className="p-4">
                {
                    item.startDate
                    ? new Date(
                        item.startDate
                        ).toLocaleDateString(
                        "en-IN",
                        {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                        }
                        )
                    : "-"
                }
                </td>

                <td className="p-4">
                {
                    item.endDate
                    ? new Date(
                        item.endDate
                        ).toLocaleDateString(
                        "en-IN",
                        {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                        }
                        )
                    : "-"
                }
                </td>

                <td className="p-4">

                <span
                    className={`
                    px-3
                    py-1
                    rounded-full
                    text-sm
                    font-medium

                    ${
                        item.status === "Approved"
                        ? "bg-green-100 text-green-700"
                        : item.status === "Rejected"
                        ? "bg-red-100 text-red-700"
                        : "bg-amber-100 text-amber-700"
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

export default EmployeeProfile;