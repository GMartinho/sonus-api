import { ApiProperty } from "@nestjs/swagger";
import { user_account } from "@prisma/client";
import { Exclude } from "class-transformer";

export class UserEntity implements user_account {
    @ApiProperty()
    id: string;

    @ApiProperty()
    first_name: string;

    @ApiProperty()
    last_name: string;

    @ApiProperty()
    email: string;

    @ApiProperty()
    @Exclude()
    password: string;

    @ApiProperty()
    created_at: Date;

    @ApiProperty()
    updated_at: Date;

    constructor(partial: Partial<UserEntity>) {
        Object.assign(this, partial);
    }

}
