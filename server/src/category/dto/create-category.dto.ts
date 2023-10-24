import { IsNotEmpty, IsOptional } from "class-validator";
import { User } from "src/user/entities/user.entity";

export class CreateCategoryDto {
    @IsNotEmpty()
    title: string
    @IsOptional()
    user?: User
}


// Содержит DTO для создания и обновления категорий.