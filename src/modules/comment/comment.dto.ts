import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateCommentDto {
  @ApiProperty({
    description: 'The id of the User comment',
    format: 'string',
  })
  id_user_cmt: string;

  @ApiProperty({
    description: 'The id of the Course',
    format: 'string',
  })
  id_course: string;

  @ApiProperty({
    description: 'The id of the parent comment',
    format: 'string',
    required: false,
  })
  id_parent_cmt?: string;

  @ApiProperty({
    description: 'content',
    format: 'string',
  })
  content: string;
  @ApiProperty({
    description: 'is parent comment',
    format: 'boolean',
  })
  isparent?: boolean;
  @ApiProperty({
    description: 'numbers like comment',
    format: 'number',
  })
  like?: string;
  @ApiProperty({
    description: 'is edit comment',
    format: 'boolean',
  })
  isedit?: boolean;
  @ApiProperty({
    description: 'is edit comment',
    format: 'boolean',
  })
  isannounce?: boolean;
}

export class CommenOutputDto {
  @ApiProperty({
    description: 'The id of the User comment',
    format: 'string',
  })
  id_user_cmt: string;

  @ApiProperty({
    description: 'The id of the Course',
    format: 'string',
  })
  id_course: string;

  @ApiProperty({
    description: 'The id of the parent comment',
    format: 'string',
    required: false,
  })
  id_parent_cmt?: string;

  @ApiProperty({
    description: 'content',
    format: 'string',
  })
  content: string;

  @ApiProperty({
    description: 'is parent comment',
    format: 'boolean',
  })
  isparent?: boolean;

  @ApiProperty({
    description: 'numbers like comment',
    format: 'number',
  })
  like?: string;

  @ApiProperty({
    description: 'is edit comment',
    format: 'boolean',
  })
  isedit?: boolean;

  @ApiProperty({
    description: 'is edit comment',
    format: 'boolean',
  })
  isannounce?: boolean;

  @ApiProperty({
    format: 'Date',
  })
  created_at?: Date;

  @ApiProperty({
    format: 'Date',
  })
  updated_at?: Date;
}
