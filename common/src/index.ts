import zod from 'zod'

export const signupInput = zod.object({
    name: zod.string().min(1).optional(),
    email: zod.string().email(),
    password: zod.string().min(6)
})

export const signinInput = zod.object({
    email: zod.string().email(),
    password: zod.string().min(6)
})

export const createBlog =zod.object({
      title:zod.string().min(1),
      content:zod.string().min(10),
      published:zod.boolean().optional(),
})

export const updateBlog =zod.object({
    title:zod.string().min(1),
    content:zod.string().min(10),
    id:zod.string().min(1)
})

export type SignupInput= zod.infer<typeof signupInput>;
export type SigninInput= zod.infer<typeof signinInput>;
export type CreateBlog = zod.infer<typeof createBlog>;
export type UpdateBlog = zod.infer<typeof updateBlog>;