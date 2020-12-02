import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DbModel } from 'src/shared/constants';
import { AuthModule } from '../auth/auth.module';
import { UserSchema } from '../auth/user.schema';
import { StreamController } from './stream.controller';
import { StreamService } from './stream.service';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: DbModel.USER, schema: UserSchema }]),
    AuthModule,
  ],
  controllers: [StreamController, AccountController],
  providers: [StreamService, AccountService],
})
export class StreamModule {}
