import { useEffect, useState } from "react";
import API from "../services/api";

import {
  Clock3,
  CheckCircle2,
  XCircle,
  FileText,
  Search,
} from "lucide-react";

const AdminLeaves = () => {

const [
  leaves,
  setLeaves,
] = useState([]);

const [
  overview,
  setOverview,
] = useState({});

const [
  filter,
  setFilter,
] = useState("All");

const [
  search,
  setSearch,
] = useState("");

useEffect(() => {

  fetchLeaves();
  fetchOverview();

}, []);

const fetchLeaves =
async () => {

  try {

    const token =
      localStorage.getItem(
        "token"
      );

    const response =
      await API.get(
        "/admin/leaves",
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

    setLeaves(
      response.data
    );

  }

  catch (error) {

    console.log(error);

  }

};

const fetchOverview =
async () => {

  try {

    const token =
      localStorage.getItem(
        "token"
      );

    const response =
      await API.get(
        "/admin/leave-overview",
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

    fetchLeaves();
    fetchOverview();

  }

  catch (error) {

    console.log(error);

  }

};

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

    fetchLeaves();
    fetchOverview();

  }

  catch (error) {

    console.log(error);

  }

};

const filteredLeaves =
leaves.filter((leave) => {

  const matchesStatus =
    filter === "All"
      ? true
      : leave.status === filter;

  const matchesSearch =
    leave.employeeId?.fullName
        ?.toLowerCase()
        ?.includes(
        search.toLowerCase()
        ) || false;

  return (
    matchesStatus &&
    matchesSearch
  );

});

return (

  <div className="p-8 space-y-8">

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
        Leave Management
      </h1>

      <p
        className="
        mt-2
        text-slate-500
        dark:text-slate-400
        "
      >
        Review, approve and manage employee leave requests
      </p>

    </div>

    {/* OVERVIEW CARDS */}

    <div
      className="
      grid
      grid-cols-1
      md:grid-cols-2
      xl:grid-cols-4
      gap-6
      "
    >

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

        <div className="flex justify-between items-center">

          <div>

            <p className="text-slate-500">
              Pending
            </p>

            <h2
              className="
              text-4xl
              font-bold
              mt-2
              "
            >
              {overview.pending || 0}
            </h2>

          </div>

          <Clock3
            size={28}
            className="text-amber-500"
          />

        </div>

      </div>

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

        <div className="flex justify-between items-center">

          <div>

            <p className="text-slate-500">
              Approved
            </p>

            <h2
              className="
              text-4xl
              font-bold
              mt-2
              "
            >
              {overview.approved || 0}
            </h2>

          </div>

          <CheckCircle2
            size={28}
            className="text-green-500"
          />

        </div>

      </div>

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

        <div className="flex justify-between items-center">

          <div>

            <p className="text-slate-500">
              Rejected
            </p>

            <h2
              className="
              text-4xl
              font-bold
              mt-2
              "
            >
              {overview.rejected || 0}
            </h2>

          </div>

          <XCircle
            size={28}
            className="text-red-500"
          />

        </div>

      </div>

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

        <div className="flex justify-between items-center">

          <div>

            <p className="text-slate-500">
              Total
            </p>

            <h2
              className="
              text-4xl
              font-bold
              mt-2
              "
            >
              {overview.total || 0}
            </h2>

          </div>

          <FileText
            size={28}
            className="text-blue-500"
          />

        </div>

      </div>

    </div>

    {/* FILTERS */}

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
        flex-col
        lg:flex-row
        gap-4
        justify-between
        "
      >

        {/* SEARCH */}

        <div
          className="
          relative
          w-full
          lg:w-96
          "
        >

          <Search
            size={18}
            className="
            absolute
            left-4
            top-3.5
            text-slate-400
            "
          />

          <input
            type="text"
            placeholder="Search employee..."
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            className="
            w-full
            pl-11
            pr-4
            py-3
            border
            border-slate-200
            dark:border-slate-700
            rounded-2xl
            bg-white
            dark:bg-slate-800
            "
          />

        </div>

        {/* FILTER BUTTONS */}

        <div
          className="
          flex
          flex-wrap
          gap-2
          "
        >

          {[
            "All",
            "Pending",
            "Approved",
            "Rejected",
          ].map((status) => (

            <button
              key={status}
              onClick={() =>
                setFilter(
                  status
                )
              }
              className={`
                px-4
                py-2
                rounded-2xl
                transition-all
                cursor-pointer

                ${
                  filter === status
                  ? "bg-slate-900 text-white"
                  : "bg-slate-100 text-slate-700"
                }
              `}
            >

              {status}

            </button>

          ))}

        </div>

      </div>

    </div>

    {/* LEAVES TABLE */}

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

      <div className="p-8">

        <h2
          className="
          text-xl
          font-semibold
          "
        >
          Leave Requests
        </h2>

      </div>

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead>

            <tr
              className="
              bg-slate-50
              dark:bg-slate-800
              "
            >

              <th className="p-4 text-left">
                Code
              </th>

              <th className="p-4 text-left">
                Employee
              </th>

              <th className="p-4 text-left">
                Department
              </th>

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

              <th className="p-4 text-left">
                Action
              </th>

            </tr>

          </thead>

          <tbody>

            {filteredLeaves.map(
              (leave) => (

                <tr
                  key={leave._id}
                  className="
                  border-t
                  border-slate-200
                  dark:border-slate-800
                  "
                >

                  <td className="p-4">
                    {leave.employeeId?.employeeCode}
                  </td>

                  <td className="p-4">
                    {leave.employeeId?.fullName}
                  </td>

                  <td className="p-4">
                    {leave.employeeId?.department}
                  </td>

                <td className="p-4">
                {leave.leaveType}
                </td>

                <td className="p-4">
                {
                    leave.startDate
                    ? new Date(
                        leave.startDate
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
                    leave.endDate
                    ? new Date(
                        leave.endDate
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
                          leave.status === "Approved"
                          ? "bg-green-100 text-green-700"

                          : leave.status === "Rejected"
                          ? "bg-red-100 text-red-700"

                          : "bg-amber-100 text-amber-700"
                        }
                      `}
                    >

                      {leave.status}

                    </span>

                  </td>

                  <td className="p-4">

                    {leave.status === "Pending" && (

                      <div className="flex gap-2">

                        <button
                          onClick={() =>
                            approveLeave(
                              leave._id
                            )
                          }
                          className="
                          px-3
                          py-2
                          rounded-xl
                          bg-green-600
                          text-white
                          cursor-pointer
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
                          px-3
                          py-2
                          rounded-xl
                          bg-red-600
                          text-white
                          cursor-pointer
                          "
                        >
                          Reject
                        </button>

                      </div>

                    )}

                  </td>

                </tr>

                

              )
            )}

            {filteredLeaves.length === 0 && (

            <tr>

                <td
                colSpan="8"
                className="
                text-center
                p-8
                text-slate-500
                "
                >
                No leave requests found
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

export default AdminLeaves;