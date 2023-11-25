import { Module } from '@nestjs/common';
import { FormsController } from './requests.controller';
import { FormsService } from './requests.service';

@Module({
  imports: [],
  providers: [FormsService],
  controllers: [FormsController],
})
export class FormsModule {}
