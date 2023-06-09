# Grocery List App
This app uses Postgres as a database. The script for creating the tables can be found in the server/db directory. Additionally, a .env file must be created in the server directory containing the required info that was used to create the DB locally.

This project uses the Material UI component library which can be found [here](https://mui.com/material-ui/getting-started/overview/).

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
2. npm i
3. npm start
## Starting server locally
1. Start a terminal in server directory
2. npm i
3. npm run dev

## Tasks
### To-Do
#### Login/Sign Up
- [x] Authentication implementation against DB
- [x] Redirect "/" to "/login"
- [x] Restyle inputs on sign-up page
- [x] Error detection if username already exists (in sign up process)
- [x] Redirect to homepage after signing in/logging in
- [ ] Add icons

#### UsersPage
- [ ] Update account information
- [ ] Add or remove preferences
- [ ] Logout user
- [ ] Delete user confirmation
- [ ] On confirmation, delete user and ALL associated records

#### MyFood
- [x] API calls to update user's food in DB
- [x] Restyle modal to mimic figma
- [x] Edit food (should open in modal with fields populated with current state)
- [ ] Delete food (should remove food with confirmation and update recipe "missing ingredients")

#### MyRecipes
- [x] Restyle modal to mimic figma
- [ ] API calls to delete user's recipes in DB
- [ ] Implementing the preferences into the prompt
- [ ] Implement modal to see the recipe in full

#### General
- [x] Navbar should show "My Food/Recipes" **after** signing in, not before
