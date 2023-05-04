# Grocery List App
This app uses Postgres as a database. The script for creating the tables can be found in the server/db directory. Additionally, a .env file must be created in the server directory containing the required info that was used to create the DB locally.

```
PORT=3001

PGUSER={your-user}
PGHOST={your-host}
PGPASSWORD={your-password}
PGDATABASE={your-database}
PGPORT={your-pgport} (default 5432)

OPENAI_SECRET_KEY={your-api-secret-key}
```

## Starting client locally
1. Start a terminal in client directory
2. npm start
## Starting server locally
1. Start a terminal in server directory
2. npm run dev
