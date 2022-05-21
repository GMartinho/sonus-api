import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNotEmpty, Length } from "class-validator";

export class CreateFolderDto {
    @IsNotEmpty()
    @Length(2, 255)
    @ApiProperty()
    name: string;

    @ApiProperty()
    image?: string;

    @IsNotEmpty()
    @ApiProperty()
    user_id: string;

    @ApiProperty({type: Number})
    @Type(() => Number)
    parent_id?: number;
}
