import { Module } from '@nestjs/common';
import { RequestsController } from './requests.controller';
import { RequestsService } from './requests.service';

@Module({
  imports: [],
  providers: [RequestsService],
  controllers: [RequestsController],
})
export class RequestsModule {}
