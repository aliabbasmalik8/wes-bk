# How to setup, run and test the project

1. Clone the github repository
2. Run ```yarn``` or ```npm i``` in folder director
3. Create `postgresql` db
4. Update  `.env.development` file
3. Run ```yarn build``` or ```npm run build``` to build the project
4. Run ```yarn start``` or ```npm start``` to start production server
5. Run ```yarn dev``` or ```npm run dev``` to start development server
6. Run ```yarn test``` or ```npm run test``` to test the project

By default, server listens at localhost:4000

# Modules

1. User module
2. Notes module

# User Apis

1. POST /api/users/login
2. POST /api/users/signup
3. GET /api/users/getUser (auth)
4. PUT /api/users/updateUser (auth)

# Note Apis

1. GET /api/notes (auth)
2. POST /api/notes/createNote (auth)
3. PUT /api/notes/updateNote (auth)
4. DELETE /api/notes/:id (auth)
5. POST /api/notes/search (auth)