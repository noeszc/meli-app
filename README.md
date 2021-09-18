## Contents

- [Todo](#todo)
- [Configuration](#configuration)

## Todo
- Format amount based on the country's currency
- Add `next-seo` to bring SEO 
- Add unit tests for React not only the API


## Configuration

Make sure that you have Node.js v12.x and yarn v1.22.5 or above installed

### Project structure

```bash
├── README.md
├── jest.config.js
├── next-env.d.ts
├── next.config.js
├── package.json
├── public
│   └── assets
├── src
│   ├── components
│   ├── lib
│   ├── pages
│   ├── theme
│   └── utils
├── testing
├── tsconfig.json
└── yarn.lock
```

### Environment variables

It’s necessary to create a **environment variables** (**.env**) file for the correct execution of this system. This file must be created in the _root_ of the project:

```Shell
touch .env
```

Next, there’re listed the necessary variables with example values.

| variable                               | value                               | description                                                 |
| -------------------------------------- | ----------------------------------- | ----------------------------------------------------------- |
| NEXT_MELI_API_PROXY_URL                | https://https://api.mercadolibre.com| Mercado Libre API URL       |


## Initialization

```Shell
yarn install
```

Installs all the dependencies defined in a `package.json` file.

## Server

### Development

```Shell
yarn dev
```

Starts the development server and makes your application accessible at `localhost:3000.` Changes in the application code will be hot-reloaded.

## Building

```Shell
yarn build
```

Creates an optimized production build of the web site 

## Testing

```Shell
yarn test
```
