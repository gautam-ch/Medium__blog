import { Link } from "react-router-dom"
import { Avator } from "./BlogCard"






export function AppBar(){
    return (
        <div className="flex justify-between px-20 border-b border-slate-400 py-3">
                  
                  <div className="font-serif font-semibold text-4xl flex items-center">
                          Medium
                  </div>

                  <div className="flex  items-center  gap-8">
                          <div className="  font-mono hover:underline text-xl">
                         <Link to='/blog/post'>write</Link>
                         </div>
                          <div className="  font-mono hover:underline text-xl"> 
                         <Link to='/signin'>sign-in</Link>
                         </div>
                         <div>
                          <Avator size={3} name="Gautam Chouhan"/>
                          </div>
                  </div>
             
        </div>
    )
}