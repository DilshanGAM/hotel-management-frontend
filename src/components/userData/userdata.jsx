import axios from "axios";
import { useEffect, useState } from "react";

function UserTag(props) {
  const [name, setName] = useState("");

  const [userFound , setUserFound] = useState(false)

  

  //useEffect( function , []   )
  useEffect(
    ()=>{
      const token = localStorage.getItem("token");
      if (token != null) {
        axios
          .get(import.meta.env.VITE_BACKEND_URL + "/api/users/", {
            headers: {
              Authorization: "Bearer " + token,
              "Content-Type": "application/json",
            },
          })
          .then((res) => {
            console.log(res);
            setName(res.data.user.firstName + " " + res.data.user.lastName);  

            setUserFound(true)
          });
      }else{
        setName("")
      }      
    },[userFound]
  );


  return (
    <div className="absolute right-0 flex  items-center cursor-pointer mr-2">
      <img className="rounded-full w-[75px] h-[75px]" src={props.imageLink} />
      <span className="text-white ml-[5px] text-xl r">{name}</span>

      <button onClick={()=>{
        localStorage.removeItem("token")
        setUserFound(false)
      }}>
        logout
      </button>
    </div>


  );
}

export default UserTag;
