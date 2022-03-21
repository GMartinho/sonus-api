import { ApiProperty } from "@nestjs/swagger";
import { user_account } from "@prisma/client";

export class User implements user_account {
    @ApiProperty()
    id: string;

    @ApiProperty()
    first_name: string;

    @ApiProperty()
    last_name: string;

    @ApiProperty()
    email: string;

    @ApiProperty()
    password: string;

    @ApiProperty()
    created_at: Date;

    @ApiProperty()
    updated_at: Date;

    constructor(partial: Partial<User>) {
        Object.assign(this, partial)
    }

}
