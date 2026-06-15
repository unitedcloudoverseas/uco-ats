import { useEffect, useState } from "react";
import API from "../services/api";
import {
  Camera,
  User,
  Mail,
  Phone,
  MapPin,
  ShieldCheck,
} from "lucide-react";
import toast from "react-hot-toast";

const EditProfile = () => {

  const [profile,
    setProfile] =
    useState(null);

  const [selectedFile,
    setSelectedFile] =
    useState(null);

  useEffect(() => {
    fetchProfile();
  }, []);

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

  const handleChange =
    (e) => {

      setProfile({
        ...profile,
        [e.target.name]:
          e.target.value,
      });

    };

  const saveProfile =
    async () => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        await API.put(
        "/employees/update-profile",
        {
          fullName:
            profile.fullName,
          email:
            profile.email,
          phoneNumber:
            profile.phoneNumber,
          address:
            profile.address,
          emergencyContact:
            profile.emergencyContact,
        },
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      localStorage.setItem(
        "employee",
        JSON.stringify(
          profile
        )
      );

      toast.success(
        "Profile updated successfully"
      );

      } catch (error) {

        toast.error(
          error.response?.data?.message
        );

      }

    };

  const uploadPhoto =
    async () => {

      if (!selectedFile) {

        return toast.success(
          "Please select a photo"
        );

      }

      try {

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

        await fetchProfile();

        const updatedProfile =
          await API.get(
            "/employees/profile",
            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          );

        localStorage.setItem(
          "employee",
          JSON.stringify(
            updatedProfile.data
          )
        );

        toast.success(
          "Photo uploaded successfully"
        );
      } catch (error) {

        toast.error(
          error.response?.data?.message
        );

      }

    };

  if (!profile)
    return null;

  return (

    <div className="space-y-8">

      {/* PAGE HEADER */}

      <div>

        <h1
          className="
          text-3xl
          font-bold
          text-slate-900
          dark:text-white
          "
        >
          Edit Profile
        </h1>

        <p
          className="
          mt-2
          text-slate-500
          "
        >
          Manage your personal information
        </p>

      </div>

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

  <div
    className="
    flex
    flex-col
    md:flex-row
    md:items-center
    justify-between
    gap-8
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
          profile.profilePhoto
            ? `http://localhost:5000/uploads/profile/${profile.profilePhoto}`
            : `https://ui-avatars.com/api/?name=${profile.fullName}`
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
          {profile.fullName}
        </h2>

        <p className="text-slate-500">
          {profile.employeeCode}
        </p>

        <p className="text-slate-500">
          {profile.department}
        </p>

      </div>

    </div>

    <div
      className="
      flex
      gap-3
      "
    >

      <label
        className="
        cursor-pointer
        px-5
        py-2
        rounded-xl
        border
        border-slate-300
        dark:border-slate-700
        flex
        items-center
        gap-2
        "
      >

        <Camera size={18} />

        Select Photo

        <input
          type="file"
          className="hidden"
          onChange={(e) =>
            setSelectedFile(
              e.target.files[0]
            )
          }
        />

      </label>

      <button
        onClick={uploadPhoto}
        className="
        px-5
        py-2
        rounded-xl
        bg-slate-900
        text-white
        hover:bg-slate-800
        "
      >
        Upload
      </button>

    </div>

  </div>

</div>

      {/* EDIT FORM */}

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
    Personal Information
  </h2>

  <div
    className="
    grid
    grid-cols-1
    md:grid-cols-2
    gap-6
    "
  >

          <div>

            <label
                className="
                flex
                items-center
                gap-2
                mb-2
                text-sm
                font-medium
                dark:text-white
                "
            >

                <User size={16} />

                Full Name

            </label>

            <input
              type="text"
              name="fullName"
              value={profile.fullName}
              onChange={handleChange}
              className="
              w-full
              border
              rounded-xl
              p-3
              dark:bg-slate-800
              "
            />

          </div>

          <div>

            <label
                className="
                flex
                items-center
                gap-2
                mb-2
                text-sm
                font-medium
                dark:text-white
                "
            >

                <Mail size={16} />

                Email

            </label>

            <input
              type="email"
              name="email"
              value={profile.email}
              onChange={handleChange}
              className="
              w-full
              border
              rounded-xl
              p-3
              dark:bg-slate-800
              "
            />

          </div>

          <div>

            <label
                className="
                flex
                items-center
                gap-2
                mb-2
                text-sm
                font-medium
                dark:text-white
                "
            >

                <Phone size={16} />

                Phone Number

            </label>

            <input
              type="text"
              name="phoneNumber"
              value={
                profile.phoneNumber || ""
              }
              onChange={handleChange}
              className="
              w-full
              border
              rounded-xl
              p-3
              dark:bg-slate-800
              "
            />

          </div>

          <div>

            <label
                className="
                flex
                items-center
                gap-2
                mb-2
                text-sm
                font-medium
                dark:text-white
                "
            >

                <ShieldCheck size={16} />

                Emergency Contact

            </label>
            <input
              type="text"
              name="emergencyContact"
              value={
                profile.emergencyContact || ""
              }
              onChange={handleChange}
              className="
              w-full
              border
              rounded-xl
              p-3
              dark:bg-slate-800
              "
            />

          </div>

          <div className="md:col-span-2">

            <label
                className="
                flex
                items-center
                gap-2
                mb-2
                text-sm
                font-medium
                dark:text-white
                "
                >

                <MapPin size={16} />

                Address

                </label>
            <textarea
              rows="4"
              name="address"
              value={
                profile.address || ""
              }
              onChange={handleChange}
              className="
              w-full
              border
              rounded-xl
              p-3
              dark:bg-slate-800
              "
            />

          </div>

        </div>

        <button
            onClick={saveProfile}
            className="
            mt-8
            px-8
            py-3
            rounded-xl
            bg-slate-900
            text-white
            hover:bg-slate-800
            transition
            "
            >
            Save Changes
            </button>

      </div>

    </div>

  );

};

export default EditProfile;