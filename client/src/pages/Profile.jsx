import { useEffect, useState } from "react";
import API from "../services/api";
import { Link } from "react-router-dom";

import {
  User,
  Mail,
  Building2,
  ShieldCheck,
  Calendar,
  Phone,
  MapPin,
} from "lucide-react";
import toast from "react-hot-toast";

const Profile = () => {

  /* =========================
     STATE MANAGEMENT
  ========================= */

  const employee = JSON.parse(
  localStorage.getItem("employee")
);

  const [profile,
    setProfile] =
    useState(null);

  /* =========================
     INITIAL PAGE LOAD
  ========================= */

  useEffect(() => {
    fetchProfile();
  }, []);

  /* =========================
     FETCH PROFILE
  ========================= */

  const fetchProfile =
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

        setProfile(
          response.data
        );

      } catch (error) {

        console.log(error);

      }

    };

    const uploadPhoto =
async () => {

  const formData =
    new FormData();

  formData.append(
    "profilePhoto",
    selectedFile
  );

  const token =
    localStorage.getItem(
      "token"
    );

  await API.post(
    "/employees/upload-photo",
    formData,
    {
      headers: {
        Authorization:
          `Bearer ${token}`,
      },
    }
  );

  toast.success(
    "Photo uploaded"
  );

  fetchProfile();

};

const [
  selectedFile,
  setSelectedFile
] = useState(null);

  return (

  <div className="max-w-7xl mx-auto">

    {/* HEADER */}

    <div className="mb-8">

      <h1
        className="
        text-4xl
        font-bold
        text-slate-900
        dark:text-white
        "
      >
        My Profile
      </h1>

      <p
        className="
        mt-2
        text-slate-500
        dark:text-slate-400
        "
      >
        Manage and view your employee information
      </p>

    </div>

    {/* PROFILE OVERVIEW */}

    <div
      className="
      bg-white
      dark:bg-slate-900
      border
      border-slate-200
      dark:border-slate-800
      rounded-3xl
      p-8
      mb-6
      "
    >

      <div
        className="
        flex
        flex-col
        md:flex-row
        md:items-center
        justify-between
        gap-6
        "
      >

        <div
          className="
          flex
          items-center
          gap-6
          "
        >

          <img
            src={
              profile?.profilePhoto
                ? `http://localhost:5000/uploads/profile/${profile.profilePhoto}`
                : `https://ui-avatars.com/api/?name=${profile?.fullName}`
            }
            alt="Profile"
            className="
            w-24
            h-24
            rounded-full
            object-cover
            "
          />

          <div>

            <h2
              className="
              text-2xl
              font-bold
              text-slate-900
              dark:text-white
              "
            >
              {profile?.fullName}
            </h2>

            <p
              className="
              text-slate-500
              mt-1
              "
            >
              {profile?.role}
            </p>

            <p
              className="
              text-slate-500
              "
            >
              {profile?.department}
            </p>

          </div>

        </div>

        <Link
          to="/profile/edit"
          className="
          px-5
          py-2
          rounded-xl
          bg-slate-900
          text-white
          hover:bg-slate-800
          transition
          "
        >
          Edit Profile
        </Link>

      </div>

    </div>

    {/* PERSONAL INFORMATION */}

    <div
      className="
      bg-white
      dark:bg-slate-900
      border
      border-slate-200
      dark:border-slate-800
      rounded-3xl
      p-8
      mb-6
      "
    >

      <div
        className="
        flex
        justify-between
        items-center
        mb-8
        "
      >

        <h2
          className="
          text-xl
          font-bold
          text-slate-900
          dark:text-white
          "
        >
          Personal Information
        </h2>

      </div>

      <div
        className="
        grid
        grid-cols-1
        md:grid-cols-2
        lg:grid-cols-3
        gap-8
        "
      >

        <div>

          <div className="flex items-center gap-2 mb-2">

            <User size={18} />

            <span className="text-slate-500">
              Employee Code
            </span>

          </div>

          <p className="font-semibold dark:text-white">
            {profile?.employeeCode}
          </p>

        </div>

        <div>

          <div className="flex items-center gap-2 mb-2">

            <User size={18} />

            <span className="text-slate-500">
              Full Name
            </span>

          </div>

          <p className="font-semibold dark:text-white">
            {profile?.fullName}
          </p>

        </div>

        <div>

          <div className="flex items-center gap-2 mb-2">

            <Mail size={18} />

            <span className="text-slate-500">
              Email
            </span>

          </div>

          <p className="font-semibold dark:text-white">
            {profile?.email}
          </p>

        </div>

        <div>

          <div className="flex items-center gap-2 mb-2">

            <Phone size={18} />

            <span className="text-slate-500">
              Phone Number
            </span>

          </div>

          <p className="font-semibold dark:text-white">
            {profile?.phoneNumber || "-"}
          </p>

        </div>

        <div>

          <div className="flex items-center gap-2 mb-2">

            <Phone size={18} />

            <span className="text-slate-500">
              Emergency Contact
            </span>

          </div>

          <p className="font-semibold dark:text-white">
            {profile?.emergencyContact || "-"}
          </p>

        </div>

      </div>

    </div>

    {/* EMPLOYMENT INFORMATION */}

    <div
      className="
      bg-white
      dark:bg-slate-900
      border
      border-slate-200
      dark:border-slate-800
      rounded-3xl
      p-8
      "
    >

      <h2
        className="
        text-xl
        font-bold
        mb-8
        text-slate-900
        dark:text-white
        "
      >
        Employment Information
      </h2>

      <div
        className="
        grid
        grid-cols-1
        md:grid-cols-2
        lg:grid-cols-4
        gap-8
        "
      >

        <div>

          <div className="flex items-center gap-2 mb-2">

            <Building2 size={18} />

            <span className="text-slate-500">
              Department
            </span>

          </div>

          <p className="font-semibold dark:text-white">
            {profile?.department}
          </p>

        </div>

        <div>

          <div className="flex items-center gap-2 mb-2">

            <ShieldCheck size={18} />

            <span className="text-slate-500">
              Role
            </span>

          </div>

          <p className="font-semibold dark:text-white">
            {profile?.role}
          </p>

        </div>

        <div>

          <div className="flex items-center gap-2 mb-2">

            <ShieldCheck size={18} />

            <span className="text-slate-500">
              Status
            </span>

          </div>

          <p className="font-semibold text-green-600">
            {profile?.status}
          </p>

        </div>

        <div>

          <div className="flex items-center gap-2 mb-2">

            <Calendar size={18} />

            <span className="text-slate-500">
              Joined On
            </span>

          </div>

          <p className="font-semibold dark:text-white">

            {new Date(
              profile?.createdAt
            ).toLocaleDateString()}

          </p>

        </div>

      </div>

    </div>

  </div>

);

};

export default Profile;