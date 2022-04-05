import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, Length } from "class-validator";

export class CreateFolderDto {
    @IsNotEmpty()
    @Length(2, 255)
    @ApiProperty()
    name: string;

    @ApiProperty()
    image?: Buffer;

    @IsNotEmpty()
    @ApiProperty()
    user_id: string;

    @ApiProperty()
    parent_folder_id?: number;

}
