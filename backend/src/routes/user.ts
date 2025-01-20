import { Hono } from 'hono';
import bcrypt from 'bcryptjs';
import { Jwt } from 'hono/utils/jwt';
import { prisma } from '../middleware/prisma';
import { PrismaClient } from '@prisma/client';
import { signupInput,signinInput } from '@gautamrishi/medium-common';


const User = new Hono<{
    Bindings: {
        secret_key: string
    }
    Variables: {
        prisma: PrismaClient
    }
}
>();

User.use('*', prisma);


const saltround = 10;
const hashpassword = async (plain_pass: string) => {

    try {
        const hashedpassword = await bcrypt.hash(plain_pass, saltround);

        console.log('Hashed password: ', hashedpassword);

        return hashedpassword;
    }
    catch (error) {
        console.error('error in hashing password', error);
        throw error;
    }
}

const verify_pass = async (plain_pass: string, hashed_pass: string) => {

    try {
        const isCorrect = await bcrypt.compare(plain_pass, hashed_pass);
        return isCorrect;
    }
    catch (err) {
        console.error('error in verifying password', err);
        throw err;
    }
}

User.post('/signup', async (c) => {

    try {

        const prisma = c.get('prisma');

        const body = await c.req.json();
        const validate = signupInput.safeParse(body);

        if (!validate.success) {

            return c.json({ error: 'Invaild input format', details: validate.error }, 400);
        }
        console.log(body);

        //hit the database

        const existing_user = await prisma.user.findFirst({
            where: {
                email: body.email
            }
        })



        if (existing_user) {
            return c.json({ error: "Username or email already taken" }, 409);
        }

        const hash_pass = await hashpassword(body.password);
        const user_detail = await prisma.user.create({
            data: {
                name: body.name,
                email: body.email,
                password: hash_pass
            }
        })

        const secret_key = c.env.secret_key;

        const payload = { email: body.email, id: user_detail.id };
        console.log('payload :', payload);
        const token = await Jwt.sign(payload, secret_key);

        return c.json({ message: 'User successfully registered', jwt: token }, 200)
    }
    catch (error: any) {
        return c.json({ error: 'Internal server error', details: error.message }, 500);
    }
})

User.post('/signin', async (c) => {

    try {
        const body = await c.req.json();
                
        const validate = signinInput.safeParse(body);

        if (!validate.success) {

            return c.json({ error: 'Invaild input format', details: validate.error }, 400);
        }

        const prisma = c.get('prisma');

        const user_detail = await prisma.user.findFirst({
            where: {
                email: body.email
            }
        })

        if (!user_detail) {
            return c.json({ error: 'User not found' }, 404)
        }

        const verify = await verify_pass(body.password, user_detail.password);

        if (!verify) {
            return c.json({ error: 'Wrong password' }, 401)
        }

        const secret_key = c.env.secret_key;

        const payload = { email: body.email, id: user_detail.id };
        console.log('payload :', payload);
        const token = await Jwt.sign(payload, secret_key);

        return c.json({ message: "Login Successful", jwt: token }, 200);
    }
    catch (err) {

        return c.json({ error: 'Error in sigin ', err }, 400);
    }
})

export default User;