import React from "react";

const KpiCard = ({
  title,
  value,
  icon,
}) => {

  return (

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
      hover:-translate-y-1
      transition-all
      duration-300
      "
    >

      <div
        className="
        flex
        items-start
        justify-between
        "
      >

        <div>

          <p
            className="
            text-sm
            text-slate-500
            "
          >
            {title}
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
            {value}
          </h2>

        </div>

        <div
          className="
          h-12
          w-12
          rounded-2xl
          bg-slate-100
          dark:bg-slate-800
          flex
          items-center
          justify-center
          "
        >
          {icon}
        </div>

      </div>

    </div>

  );

};

export default KpiCard;