import { Body, Controller, Get, InternalServerErrorException, Post } from "@nestjs/common";
import { ClubsService } from "./clubs.service";
import { ClubsWithPlayersDto } from "./dto/clubsWithPlayers.dto";
import { ApiBody, ApiResponse } from "@nestjs/swagger";

@Controller('clubs')
export class ClubsController {
  constructor(private readonly clubsService: ClubsService) {}

  @Post()
  @ApiResponse({ status: 201, description: 'Clubs successfully created.' })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  @ApiBody({ type: ClubsWithPlayersDto, isArray: true })
  async create(@Body() clubes: ClubsWithPlayersDto[]): Promise<string> {
    try {
      return await this.clubsService.create(clubes);
    }
    catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @Get()
  @ApiResponse({ status: 200, description: 'Clubs successfully found.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  async findAll() : Promise<ClubsWithPlayersDto[]>{
    try {
      return await this.clubsService.findClubsWithPlayers();
    }
    catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
