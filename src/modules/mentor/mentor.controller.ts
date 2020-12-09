import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/shared/decorators/roles.decorator';
import { UserRoles } from '../auth/auth.interface';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { MentorService } from './mentor.service';

@ApiTags('mentor')
@Controller('mentor')
export class MentorController {
  constructor(private readonly mentorService: MentorService) {}
  @Get('')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get all mentor' })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Roles(...[UserRoles.ADMIN, UserRoles.MENTOR, UserRoles.USER])
  indexMentor(): Promise<any> {
    return this.mentorService.indexMentor();
  }

  @Get(':id/details')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get Course' })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Roles(...[UserRoles.ADMIN, UserRoles.MENTOR, UserRoles.USER])
  mentorDetails(@Query('id') id: string): Promise<any> {
    return this.mentorService.mentorDetails(id);
  }
}
