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
  signin() {
    // Handle user signin
  }
}
