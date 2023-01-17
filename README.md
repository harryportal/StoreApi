# EcommerceApi_Node
This is an Ecommerce Api built with Node and TypeScript:rocket:

***
To run on a development server: 

```sh
> git clone https://github.com/harryportal/EcommerceApi_Node
> cd EcommerceApi_Node
> npm install
```

Populate the env files using the .evn.samples

Start the application and run migration:
```sh
> npm run start
> npm run migrate
```

Run `npm run logs` to view server logs
***

ROADMAP:
- [x] Dockerise the Application
- [x] Set up model with Prisma
- [x] Implement Authentication Endpoints
- [x] Implement Product Review and Adding Endpoints
- [ ] Implement Payment with Paystack Api
- [ ] Add Logging with winston
- [x] Write Unit and Integration Test

