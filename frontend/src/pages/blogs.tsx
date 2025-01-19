import { AppBar } from "../components/AppBar";
import { BlogCard } from "../components/BlogCard";
import { useBlogs } from "../hooks";



export function Blog(){
          const {blogs,loading}= useBlogs();

          if(loading){
            return (
                <div>
                    loading...
                </div>
            )
          }


    return (
        <div className="w-screen h-full bg-[#FAF5E6] ">  
                  
                  <div className="mb-4">
                        <AppBar/>       
                  </div>

                  <div>
                   {
                    blogs.map((blog:any)=>(
                        <BlogCard id={blog.id} authorName={blog.author.name} title={blog.title} content={blog.content} publishedDate="2nd feb 2024"/>
                    ))
                   }
                   </div> 
                  
                
                
        </div>
    )
}