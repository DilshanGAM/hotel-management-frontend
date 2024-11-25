import { useState, useEffect } from "react";
import uploadMedia from "../../../utils/mediaUpload.js";
import { getDownloadURL } from "firebase/storage";
import axios from "axios";
import toast from "react-hot-toast";

export default function AddRoomForm() {
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [maxGuests, setMaxGuests] = useState(3);
  const [specialDescription, setSpecialDescription] = useState("");
  const [notes, setNotes] = useState("");
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const token = localStorage.getItem("token");
  if (token == null) {
    window.location.href = "/login";
  }

  useEffect(() => {
    // Fetch categories from the backend
    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/api/category")
      .then((res) => {
        setCategories(res.data.categories);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Failed to load categories.");
      });
  }, []);

  const handleImageChange = (e) => {
    setImages(Array.from(e.target.files)); // Handle multiple files
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const imageUploadPromises = images.map((image) =>
      uploadMedia(image).then((snapshot) =>
        getDownloadURL(snapshot.ref)
      )
    );

    try {
      const imageUrls = await Promise.all(imageUploadPromises);
      const roomData = {
        category,
        maxGuests,
        specialDescription,
        notes,
        photos: imageUrls,
      };

      const result = await axios.post(import.meta.env.VITE_BACKEND_URL + "/api/rooms", roomData, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      console.log(result)

      toast.success("Room added successfully!");
      setIsLoading(false);
    } catch (err) {
      console.error(err);
      toast.error("Failed to add room.");
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full h-[100vh] flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-8 space-y-4 bg-white rounded shadow-lg"
      >
        <div>
          <label className="block text-gray-700">Category:</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-4 py-2 mt-1 border rounded"
            required
          >
            <option value="" disabled>
              Select a category
            </option>
            {categories.map((cat, index) => (
              <option key={index} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-gray-700">Max Guests:</label>
          <input
            type="number"
            value={maxGuests}
            onChange={(e) => setMaxGuests(Number(e.target.value))}
            className="w-full px-4 py-2 mt-1 border rounded"
            required
            min="1"
          />
        </div>

        <div>
          <label className="block text-gray-700">Special Description:</label>
          <textarea
            value={specialDescription}
            onChange={(e) => setSpecialDescription(e.target.value)}
            className="w-full px-4 py-2 mt-1 border rounded"
          />
        </div>

        <div>
          <label className="block text-gray-700">Notes:</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full px-4 py-2 mt-1 border rounded"
          />
        </div>

        <div>
          <label className="block text-gray-700">Images:</label>
          <input
            type="file"
            multiple
            onChange={handleImageChange}
            className="w-full px-4 py-2 mt-1"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full px-4 py-2 mt-4 font-bold text-white bg-blue-500 rounded hover:bg-blue-600 flex justify-center items-center"
        >
          {isLoading ? (
            <div className="border-t-2 border-t-white w-[20px] min-h-[20px] rounded-full animate-spin"></div>
          ) : (
            <span>Add Room</span>
          )}
        </button>
      </form>
    </div>
  );
}
