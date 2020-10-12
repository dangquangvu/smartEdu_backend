import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CourseDto {
  @ApiProperty({
    description: 'index Course',
    format: 'number',
    required: true,
  })
  @IsNotEmpty()
  index: number;

  @ApiProperty({
    description: 'The id of the parent comment',
    format: 'string',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    description: 'content',
    format: 'string',
  })
  @IsNotEmpty()
  @IsString()
  description: string;
}
