import { FastifyJWT } from "@fastify/jwt";
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import HttpStatus from "../utils/http-status";
import { handlerAuthenticate } from "../services/jwt/jwt.service";

const setAuthenticateJWT = (server: FastifyInstance) => {
  server.decorate(
    "authenticate",
    async (req: FastifyRequest, reply: FastifyReply) => {
      try {
        const token = req.headers.authorization;
        if (!token) {
          return reply.status(HttpStatus.UNAUTHORIZED).send({ message: "Authentication required" });
        }
        const decoded = handlerAuthenticate(token, req.jwt)

        req.user = decoded;
      } catch (error) {
        return reply.status(HttpStatus.UNAUTHORIZED).send({ message: 'Invalid or expired token' })
      }
    }
  );
};

export default setAuthenticateJWT;
