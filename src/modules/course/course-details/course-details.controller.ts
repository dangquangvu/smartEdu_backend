import { CourseDetailsService } from './course-details.service';
import { Controller, Get, HttpCode, HttpStatus, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserRoles } from 'src/modules/auth/auth.interface';
import { AuthService } from 'src/modules/auth/auth.service';
import { JwtAuthGuard } from 'src/modules/auth/guard/jwt-auth.guard';
import { Roles } from 'src/shared/decorators/roles.decorator';

@ApiTags('course-details')
@Controller('course-details')
export class CourseDetailsController {
  constructor(
    private authService: AuthService,
    private courseDetailsService: CourseDetailsService,
  ) {}

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get Course' })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Roles(...[UserRoles.ADMIN, UserRoles.MENTOR, UserRoles.USER])
  indexCourseDetails(@Param('id') id: string): Promise<any> {
    return this.courseDetailsService.indexCourseDetails(id);
  }

  @Post(':id')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Get Course' })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Roles(...[UserRoles.ADMIN, UserRoles.MENTOR, UserRoles.USER])
  createCourseDetails(@Param('id') id: string): Promise<any> {
    return this.courseDetailsService.createCourseDetails(id);
  }
}
