import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { userInfo } from 'os';
import { PrismaService } from 'src/prisma/prisma.service';
import { Auth } from './entities/auth.entity';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async login(email: string, password: string): Promise<Auth> {
    const user = await this.prisma.user_account.findUnique({ where: { email: email } });

    if (!user) {
      throw new NotFoundException(`User ${email} not found`);
    }

    const validPassword = user.password === password;

    if (!validPassword) {
      throw new UnauthorizedException('Invalid password');
    }

    return {
      accessToken: this.jwtService.sign({ userId: user.id })
    }
  }

  validateUser(userId: string) {
    return this.prisma.user_account.findUnique({ where: { id: userId } });
  }
  
}
