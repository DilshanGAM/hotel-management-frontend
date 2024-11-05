import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import {Link, useNavigate} from "react-router-dom"

export default function AdminCategories() {
  
  const token = localStorage.getItem("token");

  if(token == null){
    window.location.href = "/login"
  }

  



  const [categories, setCategories] = useState([]);
  const [categoriesIsLoaded, setCategoriesIsLoaded] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (!categoriesIsLoaded) {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/category")
        .then((res) => {
          console.log(res.data.categories);
          setCategories(res.data.categories);
          setCategoriesIsLoaded(true);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [categoriesIsLoaded]);

  function handleDelete(name){
    

    axios.delete(import.meta.env.VITE_BACKEND_URL+"/api/category/"+name , {
      headers: {
        Authorization : "Bearer "+token
      }
    }).then((res)=>{
      setCategoriesIsLoaded(false)
      toast.success("Category deleted successfully")
    }).catch((err)=>{
      toast.error("Error deleting category")
    })

  }

  function handlePlusClick(){
    //go to add categoryu
    //window.location.href = "/admin/add-category"
    navigate("/admin/add-category")
  }

  return (
    <div className="w-full">

      <button className="bg-red-900 w-[60px] h-[60px] rounded-full text-2xl text-center flex justify-center items-center fixed bottom-5 right-5"  onClick={()=>{
        handlePlusClick()
      }}>
        <FaPlus color="white"/>
      </button>

      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">Price</th>
            <th className="border border-gray-300 px-4 py-2">Features</th>
            <th className="border border-gray-300 px-4 py-2">Description</th>
            <th className="border border-gray-300 px-4 py-2">Image</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>{" "}
            {/* Actions column */}
          </tr>
        </thead>
        <tbody>
          {categories.map((category, index) => (
            <tr key={index} className="text-center">
              <td className="border border-gray-300 px-4 py-2">
                {category.name}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                ${category.price}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <ul>
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
                    className="h-16 w-16 object-cover"
                  />
                ) : (
                  "No Image"
                )}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <Link className="text-blue-500 mr-2"
                    to={"/admin/update-category"} 
                    state={category}>
                  <FaEdit /> 
                </Link>

                <button onClick={() => {handleDelete(category.name)}} className="text-red-500">
                  <FaTrash /> {/* Delete icon */}
                </button>

              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
