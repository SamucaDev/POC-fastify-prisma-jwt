import { JWT } from "@fastify/jwt";
import FunctionResponse from "../../../interfaces/function-response.interface";
import * as userRepository from "../../../repositories/user.repository";
import { comparePassword } from "../../../utils/encryption";
import HttpStatus from "../../../utils/http-status";

interface LoginUseCase {
  accessToken: string;
}

const login = async (
  email: string,
  password: string,
  jwtIntance: JWT
): Promise<FunctionResponse<LoginUseCase>> => {
  const user = await userRepository.find({ email: email }, true);

  const isMatch =
    user && user.password && (await comparePassword(password, user.password));

  if (!user || !isMatch) {
    return {
      error: {
        friendlyMessage: "Invalid email or password",
        status: HttpStatus.UNAUTHORIZED,
      },
    };
  }

  const payload = {
    id: user.id,
    email: user.email,
    name: user.name,
  };

  const token = jwtIntance.sign(payload, {expiresIn: '1m'});

  return { data: { accessToken: token } };
};

export default login;
