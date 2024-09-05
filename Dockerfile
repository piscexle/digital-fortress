# Use an official Node.js runtime as the base image
FROM node:18-alpine

# Set the working directory in the container

RUN mkdir -p /app

WORKDIR /app

COPY package*.json /app

RUN yarn install

COPY . /app

EXPOSE 4017

RUN yarn run build

CMD ["yarn", "start"]
