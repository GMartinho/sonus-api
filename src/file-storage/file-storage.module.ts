import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AwsS3Service } from 'src/aws-s3/aws-s3.service';
import { FileStorageService } from './file-storage.service';

@Global()
@Module({
  providers: [FileStorageService, ConfigService, AwsS3Service],
  exports: [FileStorageService]
})
export class FileStorageModule {}
