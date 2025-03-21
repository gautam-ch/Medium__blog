import { Hono } from 'hono';
import { prisma } from '../middleware/prisma';
import { PrismaClient } from '@prisma/client';
import { auth } from '../middleware/auth';
// import { createBlog,updateBlog } from '@gautamrishi/medium-common';

const Blog = new Hono<{
    Bindings: {
        secret_key: string
    }
    Variables: {
        prisma: PrismaClient
        userId: string
    }
}>();

Blog.use('*', prisma);

Blog.get('/blog', async (c) => {

    try {
        const prisma = c.get('prisma');

        const posts = await prisma.post.findMany({
            where:{
                published:true
            },
            select:{
                title:true,
                content:true,
                createdAt:true,
                imageUrl:true,
                id:true,
                author:{
                       select:{
                        name:true
                       }
                }
            }
        })           

        return c.json({ posts: posts }, 200);
    }
    catch (err: any) {
        c.json({ error: "Error in getting all blog posts" }, err);
    }

})

Blog.put('/publish',auth,async(c)=>{
            
    try{
                 const prisma = c.get('prisma');
                 const  id=c.req.query('id');
                 const user_id = c.get('userId');
                 if(!id){
                     return c.json({error:'Id is not present'},401);
                 }

                 const res = await prisma.post.findFirst({
                    where:{
                        id
                    }
                 })

                 if(res?.authorId!==user_id){
                    return c.json({error:'You are not authorized to publish this blog"'},401);
                 }

                  await prisma.post.update({
                     where:{
                        id
                     },
                     data:{
                        published:true
                     }
                  })

                  return c.json({msg:'Successfully blog get published '},200);
    }
    catch(err:any){
         console.log('error in publishing post')
    }
})

Blog.get('/myposts',auth,async(c)=>{
               
            try{
                       const prisma=c.get('prisma');

                       const id=c.get('userId');
                        
                       const res = await prisma.post.findMany({
                                where:{
                                    authorId:id,
                                    published:true
                                },
                                select:{
                                    imageUrl:true,
                                    id:true,
                                    title:true,
                                    content:true,
                                    createdAt:true,
                                    published:true
                                }
                       })

                      return c.json({posts:res},200);
            }
            catch(err:any){

                console.log({error:'Error in fetching post of user',err},401);

                throw err;
                
            }
})

Blog.post('/blog', auth, async (c) => {

    try {
        const prisma = c.get('prisma');

        const body = await c.req.json();

        // const validate = createBlog.safeParse(body);

        // if (!validate.success) {

        //     return c.json({ error: 'Invaild input format', details: validate.error }, 400);
        // }
           
        const {title,content,imageUrl} = body;
        const id = c.get('userId');
        const res = await prisma.post.create({
            data: {
                title,
                content,
                imageUrl,
                authorId: id,
                published:true
            },
            select:{
                id:true
            }
        })
        console.log('Creating blog', res);

        return c.json({ message: "Successfully created blog" ,post:res}, 200);
    }
    catch (err) {
        console.log({ Error: 'error in creating blog', err }, 401)
        throw err;
    }

})


Blog.post('/saveDraft',auth,async(c)=>{
      
    try{
           const prisma = c.get('prisma');
           const id = c.get('userId');
           
           const body = await c.req.json();

           const res = await prisma.post.create({
                data:{
                    title:body.title,
                    imageUrl:body.imageUrl,
                    content:body.content,
                    authorId:id
                },
                select:{
                    id:true
                }
           })
           
           console.log('draft succcessfully');
           return c.json(res,200);

    }
    catch(err:any){
         console.log({error:'error in saving blog'},err.message);
    }
})


Blog.get('/blog/:id', auth, async (c) => {
    try {

        let id = c.req.param('id');
        if (!id) {
            return c.json({ error: 'id of blog is missing' }, 404);
        }
        const prisma = c.get('prisma');

        const posts = await prisma.post.findFirst({
            where: {
                id
            },
            select:{
                title:true,
                content:true,
                id:true,
                createdAt:true,
                imageUrl:true,
                author:{
                       select:{
                        name:true
                       }
                }
            }
        });
        if (!posts) {
            return c.json({ error: 'Post not found' }, 404); // Return response if post not found
        }


        return c.json({ Posts: posts }, 200);
    }
    catch (error: any) {
        c.json({ error: "Error in getting blog by specific id" }, error.message);
        throw error;
    }
})

Blog.get('/mydrafts',auth,async(c)=>{
            try{
                 const prisma =c.get('prisma'); 
                 const id = c.get('userId');

                    const res = await prisma.post.findMany({
                        where:{
                            authorId:id,
                            published:false
                        }

                    })

                   return c.json({drafts:res},200);
            }
            catch(err:any){
                     
                console.log({msg:'error in getting drafts'},err.message);
            }
})

Blog.put('/blog', auth, async (c) => {

    try {
        const prisma = c.get('prisma');

        let blog_id = c.req.query('id');
        if (!blog_id) {
            return c.json({ error: 'id of blog is missing' }, 404);
        }

        const user_detail = await prisma.post.findFirst({
            where: {
                id: blog_id
            }
        })
        if (!user_detail) {
            return c.json({ error: "The id is not found" }, 404);
        }

        const id = c.get('userId');
        if (id !== user_detail.authorId) {
            return c.json({ error: "You are not authorized to update this blog" }, 401);
        }

        const body = await c.req.json();
        // const validate = updateBlog.safeParse(body);

        // if (!validate.success) {

        //     return c.json({ error: 'Invaild input format', details: validate.error }, 400);
        // }

        const res = await prisma.post.update({
            where: {
                id: blog_id
            },
            data: {
                title: body.title,
                content: body.content,
                imageUrl:body.imageUrl,
                published:body.published
            },
            select:{
                id:true
            }
        })
        // console.log('updatedBlog :', res);

        return c.json(res, 200);
    }
    catch (err: any) {
        c.json({ error: "Error in updating blog by specific id" }, err);
    }

})


Blog.delete('/blog', auth, async (c) => {

    try {
        const prisma = c.get('prisma');
        let blog_id = c.req.query('id');
        if (!blog_id) {
            return c.json({ error: 'id of blog is missing' }, 404);
        }

        const user_detail = await prisma.post.findFirst({
            where: {
                id: blog_id
            }
        })
        if (!user_detail) {
            return c.json({ error: "The id is not found" }, 404);
        }

        const id = c.get('userId');
        if (id !== user_detail.authorId) {
            return c.json({ error: "You are not authorized to delete this blog" }, 401);
        }

        const res = await prisma.post.delete({
            where: {
                id: blog_id
            }
        });

        console.log('delete :', res);

        return c.json({ message: "Blog deleted successfully" }, 200);

    }
    catch (err: any) {
        c.json({ error: "Error in updating blog by specific id" }, err);
    }

})


export default Blog