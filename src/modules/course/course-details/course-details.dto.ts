import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class InputCourseDetailsDto {
  @ApiProperty({
    description: 'index session course',
    format: 'number',
    required: true,
    uniqueItems : true
  })
  @IsNotEmpty()
  index_session: number;

  @ApiProperty({
    description: 'sub title session',
    format: 'string',
    required: true,
    uniqueItems: true
  })
  @IsNotEmpty()
  @IsString()
  subtitle: string;

  @ApiProperty({
    description: 'content',
    format: 'string',
    required: false,
  })
  @IsNotEmpty()
  @IsString()
  description?: string;
  @ApiProperty({
    description: 'url video',
    format: 'string',
    required: false,
  })
  @IsNotEmpty()
  @IsString()
  url_video?: string;
}
