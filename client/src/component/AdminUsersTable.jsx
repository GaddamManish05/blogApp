function AdminUsersTable({

  users,

  toggleUserStatus

}) {

  return (

    <div className="overflow-x-auto">

      <table className="w-full border-collapse text-white">

        <thead>

          <tr className="border-b border-gray-700 text-white">

            <th className="text-left p-4">
              User
            </th>

            <th className="text-left p-4">
              Email
            </th>

            <th className="text-left p-4">
              Role
            </th>

            <th className="text-left p-4">
              Status
            </th>

            <th className="text-left p-4">
              Action
            </th>

          </tr>

        </thead>

        <tbody>

          {
            users.map((userObj)=>(

              <tr
                key={userObj._id}
                className="
                  border-b
                  border-gray-800
                  text-white
                  hover:bg-gray-900
                  transition
                "
              >

                {/* USER */}

                <td className="p-4">

                  <div className="flex items-center gap-3">

                    {/* avatar */}

                    <div
                      className="
                        w-10
                        h-10
                        rounded-full
                        bg-white
                        text-black
                        flex
                        items-center
                        justify-center
                        font-bold
                      "
                    >
                      {
                        userObj.firstName?.[0]
                          ?.toUpperCase()
                      }
                    </div>

                    {/* name */}

                    <div>

                      <p className="font-semibold">

                        {userObj.firstName}

                      </p>

                    </div>

                  </div>

                </td>

                {/* EMAIL */}

                <td className="p-4 text-gray-200">

                  {userObj.email}

                </td>

                {/* ROLE */}

                <td className="p-4">

                  <span
                    className="
                      px-3
                      py-1
                      rounded-full
                      bg-blue-700
                      text-sm
                    "
                  >
                    {userObj.role}
                  </span>

                </td>

                {/* STATUS */}

                <td className="p-4">

                  <span
                    className={`
                      px-3
                      py-1
                      rounded-full
                      text-sm
                      ${
                        userObj.isActive
                          ? "bg-green-700"
                          : "bg-red-700"
                      }
                    `}
                  >
                    {
                      userObj.isActive
                        ? "Active"
                        : "Blocked"
                    }

                  </span>

                </td>

                {/* ACTION */}

                <td className="p-4">

                  <button

                    onClick={() =>
                      toggleUserStatus(userObj)
                    }

                    className={`
                      px-4
                      py-2
                      rounded-lg
                      text-white
                      transition
                      ${
                        userObj.isActive
                          ? "bg-red-600 hover:bg-red-700"
                          : "bg-green-600 hover:bg-green-700"
                      }
                    `}
                  >
                    {
                      userObj.isActive
                        ? "Block"
                        : "Unblock"
                    }

                  </button>

                </td>

              </tr>
            ))
          }

        </tbody>

      </table>

    </div>
  );
}

export default AdminUsersTable;