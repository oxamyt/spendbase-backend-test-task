# spendbase-backend-test-task

## Instructions

1. Clone repo: `git clone git@github.com:oxamyt/spendbase-backend-test-task.git`
2. Move into directory `cd spendbase-backend-test-task`
2. Add `.env` file with values like in `.env.example`
3. Start: `docker-compose up --build`

## Endpoints
  
  POST `http://localhost:3000/weather` - Fetches data from the weather API and records it into the database.

  GET `http://localhost:3000/weather` - Fetches weather data from the database.

## Example
  POST `http://localhost:3000/weather`
      
 Request Body:```{
            "lat": 33,
            "lon": 33,
            "part": ["daily"]
       }```
      
  GET `http://localhost:3000/weather?lat=33&lon=33&part=daily`
     
    Response: {
    "sunrise": 1744514427,
    "sunset": 1744560970,
    "temp": 289.97,
    "feels_like": 289.35,
    "pressure": 1014,
    "humidity": 63,
    "uvi": 0.4,
    "wind_speed": 6.3
    }
