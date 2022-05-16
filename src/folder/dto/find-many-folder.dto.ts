import { ApiProperty } from "@nestjs/swagger";
import { Prisma } from '@prisma/client';

export class FindManyFolderDto {
    @ApiProperty()
    name?: string;

    @ApiProperty()
    take?: number;

    @ApiProperty()
    cursor?: Prisma.folderWhereUniqueInput;

}
