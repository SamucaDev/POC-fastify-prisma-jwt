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

  return reply.status(HttpStatus.OK).send({ accessToken });
};

export { login };
