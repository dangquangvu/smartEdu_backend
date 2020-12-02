import { AccountService } from './account.service';
import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  NotImplementedException,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/shared/decorators/roles.decorator';
import { UserRoles } from '../auth/auth.interface';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { StreamService } from './stream.service';
import * as fs from 'fs';
import { url } from 'inspector';
import { createDirDto } from './stream.interface';
@ApiTags('stream')
@Controller('stream')
export class StreamController {
  constructor(
    private readonly streamService: StreamService,
    private readonly accountService: AccountService,
  ) {}
  @Get('upload')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'upload video in google drive' })
  postVideo(@Query('dir') dir: createDirDto) {
    if (dir) {
      throw new BadRequestException('Param is not match!');
    }
    let data = this.streamService.postVideo(url);
    if (data) {
      return data;
    }
    throw new NotImplementedException('not upload data!');
  }
}
