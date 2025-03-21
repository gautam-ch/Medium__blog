import { Link } from "react-router-dom";
import { AppBar } from "../components/AppBar";
import { PostCard } from "../components/PostCard";
import { usePosts } from "../hooks";
import { Spinner } from "../components/Spinner";



export function Myposts(){
           
    const {isPending ,data} = usePosts();

      console.log('inpost',isPending,data);

        if(isPending){
            return(
                <div>
                   <Spinner></Spinner>
                </div>
            )
        }
    return(
        <>
             <div>
               <AppBar></AppBar>    
            </div>  
              <div className="flex  justify-center mt-12 mb-8">

                    {
                        data.length>0?(
                    <div className="grid grid-cols-1 sm:grid-cols-2   md:grid-cols-3 gap-12 ">
                        
                        {data.map((blog:any,index:number)=>(
                            <Link to={`/blog/${blog.id}`}>
                            <PostCard  key={index} title={blog.title} imageUrl={blog.imageUrl} 
                                        createdAt={blog.createdAt} content={blog.content}
                                        blogId={blog.id} published={blog.published}>
                            </PostCard>
                            </Link> 
                        ))}     
                    </div>):(
                        <div className="w-[80%] py-4 shadow-md bg-blue-300 font-bold text-3xl text-white flex justify-center mt-[6em]">
                            No Posts
                        </div>
                      )
                   }
             </div>  

        </>
    )
}