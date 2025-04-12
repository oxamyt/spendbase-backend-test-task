import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosResponse } from 'axios';
import { OneCallResponse } from './types';
import { WeatherDataDto } from './weather-data.dto';

@Injectable()
export class WeatherService {
  constructor(
    private prisma: PrismaService,
    private readonly configService: ConfigService,
  ) {}

  async fetchWeatherData(weatherDataDto: WeatherDataDto) {
    try {
      const { lat, lon, part } = weatherDataDto;
      const apiKey = this.configService.get<string>('API_KEY');

      let url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}`;

      if (part && part.length > 0) {
        url += `&exclude=${part.join(',')}`;
      }
      const response: AxiosResponse<OneCallResponse> = await axios.get(url);
      const weatherData = response.data;

      return await this.prisma.weatherData.create({
        data: {
          latitude: lat,
          longitude: lon,
          data: weatherData,
        },
      });
    } catch (error) {
      throw new Error(`Error during fetching weather data: ${error}`);
    }
  }
}
