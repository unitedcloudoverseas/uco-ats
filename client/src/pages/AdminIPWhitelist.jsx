import { useEffect, useState } from "react";
import API from "../services/api";
import toast from "react-hot-toast";

const AdminIPWhitelist = () => {

  const [
    ips,
    setIps,
  ] = useState([]);

  const [
    formData,
    setFormData,
  ] = useState({
    ipAddress: "",
    location: "",
  });

  useEffect(() => {

    fetchIPs();
    fetchDetectedIPs();

  }, []);

  const [
    detectedIPs,
    setDetectedIPs,
  ] = useState([]);

  const fetchIPs =
  async () => {

    try {

      const token =
        localStorage.getItem(
          "token"
        );

      const response =
        await API.get(
          "/admin/whitelist-ip",
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

      setIps(
        response.data
      );

    }

    catch (error) {

      console.log(error);

    }

  };

  const addIP =
  async (e) => {

    e.preventDefault();

    try {

      const token =
        localStorage.getItem(
          "token"
        );

      await API.post(
        "/admin/whitelist-ip",
        formData,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      toast.success(
        "IP Added"
      );

      setFormData({
        ipAddress: "",
        location: "",
      });

      fetchIPs();

    }

    catch (error) {

      toast.error(
        "Failed"
      );

    }

  };

  const deleteIP =
  async (id) => {

    try {

      const token =
        localStorage.getItem(
          "token"
        );

      await API.delete(
        `/admin/whitelist-ip/${id}`,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      toast.success(
        "IP Deleted"
      );

      fetchIPs();

    }

    catch (error) {

      console.log(error);

    }

};

const fetchDetectedIPs =
async () => {

  try {

    const token =
      localStorage.getItem(
        "token"
      );

    const response =
      await API.get(
        "/admin/detected-ips",
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

    setDetectedIPs(
      response.data
    );

  }

  catch (error) {

    console.log(error);

  }

};

const approveIP =
async (id) => {

  try {

    const token =
      localStorage.getItem(
        "token"
      );

    await API.post(
      `/admin/detected-ip/${id}/approve`,
      {},
      {
        headers: {
          Authorization:
            `Bearer ${token}`,
        },
      }
    );

    toast.success(
      "IP Whitelisted"
    );

    fetchIPs();

    fetchDetectedIPs();

  }

  catch (error) {

    toast.error(
      "Failed"
    );

  }

};


return (

  <div className="p-8">

    {/* HEADER */}

    <div
      className="
      bg-white
      dark:bg-slate-900
      border
      border-slate-200
      dark:border-slate-800
      rounded-3xl
      p-8
      mb-8
      "
    >

      <h1
        className="
        text-4xl
        font-bold
        text-slate-900
        dark:text-white
        "
      >
        IP Whitelist
      </h1>

      <p
        className="
        mt-2
        text-slate-500
        dark:text-slate-400
        "
      >
        Manage office IP addresses allowed for attendance marking
      </p>

    </div>

    {/* SUMMARY */}

    <div
      className="
      grid
      grid-cols-1
      md:grid-cols-3
      gap-6
      mb-8
      "
    >

      <div
        className="
        bg-white
        dark:bg-slate-900
        border
        border-slate-200
        dark:border-slate-800
        rounded-3xl
        p-6
        "
      >

        <p className="text-slate-500">
          Total IPs
        </p>

        <h2
          className="
          text-5xl
          font-bold
          mt-3
          "
        >
          {ips.length}
        </h2>

      </div>

      <div
        className="
        bg-white
        dark:bg-slate-900
        border
        border-slate-200
        dark:border-slate-800
        rounded-3xl
        p-6
        "
      >

        <p className="text-slate-500">
          Active IPs
        </p>

        <h2
          className="
          text-5xl
          font-bold
          mt-3
          text-green-600
          "
        >
          {
            ips.filter(
              ip =>
                ip.isActive
            ).length
          }
        </h2>

      </div>

      <div
        className="
        bg-white
        dark:bg-slate-900
        border
        border-slate-200
        dark:border-slate-800
        rounded-3xl
        p-6
        "
      >

        <p className="text-slate-500">
          Inactive IPs
        </p>

        <h2
          className="
          text-5xl
          font-bold
          mt-3
          text-red-600
          "
        >
          {
            ips.filter(
              ip =>
                !ip.isActive
            ).length
          }
        </h2>

      </div>

    </div>

    {/* ADD IP */}

    <form
      onSubmit={addIP}
      className="
      bg-white
      dark:bg-slate-900
      border
      border-slate-200
      dark:border-slate-800
      rounded-3xl
      p-8
      mb-8
      "
    >

      <h2
        className="
        text-xl
        font-semibold
        mb-6
        "
      >
        Add New IP
      </h2>

      <div
        className="
        grid
        md:grid-cols-2
        gap-6
        "
      >

        <input
          type="text"
          placeholder="IP Address"
          value={formData.ipAddress}
          onChange={(e) =>
            setFormData({
              ...formData,
              ipAddress:
                e.target.value,
            })
          }
          className="
          p-3
          rounded-2xl
          border
          border-slate-300
          dark:border-slate-700
          "
        />

        <input
          type="text"
          placeholder="Location"
          value={formData.location}
          onChange={(e) =>
            setFormData({
              ...formData,
              location:
                e.target.value,
            })
          }
          className="
          p-3
          rounded-2xl
          border
          border-slate-300
          dark:border-slate-700
          "
        />

      </div>

      <button
        type="submit"
        className="
        mt-6
        px-6
        py-3
        rounded-2xl
        bg-slate-900
        dark:bg-white
        text-white
        dark:text-slate-900
        cursor-pointer
        "
      >
        Add IP
      </button>

    </form>

    {/* TABLE */}

    <div
      className="
      bg-white
      dark:bg-slate-900
      border
      border-slate-200
      dark:border-slate-800
      rounded-3xl
      overflow-hidden
      "
    >

      <div className="p-6">

        <h2
          className="
          text-xl
          font-semibold
          "
        >
          Whitelisted IPs
        </h2>

      </div>

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead>

            <tr
              className="
              border-t
              border-slate-200
              dark:border-slate-800
              "
            >

              <th className="p-5 text-left">
                IP Address
              </th>

              <th className="p-5 text-left">
                Location
              </th>

              <th className="p-5 text-left">
                Status
              </th>

              <th className="p-5 text-left">
                Action
              </th>

            </tr>

          </thead>

            <tbody>

            {
            ips.length === 0 ? (

                <tr>

                <td
                    colSpan="4"
                    className="
                    p-10
                    text-center
                    text-slate-500
                    dark:text-slate-400
                    "
                >
                    No IP addresses found
                </td>

                </tr>

            ) : (

                ips.map(
                (ip) => (

                    <tr
                    key={ip._id}
                    className="
                    border-t
                    border-slate-100
                    dark:border-slate-800
                    "
                    >

                    <td className="p-5">
                        {ip.ipAddress}
                    </td>

                    <td className="p-5">
                        {ip.location}
                    </td>

                    <td className="p-5">

                        <span
                        className={`
                        px-3
                        py-1
                        rounded-full
                        text-sm
                        font-medium
                        ${
                            ip.isActive
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }
                        `}
                        >
                        {
                            ip.isActive
                            ? "Active"
                            : "Inactive"
                        }
                        </span>

                    </td>

                    <td className="p-5">

                        <button
                        onClick={() => {

                            const confirmDelete =
                            window.confirm(
                                "Delete this IP?"
                            );

                            if (
                            confirmDelete
                            ) {

                            deleteIP(
                                ip._id
                            );

                            }

                        }}
                        className="
                        px-4
                        py-2
                        rounded-xl
                        bg-red-500
                        hover:bg-red-600
                        text-white
                        cursor-pointer
                        "
                        >
                        Delete
                        </button>

                    </td>

                    </tr>

                )
                )

            )
            }

            </tbody>

        </table>

      </div>

    </div>

    <div
  className="
  bg-white
  dark:bg-slate-900
  border
  border-slate-200
  dark:border-slate-800
  rounded-3xl
  overflow-hidden
  mt-8
  "
>

  <div className="p-6">

    <h2
      className="
      text-xl
      font-semibold
      "
    >
      Detected Login IPs
    </h2>

    <p
      className="
      text-sm
      text-slate-500
      mt-1
      "
    >
      Recently detected employee login IPs
    </p>

  </div>

  <div className="overflow-x-auto">

    <table className="w-full">

      <thead>

        <tr
          className="
          border-t
          border-slate-200
          dark:border-slate-800
          "
        >

          <th className="p-5 text-left">
            IP Address
          </th>

          <th className="p-5 text-left">
            Employee
          </th>

          <th className="p-5 text-left">
            Last Seen
          </th>

          <th className="p-5 text-left">
            Action
          </th>

        </tr>

      </thead>

      <tbody>

        {
          detectedIPs.map(
            (ip) => (

              <tr
                key={ip._id}
                className="
                border-t
                border-slate-100
                dark:border-slate-800
                "
              >

                <td className="p-5">
                  {ip.ipAddress}
                </td>

                <td className="p-5">
                  {ip.employeeName}
                </td>

                <td className="p-5">

                  {
                    new Date(
                      ip.lastSeen
                    ).toLocaleString()
                  }

                </td>

                <td className="p-5">

                  <button
                    onClick={() =>
                      approveIP(
                        ip._id
                      )
                    }
                    className="
                    px-4
                    py-2
                    rounded-xl
                    bg-green-600
                    hover:bg-green-700
                    text-white
                    cursor-pointer
                    "
                  >
                    Add To Whitelist
                  </button>

                </td>

              </tr>

            )
          )
        }

      </tbody>

    </table>

  </div>

</div>

  </div>

);

};

export default AdminIPWhitelist;