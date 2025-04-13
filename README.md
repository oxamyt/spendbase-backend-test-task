# spendbase-backend-test-task

## Instructions

1. Clone repo: `git clone git@github.com:oxamyt/spendbase-backend-test-task.git
cd spendbase-backend-test-tas`
2. Add `.env` file with values like in .env.example
3. Start: `docker-compose up --build`

## Endpoints

- POST /weather:
  ```bash
  POST http://localhost:3000/weather - for fetching from weather api and recording into db
  ```
  ```bash
  GET http://localhost:3000/weather - for fetching data from db
  ```
