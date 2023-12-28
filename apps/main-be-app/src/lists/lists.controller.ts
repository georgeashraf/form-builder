import { CreateListSchema, CreateListType, ListListingQuery, ListQueryType } from '@engine/shared-types';
import { Body, Controller, Get, Param, Post, Query, UsePipes } from '@nestjs/common';
import { TransformationPipe } from '../shared/transformationPipe';
import { ZodValidationPipe } from '../shared/zodValidationPipe';
import { ListsService } from './lists.service';

@Controller('/lists')
export class ListsController {
  constructor(private readonly listsService: ListsService) {}
  
  @Get()
  async list(
    @Query(new TransformationPipe(), new ZodValidationPipe(ListListingQuery))
    query: ListQueryType
  ) {
    return this.listsService.list(query);
  }
  @Post()
  @UsePipes(new ZodValidationPipe(CreateListSchema))
  create(@Body() createList: CreateListType) {
    return this.listsService.create(createList);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.listsService.findOne(id);
  }
}
