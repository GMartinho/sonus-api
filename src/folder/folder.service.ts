import { Injectable } from '@nestjs/common';
import { FileService } from 'src/file/file.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateFolderDto } from './dto/create-folder.dto';
import { UpdateFolderDto } from './dto/update-folder.dto';

@Injectable()
export class FolderService {

  constructor(private readonly prisma: PrismaService, private readonly fileService: FileService) {}

  async create(createFolderDto: CreateFolderDto) {
    const { user_id, parent_folder_id, image } = createFolderDto;

    const file = await this.fileService.upload(`${user_id}:${parent_folder_id}`, image);

    // return this.prisma.folder.create({
    //   data: createFolderDto,
    // })
  }

  findAll() {
    return `This action returns all folder`;
  }

  findOne(id: number) {
    return `This action returns a #${id} folder`;
  }

  update(id: number, updateFolderDto: UpdateFolderDto) {
    return `This action updates a #${id} folder`;
  }

  remove(id: number) {
    return `This action removes a #${id} folder`;
  }
}
