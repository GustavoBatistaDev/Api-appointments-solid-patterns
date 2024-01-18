import { Knex } from "knex";
import { DatabaseSingleton } from "../../database/databaseSingleton";
import { User } from "models/authentication/user";
import { ILoginUser } from "../../interfaces/repositories/authentication/loginUser.interface";

const knexInstance: Knex = DatabaseSingleton.getInstance();

export class LoginUserRepository implements ILoginUser {
  public async authenticate(email: string, password: string): Promise<boolean> {
    const userExists: User = await knexInstance("users")
      .where({ email, password })
      .select("*")
      .first();

    return userExists ? true : false;
  }
}
