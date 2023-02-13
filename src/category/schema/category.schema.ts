import mongoose from "mongoose";
import { ICategory } from "./category.interface";


export const CategorySchema:mongoose.Schema=new mongoose.Schema<ICategory>({
name:{
        type:String,
        required:[true,"Category name must be provided"],
        trim:true
    },
}
)