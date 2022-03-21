import { IsNotEmpty, Length } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty()
    @Length(2, 255)
    firstName: string;

    @IsNotEmpty()
    @Length(2, 255)
    lastName: string;

    @IsNotEmpty()
    @Length(7, 320)
    email: string;

    @IsNotEmpty()
    @Length(8, 255)
    password: string;
}
