import { User } from "../../../interfaces/user.interface";
import * as userRepository from "../../../repositories/user.repository";
import { hashPassword } from "../../../utils/encryption";
import HttpStatus from "../../../utils/http-status";

const create = async (userObject: { password: string, email: string, name: string }) => {
  const userExists = await userRepository.find({
    email: userObject.email,
  });

  if (userExists.data) {
    return {
      error: {
        message: "User already exists with this email",
        status: HttpStatus.UNAUTHORIZED,
      },
    };
  }

  const password = await hashPassword(userObject.password);
  const user = await userRepository.create({ ...userObject, password });
  return { data: user };
}

export default create;