import { BadRequestException, Injectable } from "@nestjs/common";
import { UsersService } from "../users.service";
import { randomBytes, scrypt as _scrypt } from "crypto";
import { promisify } from "util";
const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signUp(username: string, email: string, password: string) {
    let users = await this.usersService.findAllByEmail(email);
    if (users.length) {
      throw new BadRequestException("Email em uso!");
    }
    users = await this.usersService.findAllByUsername(username);
    if (users.length) {
      throw new BadRequestException("Username em uso!");
    }
    const salt = randomBytes(16).toString("hex");
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    const result = salt + "." + hash.toString("hex");
    const user = await this.usersService.createUser(username, email, result);
    return user;
  }

  async signIn() {}
}
