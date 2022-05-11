import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FileService } from './file.service';

@Global()
@Module({
  providers: [FileService, ConfigService],
  exports: [FileService]
})
export class FileModule {}
