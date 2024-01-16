import fjwt from "@fastify/jwt";
import fastify, {
  FastifyInstance
} from "fastify";
import { routes } from "./routes.service";
import { schemas } from "./schemas.service";
import setAuthMiddleware from '../../middlewares/auth.middleware';

export const setSchemas = (server: FastifyInstance) => {
  for (let schema of schemas) server.addSchema(schema);
};

export const setRoutes = (server: FastifyInstance) => {
  for (let route of routes)
    server.register(route.useCase, { prefix: `api/${route.url}` });
};

export const start = async (server: FastifyInstance) => {
  try {
    await server.listen({ port: parseInt(process.env.APP_PORT as string) });
    console.log(`Server has been started 👋 Port: ${process.env.APP_PORT}`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

export const configJWT = (server: FastifyInstance) => {
  server.register(fjwt, { secret: process.env.JWT_SECRET, messages: {
    authorizationTokenExpiredMessage: 'Token expired'
  } })

  server.addHook('preHandler', (req, res, next) => {
    req.jwt = server.jwt
    return next()
  })
}

export const setListeners = (server: FastifyInstance) => {
  const listeners = ["SIGINT", "SIGTERM"];
  listeners.forEach((signal) => {
    process.on(signal, async () => {
      await server.close();
      console.log("Server has been closed 👋");
      process.exit(0);
    });
  });
};

export const buildFastify = () => {
  const server = fastify({ logger: false })

  configJWT(server);
  setAuthMiddleware(server);
  setSchemas(server);
  setRoutes(server);
  setListeners(server);
  
  return server;
};
