import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DbModel } from 'src/shared/constants';
import { AuthModule } from '../auth/auth.module';
import { CommentController } from './comment.controller';
import { CommentSchema } from './comment.schema';
import { CommentService } from './comment.service';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([
      { name: DbModel.COMMENT, schema: CommentSchema },
    ]),
  ],
  controllers: [CommentController],
  providers: [CommentService],
  exports: [CommentService],
})
export class CommentModule {}
