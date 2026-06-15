import { useEffect, useState } from "react";
import API from "../services/api";

const LeaveHistory = () => {

  /* =========================
     STATE MANAGEMENT
  ========================= */

  const [leaves,
    setLeaves] =
    useState([]);

  /* =========================
     INITIAL PAGE LOAD
  ========================= */

  useEffect(() => {
    fetchLeaves();
  }, []);

  /* =========================
     FETCH LEAVES
  ========================= */

  const fetchLeaves =
    async () => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        const response =
          await API.get(
            "/leaves/my-leaves",
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

      } catch (error) {

        console.log(error);

      }

    };

  /* =========================
     CALCULATE LEAVE DAYS
  ========================= */

  const calculateDays =
    (
      startDate,
      endDate
    ) => {

      const days =
        Math.ceil(
          (
            new Date(endDate) -
            new Date(startDate)
          ) /
          (
            1000 *
            60 *
            60 *
            24
          )
        ) + 1;

      return days;

    };

  return (

  <div className="p-8">

    {/* PAGE HEADER */}

    <div
      className="
      bg-white
      border
      border-slate-200
      rounded-3xl
      p-8
      mb-8
      "
    >

      <h1
        className="
        text-4xl
        font-bold
        tracking-tight
        text-slate-900
        "
      >
        Leave History
      </h1>

      <p
        className="
        mt-2
        text-slate-500
        "
      >
        View all your leave requests
      </p>

    </div>

    {/* HISTORY */}

    <div
      className="
      bg-white
      border
      border-slate-200
      rounded-3xl
      overflow-hidden
      "
    >

      {/* SECTION HEADER */}

      <div
        className="
        px-8
        py-6
        border-b
        border-slate-200
        "
      >

        <h2
          className="
          text-xl
          font-semibold
          text-slate-900
          "
        >
          Leave Requests
        </h2>

      </div>

      {/* LIST */}

      <div className="p-6">

        {leaves.length > 0 ? (

          <div className="space-y-4">

            {leaves.map((leave) => (

              <div
                key={leave._id}
                className="
                border
                border-slate-200
                rounded-3xl
                p-6
                hover:border-slate-300
                transition-all
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

                  {/* LEFT */}

                  <div>

                    <h3
                      className="
                      text-lg
                      font-semibold
                      text-slate-900
                      "
                    >
                      {leave.leaveType}
                    </h3>

                    <p
                      className="
                      text-slate-500
                      mt-1
                      "
                    >
                      {new Date(
                        leave.startDate
                      ).toLocaleDateString()}
                      {" "}
                      -
                      {" "}
                      {new Date(
                        leave.endDate
                      ).toLocaleDateString()}
                    </p>

                  </div>

                  {/* MIDDLE */}

                  <div
                    className="
                    flex
                    gap-10
                    flex-wrap
                    "
                  >

                    <div>

                      <p
                        className="
                        text-xs
                        uppercase
                        tracking-wide
                        text-slate-400
                        "
                      >
                        Duration
                      </p>

                      <p
                        className="
                        font-semibold
                        text-slate-900
                        mt-1
                        "
                      >
                        {
                          calculateDays(
                            leave.startDate,
                            leave.endDate
                          )
                        }
                        {" "}
                        Days
                      </p>

                    </div>

                    <div>

                      <p
                        className="
                        text-xs
                        uppercase
                        tracking-wide
                        text-slate-400
                        "
                      >
                        Applied On
                      </p>

                      <p
                        className="
                        font-semibold
                        text-slate-900
                        mt-1
                        "
                      >
                        {new Date(
                          leave.createdAt
                        ).toLocaleDateString()}
                      </p>

                    </div>

                  </div>

                  {/* STATUS */}

                  <div>

                    <span
                      className={`
                        inline-flex
                        items-center
                        px-4
                        py-2
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

                  </div>

                </div>

              </div>

            ))}

          </div>

        ) : (

          <div
            className="
            text-center
            py-20
            "
          >

            <div
              className="
              w-20
              h-20
              mx-auto
              rounded-full
              bg-slate-100
              flex
              items-center
              justify-center
              mb-4
              "
            >

              📄

            </div>

            <h3
              className="
              text-lg
              font-semibold
              text-slate-900
              "
            >
              No Leave Requests
            </h3>

            <p
              className="
              text-slate-500
              mt-2
              "
            >
              You haven't submitted any leave applications yet.
            </p>

          </div>

        )}

      </div>

    </div>

  </div>

);

};

export default LeaveHistory;