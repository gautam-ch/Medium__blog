import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";
import { SignupInput } from "@gautamrishi/medium-common";
import axios from "axios";



export function Auth({type}:{type:'signin' | 'signup'}){

    const navigate=useNavigate();
          
    const [postInput,setPostInput]=useState<SignupInput>({
        name:"",
        email:"",
        password:""
    });
     
    async function sendRequest(){
        try{
         const res = await axios.post(`${BACKEND_URL}/api/v1/user/${type==='signup'?'signup':'signin'}`,postInput);
         const jwt = res.data.jwt;

         localStorage.setItem('token',jwt);

         navigate('/blogs');
        }
        catch(err:any){
            console.log({error:'error in sending post request',details:err.message});
        }

    }
    
    return (
        <div className="h-screen flex justify-center items-center ">
          <div>

            <div>
                    <div className=" text-center text-3xl font-bold">
                        {type==='signup'?'Create an Account':'Login to Account'}
                    </div>
                    <div className="text-sm text-center text-slate-400 mt-2">
                       { type==='signup' ?"Already have an account ? " : "Don't have an account ? "} 
                       <Link to={type==='signup'?'/signin':'/signup'} className="underline">{type=='signup'?'Login':'SignUp'}</Link>
                    </div>
            </div>  
                    { type==='signup'?
                    <div className="mt-8">
                        <Input label="Username" placeholder="Enter your Username" onChange={(e)=>{setPostInput({...postInput,name:e.target.value})} }/>
                    </div>
                     :null}
                    <div className="mt-4">
                        <Input label="Email" placeholder="m@example.com" onChange={(e)=>{setPostInput({...postInput,email:e.target.value})} }/>
                    </div>

                    <div className="mt-4">                             
                        <Input label="Password" placeholder="" onChange={(e)=>{setPostInput({...postInput,password:e.target.value})} }/>
                    </div>

                     <div className="mt-8">
                                  
                                <button className="w-[24rem] h-8 bg-black text-white rounded-md"
                                  onClick={sendRequest}
                                >{type==='signup'?'Sign Up':'Sign In'}</button>
                     </div>
                 


          </div>
        </div>
    )
}

interface  InputType{
      label:string,
      placeholder:string,
      onChange:(e:ChangeEvent<HTMLInputElement>)=>void;
}

function Input({label,placeholder,onChange}:InputType){

       return(
        <div>
                <label htmlFor="in" className="font-semibold text-xl">{label}</label><br></br>
                <input id="in" type={label==='Password'?'password':'text'}  onChange={onChange} placeholder={placeholder} 
                className="w-[24rem] h-10 border-2 border-slate-200 rounded-md text-md pl-2 mt-3 text-slate-500"
                />
         </div>
       )
}