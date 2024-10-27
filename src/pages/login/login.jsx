import { useState } from "react";
import axios from "axios";
import "./login.css";
export default function LoginPage(){

  const [email ,setEmail] = useState("")
  const [password , setPassword] = useState("")

  function handleLogin(){

    axios.post(import.meta.env.VITE_BACKEND_URL+"/api/users/login",
      {
        email : email,
        password : password
      }
    ).then(
      (res)=>{

      localStorage.setItem("token",res.data.token)
      
      console.log(res.data.type)

      if(res.data.user.type == "customer"){
        window.location.href = "/"
      }else if(res.data.user.type == "admin"){
        window.location.href = "/admin"
      }
      

    }).catch((err)=>{

      console.log(err)

    })

  }

  return(
    <div className="w-full h-[100vh]  pic-bg  flex justify-center items-center">
      <div className="w-[400px] h-[400px] backdrop-blur-md  rounded-lg flex flex-col items-center justify-center relative">
        <h1 className="text-3xl p-[15px] text-white absolute top-[40px] text-center">Login</h1>



        <input type="text" placeholder="Enter your email address" className="w-[80%] bg-[#00000000]  border-[2px]  text-white placeholder:text-white h-[50px] px-[5px] mb-[20px] " 
        defaultValue={email} 
        onChange={

          (e)=>{
            setEmail(e.target.value)
          }

        } />


        <input type="password" placeholder="Enter your password" className="w-[80%] bg-[#00000000]  border-[2px]  text-white placeholder:text-white h-[50px] px-[5px] " defaultValue={password} onChange={
          (e)=>{
            setPassword(e.target.value)
          }
        }/>

        <button className="w-[80%] absolute bottom-[40px] bg-red-500 text-white h-[50px] " onClick={handleLogin}>Login</button>

      </div>
    </div>
  )
}


