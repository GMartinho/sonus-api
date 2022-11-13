import { ApiProperty } from "@nestjs/swagger";
import { composition } from "@prisma/client";
import { Exclude } from "class-transformer";

export class CompositionEntity implements composition {
    @ApiProperty()
    id: number;

    @ApiProperty()
    @Exclude()
    user_id: string;

    @ApiProperty()
    @Exclude()
    folder_id: number;

    @ApiProperty()
    name: string;

    @ApiProperty()
    record: string;

    @ApiProperty()
    midi_record: string;

    @ApiProperty()
    created_at: Date;

    @ApiProperty()
    updated_at: Date;

    constructor(partial: Partial<CompositionEntity>) {
        Object.assign(this, partial);
        this.record = partial?.record?.split(':')[1];
        this.midi_record = null ?? 'In process';
    }
}
