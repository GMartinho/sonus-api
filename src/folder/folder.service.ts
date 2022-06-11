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

      console.log(user_id);

      if (image) {
        return await this.fileStorage.create(user_id, image, this.bucket).then(
          async ([fileKey, fileLocation]) => {
            createFolderDto.image = fileKey;
            const createdFolder =  await this.prisma.folder.create({
              data: {
                ...createFolderDto,
                user_id: user_id
              }
            });
            return {...createdFolder, image: fileLocation}
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

  async findAll({ name, folder_id = null, take = 10, cursor = new Date() }: FindManyFolderDto): Promise<FolderEntity[]> {

    const where: Prisma.folderWhereInput = name ? { name : { contains: name } } : undefined;

    return await this.prisma.folder.findMany({
        take,
        where: {
          parent_id: folder_id,
          created_at: {
            lt: cursor
          },
          ...where
        },
        orderBy: {
          created_at: 'desc'
        }
      });
  }


  async findOne(id: number) {
    const folder = await this.prisma.folder.findUnique({ 
      where: { 
        id: id
      } 
    });

    return folder
  }

  update(id: number, updateFolderDto: UpdateFolderDto, image?: Express.Multer.File) {
    return `This action updates a #${id} folder`;
  }

  remove(id: number) {
    return `This action removes a #${id} folder`;
  }
}
