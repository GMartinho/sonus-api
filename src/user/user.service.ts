import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {

  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const { password } = createUserDto;

    const salt = await bcrypt.genSalt();

    const hashPassword = await bcrypt.hash(password, salt);

    return this.prisma.user_account.create({
      data: {
        ...createUserDto,
        password: hashPassword
      },
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
      data: updateUserDto,
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
