import React from "react";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import "./index.css";

/* =========================
   AUTH PAGES
========================= */

import Login from "./pages/Login";
import Register from "./pages/Register";

/* =========================
   EMPLOYEE PAGES
========================= */

import Home from "./pages/Home";


import AttendanceHistory from "./pages/AttendanceHistory";
import AttendanceDashboard from "./pages/AttendanceDashboard";

import ApplyLeave from "./pages/ApplyLeave";
import LeaveHistory from "./pages/LeaveHistory";
import LeaveBalance from "./pages/LeaveBalance";

import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import ChangePassword from "./pages/ChangePassword";

import IPWhitelist from "./pages/AdminIPWhitelist";


/* =========================
   ADMIN PAGES
========================= */

import AdminDashboard from "./pages/AdminDashboard";
import Employees from "./pages/Employees";
import EmployeeProfile from "./pages/EmployeeProfile";

/* =========================
   ROUTE PROTECTION
========================= */

import ProtectedRoute from "./routes/ProtectedRoute";
import AdminRoute from "./routes/AdminRoute";
import AdminAttendance from "./pages/AdminAttendance"
import AdminLeaves from "./pages/AdminLeaves"

/* =========================
   LAYOUT
========================= */

import MainLayout from "./layouts/MainLayout";

import {
  ThemeProvider,
} from "./context/ThemeContext";


import { Toaster } from "react-hot-toast";



ReactDOM.createRoot(
  document.getElementById("root")
).render(

     
   
  <React.StrictMode>

    <ThemeProvider>

      <BrowserRouter>

           <Toaster
        position="top-right"
      />

        <Routes>

        {/* =========================
            PUBLIC ROUTES
        ========================= */}

        <Route
          path="/"
          element={<Login />}
        />



        {/* =========================
            PROTECTED ROUTES
        ========================= */}

        <Route
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >

          <Route
          path="/register"
          element={
            <AdminRoute>
              <Register />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/ip-whitelist"
          element={
            <AdminRoute>
              <IPWhitelist />
            </AdminRoute>
          }
        />

          {/* =========================
              HOME
          ========================= */}

          <Route
            path="/home"
            element={<Home />}
          />

          {/* =========================
              ATTENDANCE
          ========================= */}

          <Route
            path="/attendance/dashboard"
            element={<AttendanceDashboard />}
          />

          <Route
            path="/attendance/history"
            element={<AttendanceHistory />}
          />

          {/* =========================
              LEAVES
          ========================= */}

          <Route
            path="/leaves/apply"
            element={<ApplyLeave />}
          />

          <Route
            path="/leaves/history"
            element={<LeaveHistory />}
          />

          <Route
            path="/leaves/balance"
            element={<LeaveBalance />}
          />

          {/* =========================
              PROFILE
          ========================= */}

          <Route
            path="/profile"
            element={<Profile />}
          />

          <Route
            path="/profile/edit"
            element={<EditProfile />}
          />

          <Route
            path="/profile/change-password"
            element={<ChangePassword />}
          />

          {/* =========================
              ADMIN
          ========================= */}

          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          />

          <Route
            path="/employees"
            element={
              <AdminRoute>
                <Employees />
              </AdminRoute>
            }
          />

          <Route
          path="/admin/attendance"
          element={
            <AdminRoute>
              <AdminAttendance />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/leaves"
          element={
            <AdminRoute>
              <AdminLeaves />
            </AdminRoute>
          }
        />
        <Route
          path="/employees/:id"
          element={
            <AdminRoute>
              <EmployeeProfile />
            </AdminRoute>
          }
        />
        </Route>

      </Routes>

    </BrowserRouter>

  </ThemeProvider>

  </React.StrictMode>


);