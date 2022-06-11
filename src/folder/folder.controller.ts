import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, UseInterceptors, Req, Query, UseGuards } from '@nestjs/common';
import { FolderService } from './folder.service';
import { CreateFolderDto } from './dto/create-folder.dto';
import { UpdateFolderDto } from './dto/update-folder.dto';
import { FindManyFolderDto } from './dto/find-many-folder.dto';
import { ApiBearerAuth, ApiConsumes, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { FolderEntity } from './entities/folder.entity';
import { Express } from 'express';
import { JwtAuthGuard } from './../auth/jwt-auth.guard';
import { User } from '../user/user.decorator';
import { UserEntity } from '../user/entities/user.entity';

@ApiTags('Folder')
@Controller('folders')
export class FolderController {
  constructor(private readonly folderService: FolderService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('image'))
  @ApiConsumes('multipart/form-data')
  @ApiBearerAuth()
  @ApiCreatedResponse({type: FolderEntity})
  async create(@Body() createFolderDto: CreateFolderDto, @User('id') user_id: string, @UploadedFile() image?: Express.Multer.File) : Promise<FolderEntity> {
    return new FolderEntity(
      await this.folderService.create(
        createFolderDto,
        user_id, 
        image
      )
    );
  }

  @Get()
  @ApiOkResponse({type: [FolderEntity]})
  findAll(@Query() findManyFolderDto: FindManyFolderDto) {
    return this.folderService.findAll(findManyFolderDto);
  }

  @Get(':id')
  @ApiOkResponse({type: FolderEntity})
  findOne(@Param('id') id: string) {
    return this.folderService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({type: FolderEntity})
  update(@Param('id') id: string, @Body() updateFolderDto: UpdateFolderDto) {
    return this.folderService.update(+id, updateFolderDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({type: FolderEntity})
  remove(@Param('id') id: string) {
    return this.folderService.remove(+id);
  }
}
