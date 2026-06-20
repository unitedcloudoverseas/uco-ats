import {
    Link,
    useNavigate,
} from "react-router-dom";

import {
    useState,
} from "react";

import {
    Home,
    CalendarCheck,
    FileText,
    User,
    LogOut,
    ChevronDown,
    ChevronRight,
    LayoutDashboard,
    History,
    ShieldCheck,
    CalendarPlus,
    Wallet,
    UserCircle,
    KeyRound,
    Pencil,
} from "lucide-react";

import {
    NavLink,
} from "react-router-dom";

import logo
    from "../../assets/logo.png";

import API from "../services/api";

const Sidebar = () => {

    const navigate =
        useNavigate();

    const employee =
        JSON.parse(
            localStorage.getItem(
                "employee"
            )
        );

    const [
        attendanceOpen,
        setAttendanceOpen,
    ] = useState(false);

    const [
        leavesOpen,
        setLeavesOpen,
    ] = useState(false);

    const [
        profileOpen,
        setProfileOpen,
    ] = useState(false);

    const logout = async () => {

    try {

        console.log(
  "========== LOGOUT API HIT =========="
);

        const token =
            localStorage.getItem("token");

        await API.post(
            "/employees/logout",
            {},
            {
                headers: {
                    Authorization:
                        `Bearer ${token}`,
                },
            }
        );

        console.log(
            "LOGOUT API SUCCESS"
        );

        localStorage.clear();

        navigate("/");

    }

    catch (error) {

        console.log(
            "LOGOUT ERROR"
        );

        console.log(error);

        localStorage.clear();

        navigate("/");

    }

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
            dark:bg-slate-900
            border-r
            border-slate-200
            dark:border-slate-800
            flex
            flex-col
            z-50
            "
        >

            {/* LOGO */}

            <div
            className="
            h-20
            px-6
            border-b
            border-slate-200
            dark:border-slate-800
            flex
            items-center
            "
            >

                <div
                    className="
                    flex
                    items-center
                    gap-4
                    "
                >

                    <div

                    >

                        <img
                            src={logo}
                            alt="UCO ATS"
                            className="
                            h-15
                            w-15
                            object-contain
                            "
                        />

                    </div>

                    <div>

                        <h2
                            className="
                            text-xl
                            font-bold
                            tracking-tight
                            text-slate-900
                            dark:text-white
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
                            Attendance
                        </p>

                    </div>

                </div>

            </div>


            {/* MENU */}

            <nav
                className="
        flex-1
        p-4
        space-y-2
        "
            >

                <NavLink
                    to="/home"
                    className="
            flex
            items-center
            gap-3
            px-4
            py-3
            rounded-xl
            hover:bg-slate-100
            dark:hover:bg-slate-800
            transition
            "
                >
                    <Home size={18} />
                    Home
                </NavLink>

                {/* ATTENDANCE */}

                <button
                    onClick={() =>
                        setAttendanceOpen(
                            !attendanceOpen
                        )
                    }
                    className="
            w-full
            text-left
            px-4
            py-3
            rounded-xl
            hover:bg-slate-100
            dark:hover:bg-slate-800
            transition
            "
                >

                    <div
                        className="
                flex
                items-center
                justify-between
                "
                    >

                        <div
                            className="
                flex
                items-center
                gap-3
                "
                        >
                            <CalendarCheck size={18} />
                            Attendance
                        </div>

                        {
                            attendanceOpen
                                ? <ChevronDown size={16} />
                                : <ChevronRight size={16} />
                        }

                    </div>

                </button>
                {attendanceOpen && (

                    <div
                        className="
                        ml-6
                        mt-2
                        space-y-2
                        border-l
                        border-slate-200
                        dark:border-slate-700
                        pl-4
                        "
                    >

                        <NavLink
                            to="/attendance/dashboard"
                            className="
                            flex
                            items-center
                            gap-2
                            py-2
                            text-slate-500
                            hover:text-slate-900
                            dark:hover:text-white
                            "
                        >
                            <LayoutDashboard size={16} />
                            Dashboard
                        </NavLink>

                        <NavLink
                            to="/attendance/history"
                            className="
                            flex
                            items-center
                            gap-2
                            py-2
                            text-slate-500
                            hover:text-slate-900
                            dark:hover:text-white
                            "
                        >
                            <History size={16} />
                            History
                        </NavLink>

                    </div>

                )}

                {/* LEAVES */}

                <button
                    onClick={() =>
                        setLeavesOpen(
                            !leavesOpen
                        )
                    }
                    className="
                    w-full
                    text-left
                    px-4
                    py-3
                    rounded-xl
                    hover:bg-slate-100
                    dark:hover:bg-slate-800
                    transition
                    "
                >

                    <div
                        className="
                        flex
                        items-center
                        justify-between
                        "
                    >

                        <div
                            className="
            flex
            items-center
            gap-3
            "
                        >

                            <FileText size={18} />

                            Leaves

                        </div>

                        {
                            leavesOpen
                                ? <ChevronDown size={16} />
                                : <ChevronRight size={16} />
                        }

                    </div>

                </button>

                {leavesOpen && (

                    <div
                        className="
            ml-6
            mt-2
            space-y-2
            border-l
            border-slate-200
            dark:border-slate-700
            pl-4
            "
                    >

                        <Link
                            to="/leaves/apply"
                            className="
            flex
            items-center
            gap-2
            py-2
            text-slate-500
            hover:text-slate-900
            dark:hover:text-white
            transition
            "
                        >

                            <CalendarPlus size={16} />

                            Apply Leave

                        </Link>

                        <Link
                            to="/leaves/history"
                            className="
            flex
            items-center
            gap-2
            py-2
            text-slate-500
            hover:text-slate-900
            dark:hover:text-white
            transition
            "
                        >

                            <History size={16} />

                            Leave History

                        </Link>

                        <Link
                            to="/leaves/balance"
                            className="
            flex
            items-center
            gap-2
            py-2
            text-slate-500
            hover:text-slate-900
            dark:hover:text-white
            transition
            "
                        >

                            <Wallet size={16} />

                            Leave Balance

                        </Link>

                    </div>

                )}

                {/* PROFILE */}

                <button
                    onClick={() =>
                        setProfileOpen(
                            !profileOpen
                        )
                    }
                    className="
  w-full
  text-left
  px-4
  py-3
  rounded-xl
  hover:bg-slate-100
  dark:hover:bg-slate-800
  transition
  "
                >

                    <div
                        className="
    flex
    items-center
    justify-between
    "
                    >

                        <div
                            className="
      flex
      items-center
      gap-3
      "
                        >

                            <User size={18} />

                            Profile

                        </div>

                        {
                            profileOpen
                                ? <ChevronDown size={16} />
                                : <ChevronRight size={16} />
                        }

                    </div>

                </button>

                {profileOpen && (

                    <div
                        className="
    ml-6
    mt-2
    space-y-2
    border-l
    border-slate-200
    dark:border-slate-700
    pl-4
    "
                    >

                        <Link
                            to="/profile"
                            className="
      flex
      items-center
      gap-2
      py-2
      text-slate-500
      hover:text-slate-900
      dark:hover:text-white
      transition
      "
                        >

                            <UserCircle size={16} />

                            My Profile

                        </Link>

                        <Link
                            to="/profile/edit"
                            className="
      flex
      items-center
      gap-2
      py-2
      text-slate-500
      hover:text-slate-900
      dark:hover:text-white
      transition
      "
                        >

                            <Pencil size={16} />

                            Edit Profile

                        </Link>

                        <Link
                            to="/profile/change-password"
                            className="
      flex
      items-center
      gap-2
      py-2
      text-slate-500
      hover:text-slate-900
      dark:hover:text-white
      transition
      "
                        >

                            <KeyRound size={16} />

                            Change Password

                        </Link>

                    </div>

                )}

            </nav>

            {/* EMPLOYEE CARD */}

            <div className="p-4">

                <div
                    className="
    bg-slate-50
    dark:bg-slate-800
    rounded-2xl
    p-4
    border
    border-slate-200
    dark:border-slate-700
    "
                >

                    <h3
                        className="
      font-semibold
      text-slate-900
      dark:text-white
      "
                    >
                        {employee?.fullName}
                    </h3>

                    <p
                        className="
      text-sm
      text-slate-500
      "
                    >
                        {employee?.employeeCode}
                    </p>

                    <p
                        className="
      text-xs
      mt-1
      text-slate-400
      "
                    >
                        {employee?.role}
                    </p>

                </div>

            </div>

            {/* LOGOUT */}

            <div className="p-4">

                <button
                    onClick={logout}
                    className="
                    w-full
                    flex
                    items-center
                    justify-center
                    gap-3
                    py-3
                    rounded-2xl
                    bg-red-600
                    dark:bg-slate-800
                    text-white
                    hover:bg-slate-800
                    dark:hover:bg-slate-700
                    transition-all
                    duration-300
                    "
                >

                    <LogOut size={18} />

                    Logout

                </button>

            </div>
        </aside>

    );

};

export default Sidebar;