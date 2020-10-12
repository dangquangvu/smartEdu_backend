import { Controller, Get, HttpCode, HttpStatus, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { CommentService } from './comment.service';

@ApiTags('comment')
@Controller('comment')
export class CommentController {
  constructor(private commentService: CommentService) {}

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'get comment in course' })
  @UseGuards(JwtAuthGuard)
  indexComment(@Param('id') id: string) {
    return this.commentService.indexComment(id);
  }

  @Post(':id')
  @HttpCode(HttpStatus.CREATED)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'post comment in course' })
  @UseGuards(JwtAuthGuard)
  postComment() {
    return this.commentService.postComment;
  }
}
