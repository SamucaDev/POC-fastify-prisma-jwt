import { FastifyInstance } from "fastify"
import { $ref } from "../schemas/auth.schema"
import { login } from "../controllers/auth.controller"

export async function authRoutes(app: FastifyInstance) {
  app.post(
    '/login',
    {
      schema: {
        body: $ref('loginSchema'),
        response: {
          201: $ref('loginResponseSchema'),
        },
      },
    },
    login
  )

  app.log.info('auth routes registered')
}