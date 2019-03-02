FROM node:alpine as builder
WORKDIR /client

COPY ./package.json ./
RUN yarn

COPY ./ ./
CMD ["yarn", "build"]

# FROM nginx
