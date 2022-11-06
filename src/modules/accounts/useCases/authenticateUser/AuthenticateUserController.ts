import { container } from 'tsyringe';
import { Request, Response } from "express";
import { AuthenticateUserUserCase } from "./AuthenticateUserUseCase";


class AuthenticateUserController {

  async handle(request: Request, response: Response): Promise<Response> {
    const { password, email } = request.body;

    const authenticateUserUseCase = container.resolve(AuthenticateUserUserCase);

    const token = await authenticateUserUseCase.execute({ password, email });

    return response.json(token);
  }
}

export { AuthenticateUserController }