import { IsNotEmpty, IsString, Max } from "@nestjs/class-validator";

export class AddCategoryDto{
    @IsNotEmpty({message:`{title:Notice title must be provided}`})
    @IsString({message:`Category name must contain the string value`})
    @Max(100,{message:"Category name must not exceed the size of 100"})
    name:string
}