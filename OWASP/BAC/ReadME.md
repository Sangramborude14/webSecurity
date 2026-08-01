Dependencies
express
prisma
@prisma/client
bcrypt
jsonwebtoken    
zod
dotenv
helmet

Typescript
ts-node-dev
@types/node
@types/express
@types/bcrypt
@types/jsonwebtoken


schema
id
email
password
notes
createdAt

Note
id
title
content
userId
user
createdAt

npx prisma migrate dev --name init
create-next-app@latest frontend
npx prisma generate