import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Body,
  UseGuards,
} from "@nestjs/common";
import { CreateUserDto } from "./dtos/create-user.dto";
import { AuthService } from "./auth/auth.service";
import { SignInDto } from "./dtos/sign-in.dto";
import { JwtAuthGuard } from "./auth/jwt-auth.guard";
import { CurrentUser } from "./decorators/current-user.decorator";
import { CurrentUserDto } from "./dtos/current-user.dto";

@Controller("users")
export class UsersController {
  constructor(private authService: AuthService) {}
  // Controller methods will go here

  @Get("profile")
  @UseGuards(JwtAuthGuard)
  getProfile(@CurrentUser() user: CurrentUserDto) {
    return { usuario_logado: user };
  }

  @Post("signup")
  async signup(@Body() body: CreateUserDto) {
    return this.authService.signUp(body.username, body.email, body.password);
  }

  @Post("signin")
  async signin(@Body() body: SignInDto) {
    return await this.authService.signIn(body.identifier, body.password);
  }
}
