import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  user_account,
  Prisma,
} from '@prisma/client';

@Injectable()
export class UserService {

  constructor(private readonly prisma: PrismaService) {}

  create(createUserDto: CreateUserDto) {
    return this.prisma.user_account.create({
      data: {
        first_name: createUserDto.firstName,
        last_name: createUserDto.lastName,
        email: createUserDto.email,
        password: createUserDto.password
      }
    })
  }

  findAll() {
    return this.prisma.user_account.findMany();
  }

  findOne(id: string) {
    return this.prisma.user_account.findUnique({
      where: {
        id: id,
      }
    });
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.prisma.user_account.update({
      where: {
        id: id,
      },
      data: {
        first_name: updateUserDto.firstName,
        last_name: updateUserDto.lastName,
        email: updateUserDto.email,
        password: updateUserDto.password
      }
    });
  }

  remove(id: string) {
    return this.prisma.user_account.delete({
      where: {
        id: id,
      }
    });
  }
}
