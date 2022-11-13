import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { Length } from 'class-validator';
import { CreateCompositionDto } from './create-composition.dto';

export class UpdateCompositionDto extends PartialType(CreateCompositionDto) {
    @Length(1, 255)
    @ApiProperty({required: false})
    name?: string;

    @ApiProperty({required: false})
    record?: string;

    @ApiProperty({type: Number, required: false})
    @Type(() => Number)
    folder_id?: number;

    @ApiProperty({required: false})
    midi_record?: string;

}
