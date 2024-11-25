import { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; // Slick styles
import "slick-carousel/slick/slick-theme.css"; // Slick theme
import axios from "axios";
import toast from "react-hot-toast";

export default function HomePage() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Slider settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  // Load categories on mount
  useEffect(() => {
    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/api/category")
      .then((res) => {
        setCategories(res.data.categories || []);
      })
      .catch(() => {
        toast.error("Failed to load categories.");
      });
  }, []);

  // Book by category
  const handleBooking = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login to make a booking.");
      return;
    }

    if (!selectedCategory || !startDate || !endDate) {
      toast.error("Please fill out all fields.");
      return;
    }

    if (new Date(startDate) >= new Date(endDate)) {
      toast.error("Start date must be earlier than end date.");
      return;
    }

    setIsLoading(true);
    axios
      .post(
        import.meta.env.VITE_BACKEND_URL + "/api/bookings/create-by-category",
        {
          category: selectedCategory,
          start: startDate,
          end: endDate,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        toast.success(res.data.message || "Booking created successfully!");
      })
      .catch((err) => {
        toast.error(err.response?.data?.message || "Booking failed.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <>
      <div className="relative w-full h-screen">
        {/* Image Slider */}
        <div className="absolute inset-0 z-0">
          <Slider {...settings}>
            <div>
              <img
                src="/1.jpg"
                alt="Slide 1"
                className="w-full h-screen object-cover"
              />
            </div>
            <div>
              <img
                src="/2.jpg"
                alt="Slide 2"
                className="w-full h-screen object-cover"
              />
            </div>
            <div>
              <img
                src="/3.jpg"
                alt="Slide 3"
                className="w-full h-screen object-cover"
              />
            </div>
            <div>
              <img
                src="/4.jpg"
                alt="Slide 4"
                className="w-full h-screen object-cover"
              />
            </div>
          </Slider>
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center space-y-10 h-full bg-black bg-opacity-50">
          {/* Booking Section */}
          <div className="bg-white shadow-lg rounded-lg p-8 flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="border border-gray-300 rounded-md px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />

            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="border border-gray-300 rounded-md px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="border border-gray-300 rounded-md px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select Category</option>
              {categories.map((category, index) => (
                <option key={index} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>

            <button
              onClick={handleBooking}
              disabled={isLoading}
              className={`${
                isLoading
                  ? "bg-blue-300 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              } text-white px-6 py-2 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 transition`}
            >
              {isLoading ? "Booking..." : "Book Now"}
            </button>
          </div>

          {/* Welcome Section */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-6xl text-white font-bold">
              Welcome to Leonine Villa
            </h1>
            <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto">
              Experience luxury and comfort at its finest. Book your stay with
              us today and enjoy a memorable getaway.
            </p>
          </div>

          {/* Call-to-Action */}
          <div className="flex justify-center space-x-4">
            <button className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-md shadow-md hover:bg-gray-100 transition">
              Explore Rooms
            </button>
            <button className="bg-transparent border border-white text-white font-semibold px-6 py-3 rounded-md hover:bg-white hover:text-blue-600 transition">
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
