import { PrismaService } from "./../infra/prisma/prisma.service";
import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dtos/create-user.dto";

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async createUser(createUserDto: CreateUserDto) {
    console.log("createUser called with:", createUserDto);
    return this.prisma.user.create({ data: createUserDto });
  }

  async findUserById(id: number) {
    if (!id) {
      return null;
    }
    return this.prisma.user.findUnique({ where: { id } });
  }

  async findAll(email: string) {
    return this.prisma.user.findMany({ where: { email } });
  }
}
