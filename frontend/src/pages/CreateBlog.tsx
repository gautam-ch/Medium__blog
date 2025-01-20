import { useEffect, useState } from "react";
import { AppBar } from "../components/AppBar";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";





export function CreateBlog(){
           
    const [title,setTitle] = useState('');

    const [content,setContent] = useState('');

    const navigate=useNavigate();

    
    const  handlebutton=async()=>{

                    try{  
                        const res = await axios.post(`${BACKEND_URL}/api/v1/post/blog`,{
                                    title,
                                    content
                                    },{
                                        headers:{
                                            Authorization:`Bearer ${localStorage.getItem('token')}`
                                        }
                                    })
                                    console.log(res); 
                                
                                navigate(`/blog/${res.data.post.id}`);    


                    }catch(err:any){
                        console.log({error:'error in craeting blog',details:err.message});
                    }

          }
  

          

    return (   <div className="w-full h-screen">
                <AppBar/>
                  
                <div className="w-full flex justify-center -ml-10">
                <div>
                        <div  className="mt-[4rem]">
                            <input type='text' placeholder="Title"  onChange={(e)=>{setTitle(e.target.value)} }
                            className="w-[40rem] h-10 pl-2 border-2 border-slate-300 rounded-md 
                            outline-none focus:ring-2 focus:ring-blue-300 font-mono" />
                        </div> 

                        <div className="mt-8">
                           <textarea  rows={6} placeholder="Write an article..." 
                           className="w-full border-2 border-slate-200 outline-none focus:ring-2 focus:ring-blue-300
                            font-mono
                           " 
                           onChange={(e)=>{setContent(e.target.value)} }>

                           </textarea>
                        </div>
                       <div className="mt-8">
                       <button className="h-[2rem] w-[8rem] bg-gray-500 hover:bg-gray-400 text-white font-mono  border-b-4
                        border-gray-700 hover:border-gray-500 rounded" onClick={handlebutton}>
                              Publish post
                       </button>
                       </div>
                </div>  
                </div>  
                       
        </div>
    )
}
