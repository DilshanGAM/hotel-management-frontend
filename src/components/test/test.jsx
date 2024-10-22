import { useState } from "react"

export default function TestComponent(){


  const [num , setNum] = useState(0)
 

  return (<div className="bg-red-900  w-full h-[100vh] flex justify-center items-center">

        <div className="bg-white w-[350px] h-[350px] flex justify-center items-center">

          <button className="w-[60px] h-[60px] bg-blue-500 rounded-full text-2xl text-white text-center"

          onClick={

            ()=>{
              
              const newNum = num -1

              setNum(newNum)

            }

          }
          
          >
            -
          </button>

          <span className="text-6xl ">
            {num}
          </span>

          <button className="w-[60px] h-[60px] bg-red-500 rounded-full text-2xl text-white text-center" 

          onClick={

            ()=>{
              
              const newNum = num+1
              //new num 2

              setNum(newNum)

            }       
        }
          >
            +
          </button>
        </div>

    </div>)
  
}