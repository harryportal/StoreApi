import { IsNotEmpty, IsNumber, IsString, Max, Min } from 'class-validator';

export default class ProductRating {
  @IsString()
  @IsNotEmpty()
  content: string;

  @Min(1)
  @Max(5)
  @IsNumber()
  rating: number;
}
