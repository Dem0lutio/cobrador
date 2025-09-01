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

@Controller("auth")
export class UsersController {
  // Controller methods will go here

  @Get("whoami")
  getProfile() {}

  @Post("signup")
  signup(@Body() createUserDto: CreateUserDto) {
    // Handle user signup
  }
}
