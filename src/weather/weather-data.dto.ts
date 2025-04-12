import {
  IsNumber,
  IsOptional,
  IsIn,
  Min,
  Max,
  IsArray,
  ArrayNotEmpty,
  IsString,
} from 'class-validator';
import { Type } from 'class-transformer';
export class PostWeatherDataDto {
  @Type(() => Number)
  @IsNumber()
  @Min(-90)
  @Max(90)
  lat: number;

  @Type(() => Number)
  @IsNumber()
  @Min(-180)
  @Max(180)
  lon: number;

  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @Type(() => String)
  @IsIn(['current', 'minutely', 'hourly', 'daily', 'alerts'], {
    each: true,
  })
  part?: string[];
}

export class GetWeatherDataDto {
  @Type(() => Number)
  @IsNumber()
  @Min(-90)
  @Max(90)
  lat: number;

  @Type(() => Number)
  @IsNumber()
  @Min(-180)
  @Max(180)
  lon: number;

  @IsOptional()
  @IsString()
  part?: string;
}
