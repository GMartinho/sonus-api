import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { CreateFolderDto } from "./create-folder.dto";

export class CreateFolderWithImageDto extends CreateFolderDto {
    @ApiProperty()
    image: string;
}
