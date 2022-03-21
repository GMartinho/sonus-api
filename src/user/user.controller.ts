import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { User } from './entities/user.entity';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiCreatedResponse({type: User})
  async create(@Body() createUserDto: CreateUserDto) {
    return new User(await this.userService.create(createUserDto));
  }

  @Get()
  @ApiOkResponse({type: [User]})
  async findAll() {
    const users = await this.userService.findAll();
    return users.map((user) => new User(user));
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return new User(await this.userService.findOne(id));
  }

  @Patch(':id')
  @ApiCreatedResponse({type: User})
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return new User(await this.userService.update(id, updateUserDto));
  }

  @Delete(':id')
  @ApiOkResponse({type: User})
  async remove(@Param('id') id: string) {
    return new User(await this.userService.remove(id));
  }
}
