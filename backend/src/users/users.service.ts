import { PrismaClient } from "./../../generated/prisma/client";
import { Injectable } from "@nestjs/common";

@Injectable()
export class UsersService {
  constructor(private readonly PrismaClient) {}
  createUser(createUserDto: any) {
    console.log("createUser called with:", createUserDto);
    this.PrismaClient.user.create({ data: createUserDto });
  }
}
