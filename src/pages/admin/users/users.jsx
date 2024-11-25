import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { FaTrash, FaExchangeAlt, FaToggleOn, FaToggleOff } from "react-icons/fa";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const token = localStorage.getItem("token");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  if (token == null) {
    window.location.href = "/login";
  }

  const fetchUsers = () => {
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/api/users/all`,    
      {
        page : page,
        pageSize : 5
      },       
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setUsers(res.data.users);
        setTotalPages(res.data.pagination.totalPages);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to fetch users.");
      });
  };

  useEffect(() => {
    fetchUsers();
  }, [page]);

  const handleDelete = (email) => {
    if (confirm("Are you sure you want to delete this user?")) {
      axios
        .delete(`${import.meta.env.VITE_BACKEND_URL}/api/users/admin-delete/${email}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          toast.success("User deleted successfully!");
          fetchUsers();
        })
        .catch(() => {
          toast.error("Failed to delete user.");
        });
    }
  };

  const handleChangeType = (userId, currentType) => {
    const newType = currentType === "customer" ? "admin" : "customer";
    if (confirm(`Change user type to ${newType}?`)) {
      axios
        .put(
          `${import.meta.env.VITE_BACKEND_URL}/api/users/change-type/${userId}`,
          { type: newType },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then(() => {
          toast.success(`User type changed to ${newType}!`);
          fetchUsers();
        })
        .catch(() => {
          toast.error("Failed to change user type.");
        });
    }
  };

  const handleToggleDisabled = (userId, currentStatus) => {
    const newStatus = !currentStatus;
    const action = newStatus ? "disable" : "enable";
    if (confirm(`Are you sure you want to ${action} this user?`)) {
      axios
        .put(
          `${import.meta.env.VITE_BACKEND_URL}/api/users/disable/${userId}`,
          { disabled: newStatus },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then(() => {
          toast.success(`User ${action}d successfully!`);
          fetchUsers();
        })
        .catch(() => {
          toast.error(`Failed to ${action} user.`);
        });
    }
  };

  return (
    <div className="w-full p-6 bg-gray-50">
      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse border border-gray-300 shadow-sm bg-white rounded-lg">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="border border-gray-300 px-4 py-2 text-left">Email</th>
              <th className="border border-gray-300 px-4 py-2 text-left">First Name</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Last Name</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Type</th>
              <th className="border border-gray-300 px-4 py-2 text-left">WhatsApp</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Phone</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Disabled</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr
                key={user._id}
                className={`${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                } text-gray-700`}
              >
                <td className="border border-gray-300 px-4 py-2">{user.email}</td>
                <td className="border border-gray-300 px-4 py-2">{user.firstName}</td>
                <td className="border border-gray-300 px-4 py-2">{user.lastName}</td>
                <td className="border border-gray-300 px-4 py-2">{user.type}</td>
                <td className="border border-gray-300 px-4 py-2">{user.whatsApp}</td>
                <td className="border border-gray-300 px-4 py-2">{user.phone}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {user.disabled ? "Yes" : "No"}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleDelete(user.email)}
                      className="text-red-500 hover:text-red-700 transition"
                    >
                      <FaTrash title="Delete User" />
                    </button>
                    <button
                      onClick={() => handleChangeType(user._id, user.type)}
                      className="text-blue-500 hover:text-blue-700 transition"
                    >
                      <FaExchangeAlt title="Change Type" />
                    </button>
                    <button
                      onClick={() => handleToggleDisabled(user._id, user.disabled)}
                      className="text-green-500 hover:text-green-700 transition"
                    >
                      {user.disabled ? (
                        <FaToggleOff title="Enable User" />
                      ) : (
                        <FaToggleOn title="Disable User" />
                      )}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="w-full flex justify-center items-center">
          {
            Array.from({length : totalPages}).map((item,index)=>{
              return(
                <button className={`bg-blue-500 mx-[10px] w-[20px] h-[20px] flex text-center justify-center items-center text-white ${page==(index+1)&&" border border-black"}`} onClick={()=>{
                  setPage(index+1)
                }}>
                  {index+1}
                </button>
              )
            })
          }
        </div>
      </div>
    </div>
  );
}
