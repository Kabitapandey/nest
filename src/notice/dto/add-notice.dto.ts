import { IsNotEmpty } from "@nestjs/class-validator";
import mongoose from "mongoose";

export class AddNoticeDto{
    @IsNotEmpty({message:  `{id:Id must be provided}`})
    title:string
    category:string
    tags:string
    status:string
}