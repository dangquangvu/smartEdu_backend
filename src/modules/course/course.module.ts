import { Module } from '@nestjs/common';
import { CourseController } from './course.controller';
import { CourseService } from './course.service';
import { CourseDetailsService } from './course-details/course-details.service';
import { CourseDetailsModule } from './course-details/course-details.module';
import { MongooseModule } from '@nestjs/mongoose';
import { DbModel } from 'src/shared/constants';
import { CourseSchema } from './course.schema';
import { CourseDetails } from './course-details/course-details.schema';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: DbModel.COURSE, schema: CourseSchema },
      { name: DbModel.COURSEDETAILS, schema: CourseDetails },
    ]),
    CourseDetailsModule,
    AuthModule,
  ],
  controllers: [CourseController],
  providers: [CourseService, CourseDetailsService],
})
export class CourseModule {}
