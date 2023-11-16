import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify'
import { $ref } from './user.schema'
import { createUser, findUser, login } from './user.controller'

export async function userRoutes(app: FastifyInstance) {
  app.get('/:id', {
    schema: {
      response:{
        200: $ref('findUserSchema')
      }
    }
  }, findUser)

  app.post(
    '/',
    {
      schema: {
        body: $ref('createUserSchema'),
        response: {
          201: $ref('createUserResponseSchema'),
        },
      },
    },
    createUser
  )

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
    login,
  )

  app.delete('/logout', () => {})

  app.log.info('user routes registered')
}