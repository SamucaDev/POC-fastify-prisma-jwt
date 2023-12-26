import { FastifyJWT, TokenOrHeader } from "@fastify/jwt";
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

const setAuthenticateJWT = (server: FastifyInstance) => {
  server.decorate(
    "authenticate",
    async (req: FastifyRequest, reply: FastifyReply) => {
      const token = req.headers.authorization;
      if (!token) {
        return reply.status(401).send({ message: "Authentication required" });
      }
      const decoded = req.jwt.verify<FastifyJWT["user"]>(
        token.replace("Bearer ", ""),
        { maxAge: "1m" }
      );
      
      req.user = decoded;
    }
  );
};

export default setAuthenticateJWT;
