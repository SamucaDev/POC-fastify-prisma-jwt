import { FastifyJWT, JWT } from "@fastify/jwt";
import { User } from "../../interfaces/user.interface";

export const handlerAuthenticate = (token: string, jwt: JWT) => {
  const userDecoded = jwt.verify<FastifyJWT["user"]>(
    token.replace("Bearer ", ""),
    { maxAge: "1h" }
  );

  return userDecoded;
}

export const signToken = (payload: User, jwt: JWT) => {
  const token = jwt.sign(payload, {expiresIn: '1h'});

  return token;
}