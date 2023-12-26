import FunctionResponse from "../../../interfaces/function-response.interface";
import { User } from "../../../interfaces/user.interface";
import * as userRepository from '../../../repositories/user.repository';
import HttpStatus from "../../../utils/http-status";

const findAll = async (): Promise<FunctionResponse<User[]>>  => {
  const users = await userRepository.get();

  if(!users?.length) {
    return {
      error: {
        friendlyMessage: 'Users not found',
        status: HttpStatus.NOT_FOUND
      }
    }
  }
  
  return {
    data: users
  }
}

export default findAll;