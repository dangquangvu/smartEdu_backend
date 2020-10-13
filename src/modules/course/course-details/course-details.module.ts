import { CourseDetailsService } from './course-details.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/modules/auth/auth.module';
import { DbModel } from 'src/shared/constants';
import { CourseDetailsController } from './course-details.controller';
import { CourseDetails } from './course-details.schema';
import { CourseSchema } from '../course.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: DbModel.COURSEDETAILS, schema: CourseDetails },
      { name: DbModel.COURSE, schema: CourseSchema },
    ]),
    AuthModule,
  ],
  controllers: [CourseDetailsController],
  providers: [CourseDetailsService],
  exports: [CourseDetailsService],
})
export class CourseDetailsModule {}
