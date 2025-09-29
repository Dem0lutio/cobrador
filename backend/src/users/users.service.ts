import { PrismaService } from "./../infra/prisma/prisma.service";
import { Injectable } from "@nestjs/common";

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async createUser(username: string, email: string, password: string) {
    return this.prisma.user.create({ data: { username, email, password } });
  }

  async findUserById(id: number) {
    if (!id) {
      return null;
    }
    return this.prisma.user.findUnique({ where: { id } });
  }

  async findAllByEmail(email: string) {
    return this.prisma.user.findMany({ where: { email } });
  }

  async findAllByUsername(username: string) {
    return this.prisma.user.findMany({ where: { username } });
  }
}
