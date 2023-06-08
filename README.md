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

For inserting the product
```text
POST http://localhost:3000/products
Content-Type: application/json

{
  "name": "orange",
  "price": 5000
}
```

For get all the products
```text
GET http://localhost:3000/products
Content-Type: application/json
```
Or you can just use the `request.http` file to test the api request invocation.

## Code Structure
```text
src
├── controller
│   ├── controller.ts
│   ├── handle_addproduct.ts
│   ├── handle_getallproduct.ts
│   └── request.http
├── gateway
│   ├── gateway.ts
│   └── impl_product.ts
├── index.ts
├── model
│   ├── entity
│   │   └── product.ts
│   └── repository
│       └── product.ts
└── usecase
    ├── execute_add_product.ts
    ├── execute_getall_product.ts
    └── usecase.ts
```

## How to work with this structure
First you start by defining model in `model/entity`. Model here is the rich domain model which means it can have a methods that can modify it own state.
For example the method validate to check the validity of object. We can also have other method to have some logic. 

Next you go to the use case under `usecase` folders. 
Under usecase, you define the request, response and the required action methods that will be used by use case algorithm.

The action methods then defined in `model/repository`

Gateway is the place we implement all the methods from action methods. 

Controllers is the place we define the the handlers (`handler/handler_usecasename`).
Controller will call the use case method.

The last part is the file `index.ts` which bind all usecase, gateway and controller together.

By having this kind of structure, we can have clear separation of concerns between logic parts and the infrastructure parts.
All logic parts is in model and usecase. All the infrastructure part is in gateway and controller.
We divide evenly the code between files for readability and maintainability purposes. 



