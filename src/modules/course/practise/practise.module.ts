import { Module } from '@nestjs/common';
import { PractiseController } from './practise.controller';
import { PractiseService } from './practise.service';

@Module({
  controllers: [PractiseController],
  providers: [PractiseService]
})
export class PractiseModule {}
