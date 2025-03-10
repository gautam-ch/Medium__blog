import { AppBar } from "../components/AppBar";
import { BlogCard } from "../components/BlogCard";
import {BlogSkeleton} from "../components/BlogSkelton";
import { useBlogs } from "../hooks";



export function Blog(){
          const {data,isPending}= useBlogs();

          if(isPending){
            return (
                <div>
                    <BlogSkeleton/>
                </div>
            )
          }
          
          console.log('tanstack',data,isPending);   

    return (
        <div className="w-screen h-full bg-[#f7f6f1] ">  
                  
                  <div className="mb-4 ">
                        <AppBar/>       
                  </div>

                  <div className="w-full flex justify-center">
                    <div>
                        {
                            data.map((blog:any,index:number)=>(
                                <BlogCard key={index} id={blog.id} authorName={blog.author.name} title={blog.title} content={blog.content} publishedDate={blog.createdAt} imageUrl={blog.imageUrl}/>
                            ))
                        }
                   </div>
                   </div> 
                  
                
                
        </div>
    )
}