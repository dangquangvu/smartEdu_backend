import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config/dist/config.module';
import { MongooseModule } from '@nestjs/mongoose/dist/mongoose.module';
import { AuthModule } from './modules/auth/auth.module';
import { CommentModule } from './modules/comment/comment.module';
import { CourseModule } from './modules/course/course.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { MentorModule } from './modules/mentor/mentor.module';
import { StreamModule } from './modules/stream/stream.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    }),
    AuthModule,
    DashboardModule,
    CommentModule,
    MentorModule,
    CourseModule,
    StreamModule,
  ],
})
export class AppModule {}
