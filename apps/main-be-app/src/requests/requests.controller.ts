import { CreateRequestSchema, CreateRequestType, RequestListingQuery, RequestQueryType } from '@engine/shared-types';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UsePipes,
} from '@nestjs/common';
import { TransformationPipe } from '../shared/transformationPipe';
import { ZodValidationPipe } from '../shared/zodValidationPipe';
import { RequestsService } from './requests.service';

@Controller('/requests')
export class RequestsController {
  constructor(private readonly requestsService: RequestsService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(CreateRequestSchema))
  create(@Body() createForm: CreateRequestType) {
    return this.requestsService.create(createForm);
  }
  @Get()
  async list(
    @Query(new TransformationPipe(), new ZodValidationPipe(RequestListingQuery))
    query: RequestQueryType
  ) {
    return this.requestsService.list(query)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.requestsService.findOne(id);
  }
}
