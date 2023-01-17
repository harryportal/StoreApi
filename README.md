# EcommerceApi_Node
This is an Ecommerce Api built with Node and TypeScript:rocket:

***
To run on a development server: 

```sh
> git clone https://github.com/harryportal/EcommerceApi_Node
> cd EcommerceApi_Node
> npm install
```
***
Populate the env files using the .env.samples
***
Start the application and run migration:
```sh
> npm run docker:up
> npm run migrate
```

Set up test DB and run tests:
```sh
> npm run migrate:test
> npm run test
```
***
Run `npm run logs` to view server logs
***
Run `npm run docker:down` to kill Server
***
ROADMAP:
- [x] Dockerise the Application
- [x] Set up model with Prisma
- [x] Implement Authentication Endpoints
- [x] Implement Product Review and Adding Endpoints
- [ ] Implement Payment with Paystack Api
- [ ] Add Logging with winston
- [x] Write Unit and Integration Test

