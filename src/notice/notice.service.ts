import { BadRequestException, Body, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { AddNoticeDto } from './dto/add-notice.dto';
import { UpdateNoticeDto } from './dto/update-notice.dto';
import { INotice } from './schema/notice.interface';

@Injectable()
export class NoticeService {
  constructor(@InjectModel('Notice') private noticeModel: Model<INotice>) {}

  public async create(reqBody: AddNoticeDto) {
    const result = await this.noticeModel.create(reqBody);

    return result;
  }

  public async update(reqBody: UpdateNoticeDto, id: mongoose.Types.ObjectId) {
    const notice = await this.noticeModel.findOne({ _id: id });

    if (!notice) {
      throw new BadRequestException({ id: `Notice with id:${id} not found!` });
    }

    await notice.updateOne(reqBody);
    return notice;
  }

  public async get(limit:number,offset:number) {
    const notices = await this.noticeModel
      .find({})
      .collation({ locale: 'en' })
      .sort({ title: 1 }).skip(offset).limit(limit);

    return notices;
  }

  public async delete(id: string) {
    const notice = await this.noticeModel.findOneAndDelete({ _id: id });

    if (!notice) {
      throw new BadRequestException({ id: `Notice with id:${id} not found!` });
    }
  }

  public async bulkDelete(id: Array<string>) {
    await this.noticeModel.deleteMany({ _id: { $in: id } });
  }

  public async bulkPublish(id: Array<string>) {
    await this.noticeModel.updateMany(
      { _id: { $in: id } },
      { status: 'published' },
    );
  }

  public async search(query:string) {
    query=query || ''

  const tagRegEx="#"+query   

    const result = await this.noticeModel.find({
      $or: [
        { title: { $regex: query,$options:"i" } },
        { tags: { $regex: tagRegEx,$options:"i"} },
      ]
    },
)
    return result;
  }

}
