# React-applikation för boklogg

Detta är en fullstack webbapplikation byggd med React (SPA) och ett Express API.
Appen låter en administratör logga in och hantera böcker (CRUD), medan besökare kan se böcker publikt.

## Tekniker

- React

- TypeScript

- React Router

- Context API (AuthContext)

- CSS Modules

## Inloggningsuppgifter
användarnamn: Nathalie
lösenord: supersecurepassword

## API Endpoints
### Auth
POST /api/auth/login
GET /api/auth/validate
### Böcker
GET /api/books
GET /api/books/:id
POST /api/books (protected)
PUT /api/books/:id (protected)
DELETE /api/books/:id (protected)