import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, Length } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty()
    @Length(2, 255)
    @ApiProperty()
    first_name: string;

    @IsNotEmpty()
    @Length(2, 255)
    @ApiProperty()
    last_name: string;

    @IsNotEmpty()
    @Length(7, 320)
    @IsEmail()
    @ApiProperty()
    email: string;

    @IsNotEmpty()
    @Length(8, 255)
    @ApiProperty()
    password: string;
}
