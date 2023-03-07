import { IsNumber, IsString, Max, Min } from 'class-validator';

export default class ProductRating {

  @IsString()
  content: string;
  

  @Min(1)
  @Max(5)
  @IsNumber()
  rating: number;
}
