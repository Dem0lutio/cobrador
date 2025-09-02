import { UsersService } from "./users.service";
import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Request,
  Body,
} from "@nestjs/common";
import { CreateUserDto } from "./dtos/create-user.dto";

@Controller("users")
export class UsersController {
  constructor(private readonly userservice: UsersService) {}
  // Controller methods will go here

  @Get("profile")
  getProfile() {}

  @Post("signup")
  signup(@Body() createUserDto: CreateUserDto) {
    // Handle user signup
  }

  @Post("signin")
  signin() {
    // Handle user signin
  }
}
