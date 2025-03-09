import { Link, useNavigate } from "react-router-dom"
import { Avator } from "./BlogCard"
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";
import axios from "axios";



export function AppBar(){
        const navigate= useNavigate();
         const [name,setName] =useState('Unknown');

          useEffect(()=>{
                   
                 const fun = async()=>{
                              
                          const res = await axios.get(`${BACKEND_URL}/api/v1/user/profile`,{
                              headers:{
                                Authorization:`Bearer ${localStorage.getItem('token')}`
                              }
                          })

                        //   console.log('profile',res.data.name);
                          setName(res.data.name);

                 }
                  fun()
          },[])

    const handleclick=()=>{
           localStorage.removeItem('token');
           
           navigate('/signin');
    }
    return (
        <div className="flex justify-between px-20 border-b border-slate-400 py-3">
                  
                  <div className="font-serif font-semibold text-4xl flex items-center">
                          Medium
                  </div>

                  <div className="flex  items-center  gap-8">
                          <div className="  font-mono hover:underline text-xl">
                         <Link to='/blog/post'>write</Link>
                         </div>
                          <div className="  font-mono hover:underline text-xl"> 
                         <button onClick={handleclick} className="hover:underline">log-out</button>
                         </div>
                         <div>
                          <Avator size={3} name={name}/>
                          </div>
                  </div>
             
        </div>
    )
}