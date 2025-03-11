import { useParams } from "react-router-dom"
import { useBlogId } from "../hooks";
import { FullBlog } from "../components/FullBlog";
import FullBlogSkeleton from "../components/BlogSkelton";





export function BlogId(){
      
    const {id}=useParams();
                    //  console.log(id); 
        const {data,isPending}:any=useBlogId(id|| 'none');
              
          console.log('tanstack',data,isPending);      

        if(isPending){
            return (
                <div>
                   <FullBlogSkeleton/>
                </div>
            )
        }
    
    return (
        <div className="bg-[#f5f4f0] h-full">
            <FullBlog title={data.title} content={data.content} name={data.author.name} publishedDate={data.createdAt} imageUrl={data.imageUrl} ></FullBlog>
        </div>
    )
}