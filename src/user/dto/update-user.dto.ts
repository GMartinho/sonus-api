import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, Length } from "class-validator";

export class UpdateUserDto extends PartialType(CreateUserDto) {

    @IsNotEmpty()
    @Length(2, 255)
    @ApiProperty({required: false})
    first_name: string;

    @IsNotEmpty()
    @Length(2, 255)
    @ApiProperty({required: false})
    last_name: string;

    @Length(1, 255)
    @ApiProperty({required: false})
    stage_name?: string;

    @IsNotEmpty()
    @Length(7, 320)
    @IsEmail()
    @ApiProperty({required: false})
    email: string;

    @IsNotEmpty()
    @Length(8, 255)
    @ApiProperty({required: false})
    password: string;
}
