import { Link, Route, Routes } from "react-router-dom";
import { CiBookmarkCheck } from "react-icons/ci";
import {
  MdOutlineCategory,
  MdOutlineRoom,
  MdOutlineFeedback,
} from "react-icons/md";
import { FiUsers, FiImage } from "react-icons/fi";
import AdminBooking from "../admin/Bookings/adminBooking";
import AdminCategories from "../admin/categories/adminCategories";
import AdminRooms from "../admin/rooms/rooms";
import AdminUsers from "../admin/users/users";
import AdminFeedback from "../admin/feedback/feedback";
import AdminGalleryItems from "../admin/galleryItems/galleryItems";

export default function AdminPage() {
  return (
    <div className="w-full max-h-[100vh] flex">
      <div className="w-[20%] bg-blue-400 h-[100vh] flex flex-col ">
        <div className="text-white text-[30px] hover:font-bold flex justify-start items-center px-4">
          <Link to="/admin/bookings" className="flex items-center gap-2">
            <CiBookmarkCheck />
            Bookings
          </Link>
        </div>

        <div className="text-white text-[30px] hover:font-bold flex justify-start items-center px-4">
          <Link to="/admin/categories" className="flex items-center gap-2">
            <MdOutlineCategory />
            Categories
          </Link>
        </div>

        <div className="text-white text-[30px] hover:font-bold flex justify-start items-center px-4">
          <Link to="/admin/rooms" className="flex items-center gap-2">
            <MdOutlineRoom />
            Rooms
          </Link>
        </div>

        <div className="text-white text-[30px] hover:font-bold flex justify-start items-center px-4">
          <Link to="/admin/users" className="flex items-center gap-2">
            <FiUsers />
            Users
          </Link>
        </div>

        <div className="text-white text-[30px] hover:font-bold flex justify-start items-center px-4">
          <Link to="/admin/feedback" className="flex items-center gap-2">
            <MdOutlineFeedback />
            Feedback
          </Link>
        </div>

        <div className="text-white text-[30px] hover:font-bold flex justify-start items-center px-4">
          <Link to="/admin/gallery-items" className="flex items-center gap-2">
            <FiImage />
            Gallery Items
          </Link>
        </div>
      </div>

      <div className="w-[80%] max-h-[100vh] overflow-y-scroll   bg-blue-900">

        <Routes path="/*">
          <Route path="/bookings" element={<AdminBooking
            />
          } />
          <Route path="/categories" element={<AdminCategories/>} />
          <Route path="/rooms" element={<AdminRooms/>} />
          <Route path="/users" element={<AdminUsers/>} />
          <Route path="/feedback" element={<AdminFeedback/>} />
          <Route path="/gallery-items" element={<AdminGalleryItems/>
          } />

        </Routes>
      </div>
    </div>
  );
}
