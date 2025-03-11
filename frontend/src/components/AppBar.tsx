import { Link, useNavigate } from "react-router-dom"
import { BACKEND_URL } from "../config";
import axios from "axios";
import { Dropdown } from "./Dropdown";
import { HiOutlinePencilSquare } from "react-icons/hi2"
import { useQuery } from "@tanstack/react-query";


export function AppBar(){
        const navigate= useNavigate();
        
         const query = useQuery({
                queryKey:['profile'],
                queryFn:async()=>{
                        try{
                        const res = await axios.get(`${BACKEND_URL}/api/v1/user/profile`,{
                                headers:{
                                  Authorization:`Bearer ${localStorage.getItem('token')}`
                                }
                            }) 
                            return res.data.name;
                        }
                        catch(error:any){
                              console.log({error:'Error in fetching profile'},error);
                              return null;
                        }
                }
         })
            console.log('as',query.data);
         const name=query.data || 'Unknown';
         
    const handleclick=()=>{
           navigate('/signin');
    }
    return (
        <div className="flex justify-between px-20 border-b-4 border-blue-800 py-3 bg-[#f5f4f0]">
                  
                  <div className="font-serif font-semibold text-4xl flex items-center">
                          Medium
                  </div>

                  <div className="flex  items-center  gap-8">
                          <div className="font-serif text-slate-500 hover:text-black">
                         <Link to='/blog/post' className="flex items-center gap-2"> <HiOutlinePencilSquare className="size-8"/> Write</Link>
                         </div>
                          <div className="  font-mono hover:underline text-xl"> 
                         <button onClick={handleclick}
                          className="w-35 h-8 bg-green-700 px-2 text-sm rounded-2xl text-center font-thin text-white hover:bg-green-800">
                                Sign In</button>
                         </div>
                         <div>
                             <Dropdown name={name}></Dropdown>
                          </div>
                  </div>
             
        </div>
    )
}