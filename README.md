# Clean Architecture NodeJS
This project inspired from https://github.com/mirzaakhena/gogen 

I am experimenting using the function closure except using a class.

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
   ```
   export const ImplFindOneUserByUsername = (ds: DataSource): FindOneUserByUsername => {
       return async (ctx: Context, username: string): Promise<User | null> => {
           return await getManager(ctx, ds.manager).findOneBy(User, {username})
       }
   }
   
   export const ImplValidatePassword = (): ValidatePassword => {
       return async (ctx: Context, username: string, password: string): Promise<boolean> => {
           // TODO: temporary implementation
           return (username === password)
       }
   }
   
   export const ImplFindAllUserRoles = (ds: DataSource): FindAllUserRoles => {
       return async (ctx: Context, username: string): Promise<string[]> => {
           return (await getManager(ctx, ds.manager).findBy(UserRole, {username})).map(ur => {
               return ur.role
           })
       }
   }
   ```
4. have a login function which generate the jwt token
   ```
   export const handleLogin = (executable: Inport<Request, Response>): HandlerFuncWithNext => {
   
       return async (req: express.Request, res: express.Response, next: express.NextFunction) => {
   
           try {
   
               const ctx = getContext(handleLogin.name)
   
               logger.info(ctx, `called with ${JSON.stringify(req.body)}`)
   
               const result = await executable(ctx, req.body)
   
               logger.info(ctx, `done with id ${result.user}`)
   
               const payload = {data: result.user}
               const secretKey = process.env.SECRET_KEY as string
               const expiration = {expiresIn: process.env.TOKEN_EXPIRATION}
               const token = jwt.sign(payload, secretKey, expiration);
   
               res.json({token: token})
   
           } catch (err) {
               next(err)
           }
   
       };
   
   }
   ```
5. have a middleware to intercept and check the token
   ```
   export const handleAuthorization = (): HandlerFuncWithNext => {
   
       return async (req: DecodedRequest, res: express.Response, next: express.NextFunction) => {
   
           try {
   
               const authHeader = req.headers.authorization;
               if (!authHeader) {
                   res.sendStatus(401);
                   return
               }
   
               const token = authHeader.split(' ');
               if (token.length !== 2) {
                   res.sendStatus(401);
                   return
               }
   
               const secretKey = process.env.SECRET_KEY as string
               const dataDecoded = jwt.verify(token[1], secretKey) as JwtPayload
               req.user = dataDecoded.data as User
   
               next();
   
           } catch (e) {
               next(e);
           }
   
       }
   
   }   
   ```
6. have a simple user access control verified on every method
    ```
    if (!hasOneOfRoles(user,["admin", "operator"])) {
        res.sendStatus(403);
        return
    }
    ```
7. have sample transactions database handling 
    ```
    export const executeCreateOrder = (o: Outport): Inport<Request, Response> => {
    
        const [saveProduct, saveOrder, withTransaction,] = o
    
        return async (ctx: Context, req: Request): Promise<Response> => {
    
            return await withTransaction(ctx, async (ctx: Context): Promise<Response> => {
    
                const objOrder = new Order()
                objOrder.id = `order-${req.id}`
                objOrder.username = req.username
                await saveOrder(ctx, objOrder)
    
                const objProduct = new Product()
                objProduct.id = `product-${req.id}`
                objProduct.name = req.name
                objProduct.price = req.price
                objProduct.validate()
    
                await saveProduct(ctx, objProduct)
    
                return {
                    orderId: objOrder.id,
                    productId: objProduct.id,
                }
    
            })
    
        }
    }
    ```
8. Use manual and simple dependency injection
   ```
   const m = getDataSource()
   
   const findOneUserByUsername = ImplFindOneUserByUsername(m)
   const validatePassword = ImplValidatePassword()
   
   const withTrx = ImplWithTransaction(m)
   const saveOrder = ImplSaveOrder(m)
   const saveProduct = ImplSaveProduct(m)
   const findAllProducts = ImplFindAllProducts(m)
   const findAllUserRoles = ImplFindAllUserRoles(m)
   
   const router = express.Router()
   
   router.use("/api/v1", handleAuthorization());
   router.post("/api/v1/products", handleAddProduct(executeAddProduct([saveProduct])))
   router.get("/api/v1/products", handleGetAllProduct(executeGetAllProduct([findAllProducts])))
   router.post("/api/v1/order", handleCreateOrder(executeCreateOrder([saveProduct, saveOrder, withTrx])))
   router.post("/login", handleLogin(executeLogin([findOneUserByUsername, validatePassword, findAllUserRoles])))
   ```



