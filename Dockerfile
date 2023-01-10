FROM mhart/alpine-node:14 as Base
WORKDIR /app
RUN apk --update add --no-cache make gcc g++ python openssl openssl-dev libc6-compat
COPY package*.json  .
RUN npm install
COPY . .
EXPOSE 3000
CMD [ "npm", "run", "dev" ]
