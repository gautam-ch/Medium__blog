import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

export function useBlogId(id:string){
    const [loading,setLoading] = useState(true);
       const [blog,setBlog] = useState({});
         const navigate=useNavigate();
  
       useEffect(()=>{
             const call=async()=>{
                try{
                  const blog=await axios.get(`${BACKEND_URL}/api/v1/post/blog/${id}`,{
                    headers:{
                        Authorization:`Bearer ${localStorage.getItem('token')}`
                    }
                  });
                    console.log('Blog:',blog);
                  setBlog(blog.data.Posts);
                  setLoading(false);
                
                }
                catch(err:any){
                  console.log(err.response.status);
                        if(err.response.status==401){
                              console.log('unauthorized user');

                              navigate('/signin',{replace:true});
                        }
                    console.log({error :'error in fetching blogs',details:err.message})
                }

             }
             
           call();
       },[id])

      





    return (
        {
            loading,
            blog
        }
    )

}



export function useBlogs(){

    const [loading,setLoading] = useState(true);
    const [blogs,setBlogs] = useState([]);


       useEffect(()=>{
             const call=async()=>{
                try{
                  const blog=await axios.get(`${BACKEND_URL}/api/v1/post/blog`,{
                    headers:{
                        Authorization:localStorage.getItem('token')
                    }
                  });
                   
                  console.log(blog.data.posts);
                  setBlogs(blog.data.posts);
                  setLoading(false);
                
                }
                catch(err:any){
                    console.log({error :'error in fetching blogs',details:err.message})
                }

             }
             
           call();
       },[])

      





    return (
        {
            loading,
            blogs
        }
    )

}