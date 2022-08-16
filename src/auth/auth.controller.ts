import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Auth } from './entities/auth.entity';
import { AccessLoginDto } from './dto/access-login.dto';

@ApiTags('Auth')
@Controller('login')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @ApiOkResponse({ type: Auth })
  login(@Body() { email, password }: AccessLoginDto) {
    return this.authService.login(email, password);
  }
}
