import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify'
import { $ref } from './user.schema'
import { createUser, findUser, getUsers, login, logout } from './user.controller'

export async function userRoutes(app: FastifyInstance) {
  app.get('/:id', {
    schema: {
      response:{
        200: $ref('findUserSchema')
      }
    },
    preHandler: [app.authenticate]
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

  app.get('/', {
    schema: {
      response: {
        200: $ref('getUsersSchema'),
      }
    },
    preHandler: [app.authenticate]
  }, getUsers)

  app.delete('/logout', {
    preHandler: [app.authenticate]
  }, () => logout)

  app.log.info('user routes registered')
}