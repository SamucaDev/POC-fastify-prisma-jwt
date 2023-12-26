import { z } from 'zod'
import { buildJsonSchemas } from "fastify-zod";

export const createUserSchema = z.object({
  email: z.string(),
  password: z.string().min(6),
  name: z.string(),
})

export const createUserResponseSchema = z.object({
  id: z.string(),
  email: z.string(),
  name: z.string()
})

export const findUserSchema = z.object({
  id: z.string(),
  email: z.string(),
  name: z.string()
});

export const getUsersSchema = z.array(
  z.object({
    id: z.string(),
    email: z.string(),
    name: z.string()
  })
);


export type CreateUserInput = z.infer<typeof createUserSchema>

export const { schemas: userSchemas, $ref } = buildJsonSchemas({
  findUserSchema,
  getUsersSchema,
  createUserSchema,
  createUserResponseSchema,
}, { $id: 'user_schema' });
