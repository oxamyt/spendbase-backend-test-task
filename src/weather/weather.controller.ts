import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  Get,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { WeatherService } from './weather.service';
import { PostWeatherDataDto, GetWeatherDataDto } from './weather-data.dto';
import { WeatherInterceptor } from './interceptors/weather.interceptor';

@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  recordWeather(@Body() postWeatherDataDto: PostWeatherDataDto) {
    return this.weatherService.recordWeatherData(postWeatherDataDto);
  }

  @Get()
  @UseInterceptors(WeatherInterceptor)
  @UsePipes(new ValidationPipe({ transform: true }))
  fetchWeather(@Query() getWeatherDataDto: GetWeatherDataDto) {
    return this.weatherService.fetchWeatherData(getWeatherDataDto);
  }
}
