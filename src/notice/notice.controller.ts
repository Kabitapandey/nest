import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import mongoose from 'mongoose';
import { skip } from 'rxjs';
import { AddNoticeDto } from './dto/add-notice.dto';
import { NoticeService } from './notice.service';

@Controller('notice')
export class NoticeController {
  constructor(private noticeService: NoticeService) {}
  @Post()
  public async create(@Body() reqBody: AddNoticeDto) {
    const result = await this.noticeService.create(reqBody);

    return {
      data: result,
      message: 'Notice added successfully!',
      success: true,
    };
  }

  @Put('/:id')
  public async update(
    @Body() reqBody,
    @Param('id') id: mongoose.Types.ObjectId,
  ) {
    const result = await this.noticeService.update(reqBody, id);

    return {
      data: result,
      message: 'Notice updated successfully!',
      success: true,
    };
  }

  @Get()
  public async get(
    @Query('limit') limit: number,
    @Query('offset') offset: number,
  ) {
    const result = await this.noticeService.get(limit, offset);

    return {
      data: result,
      message: 'Notices listed successfully!',
      success: true,
    };
  }
  @Delete('/:id')
  public async delete(@Param('id') id: string) {
    await this.noticeService.delete(id);

    return {
      message: `Notice with id: ${id} deleted successfully`,
      success: true,
    };
  }

  @Delete('')
  public async bulkDelete(@Body() id: Array<string>) {
    await this.noticeService.bulkDelete(id['id']);

    return {
      message: `Notices deleted successfully`,
      success: true,
    };
  }

  @Post('/publish')
  public async bulkPost(@Body() id: Array<string>) {
    await this.noticeService.bulkPublish(id['id']);

    return {
      message: 'Notices published successfully!',
      success: true,
    };
  }

  @Get('/search')
  public async searchByStatus(@Query('query') query: string) {
    const result = await this.noticeService.search(query);

    return {
      data: result,
      message: `Notice  listed successfully`,
      success: true,
    };
  }
}
