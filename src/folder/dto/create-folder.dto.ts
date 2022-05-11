import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
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

    @ApiProperty()
    parent_folder_id?: string;

}
