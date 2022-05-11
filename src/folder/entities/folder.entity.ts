import { ApiProperty } from "@nestjs/swagger";
import { folder } from "@prisma/client";
import { Transform } from "class-transformer";

export class Folder implements folder {
    @ApiProperty()
    id: number;

    @ApiProperty()
    user_id: string;

    @ApiProperty({ type: Number })
    parent_folder_id: number;

    @ApiProperty()
    name: string;

    @ApiProperty()
    image: string;

    @ApiProperty()
    created_at: Date;

    @ApiProperty()
    updated_at: Date;

    constructor(partial: Partial<Folder>) {
        Object.assign(this, partial)
    }
}
