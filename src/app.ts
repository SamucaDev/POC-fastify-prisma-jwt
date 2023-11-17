import fastify, { FastifyReply, FastifyRequest } from 'fastify'
import dotenv from 'dotenv';
import { userRoutes } from './modules/user/user.route'
import { userSchemas } from './modules/user/user.schema';
import fjwt, { FastifyJWT } from '@fastify/jwt'
import fCookie from '@fastify/cookie'

dotenv.config();

const server = fastify({ logger: false })

server.register(fjwt, { secret: process.env.JWT_SECRET })

server.addHook('preHandler', (req, res, next) => {
  req.jwt = server.jwt
  return next()
})

server.register(fCookie, {
  secret: process.env.COOKIE_SECRET,
  hook: 'preHandler',
})

server.decorate(
  'authenticate',
  async (req: FastifyRequest, reply: FastifyReply) => {
    const token = req.cookies.access_token

    if (!token) {
      return reply.status(401).send({ message: 'Authentication required' })
    }
    const decoded = req.jwt.verify<FastifyJWT['user']>(token)
    req.user = decoded
  },
)

for (let schema of [...userSchemas]) server.addSchema(schema)

server.register(userRoutes, { prefix: 'api/users' })

const listeners = ['SIGINT', 'SIGTERM']
listeners.forEach((signal) => {
  process.on(signal, async () => {
    await server.close()
    console.log('Server has been closed 👋')
    process.exit(0)
  })
})

const start = async () => {
  try {
    await server.listen({ port: parseInt(process.env.APP_PORT as string) })
    console.log(`Server has been started 👋 Port: ${process.env.APP_PORT}`)
  } catch (err) {
    server.log.error(err)
    process.exit(1)
  }
}

start()