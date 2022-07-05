import { Injectable } from '@nestjs/common';
import { FileStorageService } from 'src/file-storage/file-storage.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateFolderDto } from './dto/create-folder.dto';
import { UpdateFolderDto } from './dto/update-folder.dto';
import { v4 as uuid } from 'uuid';
import { CreateFolderWithImageDto } from './dto/create-folder-with-image.dto';
import { FolderEntity } from './entities/folder.entity';
import { GetObjectOutput, PutObjectOutput } from 'aws-sdk/clients/s3';
import { FileStorageResponse } from 'src/file-storage/interfaces/file-storage-response.interface';
import { Prisma } from '@prisma/client';
import { findManyCursorConnection } from '@devoxa/prisma-relay-cursor-connection';
import { FindManyFolderDto } from './dto/find-many-folder.dto';
import { UserEntity } from 'src/user/entities/user.entity';

@Injectable()
export class FolderService {
  private readonly bucket: string = 'BUCKET_FOLDER_IMAGE';

  constructor(private readonly prisma: PrismaService, private readonly fileStorage: FileStorageService) {}

  async create(createFolderDto: CreateFolderDto, user_id: string, image?: Express.Multer.File) : Promise<FolderEntity> {

    try {

      if (image) {
        return await this.fileStorage.create(user_id, image, this.bucket, createFolderDto.parent_id).then(
          async ([fileKey, fileName]) => {
            createFolderDto.image = fileKey;
            const createdFolder =  await this.prisma.folder.create({
              data: {
                ...createFolderDto,
                user_id: user_id
              }
            });
            return {...createdFolder, image: fileName}
        }).catch((error) => {
          throw error;
        });
      }

      return await this.prisma.folder.create({
        data: {
          ...createFolderDto,
          user_id: user_id
        }
      });

    } catch(error) {

      throw error;

    }

  }

  async findAll({ name, parent_id = null, take = 10, cursor = new Date() }: FindManyFolderDto, user_id: string): Promise<FolderEntity[]> {

    const where: Prisma.folderWhereInput = name ? { name : { contains: name } } : undefined;

    return await this.prisma.folder.findMany({
        take,
        where: {
          parent_id: parent_id,
          created_at: {
            lt: cursor
          },
          ...where
        },
        orderBy: {
          created_at: 'desc'
        }
      }).then(async (response) => {
        const fileObjects = await this.fileStorage.findAll(user_id, this.bucket, parent_id);

        console.log(fileObjects);

        response.map((folder) => {
          if (folder.image) {
            console.log(folder);
          }
        });
        return response;
      });
  }


  async findOne(id: number) {

    return await this.prisma.folder.findUnique({ 
      where: { 
        id: id
      } 
    }).then(
      async (response) => {
        if (response.image) {
          const img = await this.fileStorage.findOne(response.image, this.bucket);
          console.log(img);
        }

        return response;

    }).catch((error) => {
      throw error;
    });
  }

  update(id: number, updateFolderDto: UpdateFolderDto, image?: Express.Multer.File) {
    return `This action updates a #${id} folder`;
  }

  remove(id: number) {
    return `This action removes a #${id} folder`;
  }
}
