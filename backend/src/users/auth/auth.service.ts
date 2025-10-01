import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { UsersService } from "../users.service";
import { randomBytes, scrypt as _scrypt } from "crypto";
import { promisify } from "util";
import { isEmail } from "class-validator";
import { JwtService } from "@nestjs/jwt";
const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

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
    const payload = {
      sub: user.id,
      username: user.username,
      email: user.email,
    };
    return {
      access_token: this.jwtService.sign(payload),
      user: { id: user.id, username: user.username, email: user.email },
    };
  }

  async signIn(identifier: string, password: string) {
    const [user] = await (isEmail(identifier)
      ? this.usersService.findAllByEmail(identifier)
      : this.usersService.findAllByUsername(identifier));
    if (!user) {
      throw new BadRequestException("Usuário não encontrado!");
    }
    const [salt, storedHash] = user.password.split(".");
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    if (storedHash !== hash.toString("hex")) {
      throw new UnauthorizedException();
    }
    const payload = {
      sub: user.id,
      username: user.username,
      email: user.email,
    };
    return {
      access_token: this.jwtService.sign(payload),
      user: { id: user.id, username: user.username, email: user.email },
    };
  }
}
