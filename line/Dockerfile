FROM node:20-alpine3.17

WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
RUN npm i --silent

COPY . ./
EXPOSE 8083

CMD [ "npm", "run", "start" ]