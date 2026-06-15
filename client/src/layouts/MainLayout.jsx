import {
  Outlet,
} from "react-router-dom";

import Navbar
from "../components/layout/Navbar";

import Sidebar
from "../components/layout/Sidebar";

import AdminSidebar from "../pages/AdminSidebar";

const MainLayout = () => {

  const employee =
  JSON.parse(
    localStorage.getItem(
      "employee"
    )
  );

  return (

    <div
      className="
      flex
      min-h-screen
      bg-slate-50
      dark:bg-slate-950
      "
    >

      {/* SIDEBAR */}

      {
        employee?.role === "admin"
          ? <AdminSidebar />
          : <Sidebar />
      }

      {/* RIGHT SECTION */}

      <div
        className="
        flex-1
        ml-72
        flex
        flex-col
        min-h-screen
        "
      >

        <Navbar />

        <main
          className="
          flex-1
          p-8
          overflow-y-auto
          "
        >

          <Outlet />

        </main>

      </div>

    </div>

  );

};

export default MainLayout;