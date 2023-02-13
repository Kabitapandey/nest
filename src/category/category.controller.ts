import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { AddCategoryDto } from './dto/add-category.dto';

@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Post()
  @Post()
  public async create(@Body() reqBody: AddCategoryDto) {
    const result = await this.categoryService.create(reqBody);

    return {
      data: result,
      message: 'Category created successfully!',
      success: TransformStreamDefaultController,
    };
  }

  @Get()
  public async get() {
    const result = await this.categoryService.get();

    return {
      data: result,
      message: 'Category retrieved successfully!',
      success: true,
    };
  }

  @Delete('/:id')
  public async delete(@Param('id') id: string) {
    await this.categoryService.delete(id);

    return {
      message: `Category with id: ${id} deleted successfully`,
      success: true,
    };
  }

  @Put('/:id')
  public async update(@Body() reqBody, @Param('id') id: string) {
    const result = await this.categoryService.update(reqBody, id);

    return {
      data: result,
      message: 'Category updated successfully!',
      success: true,
    };
  }
}
