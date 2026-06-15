const StatusBadge = ({
  status,
}) => {

  const styles = {

    Present:
      "bg-green-500",

    Approved:
      "bg-green-500",

    Active:
      "bg-green-500",

    Pending:
      "bg-yellow-500",

    "Half Day":
      "bg-yellow-500",

    Rejected:
      "bg-red-500",

    Absent:
      "bg-red-500",

    Inactive:
      "bg-red-500",

  };

  return (

    <span
      className={`
      px-3
      py-1
      rounded
      text-white
      text-sm
      ${styles[status]}
      `}
    >

      {status}

    </span>

  );

};

export default StatusBadge;