import { AppBar } from "./AppBar"
import { Avator } from "./BlogCard"


interface Propstype{
    title:string,
    content:string,
    name:string,
    publishedDate:string
}




export function FullBlog({title,name,content,publishedDate}:Propstype){
     
    return (
        <div>
        <AppBar/>
        <div className=" mt-[4rem] h-full flex justify-center items-center">
        <div className=" w-full grid grid-cols-12 mx-20">
                    
                    <div className="col-span-8">
                                <div className="text-4xl font-bold w-[80%] ">
                                    {title}
                                </div>
                                <div className=" text-md text-slate-400 font-mono mt-2">
                                  postend on {publishedDate}
                                </div>
                                <div className="prose text-lg font-serif text-slate-800 mt-8 ">
                                    {content}
                                    {content}
                                    {content}
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