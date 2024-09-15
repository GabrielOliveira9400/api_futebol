import { Module } from '@nestjs/common';
import { ClubsService } from './clubs.service';
import { ClubsController } from './clubs.controller';
import { ClubEntity } from "../../database/entities/club.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PlayersService } from "../players/players.service";
import { PlayersModule } from "../players/players.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([ClubEntity]),
    PlayersModule
  ],
  controllers: [ClubsController],
  providers: [ClubsService],
})
export class ClubsModule {}
