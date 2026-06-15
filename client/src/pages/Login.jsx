import { useState } from "react";
import API from "../services/api";
import toast from "react-hot-toast";
import logo from "../assets/logo.png";

const Login = () => {
  const [employeeCode, setEmployeeCode] =
    useState("");

  const [password, setPassword] =
    useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await API.post(
        "/employees/login",
        {
          employeeCode,
          password,
        }
      );

      localStorage.setItem(
        "token",
        response.data.token
      );

      localStorage.setItem(
        "employee",
        JSON.stringify(response.data.employee)
      );
      
      toast.success("Login Successful");
      console.log("Redirecting to dashboard...");

      if (
        response.data.employee.role ===
        "admin"
      ) {

        window.location.href =
          "/admin";

      } else {

        window.location.href =
          "/home";

      }
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message
      );
    }
  };

  return (

  <div
    className="
    min-h-screen
    bg-slate-50
    flex
    items-center
    justify-center
    p-6
    "
  >

    <div
      className="
      w-full
      max-w-md
      bg-white
      border
      border-slate-200
      rounded-3xl
      shadow-sm
      p-8
      "
    >

      {/* LOGO */}

      <div
        className="
        flex
        flex-col
        items-center
        mb-8
        "
      >

        <img
          src={logo}
          alt="UCO Logo"
          className="
          h-20
          w-auto
          mb-4
          "
        />

        <h1
          className="
          text-3xl
          font-bold
          text-slate-900
          "
        >
          UCO ATS
        </h1>

        <p
          className="
          text-slate-500
          mt-2
          text-center
          "
        >
          United Cloud Overseas
          <br />
        </p>

      </div>

      {/* LOGIN FORM */}

      <form
        onSubmit={handleLogin}
        className="space-y-5"
      >

        <div>

          <label
            className="
            block
            text-sm
            font-medium
            text-slate-700
            mb-2
            "
          >
            Employee Code
          </label>

          <input
            type="text"
            value={employeeCode}
            onChange={(e) =>
              setEmployeeCode(
                e.target.value
              )
            }
            placeholder="Enter Employee Code"
            className="
            w-full
            px-4
            py-3
            border
            border-slate-300
            rounded-2xl
            outline-none
            focus:ring-2
            focus:ring-blue-500
            "
          />

        </div>

        <div>

          <label
            className="
            block
            text-sm
            font-medium
            text-slate-700
            mb-2
            "
          >
            Password
          </label>

          <input
            type="password"
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
            placeholder="Enter Password"
            className="
            w-full
            px-4
            py-3
            border
            border-slate-300
            rounded-2xl
            outline-none
            focus:ring-2
            focus:ring-blue-500
            "
          />

        </div>

        <button
          type="submit"
          className="
          w-full
          py-3
          rounded-2xl
          bg-slate-900
          text-white
          font-medium
          hover:bg-slate-800
          transition
          "
        >

          Sign In

        </button>

      </form>

    </div>

  </div>

);

};

export default Login;