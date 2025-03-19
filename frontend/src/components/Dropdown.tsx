import { useState } from "react";
import { Avator } from "./BlogCard";
import { useNavigate } from "react-router-dom";


export function Dropdown({name}:{name:string}){
     const navigate = useNavigate();  
    const [open,setOpen] = useState(false);
         
    const handleclick=()=>{
         
        localStorage.removeItem('token');
        navigate('/signin');
     }
     
     return( 
                <div className="relative">
                         
                         <button onClick={()=>{setOpen(!open)}} >
                                   <Avator name={name} size={3}></Avator>
                         </button>
                         
                       {open && (
                            <div className="w-48 h-38  absolute right-0 z-10 bg-[#ffffff] border  rounded-md shadow-md ">

                            <button onClick={()=>{ navigate('/myposts')} }
                             className="block w-full px-6 py-3 text-left font-semibold hover:bg-gray-200"> 📝 My Posts</button>

                            <button onClick={()=>{ navigate('/mydrafts')} }
                             className="block w-full px-6 py-3 text-left font-semibold hover:bg-gray-200">📑 Drafts</button>

                            <button onClick={handleclick}
                             className="block w-full px-6 py-3 text-left font-semibold hover:bg-gray-200"> ↩ Log-out</button>

                            </div>
                       )}  

                </div>
     )

}