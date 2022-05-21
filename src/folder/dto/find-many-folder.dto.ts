import { ApiProperty } from "@nestjs/swagger";
import { Prisma } from '@prisma/client';
import { Type } from "class-transformer";

export class FindManyFolderDto {
    @ApiProperty()
    @Type(() => Number)
    skip?: number;

    @ApiProperty()
    @Type(() => Number)
    take?: number;

    @ApiProperty()
    @Type(() => Date)
    cursor?: Date;

    @ApiProperty()
    name?: string;

    @ApiProperty()
    @Type(() => Number)
    folder_id?: number;

}
