import { PrismaService } from "./../infra/prisma/prisma.service";
import { Injectable } from "@nestjs/common";

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  async createUser(createUserDto: any) {
    console.log("createUser called with:", createUserDto);
    await this.prisma.user.create({ data: createUserDto });
  }
}
