import { Module } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { AuthService } from "./auth/auth.service";
import { PrismaService } from "src/infra/prisma/prisma.service";

@Module({
  controllers: [UsersController],
  providers: [UsersService, AuthService, PrismaService],
})
export class UsersModule {}
