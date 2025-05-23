import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosResponse } from 'axios';
import { OneCallResponse } from './types';
import { GetWeatherDataDto, PostWeatherDataDto } from './weather-data.dto';

@Injectable()
export class WeatherService {
  constructor(
    private prisma: PrismaService,
    private readonly configService: ConfigService,
  ) {}

  async recordWeatherData(postWeatherDataDto: PostWeatherDataDto) {
    try {
      const { lat, lon, part } = postWeatherDataDto;
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
      throw new Error(
        `Error during fetching and recording weather data: ${error}`,
      );
    }
  }

  async fetchWeatherData(getWeatherDataDto: GetWeatherDataDto) {
    try {
      const { lat, lon, part } = getWeatherDataDto;

      const weatherDataRecord = await this.prisma.weatherData.findFirst({
        where: {
          latitude: lat,
          longitude: lon,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });

      if (!weatherDataRecord || !weatherDataRecord.data) {
        return { message: `No found by lat: ${lat} and lon: ${lon}` };
      }

      if (!part || part.length === 0) {
        return weatherDataRecord;
      }

      const filteredData = weatherDataRecord.data;
      part.split(',').forEach((section) => {
        delete filteredData[section];
      });

      return { ...weatherDataRecord, data: filteredData };
    } catch (error) {
      throw new Error(`Error during fetching weather data from db: ${error}`);
    }
  }
}
