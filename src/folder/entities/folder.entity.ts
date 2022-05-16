import { ApiProperty } from "@nestjs/swagger";
import { folder } from "@prisma/client";

export class Folder implements folder {
    @ApiProperty()
    id: number;

    @ApiProperty()
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

    constructor(partial: Partial<Folder>) {
        this.name = partial.name;
        this.image = partial.image ? partial.image.split(':')[1] : null;
        this.parent_id = partial.parent_id;
        this.created_at = partial.created_at;
        this.updated_at = partial.updated_at;
    }
}
