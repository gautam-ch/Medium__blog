import { AppBar } from "./AppBar"
import { Avator } from "./BlogCard"
import { Safequillrender } from "./Safequillrender"


interface Propstype{
    title:string,
    content:string,
    name:string,
    publishedDate:string,
    imageUrl:string
}




export function FullBlog({title,name,content,publishedDate,imageUrl}:Propstype){

     const date = new Date(publishedDate);

     publishedDate=date.toDateString();
     
    return (
        <div>
        <AppBar/>
        <div className=" mt-[4rem] h-full flex justify-center items-center">
        <div className=" w-full grid grid-cols-12 mx-20">
 
                    <div className="col-span-8">
                                
                                <div className="w-[80%]">
                                    <img src={imageUrl} alt="coverImage" className="object-cover"/>
                                </div>
                                <div className="text-4xl font-bold w-[80%] mt-8 ">
                                    {title}
                                </div>
                                <div className=" text-md text-slate-400 font-mono mt-2">
                                  posted on {publishedDate}
                                </div>
                                <div className="my-8 text-xl">
                                    <Safequillrender content={content} />
                                </div>
                               
                    </div>
                    <div className="col-span-4 flex ml-8">
                        <div>
                                <div className="text-xl font-sans font-semibold">
                                    Author
                                </div>
                                <div className="flex mt-8 items-center" >      
                                            <div>
                                              <Avator size={2} name={name}/>
                                            </div> 
                                           <div className="text-3xl text-slate-900 font-semibold ml-8">
                                                {name}

                                                <div className="text-slate-500 text-sm mt-2">
                                                Master of mirth, purveyor of puns, and the funniest person in the kingdom.
                                                </div>
                                           </div>
                                </div>
                         </div>
                    </div>
        </div>
        </div>
        </div>
    )
}