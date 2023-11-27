import { CreateRequest } from '@engine/shared-types';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RequestsService } from './requests.service';

@Controller('/requests')
export class RequestsController {
  constructor(private readonly requestsService: RequestsService) {}

  @Post()
  //   @UsePipes(ValidationPipe)
  create(@Body() createForm: CreateRequest) {
    return this.requestsService.create(createForm);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.requestsService.findOne(id);
  }
}
