import { CourseService } from './course.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { Roles } from 'src/shared/decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { UserRoles } from '../auth/auth.interface';
import { CourseDto } from './course.dto';

@ApiTags('Course')
@Controller('course')
export class CourseController {
  constructor(private courseService: CourseService) {}

  @Get('')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get Course' })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Roles(...[UserRoles.ADMIN, UserRoles.MENTOR, UserRoles.USER])
  indexCourse(): Promise<any> {
    return this.courseService.indexCourse();
  }
  @Get(':id/details')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get Course details' })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Roles(...[UserRoles.ADMIN, UserRoles.MENTOR, UserRoles.USER])
  indexCourseDetails(
    @Param('id') id: string,
  ): Promise<any> {
    return this.courseService.indexCourseDetails(id);
  }

  @Post('')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create Course from admin' })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Roles(...[UserRoles.ADMIN])
  createCourse(@Body() courseDto: CourseDto): Promise<any> {
    return this.courseService.createCourse(courseDto);
  }

  @Put(':id')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Edit Course from admin' })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Roles(...[UserRoles.ADMIN])
  updateCourse(
    @Body() courseDto: CourseDto,
    @Param('id') id: string,
  ): Promise<any> {
    return this.courseService.updateCourse(courseDto, id);
  }
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete Course from admin' })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Roles(...[UserRoles.ADMIN])
  deleteCourse(
    @Param('id') id: string,
  ): Promise<any> {
    return this.courseService.deleteCourse(id);
  }
}
