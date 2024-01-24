import bcrypt from "bcrypt";

import { Knex } from "knex";
import { DatabaseSingleton } from "../../infra/database/databaseSingleton";
import { User } from "../../models/authentication/user";
import { ILoginUserRepository } from "../../interfaces/repositories/authentication/loginUser.interface";

const knexInstance: Knex = DatabaseSingleton.getInstance();

export class LoginUserRepository implements ILoginUserRepository {
  public async authenticate(
    email: string,
    password: string,
    hashPassword: string,
  ): Promise<User | null> {
    const user: User | null = await this.getUserByEmail(email);
    if (user) {
      const passwordIsValid: boolean = await bcrypt.compareSync(
        password,
        hashPassword,
      );
      if (passwordIsValid) {
        return user;
      }
    }
    return null;
  }

  public async getUserByEmail(email: string): Promise<User | null> {
    const user = await knexInstance("pacientes")
      .where({ email: email })
      .select("*")
      .first();
    return user;
  }
}
