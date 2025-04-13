import {
  Injectable,
  NestInterceptor,
  CallHandler,
  ExecutionContext,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs';
import { WeatherResponse } from '../types';
import { BadRequestException, NotFoundException } from '@nestjs/common';

@Injectable()
export class WeatherInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((response: WeatherResponse) => {
        if (!response || !response.data) {
          throw new NotFoundException('Weather data not found');
        }

        if (response.data.current) {
          const currentWeather = response.data.current;
          return {
            sunrise: currentWeather.sunrise || null,
            sunset: currentWeather.sunset || null,
            temp: currentWeather.temp || null,
            feels_like: currentWeather.feels_like || null,
            pressure: currentWeather.pressure || null,
            humidity: currentWeather.humidity || null,
            uvi: currentWeather.uvi || null,
            wind_speed: currentWeather.wind_speed || null,
          };
        } else {
          throw new BadRequestException('Current weather data is missing');
        }
      }),
    );
  }
}
