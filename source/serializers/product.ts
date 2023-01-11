import { IsNotEmpty, IsNumber, IsString, Max, Min } from "class-validator"

class ProductRating{

    @IsString()
    content: strin

    @Min(1)
    @Max(5)
    @IsNumber()
    rating: number
}