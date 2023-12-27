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
  const user = await userRepository.findPrivateInformation({ email: email });
  
  if(user.error){
    return {
      error:{
        status: user.error.status,
        friendlyMessage: user.error.friendlyMessage
      }
    }
  }

  const isMatch =
    user.data && user.data.password && (await comparePassword(password, user.data.password));

  if (!user.data || !isMatch) {
    return {
      error: {
        friendlyMessage: "Invalid email or password",
        status: HttpStatus.UNAUTHORIZED,
      },
    };
  }

  const payload = {
    id: user.data.id,
    email: user.data.email,
    name: user.data.name,
  };

  const token = jwtIntance.sign(payload, {expiresIn: '1h'});

  return { data: { accessToken: token } };
};

export default login;
