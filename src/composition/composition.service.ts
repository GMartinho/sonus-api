import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { FileStorageService } from 'src/file-storage/file-storage.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCompositionDto } from './dto/create-composition.dto';
import { UpdateCompositionDto } from './dto/update-composition.dto';
import { CompositionEntity } from './entities/composition.entity';

@Injectable()
export class CompositionService {
  private readonly bucket: string = 'BUCKET_COMPOSITION_RECORD';

  constructor(
    private readonly prisma: PrismaService, 
    private readonly fileStorage: FileStorageService,
    private readonly httpService: HttpService
    ) {}

  async create(createCompositionDto: CreateCompositionDto, user_id: string, record: Express.Multer.File) : Promise<CompositionEntity> {
    const { folder_id } = createCompositionDto;

    const [ recordFileKey, recordFileLocation ] = await this.fileStorage.create(user_id, record, this.bucket, folder_id);

    const composition = await this.prisma.composition.create({
      data: {
        ...createCompositionDto,
        user_id: user_id,
        record: recordFileKey
      }
    });

    // POST REQ TO SONUS WORKER API TO GENERATE MIDI
    // await this.httpService.post('URL_SONUS_WORKER', 'DADOS DA GRAVACAO', 'AUTENTICACAO')

    return composition;
  }

  findAll() {
    return `This action returns all composition`;
  }

  findOne(id: number) {
    return `This action returns a #${id} composition`;
  }

  update(id: number, updateCompositionDto: UpdateCompositionDto) {
    return `This action updates a #${id} composition`;
  }

  remove(id: number) {
    return `This action removes a #${id} composition`;
  }
}
