import { ApiProperty } from "@nestjs/swagger";
import { folder } from "@prisma/client";
import { Exclude } from "class-transformer";

export class FolderEntity implements folder {
    @ApiProperty()
    id: number;

    @ApiProperty()
    @Exclude()
    user_id: string;

    @ApiProperty({ type: Number })
    parent_id: number;

    @ApiProperty()
    name: string;

    @ApiProperty()
    created_at: Date;

    @ApiProperty()
    updated_at: Date;

    @ApiProperty()
    image: string;

    constructor(partial: Partial<FolderEntity>) {
        Object.assign(this, partial);
    }
}
