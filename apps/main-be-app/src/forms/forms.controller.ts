import { CreateFormModelType, CreateFormSchema } from '@engine/shared-types';
import { Body, Controller, Get, Param, Post, UsePipes } from '@nestjs/common';
import { ZodValidationPipe } from '../shared/zodValidationPipe';
import { FormsService } from './forms.service';

@Controller('/forms')
export class FormsController {
  constructor(private readonly formsService: FormsService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(CreateFormSchema))
  create(@Body() createForm: CreateFormModelType) {
    return this.formsService.create(createForm);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.formsService.findOne(id);
  }
}
