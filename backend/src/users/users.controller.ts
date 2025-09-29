import { UsersService } from "./users.service";
import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Request,
  Body,
  Session,
} from "@nestjs/common";
import { CreateUserDto } from "./dtos/create-user.dto";
import { AuthService } from "./auth/auth.service";
import { SignInDto } from "./dtos/sign-in.dto";

@Controller("users")
export class UsersController {
  constructor(
    private userservice: UsersService,
    private authService: AuthService
  ) {}
  // Controller methods will go here

  @Get("profile")
  getProfile() {
    console.log("getProfile called");
  }

  @Post("signup")
  async signup(@Body() body: CreateUserDto, @Session() session: any) {
    return this.authService.signUp(body.username, body.email, body.password);
  }

  @Post("signin")
  async signin(@Body() body: SignInDto, @Session() session: any) {
    const user = await this.authService.signIn(body.identifier, body.password);
    session.userId = user.id;
    return user;
  }
}
