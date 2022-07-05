import { ApiProperty } from "@nestjs/swagger";
import { Prisma } from '@prisma/client';
import { Type } from "class-transformer";

export class FindManyFolderDto {
    @ApiProperty({required: false})
    @Type(() => Number)
    skip?: number;

    @ApiProperty({required: false})
    @Type(() => Number)
    take?: number;

    @ApiProperty({required: false})
    @Type(() => Date)
    cursor?: Date;

    @ApiProperty({required: false})
    name?: string;

    @ApiProperty({required: false})
    @Type(() => Number)
    parent_id?: number;

}
