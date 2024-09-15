import { PlayerDTO } from "./player.dto";
import { IsUUID } from "class-validator";

export class ClubsWithPlayersDto {
    @IsUUID()
    id: string;

    name: string;

    players: PlayerDTO[];
}