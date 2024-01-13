import { IGetUsersRepository } from "controllers/get-users/protocols";
import { User } from "models/user";

export class PostgresGetUsersRepository implements IGetUsersRepository {
  async getUsers(): Promise<User[]> {
    return [
      {
        first_name: "Gustavo",
        email: "gustavobatistadev@gmail.com",
        last_name: "Batista",
        password: "23423423423",
      },
    ];
  }
}
