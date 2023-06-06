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
│   ├── handler_addproduct.ts
│   ├── handler_getallproduct.ts
│   ├── request.http
│   └── router.ts
├── gateway
│   └── gateway_impl.ts
├── index.ts
├── model
│   ├── entity
│   │   └── product.ts
│   └── repository
│       └── product.ts
├── shared
│   └── framework_helper.ts
└── usecase
    ├── add_product.ts
    └── getall_product.ts
```

## How to work with this structure
First you start by defining model in `model/entity`. Model here is the rich domain model which means it can have a methods that can modify it own state.
For example the method validate to check the validity of object. We can also have other method to have some logic. 

Next you go to the use case under `usecase` folders. Usecase here follow the use case definition on clean architecture concept that has an input port, output port, and interactor.
Input port is the place you define the request and response payload. Interactor is the place you define the use case algorithm. 
And the last part is output port is the place you define any methods that will need to be called by interactor.

In most cases, you will define the output port methods in repository interface, then it will be extended by output port interface. 
Repository interface is shared between output port.
Repository interface prefer to be simple and granular. Means, one interface one method is very enough for this case.
Repository mostly used for interacting with database.

What if we need to do some operations that is not related to database? 
Something like calling the external API, publish some message to message broker or something else?
We can introduce to use a service interface (`model/service`). 

Gateway is the place we implement all the methods from Outport interface. Most of the time, one gateway is enough.

Controllers is the place we define the routers (`controller/router`) and all the handlers (`handler/handler_usecasename`).
Controller will call the Input Port method.

The last part is the file `index.ts` which bind all usecase, gateway and controller together.

By having this kind of structure, we can have clear separation of concerns between logic parts and the infrastructure parts.
All logic parts is in model and usecase. All the infrastructure part is in gateway and controller.
We divide evenly the code between files for readability and maintainability purposes. 



