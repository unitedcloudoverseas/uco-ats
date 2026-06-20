import {
  useEffect,
  useState,
} from "react";

import API from "../services/api";

const LeaveBalance = () => {

  /* =========================
     STATE MANAGEMENT
  ========================= */

  const [
    balance,
    setBalance,
  ] = useState(null);
const [
  analytics,
  setAnalytics,
] = useState({
  monthlyUsage: {},
  pendingCount: 0,
});
  /* =========================
     INITIAL PAGE LOAD
  ========================= */

  useEffect(() => {

    fetchLeaveBalance();
    fetchAnalytics();

  }, []);

  /* =========================
     FETCH LEAVE BALANCE
  ========================= */

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

      }

      catch (error) {

        console.log(
          "Leave Balance Error:",
          error
        );

      }

    };

  /* =========================
     FETCH LEAVE ANALYTICS
  ========================= */

  const fetchAnalytics =
    async () => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        const response =
          await API.get(
            "/leaves/analytics",
            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          );

        setAnalytics({
          monthlyUsage:
            response.data.monthlyUsage || {},
          pendingCount:
            response.data.pendingCount || 0,
        });
      }

      catch (error) {

        console.log(
          "Analytics Error:",
          error
        );

      }

    };

    

return (

  <div className="p-4 md:p-8 bg-slate-950 min-h-screen text-white">

    {/* PAGE HEADER */}

    <div
      className="
      bg-slate-900/80
      backdrop-blur-xl
      border
      border-slate-800
      rounded-3xl
      p-6 md:p-8
      mb-8
      "
    >
      <h1
        className="
        text-3xl md:text-4xl
        font-bold
        tracking-tight
        text-white
        "
      >
        Leave Balance
      </h1>

      <p className="mt-2 text-slate-400">
        View your available leave balances
      </p>
    </div>

    {balance && (
      <>

        {/* BALANCE CARDS */}

        <div
          className="
          grid
          grid-cols-1
          md:grid-cols-3
          gap-6
          mb-8
          "
        >

          {/* Casual Leave */}

          <div
            className="
            bg-slate-900/80
            backdrop-blur-xl
            border
            border-slate-800
            hover:border-orange-500/40
            transition-all
            rounded-3xl
            p-6
            "
          >
            <p className="text-slate-400">
              Casual Leave
            </p>

            <h2 className="text-4xl md:text-5xl font-bold mt-3">
              {balance.casualLeave}
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Remaining Days
            </p>
          </div>

          {/* Sick Leave */}

          <div
            className="
            bg-slate-900/80
            backdrop-blur-xl
            border
            border-slate-800
            hover:border-orange-500/40
            transition-all
            rounded-3xl
            p-6
            "
          >
            <p className="text-slate-400">
              Sick Leave
            </p>

            <h2 className="text-4xl md:text-5xl font-bold mt-3">
              {balance.sickLeave}
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Remaining Days
            </p>
          </div>

          {/* Earned Leave */}

          <div
            className="
            bg-slate-900/80
            backdrop-blur-xl
            border
            border-slate-800
            hover:border-orange-500/40
            transition-all
            rounded-3xl
            p-6
            "
          >
            <p className="text-slate-400">
              Earned Leave
            </p>

            <h2 className="text-4xl md:text-5xl font-bold mt-3">
              {balance.earnedLeave}
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Remaining Days
            </p>
          </div>

        </div>

        {/* ANALYTICS */}

        <div
          className="
          bg-slate-900/80
          backdrop-blur-xl
          border
          border-slate-800
          rounded-3xl
          p-6 md:p-8
          mb-8
          "
        >
          <h2 className="text-xl font-semibold mb-8 text-white">
            Leave Analytics
          </h2>

          <div
            className="
            grid
            grid-cols-1
            lg:grid-cols-3
            gap-6
            "
          >

            {/* Total Available */}

            <div
              className="
              border
              border-slate-800
              bg-slate-950
              rounded-2xl
              p-6
              hover:border-orange-500/30
              transition-all
              "
            >
              <p className="text-slate-400">
                Total Available
              </p>

              <h3 className="text-3xl md:text-4xl font-bold mt-3">
                {
                  balance.casualLeave +
                  balance.sickLeave +
                  balance.earnedLeave
                }
              </h3>

              <p className="text-sm text-slate-500 mt-2">
                Remaining Days
              </p>
            </div>

            {/* Highest Balance */}

            <div
              className="
              border
              border-slate-800
              bg-slate-950
              rounded-2xl
              p-6
              hover:border-orange-500/30
              transition-all
              "
            >
              <p className="text-slate-400">
                Highest Balance
              </p>

              <h3 className="text-2xl font-bold mt-3">
                {[
                  {
                    name: "Casual Leave",
                    value: balance.casualLeave,
                  },
                  {
                    name: "Sick Leave",
                    value: balance.sickLeave,
                  },
                  {
                    name: "Earned Leave",
                    value: balance.earnedLeave,
                  },
                ].reduce(
                  (max, current) =>
                    current.value > max.value
                      ? current
                      : max
                ).name}
              </h3>

              <p className="text-sm text-slate-500 mt-2">
                Most Available Leave
              </p>
            </div>

            {/* Pending Requests */}

            <div
              className="
              border
              border-slate-800
              bg-slate-950
              rounded-2xl
              p-6
              hover:border-orange-500/30
              transition-all
              "
            >
              <p className="text-slate-400">
                Pending Requests
              </p>

              <h3 className="text-3xl md:text-4xl font-bold mt-3">
                {analytics.pendingCount}
              </h3>

              <p className="text-sm text-slate-500 mt-2">
                Awaiting Approval
              </p>
            </div>

          </div>
        </div>

        {/* LEAVE USAGE TREND */}

        <div
          className="
          bg-slate-900/80
          backdrop-blur-xl
          border
          border-slate-800
          rounded-3xl
          p-6 md:p-8
          "
        >
          <h2 className="text-xl font-semibold mb-8 text-white">
            Leave Usage Trend
          </h2>

          {Object.keys(analytics.monthlyUsage).length > 0 ? (

            <div className="space-y-6">

              {Object.entries(
                analytics.monthlyUsage
              ).map(([month, days]) => (

                <div key={month}>

                  <div
                    className="
                    flex
                    justify-between
                    mb-2
                    "
                  >
                    <span className="font-medium">
                      {month}
                    </span>

                    <span className="text-slate-400">
                      {days} Days
                    </span>
                  </div>

                  <div
                    className="
                    h-3
                    bg-slate-800
                    rounded-full
                    overflow-hidden
                    "
                  >
                    <div
                      className="
                      h-full
                      bg-orange-500
                      rounded-full
                      "
                      style={{
                        width: `${Math.min(
                          days * 10,
                          100
                        )}%`,
                      }}
                    />
                  </div>

                </div>

              ))}

            </div>

          ) : (

            <div
              className="
              text-center
              py-12
              text-slate-400
              "
            >
              No leave analytics available yet.
            </div>

          )}

        </div>

      </>
    )}

  </div>

);

};

export default LeaveBalance;