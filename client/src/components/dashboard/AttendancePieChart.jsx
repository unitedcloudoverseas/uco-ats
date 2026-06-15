import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from "recharts";

const COLORS = [
  "#22c55e",
  "#f59e0b",
  "#ef4444",
];

const AttendancePieChart = ({
  data,
}) => {

  const safeData =
    data || [];

  return (

    <div
      className="
      bg-white
      dark:bg-slate-900
      border
      border-slate-200
      dark:border-slate-800
      rounded-2xl
      p-6
      flex
      flex-col
      items-center
      "
    >

      <h2
        className="
        text-xl
        font-bold
        mb-6
        dark:text-white
        "
      >
        Attendance Overview
      </h2>

      <PieChart
        width={350}
        height={280}
      >

        <Pie
          data={safeData}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={90}
          label
        >

          {safeData.map(
            (
              entry,
              index
            ) => (

              <Cell
                key={index}
                fill={
                  COLORS[index]
                }
              />

            )
          )}

        </Pie>

        <Tooltip />

      </PieChart>

    </div>

  );

};

export default AttendancePieChart;