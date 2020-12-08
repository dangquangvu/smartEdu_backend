import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class IPath {
  id: string;
  name: string;
}

export class idDto {
  @ApiProperty({
    example: 'id',
    description: 'The id of the video',
    format: 'string',
    type: 'string',
  })
  @IsNotEmpty()
  @IsString()
  readonly id: string;
}
