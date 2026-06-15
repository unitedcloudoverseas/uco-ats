const StatCard = ({
  title,
  value,
  color = "blue",
}) => {

  const colors = {

    blue:
      "bg-blue-50",

    green:
      "bg-green-50",

    yellow:
      "bg-yellow-50",

    red:
      "bg-red-50",

    purple:
      "bg-purple-50",

  };

  return (

    <div
      className={`
        rounded-2xl
        shadow
        p-6
        ${colors[color]}
      `}
    >

      <p className="text-gray-500">
        {title}
      </p>

      <h2 className="text-4xl font-bold mt-3">
        {value}
      </h2>

    </div>

  );

};

export default StatCard;