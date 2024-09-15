import { HttpException, Injectable } from "@nestjs/common";
import { ClubsWithPlayersDto } from './dto/clubsWithPlayers.dto';
import { PlayerDTO } from './dto/player.dto';
import { InjectRepository } from "@nestjs/typeorm";
import { ClubEntity } from "../../database/entities/club.entity";
import { Repository } from "typeorm";
import { PlayerEntity } from "../../database/entities/player.entity";
import { v4 as uuidv4 } from "uuid";
import * as process from "node:process";

@Injectable()
export class ClubsService {
  constructor(
    @InjectRepository(ClubEntity)
    private readonly clubRepository: Repository<ClubEntity>,

    @InjectRepository(PlayerEntity)
    private readonly playerRepository: Repository<PlayerEntity>
  ) {}

  async create(clubsWithPlayers: ClubsWithPlayersDto[]) : Promise<string>{
    try {
      for (const newClub of clubsWithPlayers) {
        const club = await this.clubRepository.findOne({
          where: { name: newClub.name }
        });

        if (!club) {
          newClub.id = uuidv4();
          await this.createClub(newClub);
        }

        for (const player of newClub.players) {
          const playerEntity = await this.playerRepository.findOne({
            where: { name: player.name }
          });

          if (!playerEntity) {
            player.id = uuidv4();
            player.clubId = newClub.id !== undefined ? newClub.id : club.id;
            await this.createPlayers(player);
          } else {
            const updatePlayer = {
              ...player,
              clubId: newClub.id !== undefined ? newClub.id : club.id
            };
            await this.updatePlayer(updatePlayer);
          }
        }
      }
      return 'Clubs with plauers saved successfully';
    }
    catch (error) {
      console.error(error);
      throw new HttpException('Internal server error', 500);
    }
  }

  async createClub(club: any) {
    const clubEntity = this.clubRepository.create(club);
    await this.clubRepository.save(clubEntity);
  }

  async createPlayers(player: any) {
    const playerEntity = this.playerRepository.create(player);
    await this.playerRepository.save(playerEntity);
  }


  async updatePlayer(player: PlayerDTO): Promise<void> {

  }

  async updateClub(club: ClubsWithPlayersDto): Promise<void> {

  }

  async filterByPlayerName(name: string): Promise<ClubEntity[]> {
    return this.clubRepository.createQueryBuilder('club')
      .leftJoinAndSelect('club.players', 'player')
      .where('player.name = :name', { name })
      .getMany();
  }

  async filterByClubName(name: string): Promise<ClubEntity[]> {
    return this.clubRepository.createQueryBuilder('club')
      .where('club.name = :name', { name })
      .getMany();
  }

  async findClubsWithPlayers(): Promise<ClubEntity[]> {
    return this.clubRepository.find({ relations: ['players'] });
  }
}
