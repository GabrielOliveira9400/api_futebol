import { HttpException, Injectable } from "@nestjs/common";
import { ClubsWithPlayersDto } from './dto/clubsWithPlayers.dto';
import { PlayerDTO } from './dto/player.dto';
import { InjectRepository } from "@nestjs/typeorm";
import { ClubEntity } from "../../database/entities/club.entity";
import { Repository } from "typeorm";
import { PlayerEntity } from "../../database/entities/player.entity";
import { v4 as uuidv4 } from "uuid";
import { Positions} from "../../helpers/translatePositions";

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
    const playerEntity = await this.playerRepository.findOne({
      where: { name: player.name }
    });

    if (!playerEntity) {
      throw new HttpException('Player not found', 404);
    }

    playerEntity.clubId = player.clubId;
    await this.playerRepository.save(playerEntity);
  }

  async updateClub(club: ClubsWithPlayersDto): Promise<void> {
    const clubEntity = await this.clubRepository.findOne({
      where: { name: club.name }
    });

    if (!clubEntity) {
      throw new HttpException('Club not found', 404);
    }

    clubEntity.name = club.name;
    await this.clubRepository.save(clubEntity);
  }

  async findClubsWithPlayers(): Promise<ClubsWithPlayersDto[]> {
    let clubs =  await this.clubRepository.find({ relations: ['players'] });
    clubs.map(club => {
      club.players.map(player => {
        player.position = Positions[player.position] || player.position;
      })
    });
    return clubs;
  }
}
