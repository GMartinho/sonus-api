import { Injectable } from '@nestjs/common';
import { FileService } from 'src/file/file.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateFolderDto } from './dto/create-folder.dto';
import { UpdateFolderDto } from './dto/update-folder.dto';
import { v4 as uuid } from 'uuid';
import { Express } from 'express';

@Injectable()
export class FolderService {

  constructor(private readonly prisma: PrismaService, private readonly fileService: FileService) {}

  async create(createFolderDto: CreateFolderDto, image?: Express.Multer.File) {
    const { parent_folder_id } = createFolderDto;

    console.log(image);

    try {
     
      const data = {
        ...createFolderDto,
        parent_folder_id: parent_folder_id ? parseInt(parent_folder_id) : null
      };

      if (image) {
        const imageKey = uuid();
        data.image = `${createFolderDto.user_id}/${imageKey}:${image.originalname}`;

        await this.fileService.upload(imageKey, image, 'BUCKET_FOLDER_IMAGE').then(async (s) => {

          return await this.prisma.folder.create({
            data: data,
          }).then((s) => {
            return data;
          }).catch((e) => {
            return e
          })

        }).catch((e) => {
          return e
        });
      } else {
        await this.prisma.folder.create({
          data: data,
        }).then((s) => {
          return data;
        }).catch((e) => {
          return e
        });
      }

    } catch(e) {

      console.log(e)

    }

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
