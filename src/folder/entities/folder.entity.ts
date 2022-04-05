import { folder } from "@prisma/client";

export class Folder implements folder {
    id: number;
    user_id: string;
    parent_folder_id: number;
    name: string;
    image: string;
    created_at: Date;
    updated_at: Date;
}
