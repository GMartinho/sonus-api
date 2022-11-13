import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNotEmpty, Length } from "class-validator";

export class CreateCompositionDto {
    @IsNotEmpty()
    @Length(1, 255)
    @ApiProperty()
    name: string;

    @ApiProperty()
    record: string;

    @ApiProperty({type: Number})
    @Type(() => Number)
    folder_id?: number;

}
