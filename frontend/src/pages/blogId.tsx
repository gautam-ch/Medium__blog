import { useParams } from "react-router-dom"
import { useBlogId } from "../hooks";
import { FullBlog } from "../components/FullBlog";





export function BlogId(){
      
    const {id}=useParams();
                     console.log(id); 
        const {blog,loading}:any=useBlogId(id|| 'none');
             
        if(loading){
            return (
                <div>
                    loading...
                </div>
            )
        }
    
    return (
        <div>
            <FullBlog title={blog.title} content={blog.content} name={blog.author.name} publishedDate='2nd February 2024'></FullBlog>
        </div>
    )
}