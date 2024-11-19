# Configure for MySQL

Modify the `db` datasource inside the `/prisma/schema.prisma` file:
```js
...
datasource db {
    provider     = "mysql" // mysql | postgresql
    url          = env("DATABASE_URL")
    relationMode = "prisma"
}
...
```

Using `yarn`:
```sh
yarn
yarn prisma db push --preview-feature
yarn prisma db seed  
yarn dev
```