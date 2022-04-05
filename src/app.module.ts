import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { FolderModule } from './folder/folder.module';
import { FileModule } from './file/file.module';

@Module({
  imports: [UserModule, PrismaModule, FolderModule, FileModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
