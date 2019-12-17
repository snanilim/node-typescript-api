# node-typescript-api
node-typescript-api

yarn install

yarn build

yarn lint

yarn dev

# use

1. concurrently
2. eslint
3. prettier


# Error Handle
1. If error is api error and operational than use APIError() with isOperational: true
2. Use only the built-in Error object
3. handle operational vs programmer errors by isOperational: true/false
4. Handle errors centrally by APIError and handleError
5. Catch unhandled promise rejections
6. Document API errors using Swagger 
7. Exit the process gracefully when a stranger comes to town
8. Use winston logger to increase error visibility
9. Test error flows using Mocha Jest & Chai
10. Catch unhandled promise rejections


# Need to DO
1. Discover errors and downtime using APM products (Decide to use ELK stack)
2. Fail fast, validate arguments using a dedicated library

# thank you link
https://dev.to/robertcoopercode/using-eslint-and-prettier-in-a-typescript-project-53jb
https://43081j.com/2019/02/using-eslint-with-typescript
https://softchris.github.io/pages/joi.html#adding-router-parameters-support

# should install them for prettier
npm i eslint-config-prettier -save-dev
npm i eslint-config-standard -save-dev
npm i eslint-plugin-node -save-dev
npm i eslint-plugin-promise -save-dev