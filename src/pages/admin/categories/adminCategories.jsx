import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

export default function AdminCategories() {
  const token = localStorage.getItem("token");

  if (token == null) {
    window.location.href = "/login";
  }

  const [categories, setCategories] = useState([]);
  const [categoriesIsLoaded, setCategoriesIsLoaded] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (!categoriesIsLoaded) {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/category")
        .then((res) => {
          setCategories(res.data.categories);
          setCategoriesIsLoaded(true);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [categoriesIsLoaded]);

  function handleDelete(name) {
    axios
      .delete(import.meta.env.VITE_BACKEND_URL + "/api/category/" + name, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then(() => {
        setCategoriesIsLoaded(false);
        toast.success("Category deleted successfully");
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  }

  function handlePlusClick() {
    navigate("/admin/add-category");
  }

  return (
    <div className="w-full p-6 bg-gray-50">
      {/* Add Category Button */}
      <button
        className="bg-blue-600 text-white w-14 h-14 rounded-full flex justify-center items-center fixed bottom-5 right-5 shadow-lg hover:bg-blue-700 transition"
        onClick={handlePlusClick}
      >
        <FaPlus />
      </button>

      {/* Categories Table */}
      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse border border-gray-300 shadow-sm bg-white rounded-lg">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="border border-gray-300 px-4 py-3 text-left">Name</th>
              <th className="border border-gray-300 px-4 py-3 text-left">Price</th>
              <th className="border border-gray-300 px-4 py-3 text-left">Features</th>
              <th className="border border-gray-300 px-4 py-3 text-left">Description</th>
              <th className="border border-gray-300 px-4 py-3 text-left">Image</th>
              <th className="border border-gray-300 px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category, index) => (
              <tr
                key={index}
                className={`${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                } text-gray-700`}
              >
                <td className="border border-gray-300 px-4 py-2">{category.name}</td>
                <td className="border border-gray-300 px-4 py-2">${category.price}</td>
                <td className="border border-gray-300 px-4 py-2">
                  <ul className="list-disc list-inside">
                    {category.features.map((feature, i) => (
                      <li key={i}>{feature}</li>
                    ))}
                  </ul>
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {category.description}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {category.image ? (
                    <img
                      src={category.image}
                      alt={category.name}
                      className="h-16 w-16 object-cover rounded-md border border-gray-300"
                    />
                  ) : (
                    <span className="italic text-gray-500">No Image</span>
                  )}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <div className="flex space-x-2">
                    <Link
                      className="text-blue-500 hover:text-blue-700 transition"
                      to={"/admin/update-category"}
                      state={category}
                    >
                      <FaEdit />
                    </Link>
                    <button
                      onClick={() => handleDelete(category.name)}
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
    </div>
  );
}
