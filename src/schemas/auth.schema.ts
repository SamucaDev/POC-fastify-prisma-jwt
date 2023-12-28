import z from "zod";
import { buildJsonSchemas } from "fastify-zod";

export const loginSchema = z.object({
  email: z
    .string({
      required_error: 'Email is required',
      invalid_type_error: 'Email must be a string',
    })
    .email(),
  password: z.string().min(6),
})

export const loginResponseSchema = z.object({
  accessToken: z.string(),
})

export type LoginUserInput = z.infer<typeof loginSchema>


export const { schemas: authSchemas, $ref } = buildJsonSchemas({
  loginSchema,
  loginResponseSchema
}, { $id: 'auth_schema' });
