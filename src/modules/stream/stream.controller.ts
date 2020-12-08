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
import { isVideo } from 'src/shared/helper';
import { IPath } from './stream.type';
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
    if (!isVideo(dir.dir)) {
      throw new BadRequestException('Param is not match!');
    }
    let data = this.streamService.postVideo(dir.dir);
    if (data) {
      return data;
    }
    throw new NotImplementedException('not upload data!');
  }

  @Get('path')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'get path all video in google drive' })
  indexPaths(): Promise<any> {
    return this.streamService.indexPaths();
  }

  @Get('urlVideo')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'get video url in google drive' })
  indexUrlVideo(@Query('id') id: string): Promise<string> {
    return this.streamService.indexUrlVideo(id);
  }
}
