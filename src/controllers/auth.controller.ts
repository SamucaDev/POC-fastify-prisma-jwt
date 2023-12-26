import { FastifyReply, FastifyRequest } from "fastify";
import { LoginUserInput } from "../schemas/auth.schema";
import loginUseCase from "../useCases/auth/login/auth-login.usecase"
import HttpStatus from "../utils/http-status";

const login = async (
  req: FastifyRequest<{ Body: LoginUserInput }>,
  reply: FastifyReply
) => {
  const { email, password } = req.body;
  const accessTokenObject = await loginUseCase(email, password, req.jwt);

  if (accessTokenObject?.error) {
    return reply.code(accessTokenObject.error.status).send(accessTokenObject.error.friendlyMessage);
  }

  const { data: { accessToken } = {} } = accessTokenObject;

  return reply.status(HttpStatus.CREATED).send({ accessToken  });
};

export { login };

/* 
Create a token table

  PROS
    - We can control if the Token is valid. Ok we can set 
    the expiration however in a situation where we need to cancel the token before the expiration 
    without a table we can't control this token.    
  CONS
    - More information saved on server
    - Maybe we can overload the server
*/
