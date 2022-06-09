FROM node:17.8-alpine3.14

RUN export NODE_ENV=production

WORKDIR /app
COPY package.json ./
RUN npm i --only=prod

COPY ./client/ ./client/
COPY ./dist/ ./dist/
COPY .env_live .env

CMD ["npm", "run", "start"]
