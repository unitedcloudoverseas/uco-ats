const InsightCard = ({
  title,
  value,
  color,
}) => {

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
      "
    >

      <p
        className="
        text-slate-500
        "
      >
        {title}
      </p>

      <h3
        className={`
        text-xl
        font-bold
        mt-3
        ${color}
        `}
      >
        {value}
      </h3>

    </div>

  );

};

export default InsightCard;