import { useParams } from "react-router-dom"
import { useBlogId } from "../hooks";
import { FullBlog } from "../components/FullBlog";
import FullBlogSkeleton from "../components/BlogSkelton";





export function BlogId(){
      
    const {id}=useParams();
                     console.log(id); 
        const {blog,loading}:any=useBlogId(id|| 'none');
             
        if(loading){
            return (
                <div>
                   <FullBlogSkeleton/>
                </div>
            )
        }
    
    return (
        <div>
            <FullBlog title={blog.title} content={blog.content} name={blog.author.name} publishedDate={blog.createdAt} imageUrl={blog.imageUrl} ></FullBlog>
        </div>
    )
}