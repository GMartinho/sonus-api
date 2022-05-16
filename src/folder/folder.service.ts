import { Injectable } from '@nestjs/common';
import { FileStorageService } from 'src/file-storage/file-storage.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateFolderDto } from './dto/create-folder.dto';
import { UpdateFolderDto } from './dto/update-folder.dto';
import { v4 as uuid } from 'uuid';
import { CreateFolderWithImageDto } from './dto/create-folder-with-image.dto';
import { Folder } from './entities/folder.entity';
import { GetObjectOutput, PutObjectOutput } from 'aws-sdk/clients/s3';
import { FileStorageResponse } from 'src/file-storage/interfaces/file-storage-response.interface';
import { Prisma } from '@prisma/client';

@Injectable()
export class FolderService {
  private readonly bucket: string = 'BUCKET_FOLDER_IMAGE';

  constructor(private readonly prisma: PrismaService, private readonly fileStorage: FileStorageService) {}

  async create(createFolderDto: CreateFolderDto, image?: Express.Multer.File) : Promise<Folder> {

    try {

      const parent_id = createFolderDto.parent_id ? Number(createFolderDto.parent_id) : null;

      const data = {
        ...createFolderDto,
        parent_id
      }

      if (image) {
        const [imgKey, imgLocation] = await this.fileStorage.create(createFolderDto.user_id, image, this.bucket);
        data.image = imgKey;
        console.log(imgLocation);
      }
      
      const folder = await this.prisma.folder.create({
        data: data
      });

      return folder;

    } catch(error) {

      throw error;

    }

  }

  async findAll(params: {
    take?: number;
    cursor?: Prisma.folderWhereUniqueInput;
    name?: string;
  }, user_id: string): Promise<any> /*Promise<Folder[]>*/ {

    const { take, cursor, name } = params;

    const folders = await this.prisma.folder.findMany({
      //take,
      //skip: 1,
      //cursor,
      where : {
        name: {
          contains: name
        },
      }
    });

    //const teste = await this.fileStorageService.get(folders[0].image, this.bucket);

    //const foldersImages = await this.fileStorageService.list(user_id, this.bucket);

    // folders.map(async (folder) => {
    //   const { image } = folder;

    //   try {

    //     const imageObj = image ? await this.fileStorageService.get(image, this.bucket) : null;

    //     const imageBuffer = imageObj.Body;

    //     return {
    //       image: imageBuffer,
    //       ...folder
    //     }

    //   } catch (e) {
    //     throw e;
    //   }
      
      
    // });

    console.log(folders);

    //return foldersImages;
  }

  async findOne(user_id: uuid, id: number) {
    const folder = await this.prisma.folder.findUnique({ 
      where: { 
        id: id
      } 
    });

    if (folder.image) {
      const imagePath = folder.image ? `${folder.user_id}/${folder.image}` : null;
      //const imageFile = await this.fileStorageService.get(imagePath, this.bucket);
      //folder.image = imageFile.Body.toString('base64');
    }

    return folder
  }

  update(id: number, updateFolderDto: UpdateFolderDto, image?: Express.Multer.File) {
    return `This action updates a #${id} folder`;
  }

  remove(id: number) {
    return `This action removes a #${id} folder`;
  }
}
