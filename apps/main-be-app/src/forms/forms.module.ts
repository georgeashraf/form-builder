import { Module } from '@nestjs/common';
import { FormsController } from './forms.controller';
import { FormsService } from './forms.service';

@Module({
  imports: [],
  providers: [FormsService],
  controllers: [FormsController],
})
export class FormsModule {}
