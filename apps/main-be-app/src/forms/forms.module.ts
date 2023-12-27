import { Module } from '@nestjs/common';
import { RequestsService } from '../requests/requests.service';
import { FormsController } from './forms.controller';
import { FormsService } from './forms.service';

@Module({
  imports: [],
  providers: [FormsService, RequestsService],
  controllers: [FormsController],
})
export class FormsModule {}
