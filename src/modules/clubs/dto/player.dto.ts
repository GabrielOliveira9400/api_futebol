import { IsUUID } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class PlayerDTO {
    @ApiProperty({ description: 'ID do jogador', example: '123e4567-e89b-12d3-a456-426614174000' })
    @IsUUID()
    id: string;

    @ApiProperty({ description: 'Nome do jogador', example: 'João' })
    name: string;

    @IsUUID()
    @ApiProperty({ description: 'ID do clube do jogador', example: '123e4567-e89b-12d3-a456-426614174000' })
    clubId: string;

    @ApiProperty({ description: 'Posição do jogador', example: 'Atacante' })
    position: string;
}