import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

export default function AdminGalleryItems() {
  const token = localStorage.getItem("token");

  if (token == null) {
    window.location.href = "/login";
  }

  const [galleryItems, setGalleryItems] = useState([]);
  const [galleryItemsIsLoaded, setGalleryItemsIsLoaded] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (!galleryItemsIsLoaded) {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/gallery")
        .then((res) => {
          console.log(res)
          console.log(res.data.list);
          setGalleryItems(res.data.list);
          setGalleryItemsIsLoaded(true);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [galleryItemsIsLoaded]);

  function handleDelete(id) {
    axios
      .delete(import.meta.env.VITE_BACKEND_URL + "/api/gallery/" + id, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        setGalleryItemsIsLoaded(false);
        toast.success("Gallery item deleted successfully");
      })
      .catch((err) => {
        toast.error("Error deleting gallery item");
      });
  }

  function handlePlusClick() {
    navigate("/admin/add-gallery-item");
  }

  return (
    <div className="w-full">
      <button
        className="bg-red-900 w-[60px] h-[60px] rounded-full text-2xl text-center flex justify-center items-center fixed bottom-5 right-5"
        onClick={handlePlusClick}
      >
        <FaPlus color="white" />
      </button>

      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">Description</th>
            <th className="border border-gray-300 px-4 py-2">Image</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {galleryItems.map((item, index) => (
            <tr key={index} className="text-center">
              <td className="border border-gray-300 px-4 py-2">{item.name}</td>
              <td className="border border-gray-300 px-4 py-2">
                {item.description}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-16 w-16 object-cover"
                  />
                ) : (
                  "No Image"
                )}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <Link
                  className="text-blue-500 mr-2"
                  to={"/admin/update-gallery-item"}
                  state={item}
                >
                  <FaEdit />
                </Link>

                <button
                  onClick={() => handleDelete(item._id)}
                  className="text-red-500"
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
