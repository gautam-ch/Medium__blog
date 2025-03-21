import axios from "axios";
import {useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";
import { useQueryClient } from "@tanstack/react-query";


interface PropType{
    imageUrl:string,
    title:string,
    createdAt:string,
    content:string,
    blogId:string,
    published:boolean
}

export function PostCard({imageUrl,title,createdAt,content,blogId,published}:PropType){
            const queryClient =useQueryClient(); 
            const navigate = useNavigate();
            const date = new Date(createdAt);
            const published_date=date.toDateString();
        

        const handleDelete=async(e:any)=>{
               e.preventDefault();
               e.stopPropagation();
               try{
                        const res = await axios.delete(`${BACKEND_URL}/api/v1/post/blog?id=${blogId}`,{
                            headers:{
                                Authorization:`Bearer ${localStorage.getItem('token')}`
                            }
                        })

                        console.log(res);
                        queryClient.invalidateQueries({queryKey:["myposts"]});              
               } 
               catch(err:any){
                console.log('error in deleting blog',err.message);
               }  
        }   
        const handlePublish = async(e:any)=>{
            e.preventDefault();
            e.stopPropagation();

                try{ 
                              const res = await axios.put(`${BACKEND_URL}/api/v1/post/publish?id=${blogId}`,{
                                  published:true
                              },{
                                     headers:{
                                        Authorization:`Bearer ${localStorage.getItem('token')}`
                                     }
                              })
                              console.log('publish',res);
                              queryClient.refetchQueries({queryKey:['mydrafts','myposts','AllBlogs']});
                }
                catch(err:any){
                    console.log({msg:"Error in deleting blog"},err.message);
                }
                        
        } 
        
        const handleEdit=async(e:any)=>{
            e.preventDefault();
            e.stopPropagation();
                navigate('/blog/post',{state:{imageUrl,title,content,blogId}});
        }

    return (
         <div className="w-[20rem] h-[22rem] grid grid-rows-6  bg-white rounded-lg  shadow-lg border-2 border-slate-200 
            transition-transform duration-300 hover:scale-105 hover:shadow-xl      ">

              <div className="row-span-3">
                    <img src={(imageUrl)|| "https://www.blogtyrant.com/wp-content/uploads/2019/07/draft-a-post.jpg"} alt="Cover Image"
                      className="w-full h-full object-cover rounded-t-lg "/>
              </div>

              <div className="row-span-2 px-3">
                    <div className="text-sm text-slate-400 mt-1">
                                published on {published_date}
                     </div>
                    <div className="max-w-full text-xl font-bold mt-3">
                        {title} 
                    </div>
                </div>   
                <div className="row-span-1 px-3 mt-4">

                    <div className="flex justify-around">
                          
                          <div>
                              <button  onClick={handleEdit}
                              className="px-6 py-1 border border-slate-300 rounded-xl
                              shadow-md bg-[#1A8B7E] hover:bg-[#1A8B7E]/15 text-white font-semibold">
                                  Edit
                               </button> 
                          </div> 
                                     <div className={published?'hidden':'inline'} >
                                     <button  onClick={handlePublish}
                                       className="px-6 py-1 border rounded-xl shadow-md font-semibold text-white
                                      border-slate-400 bg-blue-700 hover:bg-blue-400">
                                        publish  
                                     </button>
                                     </div>   
                           <div>
                                <button onClick={handleDelete}
                                   className="px-6 py-1 border border-slate-300 rounded-xl
                                   shadow-md bg-red-700 hover:bg-red-500 text-white font-semibold">
                                    Delete
                                </button>
                          </div>
                    </div>
                   
              </div>

         </div>
        
    )
      
} 