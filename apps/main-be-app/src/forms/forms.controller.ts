import { CreateFormModelType } from '@engine/shared-types';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { FormsService } from './forms.service';

@Controller('/forms')
export class FormsController {
  constructor(private readonly formsService: FormsService) {}

  @Post()
  //   @UsePipes(ValidationPipe)
  create(@Body() createForm: CreateFormModelType) {
    return this.formsService.create(createForm);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.formsService.findOne(id);
  }
}
