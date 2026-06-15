import { useState } from "react";
import API from "../services/api";
import toast from "react-hot-toast";

const ChangePassword = () => {

  /* =========================
     STATE MANAGEMENT
  ========================= */

  const [
    currentPassword,
    setCurrentPassword,
  ] = useState("");

  const [
    newPassword,
    setNewPassword,
  ] = useState("");

  const [
    confirmPassword,
    setConfirmPassword,
  ] = useState("");

  /* =========================
     CHANGE PASSWORD
  ========================= */

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      if (
        newPassword !==
        confirmPassword
      ) {

        return toast.error(
          "Passwords do not match"
        );

      }

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        const response =
          await API.put(
            "/employees/change-password",
            {
              currentPassword,
              newPassword,
            },
            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          );

        toast.success(
          response.data.message
        );

        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");

      } catch (error) {

        console.log(error);

        toast.error(
          error.response?.data?.message ||
          "Failed to change password"
        );

      }

    };

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
        Change Password
      </h1>

      <p
        className="
        mt-2
        text-slate-500
        "
      >
        Update your account security credentials
      </p>

    </div>

    {/* PASSWORD CARD */}

    <div
      className="
      bg-white
      dark:bg-slate-900
      border
      border-slate-200
      dark:border-slate-800
      rounded-3xl
      p-8
      max-w-2xl
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
        Password Settings
      </h2>

      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >

        <div>

          <label
            className="
            block
            mb-2
            text-sm
            font-medium
            text-slate-700
            dark:text-slate-300
            "
          >
            Current Password
          </label>

          <input
            type="password"
            value={currentPassword}
            onChange={(e) =>
              setCurrentPassword(
                e.target.value
              )
            }
            className="
            w-full
            border
            border-slate-300
            dark:border-slate-700
            rounded-2xl
            p-3
            dark:bg-slate-800
            dark:text-white
            "
            required
          />

        </div>

        <div>

          <label
            className="
            block
            mb-2
            text-sm
            font-medium
            text-slate-700
            dark:text-slate-300
            "
          >
            New Password
          </label>

          <input
            type="password"
            value={newPassword}
            onChange={(e) =>
              setNewPassword(
                e.target.value
              )
            }
            className="
            w-full
            border
            border-slate-300
            dark:border-slate-700
            rounded-2xl
            p-3
            dark:bg-slate-800
            dark:text-white
            "
            required
          />

        </div>

        <div>

          <label
            className="
            block
            mb-2
            text-sm
            font-medium
            text-slate-700
            dark:text-slate-300
            "
          >
            Confirm Password
          </label>

          <input
            type="password"
            value={confirmPassword}
            onChange={(e) =>
              setConfirmPassword(
                e.target.value
              )
            }
            className="
            w-full
            border
            border-slate-300
            dark:border-slate-700
            rounded-2xl
            p-3
            dark:bg-slate-800
            dark:text-white
            "
            required
          />

        </div>

        <button
          type="submit"
          className="
          px-8
          py-3
          rounded-2xl
          bg-slate-900
          dark:bg-white
          text-white
          dark:text-slate-900
          font-medium
          hover:opacity-90
          transition
          "
        >
          Update Password
        </button>

      </form>

    </div>

  </div>

);

};

export default ChangePassword;