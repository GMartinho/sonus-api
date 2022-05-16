import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { FolderModule } from './folder/folder.module';
import { FileStorageModule } from './file-storage/file-storage.module';
import { AwsS3Module } from './aws-s3/aws-s3.module';

@Module({
  imports: [UserModule, PrismaModule, FolderModule, FileStorageModule, AwsS3Module],
  controllers: [],
  providers: [],
})
export class AppModule {}
