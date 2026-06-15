import { useState } from "react";
import API from "../services/api";
import toast from "react-hot-toast";

const Register = () => {
  const [formData, setFormData] =
    useState({
      employeeCode: "",
      fullName: "",
      email: "",
      password: "",
      department: "",
    });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await API.post(
        "/employees/register",
        formData
      );

      console.log(response.data);

      toast.success("Employee Registered");
    } catch (error) {

      console.log(error);

      toast.error(
        "Registration Failed"
      );

    }
  };

  return (

  <div
    className="
    min-h-[85vh]
    flex
    items-center
    justify-center
    px-4
    "
  >

    <div
      className="
      w-full
      max-w-2xl
      bg-white
      dark:bg-slate-900
      border
      border-slate-200
      dark:border-slate-800
      rounded-3xl
      shadow-sm
      overflow-hidden
      "
    >

      {/* HEADER */}

      <div
        className="
        p-8
        border-b
        border-slate-200
        dark:border-slate-800
        "
      >

        <h1
          className="
          text-3xl
          font-bold
          text-slate-900
          dark:text-white
          "
        >
          Register Employee
        </h1>

        <p
          className="
          mt-2
          text-slate-500
          dark:text-slate-400
          "
        >
          Create a new employee account
        </p>

      </div>

      {/* FORM */}

      <form
        onSubmit={handleSubmit}
        className="
        p-8
        grid
        grid-cols-1
        md:grid-cols-2
        gap-6
        "
      >

        {/* EMPLOYEE CODE */}

        <div>

          <label
            className="
            block
            mb-2
            text-sm
            font-medium
            "
          >
            Employee Code
          </label>

          <input
            type="text"
            name="employeeCode"
            value={formData.employeeCode}
            onChange={handleChange}
            placeholder="UCO1001"
            className="
            w-full
            p-3
            rounded-2xl
            border
            border-slate-300
            dark:border-slate-700
            bg-transparent
            "
          />

        </div>

        {/* FULL NAME */}

        <div>

          <label
            className="
            block
            mb-2
            text-sm
            font-medium
            "
          >
            Full Name
          </label>

          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Employee Name"
            className="
            w-full
            p-3
            rounded-2xl
            border
            border-slate-300
            dark:border-slate-700
            bg-transparent
            "
          />

        </div>

        {/* EMAIL */}

        <div>

          <label
            className="
            block
            mb-2
            text-sm
            font-medium
            "
          >
            Email Address
          </label>

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="@mail.com"
            className="
            w-full
            p-3
            rounded-2xl
            border
            border-slate-300
            dark:border-slate-700
            bg-transparent
            "
          />

        </div>

        {/* PASSWORD */}

        <div>

          <label
            className="
            block
            mb-2
            text-sm
            font-medium
            "
          >
            Password
          </label>

          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter password"
            className="
            w-full
            p-3
            rounded-2xl
            border
            border-slate-300
            dark:border-slate-700
            bg-transparent
            "
          />

        </div>

        {/* DEPARTMENT */}

        <div className="md:col-span-2">

          <label
            className="
            block
            mb-2
            text-sm
            font-medium
            "
          >
            Department
          </label>

          <input
            type="text"
            name="department"
            value={formData.department}
            onChange={handleChange}
            placeholder="USA / UK / Management"
            className="
            w-full
            p-3
            rounded-2xl
            border
            border-slate-300
            dark:border-slate-700
            bg-transparent
            "
          />

        </div>

        {/* BUTTON */}

        <div className="md:col-span-2">

          <button
            type="submit"
            className="
            w-full
            py-3
            rounded-2xl
            bg-slate-900
            dark:bg-white
            text-white
            dark:text-slate-900
            font-semibold
            cursor-pointer
            hover:opacity-90
            transition
            "
          >
            Register Employee
          </button>

        </div>

      </form>

    </div>

  </div>

);
};

export default Register;