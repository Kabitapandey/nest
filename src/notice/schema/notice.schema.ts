import mongoose from "mongoose";
import { INotice } from "./notice.interface";

export const NoticeSchema:mongoose.Schema=new mongoose.Schema<INotice>({
    title:{
        type:String,
        required:[true,"Notices title must be provided"],
        trim:true
    },
    category:{
        type:String,
        required:[true,"Notices category must be provided"],
    },
    tags:{
        type:String,
    },
    status:{
        type:String,
        default:'draft'
    }
},{timestamps:true}
)

//creating text index
NoticeSchema.index({
    title: 'text',
    // tags:'text'
  });