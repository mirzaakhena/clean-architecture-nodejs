Run this command
```
tsc --init 
```

Enable
```
"outDir": "./dist",
```

Install expressjs
```
npm install express --save
```

If you want to add new requirements
```text
1. define your model in `model/entity`
2. define your request, response, write an algorithm then put your required method in Outport, in `usecase/`. 
3. define your repository in `model/repository` to be re-used in outport in different usecase later
4. define your outport implementation in gateway
5. publish your usecase with controller in `controller/handler_yourusecase` and `controller/router`,
6. bind usecase, gateway and controller together. 
```
