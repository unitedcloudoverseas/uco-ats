import { useEffect, useState } from "react";
import API from "../services/api";
import { Link } from "react-router-dom";

const Employees = () => {
  const [employees, setEmployees] =
    useState([]);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees =
    async () => {
      try {

        const token =
          localStorage.getItem(
            "token"
          );

        const response =
          await API.get(
            "/employees/all",
            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          );

        setEmployees(
          response.data
        );

      } catch (error) {

        console.log(error);

      }
    };

  const toggleStatus = async (id) => {
    try {

      const token =
        localStorage.getItem("token");

      await API.put(
        `/employees/status/${id}`,
        {},
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      fetchEmployees();

    } catch (error) {

      console.log(error);

    }
  };

  return (

    <div>

      {/* PAGE HEADER */}

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
        <div className="flex justify-between items-center">
          
        <div>
          <h1 className="text-4xl font-bold">
            Employee Management
          </h1>

          <p className="mt-2 text-slate-500">
            Manage employee records and account status
          </p>
        </div>

        <Link
          to="/register"
          className="
          px-5
          py-3
          rounded-2xl
          bg-slate-900
          text-white
          font-medium
          hover:opacity-90
          transition
          "
        >
          + Add Employee
        </Link>
      </div>

      </div>

      {/* SUMMARY CARDS */}

      <div
        className="
      grid
      grid-cols-1
      md:grid-cols-3
      gap-6
      mb-8
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

          <p className="text-slate-500 dark:text-slate-400">
            Total Employees
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
            {employees.length}
          </h2>

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

          <p className="text-slate-500 dark:text-slate-400">
            Active Employees
          </p>

          <h2
            className="
          text-5xl
          font-bold
          mt-3
          text-green-600
          "
          >
            {
              employees.filter(
                emp =>
                  emp.status ===
                  "Active"
              ).length
            }
          </h2>

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

          <p className="text-slate-500 dark:text-slate-400">
            Inactive Employees
          </p>

          <h2
            className="
          text-5xl
          font-bold
          mt-3
          text-red-600
          "
          >
            {
              employees.filter(
                emp =>
                  emp.status ===
                  "Inactive"
              ).length
            }
          </h2>

        </div>

      </div>

      {/* EMPLOYEE TABLE */}

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

        <div className="p-6">

          <h2
            className="
          text-xl
          font-semibold
          text-slate-900
          dark:text-white
          "
          >
            Employee Directory
          </h2>

        </div>

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead>

              <tr
                className="
              border-t
              border-slate-200
              dark:border-slate-800
              "
              >

                <th className="p-5 text-left">
                  Employee Code
                </th>

                <th className="p-5 text-left">
                  Name
                </th>

                <th className="p-5 text-left">
                  Department
                </th>

                <th className="p-5 text-left">
                  Status
                </th>

                <th className="p-5 text-left">
                  Action
                </th>

              </tr>

            </thead>

            <tbody>

              {employees.map(
                (employee) => (

                  <tr
                    key={employee._id}
                    className="
                  border-t
                  border-slate-100
                  dark:border-slate-800
                  hover:bg-slate-50
                  dark:hover:bg-slate-800
                  "
                  >

                    <td className="p-5">

                      <Link
                        to={`/employees/${employee._id}`}
                        className="
                      font-semibold
                      text-blue-600
                      hover:underline
                      "
                      >
                        {employee.employeeCode}
                      </Link>

                    </td>

                    <td className="p-5 text-slate-900 dark:text-white">
                      {employee.fullName}
                    </td>

                    <td className="p-5 text-slate-600 dark:text-slate-300">
                      {employee.department}
                    </td>

                    <td className="p-5">

                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${employee.status ===
                            "Active"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                          }`}
                      >

                        {employee.status}

                      </span>

                    </td>

                    <td className="p-5">

                     <div
                      className="
                      flex
                      items-center
                      gap-3
                      "
                    >

                      <button
                        onClick={() =>
                          toggleStatus(
                            employee._id
                          )
                        }
                        className={`

                        w-32
                        h-10

                        rounded-xl

                        text-white
                        text-sm
                        font-medium

                        flex
                        items-center
                        justify-center

                        ${
                          employee.status ===
                          "Active"
                            ? "bg-red-500 hover:bg-red-600"
                            : "bg-green-500 hover:bg-green-600"
                        }

                        `}
                      >

                        {
                          employee.status ===
                          "Active"
                          ? "Deactivate"
                          : "Activate"
                        }

                      </button>

                      <Link
                        to={`/employees/${employee._id}`}
                        className="
                        w-32
                        h-10

                        rounded-xl

                        bg-slate-900

                        text-white
                        text-sm
                        font-medium

                        flex
                        items-center
                        justify-center

                        hover:opacity-90
                        "
                      >
                        View Profile
                      </Link>

                    </div>

                    </td>

                  </tr>

                )
              )}


            </tbody>

          </table>


        </div>

      </div>

    </div>

  );
};

export default Employees;