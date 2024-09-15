import { ApiProperty } from '@nestjs/swagger';
import { IsString } from "class-validator";

export class ClubDto {
  @ApiProperty()
  @IsString()
  name: string;

}