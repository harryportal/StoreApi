import { IsNotEmpty, IsNumber, IsString, Max, Min } from "class-validator"

class ProductRating{
    @IsString()
    id: string

    @IsString()
    content: string

    @Min(1)
    @Max(5)
    @IsNumber()
    rating: number

    @IsString()
    productId: string
}