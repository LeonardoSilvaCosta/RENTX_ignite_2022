import { injectable, inject } from 'tsyringe';
import { IUsersRepository } from '../../repositories/IUsersRepository';

import { compare } from 'bcrypt';
import { sign } from "jsonwebtoken";
import { AppError } from '../../../../errors/AppError';

interface IRequest {
  email: string,
  password: string
}

interface IResponse {
  user: {
    name: string,
    email: string
  },
  token: string
}

@injectable()
class AuthenticateUserUserCase {
  constructor(
    @inject("UsersRepository")
    private UsersRepository: IUsersRepository
  ) { }

  async execute({ email, password }: IRequest): Promise<IResponse> {

    const user = await this.UsersRepository.findByEmail(email);

    if (!user) {
      throw new AppError("Email or password incorrect!");
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError("Email or password incorrect!");
    }

    const token = sign({}, "cfe275a5908b5650488e0b0342c2d6cc", {
      subject: user.id,
      expiresIn: "1d",
    });

    const tokenReturn: IResponse = {
      token,
      user: {
        name: user.name,
        email: user.email
      }
    }

    return tokenReturn;

  }
}

export { AuthenticateUserUserCase };