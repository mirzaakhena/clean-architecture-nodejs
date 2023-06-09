# Clean Architecture NodeJS

## Installation
git clone the repo then install required dependencies
```shell
$ npm install 
```

## Run the application
```shell
$ npm run start
```
Application will run in port 3000

## Use the application
To use the API, you can use the  `src/controller/request.http` file to test the api request invocation.

## Code Structure
```text
src
├── controller
│   ├── controller.ts
│   ├── handle_addproduct.ts
│   ├── handle_authorization.ts
│   ├── handle_createorder.ts
│   ├── handle_error.ts
│   ├── handle_getallproduct.ts
│   ├── handle_login.ts
│   └── request.http
├── gateway
│   ├── gateway.ts
│   ├── impl_order.ts
│   ├── impl_product.ts
│   ├── impl_trx.ts
│   └── impl_user.ts
├── index.ts
├── model
│   ├── entity
│   │   ├── error.ts
│   │   ├── order.ts
│   │   ├── product.ts
│   │   └── user.ts
│   └── repository
│       ├── order.ts
│       ├── product.ts
│       ├── transaction.ts
│       └── user.ts
├── usecase
│   ├── execute_add_product.test.ts
│   ├── execute_add_product.ts
│   ├── execute_create_order.test.ts
│   ├── execute_create_order.ts
│   ├── execute_getall_product.test.ts
│   ├── execute_getall_product.ts
│   ├── execute_login.test.ts
│   ├── execute_login.ts
│   └── usecase.ts
└── utility
    ├── application.ts
    └── logger.ts
```

## What is the feature of this code ?
1. Written with concept clean architecture that promote the separation of concern between logic code and infrastructure code.
2. Basically just use common frameworks like ExpressJS and TypeORM. And not using complex frameworks like NestJS
3. All the controller, use case (service in common terms) and gateway written by function closure instead of class
4. have a login function which generate the jwt token
5. have a simple user access control verified on every method by jwt token
6. have sample transactions database handling 




