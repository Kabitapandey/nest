import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { AddCategoryDto } from "./dto/add-category.dto";
import { UpdateCategoryDto } from "./dto/update-category-dto";
import { ICategory } from "./schema/category.interface";

@Injectable()
export class CategoryService{
    constructor(@InjectModel('Category') private categoryModel:Model<ICategory>){}

    public async create(reqBody:AddCategoryDto){
        return await this.categoryModel.create(reqBody);
    }

    public async get(){
        return await this.categoryModel.find({})
    }
    
    public async update(reqBody:UpdateCategoryDto,id:string){
        const result=await this.categoryModel.findOneAndUpdate({_id:id},reqBody,{runValidators:true,new:true})

        if(!result){
            throw new BadRequestException({id:`Category with id:${id} not found!`})
        }
        return result
    }

    public async delete(id:string){
        const result=await this.categoryModel.findOneAndDelete({_id:id})

        if(!result){
            throw new BadRequestException({id:`Category with id:${id} not found!`})
        }
    }
}