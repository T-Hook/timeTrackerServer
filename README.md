
# Pre-reqs
- Install [Node.js](https://nodejs.org/en/)
- Install [MongoDB](https://www.mongodb.com/download-center/community). Current used version is 4.0.6.
- Configure `.env` file starting from `.env.example`. In this file, *MONGODB_URI* should point to default address/port of MongoDB server. 

# Getting started

- Install dependencies
```
cd timeTrackerServer
npm install
```

- Build and run the project
```
npm run build
npm start
```

# Swagger
To access Swagger UI for available endpoints
```
http://localhost:3000/api-docs/#/
```
Pass token from `/auth/login` when using protected endpoints (for example: getting all `/users`) like `Bearer <token>`

# Import fake data into the mongo DB
```
change the RUN_FIXTER =true in the .env file 
```

# Tests
```
npm run test
```

# TODO
- Implement RBAC functionality
- ~~Integrate Swagger~~
- Test coverage

#Post Man
- import the postman/{username}/timeTrackerServer.postman_collection.json file in post man to get all end points
- import the postman/{username}/timeTrackerServer.postman_environment.json file in post man to get all necessary environments var
- chose TimeTrackerServer environment in post man 
- change the [{"key":"BaseUrl","value":"http://127.0.0.1:3000","enabled":true,"sessionValue":"http://127.0.0.1:3000"}]
with the correct value 
# timeTrackerServer
