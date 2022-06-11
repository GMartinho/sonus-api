import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UserEntity } from './entities/user.entity';

@ApiTags('User')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiCreatedResponse({type: UserEntity})
  async create(@Body() createUserDto: CreateUserDto) : Promise<UserEntity> {
    return new UserEntity(await this.userService.create(createUserDto));
  }

  @Get()
  @ApiOkResponse({type: [UserEntity]})
  async findAll() : Promise<UserEntity[]> {
    const users = await this.userService.findAll();
    return users.map((user) => new UserEntity(user));
  }

  @Get(':id')
  @ApiOkResponse({type: UserEntity})
  async findOne(@Param('id') id: string) : Promise<UserEntity> {
    return new UserEntity(await this.userService.findOne(id));
  }

  @Patch(':id')
  @ApiCreatedResponse({type: UserEntity})
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) : Promise<UserEntity> {
    return new UserEntity(await this.userService.update(id, updateUserDto));
  }

  @Delete(':id')
  @ApiOkResponse({type: UserEntity})
  async remove(@Param('id') id: string) : Promise<UserEntity> {
    return new UserEntity(await this.userService.remove(id));
  }
}
