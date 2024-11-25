import axios from "axios";
import { useEffect, useState } from "react";
import { FaEdit, FaTrash, FaToggleOn, FaToggleOff, FaPlus } from "react-icons/fa";
import toast from "react-hot-toast";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";

export default function AdminRooms() {
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token")

  const fetchRooms = () => {
    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/api/rooms")
      .then((res) => {
        console.log(res.data);
        setRooms(res.data.rooms);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  const handleDelete = (roomId) => {
    //check if token is available
    if (token == null) {
      window.location.href = "/login";
    }

    if(!confirm("Are you sure you want to delete this room?")) return;
    axios
      .delete(`${import.meta.env.VITE_BACKEND_URL}/api/rooms/${roomId}`,{
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then(() => {
        toast.success("Room deleted successfully");
        fetchRooms();
      })
      .catch(() => {
        toast.error("Error deleting room");
      });
  };

  const handleToggleAvailability = (roomId, currentStatus) => {
    axios
      .put(`${import.meta.env.VITE_BACKEND_URL}/api/rooms/${roomId}`, {
        available: !currentStatus,
      },{
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then(() => {
        toast.success("Room availability updated");
        fetchRooms();
      })
      .catch(() => {
        toast.error("Error updating room availability");
      });
  };

  const openModal = (room) => {
    setSelectedRoom(room);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedRoom(null);
  };

  return (
    <div className="w-full p-6 bg-gray-50">
      <button
        className="bg-blue-600 text-white w-14 h-14 rounded-full flex justify-center items-center fixed bottom-5 right-5 shadow-lg hover:bg-blue-700 transition"
        onClick={() => {
          navigate("/admin/add-room");
          }
        }
      >
        <FaPlus />
      </button>
      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse border border-gray-300 shadow-sm bg-white rounded-lg">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="border border-gray-300 px-4 py-3 text-left">Room ID</th>
              <th className="border border-gray-300 px-4 py-3 text-left">Category</th>
              <th className="border border-gray-300 px-4 py-3 text-left">Max Guests</th>
              <th className="border border-gray-300 px-4 py-3 text-left">Available</th>
              <th className="border border-gray-300 px-4 py-3 text-left">Special Description</th>
              <th className="border border-gray-300 px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rooms.map((room, index) => (
              <tr
                key={room.roomId}
                className={`${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                } text-gray-700`}
                onClick={() => openModal(room)}
              >
                <td className="border border-gray-300 px-4 py-2">{room.roomId}</td>
                <td className="border border-gray-300 px-4 py-2">{room.category}</td>
                <td className="border border-gray-300 px-4 py-2">{room.maxGuests}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {room.available ? "Yes" : "No"}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {room.specialDescription || "N/A"}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <div className="flex space-x-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleToggleAvailability(room.roomId, room.available);
                      }}
                      className="text-blue-500 hover:text-blue-700 transition"
                    >
                      {room.available ? <FaToggleOn /> : <FaToggleOff />}
                    </button>
                    <button
                      onClick={() => {
                        navigate("/admin/update-room", { state:  room  });
                      }}
                      className="text-green-500 hover:text-green-700 transition"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(room.roomId);
                      }}
                      className="text-red-500 hover:text-red-700 transition"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for room photos */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="bg-white p-6 rounded-lg shadow-lg w-3/4 mx-auto mt-10"
        ariaHideApp={false}
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      >
        {selectedRoom && (
          <div>
            <h2 className="text-xl font-semibold mb-4">
              Room {selectedRoom.roomId} - Photos
            </h2>
            <div className="grid grid-cols-3 gap-4">
              {selectedRoom.photos.map((photo, index) => (
                <img
                  key={index}
                  src={photo}
                  alt={`Room ${selectedRoom.roomId} - Photo ${index + 1}`}
                  className="w-full h-32 object-cover rounded-lg shadow"
                />
              ))}
            </div>
            <button
              onClick={closeModal}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              Close
            </button>
          </div>
        )}
      </Modal>
    </div>
  );
}
