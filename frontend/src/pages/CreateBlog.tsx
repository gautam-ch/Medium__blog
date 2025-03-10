import {  useRef, useState } from "react";
import { AppBar } from "../components/AppBar";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {BiSolidImageAdd} from "react-icons/bi";
import { modules } from "../utils/quillmodule";
import '../App.css';


export function CreateBlog(){
    const [title,setTitle] =     useState('');
    const [content,setContent] = useState('');
    const [image,setImage] =     useState<string | null>(null);
    
    const  quillRef = useRef<ReactQuill | null>(null);  
    const navigate=useNavigate();

    const  handleDynamicImage=async()=>{
           
           const input =  document.createElement('input');

           input.type='file';
           input.accept='image/*';
           input.click();

           input.onchange=async()=>{
                const file=input.files?.[0];

                if(!file){
                    return ;
                }
                 const data = new FormData();

                 data.append('file',file);
                 data.append('upload_preset','thechoicer');

                 try{

                    const res = await axios.post('https://api.cloudinary.com/v1_1/dvcaabqlm/image/upload',data);

                    const imageUrl=res.data.secure_url;

                    //  insert image at edior
                    
                    if(!quillRef.current){
                        return ;
                    }
                    const  editor = quillRef.current.getEditor();
                    
                    
                    const cursor_position=editor.getSelection()?.index ?? 0;
                    if(!cursor_position){
                        return;
                    }
                    editor.insertEmbed(cursor_position,'image',imageUrl);
               
              }
              catch(error:any){
                   console.log({error:"error while adding image in quill"},error.message);
              }



           }
    }

    
    const  handlebutton=async()=>{

                    try{  
                        const res = await axios.post(`${BACKEND_URL}/api/v1/post/blog`,{
                                    title,
                                    content,
                                    imageUrl:image
                                    },{
                                        headers:{
                                            Authorization:`Bearer ${localStorage.getItem('token')}`
                                        }
                                    })
                                    console.log(res); 
                                
                                navigate(`/blog/${res.data.post.id}`);    


                    }catch(err:any){
                        console.log({error:'error in creating blog',details:err.message});
                    }

          }
  
       const handleImage=async(event:React.ChangeEvent<HTMLInputElement>)=>{
                
               const file = event.target.files?.[0];

               if(!file){
                      alert('please upload cover image');
                      return ;
               }
               const data=  new FormData();

               data.append('file',file);
               data.append('upload_preset',"thechoicer");


               try{
                    const res = await axios.post('https://api.cloudinary.com/v1_1/dvcaabqlm/image/upload',data);

                    console.log('upload res',res);

                    setImage(res.data.secure_url);
               }
               catch(error:any){
                    console.log({error:'Image upload failed',details:error.message})
               }     
              
       }
          

    return (   <div className="w-full h-screen">
                <AppBar/>
                  
                <div className="w-full flex justify-center -ml-10">
                <div>        

                      <label className=" cursor-pointer mt-[2rem] w-[60rem] h-48  border border-gray-300 overflow-hidden  bg-gray-200 flex items-center justify-center rounded-md">
                           <input type="file" accept="image/*" onChange={handleImage} className="hidden" />
                           {(image)? 
                           <img src={image} alt="Cover"  className="w-full h-full object-cover"/>:(
                                  
                               <div className="flex items-center gap-2">
                                          
                                          <BiSolidImageAdd  className="w-[4rem] h-[2rem] "/>
                                        <span className=" text-xl font-semibold text-gray-500">
                                                Add Cover Image
                                        </span>
                               </div>
                           )}
                      </label>
                        <div  className="mt-[2rem]">
                            <input type='text' placeholder="Title"  onChange={(e)=>{setTitle(e.target.value)} }
                            className="w-[60rem] h-10 pl-2 border-2 border-slate-300 rounded-md 
                            outline-none focus:ring-2 focus:ring-blue-300 font-mono" />
                        </div> 

                        <div className="mt-8 relative flex flex-col">
                               <ReactQuill modules={modules} ref={quillRef} value={content} onChange={setContent}  className="w-[60rem] h-[20rem] "/>
                        </div>
                       <div className="mt-16  mb-4">
                       <button className="h-[2rem] w-[8rem] bg-gray-500 hover:bg-gray-400 text-white font-mono  border-b-4
                        border-gray-700 hover:border-gray-500 rounded" onClick={handlebutton}>
                              Publish post
                       </button>
                       </div>
                </div>  
                </div>  
                       
        </div>
    )
}