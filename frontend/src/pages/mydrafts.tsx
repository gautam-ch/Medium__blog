import { Link } from "react-router-dom";
import { AppBar } from "../components/AppBar";
import { PostCard } from "../components/PostCard";
import { useDraft } from "../hooks"


export function Mydrafts(){     

            const  {isPending,data} = useDraft();
            if(isPending){
                return (
                    <div>
                        loading...
                    </div>
                )
            }
            if(!data){
                 return (
                    <div>
                        No Drafts
                    </div>
                 )
            }
            
    return (
        <>
        <div>
               <AppBar></AppBar>    
        </div>  
        <div className="flex  justify-center mt-12 mb-8">
            <div className="grid grid-cols-1 sm:grid-cols-2   md:grid-cols-3 gap-12 ">
                
                {data.map((blog:any,index:number)=>(
                     <Link to={`/blog/${blog.id}`}>
                       <PostCard  key={index} title={blog.title} imageUrl={blog.imageUrl} 
                                  createdAt={blog.createdAt} content={blog.content}
                                  blogId={blog.id} published={blog.published}>
                       </PostCard>
                    </Link> 
                ))}
                
                
            </div>
       </div>  

    </>

    )
}