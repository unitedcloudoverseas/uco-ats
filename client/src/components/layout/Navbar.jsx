import {
  Sun,
  Moon,
} from "lucide-react";

import {
  useEffect,
  useState,
} from "react";

import API from "../../services/api";

const Navbar = () => {

    const [
      employee,
      setEmployee
    ] = useState(null);

    useEffect(() => {

      const fetchEmployee =
        async () => {

          try {

            const token =
              localStorage.getItem(
                "token"
              );

            const response =
              await API.get(
                "/employees/profile",
                {
                  headers: {
                    Authorization:
                      `Bearer ${token}`,
                  },
                }
              );

            setEmployee(
              response.data
            );

          }

          catch (error) {

            console.log(error);

          }

        };

      fetchEmployee();

    }, []);

  const [darkMode,
    setDarkMode] =
    useState(false);

  useEffect(() => {

    const isDark =
      document.documentElement
      .classList
      .contains("dark");

    setDarkMode(
      isDark
    );

  }, []);

  const toggleTheme =
    () => {

      document.documentElement
        .classList
        .toggle("dark");

      setDarkMode(
        !darkMode
      );

    };

    

  return (

    <header
    className="
    sticky
    top-0
    z-40
    h-20
    bg-white
    dark:bg-slate-900
    border-b
    border-slate-200
    dark:border-slate-800
    flex
    items-center
    justify-between
    px-8
    "
    >

      
      {/* LEFT */}

      <div>

        <h1
          className="
          text-lg
          font-semibold
          text-slate-900
          dark:text-white
          "
        >
          United Cloud Overseas
        </h1>

        <p
          className="
          text-sm
          text-slate-500
          "
        >
          Attendance Tracking System
        </p>

      </div>

      {/* RIGHT */}

      <div
        className="
        flex
        items-center
        gap-5
        "
      >

        {/* THEME TOGGLE */}

        <button
          onClick={
            toggleTheme
          }
          className="
          h-11
          w-11
          rounded-xl
          border
          border-slate-200
          dark:border-slate-700
          bg-slate-50
          dark:bg-slate-800
          flex
          items-center
          justify-center
          hover:bg-slate-100
          dark:hover:bg-slate-700
          transition
          "
        >

          {
            darkMode
              ? (
                <Sun
                  size={18}
                  className="
                  text-amber-500
                  "
                />
              )
              : (
                <Moon
                  size={18}
                  className="
                  text-slate-600
                  "
                />
              )
          }

        </button>

        {/* USER */}

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
                : `https://ui-avatars.com/api/?name=${employee?.fullName}`
            }
            alt="Profile"
            className="
            h-11
            w-11
            rounded-full
            object-cover
            border
            border-slate-200
            dark:border-slate-700
            "
          />

          <div>

            <p
              className="
              text-sm
              font-semibold
              text-slate-900
              dark:text-white
              "
            >
              {
                employee?.fullName
              }
            </p>

            <p
              className="
              text-xs
              text-slate-500
              capitalize
              "
            >
              {
                employee?.role
              }
            </p>

          </div>

        </div>

      </div>

    </header>

  );

};

export default Navbar;