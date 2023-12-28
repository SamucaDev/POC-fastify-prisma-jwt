import dotenv from 'dotenv';
import fastify from 'fastify';
import setAuthMiddleware from './middlewares/auth.middleware';
import { 
  configJWT, 
  setListeners, 
  setRoutes, 
  setSchemas, 
  start
} from './providers/server/application.provider';

dotenv.config();

const server = fastify({ logger: true })

configJWT(server);
setAuthMiddleware(server);
setSchemas(server);
setRoutes(server);
setListeners(server);

start(server);