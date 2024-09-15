import { Body, Controller, Get, InternalServerErrorException, Post } from "@nestjs/common";
import { ClubsService } from "./clubs.service";
import { ClubsWithPlayersDto } from "./dto/clubsWithPlayers.dto";

@Controller('clubs')
export class ClubsController {
  constructor(private readonly clubsService: ClubsService) {}

  @Post()
  async create(@Body() clubes: ClubsWithPlayersDto[]) {
    try {
      return await this.clubsService.create(clubes);
    }
    catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
