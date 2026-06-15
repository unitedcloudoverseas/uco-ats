import { useEffect, useState } from "react";
import API from "../services/api";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import toast from "react-hot-toast";

const ApplyLeave = () => {

  /* =========================
     FORM STATE
  ========================= */

  const [leaveType,
    setLeaveType] =
    useState("");

  const [durationType, setDurationType] =
    useState("");

  const [session, setSession] =
    useState("");

  const [startDate,
    setStartDate] =
    useState("");

  const [endDate,
    setEndDate] =
    useState("");

  const [reason,
    setReason] =
    useState("");

  const [balance,
    setBalance] =
    useState(null);

  /* =========================
     LOAD LEAVE BALANCE
  ========================= */

  useEffect(() => {
    fetchLeaveBalance();
  }, []);

  const fetchLeaveBalance =
    async () => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        const response =
          await API.get(
            "/leaves/balance",
            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          );

        setBalance(
          response.data
        );

      } catch (error) {

        console.log(error);

      }

    };

  /* =========================
     APPLY LEAVE
  ========================= */

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        const finalEndDate =
          durationType === "Full Day"
            ? startDate
            : durationType === "Half Day"
              ? startDate
              : endDate;

        console.log({
          leaveType,
          startDate,
          endDate,
          durationType,
          reason,
        });

        const response =
          await API.post(
            "/leaves/apply",
            {
              leaveType,
              startDate,
              endDate: finalEndDate,
              reason,
            },
            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          );
        toast.success(
          response.data.message
        );

        setLeaveType("");
        setStartDate("");
        setEndDate("");
        setReason("");

      } catch (error) {

        toast.error(
          error.response?.data?.message ||
          "Failed to apply leave"
        );

      }

    };

  return (

   <div className="p-8 text-slate-900 dark:text-white">
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
          tracking-tight
          text-slate-900
          dark:text-white
          "
        >
          Apply Leave
        </h1>

        <p
          className="
          mt-2
          text-slate-500
          dark:text-slate-400
          "
        >
          Submit a leave request
        </p>

      </div>

      {/* =========================
          LEAVE BALANCE PREVIEW
      ========================= */}

      {balance && (

  <div
    className="
    grid
    grid-cols-1
    md:grid-cols-3
    gap-6
    mb-8
    "
  >

    {/* CASUAL */}

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

      <p
        className="
        text-slate-500
        dark:text-slate-400
        "
      >
        Casual Leave
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
        {balance.casualLeave}
      </h2>

    </div>

    {/* SICK */}

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

      <p
        className="
        text-slate-500
        dark:text-slate-400
        "
      >
        Sick Leave
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
        {balance.sickLeave}
      </h2>

    </div>

    {/* EARNED */}

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

      <p
        className="
        text-slate-500
        dark:text-slate-400
        "
      >
        Earned Leave
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
        {balance.earnedLeave}
      </h2>

    </div>

  </div>

)}
      {/* =========================
          APPLICATION FORM
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

        {/* SECTION HEADER */}

        <div className="mb-8">

          <h2
            className="
            text-2xl
            font-bold
            text-slate-900
            dark:text-white
            "
          >
            Leave Details
          </h2>

          <p
            className="
      text-slate-500 dark:text-slate-400
      mt-1
      "
          >
            Complete the information below
          </p>

        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-8"
        >

          {/* LEAVE TYPE */}

          <div>

            <h3
              className="
              text-lg
              font-semibold
              text-slate-900
              dark:text-white
              mb-4
              "
            >
              Leave Type
            </h3>

            <div className="space-y-3">

              {[
                {
                  label: "Casual Leave",
                  balance: balance?.casualLeave,
                },
                {
                  label: "Sick Leave",
                  balance: balance?.sickLeave,
                },
                {
                  label: "Earned Leave",
                  balance: balance?.earnedLeave,
                },
              ].map((type) => (

                <button
                  key={type.label}
                  type="button"
                  onClick={() =>
                    setLeaveType(type.label)
                  }
                  className={`
          w-full
          p-5
          rounded-2xl
          border
          transition-all
          text-left

          ${leaveType === type.label
                      ? `
                border-slate-900
                dark:border-white
                shadow-sm
                `
                      : `
                border-slate-200
                dark:border-slate-700

                hover:border-slate-300
                dark:hover:border-slate-600
                `
                    }
        `}
                >

                  <div
                    className="
          flex
          items-center
          justify-between
          "
                  >
                    <div>

                      <h4
                        className="
                        font-semibold
                        text-slate-900
                        dark:text-white
                        "
                      >
                        {type.label}
                      </h4>

                      <p
                        className="
                        text-sm
                        text-slate-500 dark:text-slate-400
                        mt-1
                        "
                      >
                        {type.balance} Available
                      </p>

                    </div>

                    <div
                      className={`
              h-5
              w-5
              rounded-full
              border-2
              flex
              items-center
              justify-center

              ${leaveType === type.label
                          ? "border-blue-600"
                          : "border-slate-300"
                        }
            `}
                    >

                      {leaveType === type.label && (

                        <div
                          className="
                h-2.5
                w-2.5
                rounded-full
                bg-blue-600
                "
                        />

                      )}

                    </div>

                  </div>

                </button>

              ))}

            </div>

          </div>


          {/* Duration */}

          <div>

            <h3
              className="
              text-lg
              font-semibold
              text-slate-900
              dark:text-white
              mb-4
              "
            >
              Duration
            </h3>

            <div className="space-y-3">

              {[
                "Half Day",
                "Full Day",
                "Multiple Days",
              ].map((option) => (

                <button
                  key={option}
                  type="button"
                  onClick={() =>
                    setDurationType(option)
                  }
                  className={`
          w-full
          p-5
          rounded-2xl
          border
          transition-all
          text-left

          ${durationType === option
                      ? `
                border-slate-900
                shadow-sm
                `
                      : `
                border-slate-200
                dark:border-slate-700

                hover:border-slate-300
                dark:hover:border-slate-600
                `
                    }
        `}
                >

                  <div
                    className="
          flex
          items-center
          justify-between
          "
                  >

                    <span
                      className="
                      font-medium
                      text-slate-900
                      dark:text-white
                      "
                    >
                      {option}
                    </span>

                    <div
                      className={`
              h-5
              w-5
              rounded-full
              border-2
              flex
              items-center
              justify-center

              ${durationType === option
                          ? "border-blue-600"
                          : "border-slate-300"
                        }
            `}
                    >

                      {durationType === option && (

                        <div
                          className="
                h-2.5
                w-2.5
                rounded-full
                bg-blue-600
                "
                        />

                      )}

                    </div>

                  </div>

                </button>

              ))}

            </div>

          </div>

          {durationType === "Full Day" && (

            <div>

              <label
                className="
                block
                mb-2
                text-slate-700
                dark:text-slate-300
                "
              >
                Leave Date
              </label>

              <input
                type="date"
                value={startDate}
                onChange={(e) =>
                  setStartDate(
                    e.target.value
                  )
                }
                className="
                border
                border-slate-300
                dark:border-slate-700

                bg-white
                dark:bg-slate-800

                text-slate-900
                dark:text-white

                rounded-2xl
                p-3
                "
              />

            </div>

          )}

          {durationType === "Multiple Days" && (

            <div
              className="
    grid
    grid-cols-1
    md:grid-cols-2
    gap-6
    "
            >

              <input
                type="date"
                value={startDate}
                onChange={(e) =>
                  setStartDate(
                    e.target.value
                  )
                }
                className="
                border
                border-slate-300
                dark:border-slate-700

                bg-white
                dark:bg-slate-800

                text-slate-900
                dark:text-white

                rounded-2xl
                p-3
                "
              />

              <input
                type="date"
                value={endDate}
                onChange={(e) =>
                  setEndDate(
                    e.target.value
                  )
                }
                className="
                border
                border-slate-300
                dark:border-slate-700

                bg-white
                dark:bg-slate-800

                text-slate-900
                dark:text-white

                rounded-2xl
                p-3
                "
              />

            </div>

          )}

          {durationType === "Half Day" && (

            <div className="space-y-4">

              <input
                type="date"
                value={startDate}
                onChange={(e) =>
                  setStartDate(
                    e.target.value
                  )
                }
                className="
                border
                border-slate-300
                dark:border-slate-700

                bg-white
                dark:bg-slate-800

                text-slate-900
                dark:text-white

                rounded-2xl
                p-3
                "   />

              <div
                className="
      grid
      grid-cols-2
      gap-4
      "
              >

                <button
                  type="button"
                  onClick={() =>
                    setSession("Morning")
                  }
                  className={`
          p-4
          rounded-2xl
          border

          ${session === "Morning"
                      ? "border-green-500 bg-green-50 dark:bg-green-950/30"
                      : "border-slate-200 dark:border-slate-700"
                    }
        `}
                >
                  Morning
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setSession("Afternoon")
                  }
                  className={`
          p-4
          rounded-2xl
          border

          ${session === "Afternoon"
                      ? "border-green-500 bg-green-50 dark:bg-green-950/30"
                      : "border-slate-200 dark:border-slate-700"
                    }
        `}
                >
                  Afternoon
                </button>

              </div>

            </div>

          )}

          {/* REASON */}

          <div>

            <label
              className="
        block
        mb-2
        text-sm
        font-medium
        text-slate-700
        "
            >
              Reason
            </label>

            <textarea
              rows="5"
              value={reason}
              onChange={(e) =>
                setReason(
                  e.target.value
                )
              }
              required
              placeholder="Enter leave reason"
              className="
                w-full
                px-4
                py-3

                bg-white
                dark:bg-slate-800

                text-slate-900
                dark:text-white

                border
                border-slate-300
                dark:border-slate-700

                rounded-2xl

                focus:outline-none
                focus:ring-2
                focus:ring-blue-500

                resize-none
                "
            />

          </div>

          {/* BUTTON */}

          <div>

            <button
              type="submit"
              className="
        px-8
        py-3
        rounded-2xl
        bg-green-500
        text-white
        font-semibold
        hover:bg-green-600
        transition
        "
            >
              Apply Leave
            </button>

          </div>

        </form>

      </div>

    </div>

  );

};

export default ApplyLeave;