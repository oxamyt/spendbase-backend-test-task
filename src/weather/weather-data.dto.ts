import {
  IsNumber,
  IsOptional,
  IsIn,
  Min,
  Max,
  IsArray,
  ArrayNotEmpty,
} from 'class-validator';

export class WeatherDataDto {
  @IsNumber()
  @Min(-90)
  @Max(90)
  lat: number;

  @IsNumber()
  @Min(-180)
  @Max(180)
  lon: number;

  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @IsIn(['current', 'minutely', 'hourly', 'daily', 'alerts'], {
    each: true,
  })
  part?: string[];
}
