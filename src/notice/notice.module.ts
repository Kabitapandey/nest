import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { CategorySchema } from "src/category/schema/category.schema";
import { NoticeController } from "./notice.controller";
import { NoticeService } from "./notice.service";
import { NoticeSchema } from "./schema/notice.schema";

@Module({
    imports:[
    MongooseModule.forFeature([{
        name:'Notice',
        schema:NoticeSchema

    },

{
    name:'Category',
    schema:CategorySchema
}
]),
    ],
    controllers:[NoticeController],
    providers:[NoticeService]
})

export class NoticeModule{}