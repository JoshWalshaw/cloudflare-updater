FROM node:16.15.1-alpine3.15

WORKDIR /usr/src/app

COPY . .

RUN npm ci

RUN npm run build

CMD [ "node", "dist/Application.js" ]
