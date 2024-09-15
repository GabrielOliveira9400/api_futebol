import { IsUUID } from "class-validator";

export class PlayerDTO {
    @IsUUID()
    id: string;

    name: string;

    @IsUUID()
    clubId: string;

    position: string;
}