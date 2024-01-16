import FunctionResponse from '../../../interfaces/function-response.interface';
import { User } from '../../../interfaces/user.interface';
import * as userRepository from '../../../repositories/user.repository'
import HttpStatus from '../../../utils/http-status';

const find = async (id: string): Promise<FunctionResponse<User>> => {
  const user = await userRepository.find({ id });

  if(!user) {
    return {
      error: {
        status: HttpStatus.NOT_FOUND,
        friendlyMessage: 'User not found'
      }
    }
  }

  return {
    data: user.data
  };
};

export default find;
