import {
  LayoutDashboard,
  Users,
  ClipboardCheck,
  CalendarDays,
  ShieldCheck,
} from "lucide-react";

import {
  useNavigate,
} from "react-router-dom";

import {
  NavLink,
} from "react-router-dom";

import logo from "../assets/logo.png";



const AdminSidebar = () => {

  const employee =
    JSON.parse(
      localStorage.getItem(
        "employee"
      )
    );

    const navigate =
        useNavigate();

    const handleLogout = () => {

      console.log("LOGOUT CLICKED");

    localStorage.removeItem(
        "token"
    );

    localStorage.removeItem(
        "employee"
    );

    navigate("/");

};

  return (

  <aside
    className="
    fixed
    left-0
    top-0
    h-screen
    w-72
    bg-white
    border-r
    border-slate-200
    flex
    flex-col
    "
  >

    {/* HEADER */}

    <div
      className="
      h-20
      px-6
      flex
      items-center
      border-b
      border-slate-200
      "
    >

      <img
        src={logo}
        alt="UCO"
        className="
        h-12
        w-12
        object-contain
        "
      />

      <div className="ml-4">

        <h2
          className="
          text-2xl
          font-bold
          text-slate-900
          "
        >
          UCO
        </h2>

        <p
          className="
          text-sm
          text-slate-500
          "
        >
          Admin Panel
        </p>

      </div>

    </div>

    {/* MENU */}

    <div
      className="
      flex-1
      py-6
      px-4
      space-y-2
      "
    >

      <NavLink
        to="/admin"
        className={({ isActive }) =>
          `
          flex
          items-center
          gap-3
          px-4
          py-3
          rounded-xl
          transition
          ${
            isActive
              ? "bg-slate-100 text-slate-900 font-medium"
              : "text-slate-600 hover:bg-slate-50"
          }
          `
        }
      >

        <LayoutDashboard
          size={18}
        />

        Dashboard

      </NavLink>

      <NavLink
        to="/employees"
        className={({ isActive }) =>
          `
          flex
          items-center
          gap-3
          px-4
          py-3
          rounded-xl
          transition
          ${
            isActive
              ? "bg-slate-100 text-slate-900 font-medium"
              : "text-slate-600 hover:bg-slate-50"
          }
          `
        }
      >

        <Users size={18} />

        Employees

      </NavLink>

      <NavLink
        to="/admin/attendance"
        className={({ isActive }) =>
          `
          flex
          items-center
          gap-3
          px-4
          py-3
          rounded-xl
          transition
          ${
            isActive
              ? "bg-slate-100 text-slate-900 font-medium"
              : "text-slate-600 hover:bg-slate-50"
          }
          `
        }
      >

        <ClipboardCheck
          size={18}
        />

        Attendance

      </NavLink>

      <NavLink
        to="/admin/leaves"
        className={({ isActive }) =>
          `
          flex
          items-center
          gap-3
          px-4
          py-3
          rounded-xl
          transition
          ${
            isActive
              ? "bg-slate-100 text-slate-900 font-medium"
              : "text-slate-600 hover:bg-slate-50"
          }
          `
        }
      >

        <CalendarDays
          size={18}
        />

        Leave Requests

      </NavLink>

      <NavLink
        to="/admin/ip-whitelist"
        className={({ isActive }) =>
          `
          flex
          items-center
          gap-3
          px-4
          py-3
          rounded-xl
          transition
          ${
            isActive
              ? "bg-slate-100 text-slate-900 font-medium"
              : "text-slate-600 hover:bg-slate-50"
          }
          `
        }
      >

        <ShieldCheck size={18} />

        IP Whitelist

      </NavLink>

    </div>

    {/* ADMIN CARD */}

    <div
      className="
      px-4
      pb-4
      "
    >

      <div
        className="
        border
        border-slate-200
        rounded-2xl
        p-4
        "
      >

        <div
          className="
          flex
          items-center
          gap-3
          "
        >

          <img
            src={
              employee?.profilePhoto
                ? `http://localhost:5000/uploads/profile/${employee.profilePhoto}`
                : `https://ui-avatars.com/api/?name=${employee?.fullName}&background=e2e8f0&color=0f172a`
            }
            
            alt="Admin"
            className="
            h-12
            w-12
            rounded-full
            object-cover
            "
          />

          <div>

            <p
              className="
              font-semibold
              text-slate-900
              "
            >
              {employee?.fullName}
            </p>

            <p
              className="
              text-sm
              text-slate-500
              "
            >
              Administrator
            </p>

            <p
            className="
            text-xs
            text-slate-400
            "
          >
            {employee?.employeeCode}
          </p>

          </div>

        </div>

      </div>

      {/* LOGOUT */}

      <button
        onClick={handleLogout}
        className="
        mt-4
        w-full
        bg-red-600
        hover:bg-red-700
        text-white
        py-3
        rounded-2xl
        font-medium
        transition
        "
      >

        Logout

      </button>

    </div>

  </aside>

);

};

export default AdminSidebar;