import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateFormModel } from './forms.schema';
import { FormsService } from './forms.service';

@Controller('/forms')
export class FormsController {
  constructor(private readonly formsService: FormsService) {}

  @Post()
  //   @UsePipes(ValidationPipe)
  create(@Body() createForm: CreateFormModel) {
    return this.formsService.create(createForm);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.formsService.findOne(id);
  }
}
