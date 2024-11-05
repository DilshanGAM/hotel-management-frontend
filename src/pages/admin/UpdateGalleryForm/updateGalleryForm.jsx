import { useState } from "react";
import uploadMedia from "../../../utils/mediaUpload.js";
import { getDownloadURL } from "firebase/storage";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function UpdateGalleryItemForm() {
  const location = useLocation();
  const navigate = useNavigate();

  // Redirect if location state is not present
  if (!location.state) {
    window.location.href = "/admin/gallery";
  }

  // Set initial state from location data
  const [name, setName] = useState(location.state.name);
  const [description, setDescription] = useState(location.state.description);
  const [image, setImage] = useState(null); // New image
  const [isLoading, setIsLoading] = useState(false);

  // Token for authorization
  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "/login";
  }

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);

    if (!image) {
      // Use existing image if no new one is uploaded
      const galleryItemInfo = {
        name,
        description,
        image: location.state.image,
      };

      axios
        .put(
          `${import.meta.env.VITE_BACKEND_URL}/api/gallery/${
            location.state._id
          }`,
          galleryItemInfo,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          setIsLoading(false);
          toast.success("Gallery item updated successfully");
          navigate("/admin/gallery-items");
        })
        .catch((err) => {
          setIsLoading(false);
          toast.error("Error updating gallery item");
          console.error(err);
        });
    } else {
      // Upload new image if selected
      uploadMedia(image)
        .then((snapshot) => getDownloadURL(snapshot.ref))
        .then((url) => {
          const galleryItemInfo = {
            name,
            description,
            image: url,
          };

          axios
            .put(
              `${import.meta.env.VITE_BACKEND_URL}/api/gallery/${
                location.state._id
              }`,
              galleryItemInfo,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            )
            .then((res) => {
              setIsLoading(false);
              toast.success("Gallery item updated successfully");
              navigate("/admin/gallery-items");
            });
        })
        .catch((err) => {
          setIsLoading(false);
          toast.error("Error updating gallery item");
          console.error(err);
        });
    }
  }

  return (
    <div className="w-full h-[100vh] flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-8 space-y-4 bg-white rounded shadow-lg"
      >
        <div>
          <label className="block text-gray-700">Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 mt-1 border rounded"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700">Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2 mt-1 border rounded"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700">Image:</label>
          <input
            type="file"
            onChange={handleImageChange}
            className="w-full px-4 py-2 mt-1"
          />
        </div>

        <button
          type="submit"
          className="w-full px-4 py-2 mt-4 font-bold text-white bg-blue-500 rounded hover:bg-blue-600 flex justify-center"
        >
          {isLoading ? (
            <div className="border-t-2 border-t-white w-[20px] min-h-[20px] rounded-full animate-spin"></div>
          ) : (
            <span>Update Gallery Item</span>
          )}
        </button>
      </form>
    </div>
  );
}
