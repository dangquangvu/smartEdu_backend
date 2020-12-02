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
  Post,
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
  @Post('upload')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'upload video in google drive' })
  postVideo(@Body() dir: createDirDto) {
    if (!this.isVideo(dir.dir)) {
      throw new BadRequestException('Param is not match!');
    }
    let data = this.streamService.postVideo(dir.dir);
    if (data) {
      return data;
    }
    throw new NotImplementedException('not upload data!');
  }

  isVideo(filename) {
    let ext = this.getExtension(filename);
    switch (ext.toLowerCase()) {
      case 'm4v':
      case 'avi':
      case 'mpg':
      case 'mp4':
        // etc
        return true;
    }
    return false;
  }
  getExtension(filename) {
    let parts = filename.split('.');
    return parts[parts.length - 1];
  }
}
