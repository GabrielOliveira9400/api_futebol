import { PlayerDTO } from "./player.dto";
import { IsUUID } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class ClubsWithPlayersDto {
    @IsUUID()
    @ApiProperty({ description: 'ID do clube', example: '123e4567-e89b-12d3-a456-426614174000' })

    id: string;

    @ApiProperty({ description: 'Nome do clube', example: 'Clube do Povo' })
    name: string;

    @ApiProperty({ description: 'Jogadores do clube', type: [PlayerDTO] })
    players: PlayerDTO[];
}