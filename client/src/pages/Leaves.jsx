import { useEffect, useState } from "react";

import API from "../services/api";
import toast from "react-hot-toast";

const Leaves = () => {
  const [leaveBalance,
    setLeaveBalance] =
    useState(null);

  const [leaveHistory,
    setLeaveHistory] =
    useState([]);

  const [formData,
    setFormData] =
    useState({
      leaveType: "",
      startDate: "",
      endDate: "",
      reason: "",
    });

  useEffect(() => {
    fetchLeaveData();
  }, []);

  const fetchLeaveData = async () => {
    try {
      const token =
        localStorage.getItem("token");

      const balanceResponse =
        await API.get(
          "/leaves/balance",
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

      const historyResponse =
        await API.get(
          "/leaves/my-leaves",
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

      setLeaveBalance(
        balanceResponse.data
      );

      setLeaveHistory(
        historyResponse.data
      );

    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token =
        localStorage.getItem("token");

      await API.post(
        "/leaves/apply",
        formData,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      toast.success("Leave Applied");

      fetchLeaveData();

    } catch (error) {
      console.log(error);

      toast.success("Leave Application Failed");
    }
  };

  return (
    <div className="p-10">

      <h1 className="text-3xl font-bold mb-6">
        Leave Management
      </h1>

      <div className="grid grid-cols-3 gap-6 mb-10">

        <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-xl font-bold">
            Casual Leave
            </h2>

            <p className="text-3xl mt-4">
            {leaveBalance?.casualLeave}
            </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-xl font-bold">
            Sick Leave
            </h2>

            <p className="text-3xl mt-4">
            {leaveBalance?.sickLeave}
            </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-xl font-bold">
            Earned Leave
            </h2>

            <p className="text-3xl mt-4">
            {leaveBalance?.earnedLeave}
            </p>
        </div>

        </div>

        <div className="bg-white p-6 rounded-xl shadow mb-10">

            <h2 className="text-2xl font-bold mb-6">
                Apply Leave
            </h2>

            <form
                onSubmit={handleSubmit}
                className="space-y-4"
            >

                <select
                name="leaveType"
                onChange={handleChange}
                className="w-full border p-3 rounded"
                >
                <option value="">
                    Select Leave Type
                </option>

                <option value="Casual Leave">
                    Casual Leave
                </option>

                <option value="Sick Leave">
                    Sick Leave
                </option>

                <option value="Earned Leave">
                    Earned Leave
                </option>

                <option value="LOP">
                    LOP
                </option>
                </select>

                <input
                type="date"
                name="startDate"
                onChange={handleChange}
                className="w-full border p-3 rounded"
                />

                <input
                type="date"
                name="endDate"
                onChange={handleChange}
                className="w-full border p-3 rounded"
                />

                <textarea
                name="reason"
                placeholder="Reason"
                onChange={handleChange}
                className="w-full border p-3 rounded"
                />

                <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-3 rounded"
                >
                Apply Leave
                </button>

            </form>

            </div>

            <div className="bg-white p-6 rounded-xl shadow">

            <h2 className="text-2xl font-bold mb-6">
                Leave History
            </h2>

            <table className="w-full border">

                <thead>
                <tr className="bg-gray-200">

                    <th className="border p-3">
                    Type
                    </th>

                    <th className="border p-3">
                    Start
                    </th>

                    <th className="border p-3">
                    End
                    </th>

                    <th className="border p-3">
                    Status
                    </th>

                </tr>
                </thead>

                <tbody>

                {leaveHistory.map((leave) => (
                    <tr key={leave._id}>

                    <td className="border p-3">
                        {leave.leaveType}
                    </td>

                    <td className="border p-3">
                        {new Date(
                        leave.startDate
                        ).toLocaleDateString()}
                    </td>

                    <td className="border p-3">
                        {new Date(
                        leave.endDate
                        ).toLocaleDateString()}
                    </td>

                    <td className="border p-3">
                        {leave.status}
                    </td>

                    </tr>
                ))}

                </tbody>

            </table>

            </div>

    </div>
  );
};

export default Leaves;