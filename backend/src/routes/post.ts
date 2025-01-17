import { Hono } from 'hono';
import { prisma } from '../middleware/prisma';
import { PrismaClient } from '@prisma/client';
import { auth } from '../middleware/auth';
import { createBlog,updateBlog } from '@gautamrishi/medium-common';

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

        const posts = await prisma.post.findMany();

        return c.json({ posts: posts }, 200);
    }
    catch (err: any) {
        c.json({ error: "Error in getting all blog posts" }, err);
    }

})

Blog.post('/blog', auth, async (c) => {

    try {
        const prisma = c.get('prisma');

        const body = await c.req.json();

        const validate = createBlog.safeParse(body);

        if (!validate.success) {

            return c.json({ error: 'Invaild input format', details: validate.error }, 400);
        }
           
        const {title,content} = body;
        const id = c.get('userId');
        const res = await prisma.post.create({
            data: {
                title,
                content,
                authorId: id
            }
        })
        console.log('Creating blog', res);

        return c.json({ message: "Successfully created blog" }, 200);
    }
    catch (err) {
        console.log({ Error: 'error in creating blog', err }, 401)
        throw err;
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
            }
        });
        if (!posts) {
            return c.json({ error: 'Post not found' }, 404); // Return response if post not found
        }


        return c.json({ Posts: posts }, 200);
    }
    catch (error: any) {
        c.json({ error: "Error in getting blog by specific id" }, error.message);
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
        const validate = updateBlog.safeParse(body);

        if (!validate.success) {

            return c.json({ error: 'Invaild input format', details: validate.error }, 400);
        }

        const res = await prisma.post.update({
            where: {
                id: blog_id
            },
            data: {
                title: body.title,
                content: body.content,
            }
        })
        console.log('update :', res);

        return c.json({ message: "Blog updated successfully" }, 200);
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