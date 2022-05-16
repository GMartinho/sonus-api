import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, UseInterceptors, Req, Query } from '@nestjs/common';
import { FolderService } from './folder.service';
import { CreateFolderDto } from './dto/create-folder.dto';
import { UpdateFolderDto } from './dto/update-folder.dto';
import { FindManyFolderDto } from './dto/find-many-folder.dto';
import { ApiConsumes } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { Folder } from './entities/folder.entity';
import { Express } from 'express';

@Controller('users/:user_id/folders')
export class FolderController {
  constructor(private readonly folderService: FolderService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  @ApiConsumes('multipart/form-data')
  async create(@Body() createFolderDto: CreateFolderDto, @UploadedFile() image?: Express.Multer.File) : Promise<Folder> {
    return new Folder(
      await this.folderService.create(
        createFolderDto, 
        image
      )
    );
  }

  @Get()
  findAll(@Query() findManyFolderDto: FindManyFolderDto, @Param('user_id') user_id: string) {
    return this.folderService.findAll(findManyFolderDto, user_id);
  }

  @Get(':id')
  findOne(@Param('user_id') user_id: string, @Param('id') id: string) {
    return this.folderService.findOne(user_id, +id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFolderDto: UpdateFolderDto) {
    return this.folderService.update(+id, updateFolderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.folderService.remove(+id);
  }
}
