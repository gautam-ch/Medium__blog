import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

import { useQuery } from "@tanstack/react-query";


export function useBlogId(id:string){
     const navigate=useNavigate();
     
       const query = useQuery({
         queryKey:['BlogById',id],
         queryFn:async()=>{
                  
          try{
            const blog=await axios.get(`${BACKEND_URL}/api/v1/post/blog/${id}`,{
              headers:{
                  Authorization:`Bearer ${localStorage.getItem('token')}`
              }
            });
             return blog.data.Posts;
          
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
       })

        const {isPending,data}=query;
         return{
             data,
             isPending
         }
}



export function useBlogs(){

     const query = useQuery({
          queryKey:['AllBlogs'],
          queryFn:async()=>{
                    try{
                      const blog=await axios.get(`${BACKEND_URL}/api/v1/post/blog`,{
                        headers:{
                            Authorization:localStorage.getItem('token')
                        }
                      });
                      
                      // console.log(blog.data.posts);
                      return(blog.data.posts);
                      
                    }
                    catch(err:any){
                        console.log({error :'error in fetching blogs',details:err.message})
                    }
          }
     });

  
        const {isPending,data}=query;
    return (
        {
            isPending,
            data
        }
    )

}


export function usePosts(){

  const navigate=useNavigate();

     const query = useQuery({
      queryKey:['myposts'],
      queryFn:async()=>{
                   
                   try{
                            const res = await axios.get(`${BACKEND_URL}/api/v1/post/myposts`,{
                              headers:{
                                Authorization:`Bearer ${localStorage.getItem('token')}`
                              }
                            });
                            
                            return res.data.posts;
                         
                   }
                   catch(error:any){
                            
                           console.log({error:'error in fetching posts'},error);

                           if(error.response.status==401){
                                   navigate('/signin');
                           }
                    return null
                   }
      }
     })

     const {isPending,data}=query;

     return{
      isPending,
      data
     }

}



export function useDraft(){

  const navigate=useNavigate();

     const query = useQuery({
      queryKey:['mydrafts'],
      staleTime: 0,
      queryFn:async()=>{
                   
                   try{
                            const res = await axios.get(`${BACKEND_URL}/api/v1/post/mydrafts`,{
                              headers:{
                                Authorization:`Bearer ${localStorage.getItem('token')}`
                              }
                            });
                            
                            return res.data.drafts;
                         
                   }
                   catch(error:any){
                            
                           console.log({error:'error in fetching posts'},error);

                           if(error.response.status==401){
                                   navigate('/signin');
                           }
                    return null
                   }
      }
     })

     const {isPending,data}=query;

     return{
      isPending,
      data
     }

}