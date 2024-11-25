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
import AddCategoryForm from "../admin/AddCategoryForm/addCategoryForm";
import UpdateCategoryForm from "../admin/UpdateCategoryForm/updateCategory";
import AddGalleryItemForm from "../admin/AddGalleryForm/addGalleryForm";
import UpdateGalleryItemForm from "../admin/UpdateGalleryForm/updateGalleryForm";
import AddRoomForm from "../admin/AddRoomFrom/addRoomForm";
import UpdateRoomForm from "../admin/UpdateRoomForm/updateRoomForm";


export default function AdminPage() {
  return (
    <div className="w-full max-h-[100vh] flex">
      <div className="w-[250px]  h-[100vh] flex flex-col ">
        <img src="/logo.png" alt="logo" className="w-[100%] h-[100px]" />
        <div className="text-adminText text-[16px] h-[48px] hover:text-adminTextHover flex justify-start items-center px-4">
          <Link to="/admin/bookings" className="flex items-center gap-2">
            <CiBookmarkCheck />
            Bookings
          </Link>
        </div>

        <div className="text-adminText text-[16px] h-[48px] hover:text-adminTextHover flex justify-start items-center px-4">
          <Link to="/admin/categories" className="flex items-center gap-2">
            <MdOutlineCategory />
            Categories
          </Link>
        </div>

        <div className="text-adminText text-[16px] h-[48px] hover:text-adminTextHover flex justify-start items-center px-4">
          <Link to="/admin/rooms" className="flex items-center gap-2">
            <MdOutlineRoom />
            Rooms
          </Link>
        </div>

        <div className="text-adminText text-[16px] h-[48px] hover:text-adminTextHover flex justify-start items-center px-4">
          <Link to="/admin/users" className="flex items-center gap-2">
            <FiUsers />
            Users
          </Link>
        </div>

        <div className="text-adminText text-[16px] h-[48px] hover:text-adminTextHover flex justify-start items-center px-4">
          <Link to="/admin/feedback" className="flex items-center gap-2">
            <MdOutlineFeedback />
            Feedback
          </Link>
        </div>

        <div className="text-adminText text-[16px] h-[48px] hover:text-adminTextHover flex justify-start items-center px-4">
          <Link to="/admin/gallery-items" className="flex items-center gap-2">
            <FiImage />
            Gallery Items
          </Link>
        </div>
      </div>

      <div className="w-[calc(100vw-250px)] max-h-[100vh] overflow-y-scroll ">

        <Routes path="/*">
          <Route path="/bookings" element={<AdminBooking
            />
          } />
          <Route path="/categories" element={<AdminCategories/>} />
          <Route path="/add-category" element={<AddCategoryForm/>} />
          <Route path="/update-category" element={<UpdateCategoryForm/>}/>
          <Route path="/rooms" element={<AdminRooms/>} />
          <Route path="/add-room" element={<AddRoomForm/>} />
          <Route path="/update-room" element={<UpdateRoomForm/>}/>
          <Route path="/users" element={<AdminUsers/>} />
          <Route path="/feedback" element={<AdminFeedback/>} />
          <Route path="/gallery-items" element={<AdminGalleryItems/>} />
          <Route path="/add-gallery-item" element={<AddGalleryItemForm/>}/>
          <Route path="/update-gallery-item" element={<UpdateGalleryItemForm/>}/>
        </Routes>
      </div>
    </div>
  );
}
