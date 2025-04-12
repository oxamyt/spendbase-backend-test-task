import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { WeatherService } from './weather.service';
import { WeatherDataDto } from './weather-data.dto';

@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  fetchWeather(@Body() weatherDataDto: WeatherDataDto) {
    return this.weatherService.fetchWeatherData(weatherDataDto);
  }
}
