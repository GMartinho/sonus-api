import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, HttpCode, HttpStatus, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiConsumes, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { User } from 'src/user/user.decorator';
import { CompositionService } from './composition.service';
import { CreateCompositionDto } from './dto/create-composition.dto';
import { UpdateCompositionDto } from './dto/update-composition.dto';
import { CompositionEntity } from './entities/composition.entity';

@ApiTags('Composition')
@Controller('compositions')
export class CompositionController {
  constructor(private readonly compositionService: CompositionService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('record'))
  @ApiConsumes('multipart/form-data')
  @ApiBearerAuth()
  @ApiCreatedResponse({type: CompositionEntity})
  @HttpCode(HttpStatus.ACCEPTED)
  async create(@Body() createCompositionDto: CreateCompositionDto, @User('id') user_id: string, @UploadedFile() record: Express.Multer.File) : Promise<CompositionEntity> {
    return new CompositionEntity(
      await this.compositionService.create(
        createCompositionDto,
        user_id,
        record
      )
    );
  }

  @Get()
  findAll() {
    return this.compositionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.compositionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCompositionDto: UpdateCompositionDto) {
    return this.compositionService.update(+id, updateCompositionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.compositionService.remove(+id);
  }
}
