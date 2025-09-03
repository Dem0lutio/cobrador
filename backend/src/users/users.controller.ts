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
  getProfile() {
    console.log("getProfile called");
  }

  @Post("signup")
  signup(@Body() createUserDto: CreateUserDto) {
    this.userservice.createUser(createUserDto);
  }

  @Post("signin")
  signin() {
    // Handle user signin
  }
}
