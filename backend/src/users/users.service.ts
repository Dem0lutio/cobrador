import { PrismaService } from "./../infra/prisma/prisma.service";
import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dtos/create-user.dto";

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  async createUser(createUserDto: CreateUserDto) {
    console.log("createUser called with:", createUserDto);
    await this.prisma.user.create({ data: createUserDto });
  }
}
