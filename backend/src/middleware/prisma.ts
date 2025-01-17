import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Context, Next } from "hono";
import { env } from "hono/adapter";

export const prisma=async(c:Context,next:Next)=>{
     
    try{
            const {DATABASE_URL}=env<{DATABASE_URL:string}>(c);

            if(!DATABASE_URL){
                return c.json({error:"Database url is missing"},404);
            }

            const prisma = new PrismaClient({datasourceUrl:DATABASE_URL}).$extends(withAccelerate());

            c.set('prisma',prisma);

            await next();
    }
    catch(error:any){
        return c.json({error:'error in connecting to db using prisma',details:error.message});
    }

}
