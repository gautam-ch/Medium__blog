
import { Context, Next } from "hono";
import { env } from "hono/adapter";
import { Jwt } from "hono/utils/jwt";


export const auth =async(c:Context,next:Next)=>{
    try{

                const header=c.req.header('Authorization');

                if(!header || !header.startsWith('Bearer')){
                    return c.json({error:'header is missing or invalid'},404);
                }

                const token=header.split(' ')[1];

                const {secret_key} = env<{secret_key:string}>(c);

                const payload = await Jwt.verify(token,secret_key);

                if(!payload){
                    return c.json({error:'Unauthorized user'},401);
                }

                c.set('userId',payload.id);

                 await next();
   }
   catch(error:any){
            return c.json({error:"Error in authorization process ",details:error.message},401);
   }

}