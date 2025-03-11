import { Link } from "react-router-dom"
import { Safequillrender } from "./Safequillrender";

interface BlogProps{
    id:string,
    authorName:string,
    title:string,
    content:string,
    publishedDate:string,
    imageUrl:string
}


export function BlogCard({authorName , title,content, publishedDate,id,imageUrl}:BlogProps){

     const date = new Date(publishedDate);
     publishedDate = date.toDateString();
     const  minread=(Math.ceil(content.length/100));

    return ( 
        <Link to={`/blog/${id}`}>
           
         <div className="p-6 flex justify-center items-center">         
               <div className="max-w-3xl border-b  border-slate-400 cursor-pointer grid-cols-6">
                    
                    <div className="w-full flex gap-10">
                        <div className="grid-span-4">
                                <div className="flex items-center">
                                        
                                            <div>
                                                <Avator size={2} name={authorName}/>
                                            </div>         
                                            <div className="ml-4 text-slate-600 text-sm">
                                                {`${authorName} .`}
                                            </div>
                                            <div className="ml-2 text-slate-400 ">
                                                {publishedDate}
                                            </div>
                                </div>
                                        
                                 <div className="mt-2">
                                                <div className="text-xl font-bold">
                                                    {title}
                                                </div>
                                                <div className="mt-2 text-slate-500 text-sm w-[80%] overflow-hidden">
                                                    <Safequillrender content={`${content.slice(0,200)}...`}/>
                                                </div>
                                </div>
                                        
                                 <div className="mt-1 mb-6">
                                            <span className="text-slate-500   border-2 border-slate-200 text-center text-[10px] p-1">
                                                {`${minread>140?(120):minread} min read`}
                                            </span>
                                </div>
                          </div> 
                         
                         <div className="grid-span-2">
                                         <div className="w-40 h-30 flex items-center mt-10">
                                              <img src={imageUrl || "https://www.blogtyrant.com/wp-content/uploads/2019/07/draft-a-post.jpg"} 
                                              alt="Cover Image"  className="w-full h-full object-cover"/>
                                        </div>
                         </div>
                    </div>   
                   </div>      
               </div>
           
    
    </Link>
    )
}


    export function Avator({name,size}:{name:string,size:number}){
            
        const  arr=name.split(" ");
        const  initial =arr[0].toUpperCase();
        let surname="";
        if(arr.length>=2){
            surname=arr[1].toUpperCase();
        }

        return (
            <div className="w-full h-full">
            <div style={ {width:`${size}rem`, height:`${size}rem` } } className={`bg-slate-300 hover:bg-slate-500  hover:border-slate-600   rounded-full font-semibold text-${size==2?'sm':'lg'} 
            flex justify-center items-center border-2 border-solid border-slate-500`}>
                {initial[0]}{surname[0]}
            </div>
            </div>
        )
    }