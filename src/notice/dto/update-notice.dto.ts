import { IsNotEmpty } from "@nestjs/class-validator";

export class UpdateNoticeDto{
    @IsNotEmpty({message:`{title:Notice title must be provided}`})
    title:string
    @IsNotEmpty({message:`{title:Notice category must be provided}`})
    category:string
    tags:string
}