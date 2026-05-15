import { useEffect, useState } from "react";

import axios from "axios";

import { toast } from "react-hot-toast";

import AdminUsersTable from "./AdminUsersTable";

function AdminProfile() {

  const BASE_URL = import.meta.env.VITE_API_URL;

  const [users, setUsers] = useState([]);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState(null);

  // fetch users

  useEffect(() => {

    const getUsers = async () => {

      try {

        setLoading(true);

        const res = await axios.get(

          `${BASE_URL}/admin-api/users`,

          {
            withCredentials: true
          }
        );

        setUsers(res.data.payload);

      } catch (err) {

        console.log(err);

        setError(
          err.response?.data?.message ||
          "Failed to fetch users"
        );

      } finally {

        setLoading(false);
      }
    };

    getUsers();

  }, []);

  // block / unblock user

  const toggleUserStatus = async(userObj) => {

    try {

      const res = await axios.patch(

        `${BASE_URL}/admin-api/toggle-user-status/${userObj._id}`,

        {
          isActive: !userObj.isActive
        },

        {
          withCredentials: true
        }
      );

      // update UI instantly

      setUsers(prev =>

        prev.map((u) =>

          u._id === userObj._id
            ? res.data.payload
            : u
        )
      );

      toast.success(res.data.message);

    } catch (err) {

      console.log(err);

      toast.error(
        err.response?.data?.message ||
        "Operation Failed"
      );
    }
  };

  // loading state

  if (loading) {

    return (

      <p className="text-center mt-10 text-lg">

        Loading Users...

      </p>
    );
  }

  // error state

  if (error) {

    return (

      <p className="text-center mt-10 text-red-500">

        {error}

      </p>
    );
  }

  return (

    <div className="max-w-7xl mx-auto p-6">

      {/* heading */}

      <h1 className="text-4xl font-bold mb-8">

        Admin Dashboard

      </h1>

      {/* total users */}

      <div className="mb-6">

        <p className="text-lg text-gray-400">

          Total Users: {users.length}

        </p>

      </div>

      {/* users table */}

      <AdminUsersTable

        users={users}

        toggleUserStatus={toggleUserStatus}

      />

    </div>
  );
}

export default AdminProfile;