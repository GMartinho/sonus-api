import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { Auth } from './entities/auth.entity';
import * as bcrypt from 'bcrypt';
import { UserEntity } from '../user/entities/user.entity';
import { INVALID_PASSWORD_MSG, NOT_FOUND_MSG } from '../constants';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async login(email: string, password: string): Promise<Auth> {
    const user: UserEntity = await this.prisma.user_account.findUnique({ where: { email: email } });

    if (!user) {
      throw new NotFoundException(`User ${email} ${NOT_FOUND_MSG}`);
    }

    const validPassword: boolean = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      throw new UnauthorizedException(INVALID_PASSWORD_MSG);
    }

    return {
      accessToken: this.jwtService.sign({ userId: user.id })
    }
  }

  validateUser(userId: string) {
    return this.prisma.user_account.findUnique({ where: { id: userId } });
  }
  
}
