import { Link } from "react-router-dom"
interface BlogProps{
    id:string,
    authorName:string,
    title:string,
    content:string,
    publishedDate:string
}


export function BlogCard({authorName , title,content, publishedDate,id}:BlogProps){

    return ( 
        <Link to={`/blog/${id}`}>
    
         <div className="p-1 flex justify-center items-center">         
               <div className="max-w-xl border-b  border-slate-400 cursor-pointer">
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
                                    <div className="text-lg font-bold">
                                        {title}
                                    </div>
                                    <div className="mt-2 text-slate-500 text-sm">
                                        {`${content.slice(0,200)}...`}
                                    </div>
                           </div>
                            
                            <div className="mt-1 mb-2">
                                <span className="text-slate-500   border-2 border-slate-200 text-center text-[10px] p-1">
                                    {`${Math.ceil(content.length/100)} min read`}
                                </span>
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
         <div className={`bg-slate-300  w-[${size}rem] h-[${size}rem]  rounded-full font-semibold text-${size==2?'sm':'lg'} 
         flex justify-center items-center border-2 border-solid border-slate-500`}>
               {initial[0]}{surname[0]}
         </div>
    )
}